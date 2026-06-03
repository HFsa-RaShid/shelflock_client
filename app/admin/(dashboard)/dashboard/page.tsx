import { redirect } from "next/navigation";

/** /dashboard → overview page */
export default function DashboardPage() {
  redirect("/admin/dashboard/overview");
}
