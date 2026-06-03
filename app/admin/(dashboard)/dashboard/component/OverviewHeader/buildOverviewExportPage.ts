import type { DashboardOverviewData } from "@/app/dashboard/mock-data";
import type { DateRangeOption } from "./OverviewHeader.type";

/** HTML-এ বিশেষ অক্ষর এস্কেপ — XSS প্রতিরোধ */
function escapeHtml(value: string | number): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** টেবিল সেকশন হেডার */
function sectionTitle(title: string): string {
  return `<h2 class="section-title">${escapeHtml(title)}</h2>`;
}

/** পুরো ওভারভিউ রিপোর্ট HTML পেজ বানানো — টেবিলে সব সেকশন */
export function buildOverviewExportHtml(
  overview: DashboardOverviewData,
  dateRange: DateRangeOption
): string {
  const exportedAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const { header, stats, recentOrders, topProducts, lowStockItems, weeklySales, leadSources, quickActions } =
    overview;

  // স্ট্যাট কার্ড টেবিল সারি
  const statsRows = stats
    .map(
      (stat) => `
      <tr>
        <td>${escapeHtml(stat.title)}</td>
        <td><strong>${escapeHtml(stat.value)}</strong></td>
        <td>${escapeHtml(stat.trendLabel)}</td>
      </tr>`
    )
    .join("");

  // রিসেন্ট অর্ডার টেবিল
  const orderRows = recentOrders
    .map(
      (order) => `
      <tr>
        <td>${escapeHtml(order.id)}</td>
        <td>${escapeHtml(order.productName)}</td>
        <td>$${escapeHtml(order.price.toLocaleString("en-US", { minimumFractionDigits: 2 }))}</td>
        <td><span class="badge badge-${order.status.toLowerCase()}">${escapeHtml(order.status)}</span></td>
      </tr>`
    )
    .join("");

  // টপ প্রোডাক্ট
  const topProductRows = topProducts
    .map(
      (p) => `
      <tr>
        <td>${escapeHtml(p.category)}</td>
        <td>${escapeHtml(p.name)}</td>
        <td>$${escapeHtml(p.price)}</td>
        <td>${escapeHtml(p.variantLabel)}</td>
      </tr>`
    )
    .join("");

  // লো স্টক
  const lowStockRows = lowStockItems
    .map(
      (item) => `
      <tr>
        <td>${escapeHtml(item.name)}</td>
        <td>${escapeHtml(item.sku)}</td>
        <td>$${escapeHtml(item.price)}</td>
        <td class="stock-low">${escapeHtml(String(item.stockLeft).padStart(2, "0"))}</td>
      </tr>`
    )
    .join("");

  // সাপ্তাহিক বিক্রয়
  const salesRows = weeklySales.days
    .map(
      (day) => `
      <tr>
        <td>${escapeHtml(day.dayLabel)} (${escapeHtml(day.dateLabel)})</td>
        <td>${escapeHtml(day.value.toLocaleString())}</td>
        <td>${day.isHighlighted ? "Yes" : "—"}</td>
      </tr>`
    )
    .join("");

  // লিড সোর্স
  const leadRows = leadSources.sources
    .map(
      (source) => `
      <tr>
        <td>${escapeHtml(source.label)}</td>
        <td>${escapeHtml(source.count)}</td>
        <td>${escapeHtml(source.percentage)}%</td>
      </tr>`
    )
    .join("");

  // কুইক অ্যাকশন
  const actionRows = quickActions
    .map(
      (action) => `
      <tr>
        <td>${escapeHtml(action.title)}</td>
        <td>${escapeHtml(action.description)}</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(header.store.name)} — Overview ${escapeHtml(dateRange.label)}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "Aeonik", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: #0e2038;
      background: #fff;
      padding: 32px 24px;
      line-height: 1.45;
    }
    .report-header {
      border-bottom: 2px solid #e9e9e9;
      padding-bottom: 20px;
      margin-bottom: 28px;
    }
    .report-header h1 {
      font-size: 28px;
      font-weight: 500;
      margin-bottom: 8px;
    }
    .meta {
      font-size: 14px;
      color: #7f8482;
      display: grid;
      gap: 4px;
    }
    .section-title {
      font-size: 18px;
      font-weight: 500;
      margin: 28px 0 12px;
      color: #0e2038;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 8px;
      font-size: 14px;
    }
    th, td {
      border: 1px solid #e9e9e9;
      padding: 10px 12px;
      text-align: left;
    }
    th {
      background: #f8f9fa;
      font-weight: 500;
      color: #0e2038;
    }
    tr:nth-child(even) td { background: #fafafa; }
    .badge {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 500;
    }
    .badge-pending { background: #fff3e8; color: #f74608; }
    .badge-done { background: #e8f8ef; color: #22a06b; }
    .badge-rejected { background: #fee8e8; color: #e53e3e; }
    .stock-low { color: #e53e3e; font-weight: 600; }
    .summary-box {
      background: #f8f9fa;
      border: 1px solid #e9e9e9;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 8px;
    }
    .summary-box p { font-size: 14px; color: #7f8482; margin-top: 4px; }
    @media print {
      body { padding: 16px; }
      .section-title { page-break-after: avoid; }
      table { page-break-inside: auto; }
      tr { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <header class="report-header">
    <h1>${escapeHtml(header.store.name)} — Dashboard Overview</h1>
    <p style="font-size:16px;color:#0e2038;margin-bottom:12px;">${escapeHtml(header.overviewTitle)}</p>
    <p style="font-size:14px;color:#7f8482;margin-bottom:16px;">${escapeHtml(header.overviewSubtitle)}</p>
    <div class="meta">
      <span><strong>Date Range:</strong> ${escapeHtml(dateRange.label)} (${escapeHtml(dateRange.startDate)} — ${escapeHtml(dateRange.endDate)})</span>
      <span><strong>Exported:</strong> ${escapeHtml(exportedAt)}</span>
    </div>
  </header>

  ${sectionTitle("Statistics")}
  <table>
    <thead><tr><th>Metric</th><th>Value</th><th>Trend</th></tr></thead>
    <tbody>${statsRows}</tbody>
  </table>

  ${sectionTitle("Recent Orders")}
  <table>
    <thead><tr><th>Order ID</th><th>Product</th><th>Price</th><th>Status</th></tr></thead>
    <tbody>${orderRows}</tbody>
  </table>

  ${sectionTitle("Top Products")}
  <table>
    <thead><tr><th>Category</th><th>Product</th><th>Price</th><th>Variant</th></tr></thead>
    <tbody>${topProductRows}</tbody>
  </table>

  ${sectionTitle("Low Stock Items")}
  <table>
    <thead><tr><th>Product</th><th>SKU</th><th>Price</th><th>Stock Left</th></tr></thead>
    <tbody>${lowStockRows}</tbody>
  </table>

  ${sectionTitle("This Week Sales — " + escapeHtml(weeklySales.totalAmount))}
  <div class="summary-box">
    <strong>${escapeHtml(weeklySales.title)}</strong>
    <p>${escapeHtml(weeklySales.changeLabel)}</p>
  </div>
  <table>
    <thead><tr><th>Day</th><th>Sales</th><th>Highlighted</th></tr></thead>
    <tbody>${salesRows}</tbody>
  </table>

  ${sectionTitle("Lead By Sources — " + escapeHtml(String(leadSources.totalLeads)) + " Total")}
  <table>
    <thead><tr><th>Source</th><th>Count</th><th>Share</th></tr></thead>
    <tbody>${leadRows}</tbody>
  </table>

  ${sectionTitle("Quick Actions")}
  <table>
    <thead><tr><th>Action</th><th>Description</th></tr></thead>
    <tbody>${actionRows}</tbody>
  </table>
</body>
</html>`;
}

/** HTML রিপোর্ট পেজ — নতুন ট্যাবে খোলা + ফাইল ডাউনলোড */
export function downloadOverviewReportPage(
  overview: DashboardOverviewData,
  dateRange: DateRangeOption
): void {
  const html = buildOverviewExportHtml(overview, dateRange);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  // নতুন ট্যাবে টেবিল রিপোর্ট দেখানো
  window.open(url, "_blank", "noopener,noreferrer");

  // HTML পেজ ফাইল হিসেবে ডাউনলোড
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `overview-report-${dateRange.id}.html`;
  anchor.click();

  setTimeout(() => URL.revokeObjectURL(url), 3000);
}
