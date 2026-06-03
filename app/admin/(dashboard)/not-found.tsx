import Link from "next/link";

export default function DashboardNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h2 className="h4 primary-text">Page not found</h2>
      <p className="body-sm-regular subtext max-w-md">
        This dashboard page does not exist or may have been moved.
      </p>
      <Link
        href="/dashboard/overview"
        className="adsfixter-primary-text body-regular hover:underline"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
