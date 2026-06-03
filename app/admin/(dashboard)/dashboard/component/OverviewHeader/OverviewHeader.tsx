"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Calendar, ChevronDown, Download } from "lucide-react";
import type {
  DateRangeOption,
  OverviewHeaderProps,
} from "./OverviewHeader.type";
import { downloadOverviewReportPage } from "./buildOverviewExportPage";

// Figma বাটন বর্ডার রেডিয়াস — 8px 6px 8px 8px
const FIGMA_BTN_RADIUS =
  "rounded-tl-[8px] rounded-tr-[6px] rounded-br-[8px] rounded-bl-[8px]";

export default function OverviewHeader({
  data,
  overviewData,
}: OverviewHeaderProps) {
  // props destructuring
  const { store } = data;
  const { name: storeName, initial: storeInitial, dateRanges } = store;

  // ডিফল্ট তারিখ রেঞ্জ
  const defaultRange =
    dateRanges.find((r) => r.label === store.dateRangeLabel) ?? dateRanges[0];

  const [selectedRange, setSelectedRange] =
    useState<DateRangeOption>(defaultRange);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const dateMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dateMenuRef.current &&
        !dateMenuRef.current.contains(event.target as Node)
      ) {
        setIsDateOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectRange = useCallback((range: DateRangeOption) => {
    setSelectedRange(range);
    setIsDateOpen(false);
  }, []);

  const handleExport = useCallback(async () => {
    setIsExporting(true);
    try {
      downloadOverviewReportPage(overviewData, selectedRange);
    } finally {
      setIsExporting(false);
    }
  }, [overviewData, selectedRange]);

  return (
    <section className="mb-6 w-full">
      {/* হেডার রো — h6-medium = 24px store name, body-sm-medium = 14px বাটন টেক্সট */}
      <div className="w-full min-h-[76px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pt-6 pr-4 pb-4 pl-4 opacity-80">
        {/* স্টোর লোগো + নাম */}
        <div className="flex items-center gap-3 min-w-0 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center shrink-0">
            <span className="body-sm-medium leading-none">{storeInitial}</span>
          </div>
          <h2 className="h6-medium primary-text truncate">{storeName}</h2>
        </div>

        {/* তারিখ + এক্সপোর্ট */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
          <div className="relative" ref={dateMenuRef}>
            <button
              type="button"
              onClick={() => setIsDateOpen((prev) => !prev)}
              className={`flex items-center justify-center gap-2 w-[185px] h-9 py-2 px-4 bg-white border border-[#E9E9E9] ${FIGMA_BTN_RADIUS} hover:bg-gray-50 transition-colors`}
              aria-expanded={isDateOpen}
              aria-haspopup="listbox"
            >
              <Calendar className="w-4 h-4 shrink-0 primary-text" />
              <span className="flex-1 body-sm-medium primary-text truncate text-center">
                {selectedRange.label}
              </span>
              <ChevronDown
                className={`w-4 h-4 shrink-0 primary-text transition-transform ${isDateOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDateOpen && (
              <ul
                role="listbox"
                className="absolute right-0 top-[calc(100%+6px)] z-20 min-w-[185px] bg-white border border-[#E9E9E9] shadow-lg py-1 rounded-lg"
              >
                {dateRanges.map((range) => (
                  <li key={range.id} role="option">
                    <button
                      type="button"
                      onClick={() => handleSelectRange(range)}
                      className={`w-full text-left px-4 py-2.5 body-sm-medium hover:bg-gray-50 transition-colors ${
                        selectedRange.id === range.id
                          ? "bg-[#FFF3E8] adsfixter-primary-text"
                          : "primary-text"
                      }`}
                    >
                      {range.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            onClick={handleExport}
            disabled={isExporting}
            className={`flex items-center justify-center gap-2 w-[98px] h-9 py-2 px-4 bg-white border border-[#E9E9E9] ${FIGMA_BTN_RADIUS} hover:bg-gray-50 transition-colors disabled:opacity-60`}
          >
            <Download className="w-4 h-4 shrink-0 primary-text" />
            <span className="body-sm-medium primary-text">
              {isExporting ? "..." : "Export"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
