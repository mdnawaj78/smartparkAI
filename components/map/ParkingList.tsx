import type { ParkingWithDistance } from "@/components/data/mock/parkingData";

type ParkingListProps = {
  parkings: ParkingWithDistance[];
  onSelectParking: (parkingId: number) => void;
  onShowRoute: (parkingId: number) => void;
};

export default function ParkingList({
  parkings,
  onSelectParking,
  onShowRoute,
}: ParkingListProps) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">
        Nearest Parking Recommendations
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {parkings.map((parking, index) => (
          <div
            key={parking.id}
            className="cursor-pointer rounded-xl border p-5 shadow-sm transition-all hover:shadow-md"
            onClick={() => onSelectParking(parking.id)}
          >
            <p className="text-sm font-semibold text-blue-600">
              #{index + 1} Nearest
            </p>

            <h3 className="mt-2 font-bold">{parking.name}</h3>
            <p className="mt-1 text-sm">Status: {parking.status}</p>
            <p className="text-sm">Slots: {parking.slots}</p>
            <p className="text-sm">Distance: {parking.calculatedDistance}</p>

            <p className="text-sm">
              Demo ETA:{" "}
              {parking.estimatedMinutes
                ? `${parking.estimatedMinutes} min`
                : "Enable location"}
            </p>

            <p className="text-sm">AI Score: {parking.aiScore}%</p>

            <button
              onClick={(event) => {
                event.stopPropagation();
                onSelectParking(parking.id);
                onShowRoute(parking.id);
              }}
              className="mt-4 w-full rounded bg-black py-2 text-sm text-white"
            >
              Show Smart Route
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}