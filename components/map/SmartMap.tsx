"use client";

import { useMemo, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { useCurrentLocation } from "@/app/hooks/useCurrentLocation";
import { calculateDistance } from "@/lib/calculateDistance";
import { parkingSpots, type ParkingWithDistance } from "./parkingData";
import DemoRouteLine from "./DemoRouteLine";
import ParkingInfoWindow from "./ParkingInfoWindow";
import AIRecommendedCard from "../parking/AIRecommendedCard";
import { getRecommendedParking } from "../parking/parkingAiService";

export default function SmartMap() {
  const location = useCurrentLocation();

  const [selectedParking, setSelectedParking] =
    useState<ParkingWithDistance | null>(null);

  const [routeParking, setRouteParking] =
    useState<ParkingWithDistance | null>(null);

  const getPinColor = (status: string) => {
    if (status === "Available") return "#22c55e";
    if (status === "Busy") return "#eab308";
    return "#ef4444";
  };

  const parkingWithDistance = useMemo<ParkingWithDistance[]>(() => {
    return parkingSpots
      .map((item) => {
        const distanceStr = location
          ? calculateDistance(location.lat, location.lng, item.lat, item.lng)
          : "Enable location";

        const distanceValue = location
          ? Number(distanceStr.replace(" km", "")) || 999999
          : 999999;

        const estimatedMinutes =
          location && distanceValue !== 999999
            ? Math.max(2, Math.round(distanceValue * 2.5))
            : null;

        return {
          ...item,
          calculatedDistance: distanceStr,
          distanceValue,
          estimatedMinutes,
        };
      })
      .sort((a, b) => a.distanceValue - b.distanceValue);
  }, [location]);

  const recommendedParking = useMemo(() => {
    return getRecommendedParking(parkingWithDistance);
  }, [parkingWithDistance]);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="space-y-6">
        <AIRecommendedCard parking={recommendedParking} />

        <div className="h-[550px] w-full overflow-hidden rounded-xl border shadow-lg">
          <Map
            mapId="smartpark-map"
            style={{ width: "100%", height: "100%" }}
            defaultZoom={12}
            defaultCenter={location || { lat: 25.2048, lng: 55.2708 }}
            gestureHandling="greedy"
          >
            <DemoRouteLine
              userLocation={location}
              parkingLocation={
                routeParking
                  ? { lat: routeParking.lat, lng: routeParking.lng }
                  : null
              }
            />

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
              <ParkingInfoWindow
                parking={selectedParking}
                onClose={() => setSelectedParking(null)}
                onShowRoute={() => setRouteParking(selectedParking)}
                onBookParking={() =>
                  alert(`Booking started for ${selectedParking.name}`)
                }
              />
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
                <p className="text-sm">Distance: {item.calculatedDistance}</p>

                <p className="text-sm">
                  Demo ETA:{" "}
                  {item.estimatedMinutes
                    ? `${item.estimatedMinutes} min`
                    : "Enable location"}
                </p>

                <p className="text-sm">AI Score: {item.aiScore}%</p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedParking(item);
                    setRouteParking(item);
                  }}
                  className="mt-4 w-full rounded bg-black py-2 text-sm text-white"
                >
                  Show Smart Route
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </APIProvider>
  );
}