import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import type { ParkingWithDistance } from "@/components/data/mock/parkingData";

type ParkingMarkersProps = {
  parkings: ParkingWithDistance[];
  onSelectParking: (parkingId: number) => void;
};

function getPinColor(status: string) {
  if (status === "Available") return "#22c55e";
  if (status === "Busy") return "#eab308";
  return "#ef4444";
}

export default function ParkingMarkers({
  parkings,
  onSelectParking,
}: ParkingMarkersProps) {
  return (
    <>
      {parkings.map((parking) => (
        <AdvancedMarker
          key={parking.id}
          position={{ lat: parking.lat, lng: parking.lng }}
          onClick={() => onSelectParking(parking.id)}
        >
          <Pin
            background={getPinColor(parking.status)}
            borderColor={getPinColor(parking.status)}
            glyphColor="white"
          />
        </AdvancedMarker>
      ))}
    </>
  );
}