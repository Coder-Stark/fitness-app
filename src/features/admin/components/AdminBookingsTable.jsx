import AdminBookingRow from "./AdminBookingRow";

const COLUMNS = ["When", "Customer", "Trainer", "Zone", "Status", "Price", "Payment", ""];

export default function AdminBookingsTable({ bookings }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full min-w-4xl text-left text-sm">
        <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            {COLUMNS.map((column) => (
              <th key={column || "actions"} className="px-4 py-2 font-medium">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <AdminBookingRow key={booking.id} booking={booking} />
          ))}
        </tbody>
      </table>
    </div>
  );
}