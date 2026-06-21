"use client";

import { useMemo, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useCurrentLocation } from "@/app/hooks/useCurrentLocation";
import { calculateDistance } from "@/lib/calculateDistance";

const parkingSpots = [
  {
    id: 1,
    name: "Dubai Marina Parking",
    lat: 25.08,
    lng: 55.14,
    status: "Available",
    slots: 120,
    aiScore: 92,
  },
  {
    id: 2,
    name: "Mall Parking",
    lat: 25.197,
    lng: 55.279,
    status: "Busy",
    slots: 15,
    aiScore: 64,
  },
  {
    id: 3,
    name: "Tower Parking",
    lat: 25.2048,
    lng: 55.2708,
    status: "Full",
    slots: 0,
    aiScore: 8,
  },
];

type ParkingSpot = (typeof parkingSpots)[0] & {
  calculatedDistance?: string;
  distanceValue?: number;
};

export default function SmartMap() {
  const location = useCurrentLocation();

  const [selectedParking, setSelectedParking] =
    useState<ParkingSpot | null>(null);

  const getPinColor = (status: string) => {
    if (status === "Available") return "#22c55e";
    if (status === "Busy") return "#eab308";
    return "#ef4444";
  };

  const parkingWithDistance = useMemo(() => {
    return parkingSpots
      .map((item) => {
        const distanceStr = location
          ? calculateDistance(location.lat, location.lng, item.lat, item.lng)
          : "Enable location";

        const distanceValue = location
          ? Number(distanceStr.replace(" km", "")) || 999999
          : 999999;

        return {
          ...item,
          calculatedDistance: distanceStr,
          distanceValue,
        };
      })
      .sort((a, b) => a.distanceValue - b.distanceValue);
  }, [location]);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="space-y-6">
        <div className="h-[550px] w-full overflow-hidden rounded-xl border shadow-lg">
          <Map
             mapId="smartpark-map"
              style={{ width: "100%", height: "100%" }}
              defaultZoom={12}
              defaultCenter={location || { lat: 25.2048, lng: 55.2708 }}
              gestureHandling="greedy"
          >
            {location && (
              <AdvancedMarker position={location}>
                <Pin
                  background="#2563eb"
                  borderColor="#1e40af"
                  glyphColor="white"
                />
              </AdvancedMarker>
            )}

            {parkingWithDistance.map((item) => (
              <AdvancedMarker
                key={item.id}
                position={{ lat: item.lat, lng: item.lng }}
                onClick={() => setSelectedParking(item)}
              >
                <Pin
                  background={getPinColor(item.status)}
                  borderColor={getPinColor(item.status)}
                  glyphColor="white"
                />
              </AdvancedMarker>
            ))}

            {selectedParking && (
              <InfoWindow
                position={{
                  lat: selectedParking.lat,
                  lng: selectedParking.lng,
                }}
                onCloseClick={() => setSelectedParking(null)}
              >
                <div className="min-w-[240px] p-1 text-sm">
                  <h3 className="mb-2 text-base font-bold">
                    {selectedParking.name}
                  </h3>

                  <p>
                    <strong>Status:</strong> {selectedParking.status}
                  </p>
                  <p>
                    <strong>Slots:</strong> {selectedParking.slots}
                  </p>
                  <p>
                    <strong>Distance:</strong>{" "}
                    {selectedParking.calculatedDistance}
                  </p>
                  <p>
                    <strong>AI Score:</strong> {selectedParking.aiScore}%
                  </p>

                  <button className="mt-4 w-full rounded bg-black py-2.5 font-medium text-white transition hover:bg-gray-800">
                    Book Parking
                  </button>
                </div>
              </InfoWindow>
            )}
          </Map>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold">
            Nearest Parking Recommendations
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {parkingWithDistance.map((item, index) => (
              <div
                key={item.id}
                className="cursor-pointer rounded-xl border p-5 shadow-sm transition-all hover:shadow-md"
                onClick={() => setSelectedParking(item)}
              >
                <p className="text-sm font-semibold text-blue-600">
                  #{index + 1} Nearest
                </p>

                <h3 className="mt-2 font-bold">{item.name}</h3>
                <p className="mt-1 text-sm">Status: {item.status}</p>
                <p className="text-sm">Slots: {item.slots}</p>
                <p className="text-sm">
                  Distance: {item.calculatedDistance}
                </p>
                <p className="text-sm">AI Score: {item.aiScore}%</p>

                <button className="mt-4 w-full rounded bg-black py-2 text-sm text-white">
                  View on Map
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </APIProvider>
  );
}