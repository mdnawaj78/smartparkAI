"use client";

import { InfoWindow } from "@vis.gl/react-google-maps";
import type { ParkingSpot } from "./parkingData";

type ParkingWithDistance = ParkingSpot & {
  calculatedDistance?: string;
  estimatedMinutes?: number | null;
};

type ParkingInfoWindowProps = {
  parking: ParkingWithDistance;
  onClose: () => void;
  onShowRoute: () => void;
  onBookParking: () => void;
};

export default function ParkingInfoWindow({
  parking,
  onClose,
  onShowRoute,
  onBookParking,
}: ParkingInfoWindowProps) {
  return (
    <InfoWindow
      position={{ lat: parking.lat, lng: parking.lng }}
      onCloseClick={onClose}
    >
      <div className="min-w-[240px] p-1 text-sm">
        <h3 className="mb-2 text-base font-bold">{parking.name}</h3>

        <p>
          <strong>Status:</strong> {parking.status}
        </p>
        <p>
          <strong>Slots:</strong> {parking.slots}
        </p>
        <p>
          <strong>Direct Distance:</strong>{" "}
          {parking.calculatedDistance ?? "Enable location"}
        </p>
        <p>
          <strong>Demo ETA:</strong>{" "}
          {parking.estimatedMinutes
            ? `${parking.estimatedMinutes} min`
            : "Enable location"}
        </p>
        <p>
          <strong>AI Score:</strong> {parking.aiScore}%
        </p>

        <button
          onClick={onBookParking}
          className="mt-4 w-full rounded bg-black py-2.5 font-medium text-white transition hover:bg-gray-800"
        >
          Book Parking
        </button>

        <button
          onClick={onShowRoute}
          className="mt-3 w-full rounded bg-black py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          Show Smart Route
        </button>
      </div>
    </InfoWindow>
  );
}