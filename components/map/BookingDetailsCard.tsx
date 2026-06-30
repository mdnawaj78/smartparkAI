import type { Booking } from "@/services/booking/bookingService";


type BookingDetailsCardProps = {
  booking: Booking;
  onCancel: () => void;
};

export default function BookingDetailsCard({
  booking,
  onCancel,
}: BookingDetailsCardProps) {
  return (
    <div className="rounded-xl border border-green-200 bg-green-50 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-green-700">Booking Confirmed</p>

          <p className="mt-1 text-sm text-green-700">
            {booking.parkingName}
          </p>

          <p className="mt-1 text-xs text-green-600">
            Booking ID: {booking.id}
          </p>

          <p className="mt-1 text-xs text-green-600">
            Status: {booking.status}
          </p>
        </div>

        <button
          onClick={onCancel}
          className="rounded bg-white px-3 py-1 text-xs font-medium text-red-600 shadow-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}