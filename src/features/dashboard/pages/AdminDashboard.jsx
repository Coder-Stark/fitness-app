import { useState } from "react";
import Button from "../../../shared/components/ui/Button";
import Spinner from "../../../shared/components/ui/Spinner";
import AdminBookingsTable from "../../admin/components/AdminBookingsTable";
import AdminFilters from "../../admin/components/AdminFilters";
import AdminSummary from "../../admin/components/AdminSummary";
import { useAdminBookings } from "../../admin/hooks/useAdminBookings";
import { useAdminSummary } from "../../admin/hooks/useAdminSummary";
import { useAuth } from "../../auth/hooks/useAuth";

const INITIAL_FILTERS = { phase: "", from: "", to: "" };

export default function AdminDashboard() {
  const { user } = useAuth();
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [page, setPage] = useState(1);

  const { data: summary, error: summaryError } = useAdminSummary();
  const { data, loading, error } = useAdminBookings({ ...filters, page });

  function handleFiltersChange(nextFilters) {
    setFilters(nextFilters);
    setPage(1);
  }

  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold">Admin: {user.name}</h1>
        <p className="text-xs text-gray-500">Updates automatically</p>
      </div>

      {summaryError && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {summaryError}
        </p>
      )}
      {summary && <AdminSummary summary={summary} />}

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Bookings</h2>
        <AdminFilters filters={filters} onChange={handleFiltersChange} />

        {error && (
          <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        {loading && <Spinner />}

        {data && data.bookings.length === 0 && (
          <p className="rounded-md border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
            No bookings match these filters.
          </p>
        )}

        {data && data.bookings.length > 0 && <AdminBookingsTable bookings={data.bookings} />}

        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between text-sm">
            <Button
              variant="secondary"
              disabled={pagination.page <= 1}
              onClick={() => setPage((current) => current - 1)}
            >
              Previous
            </Button>
            <span className="text-gray-500">
              Page {pagination.page} of {pagination.totalPages} · {pagination.total} bookings
            </span>
            <Button
              variant="secondary"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}