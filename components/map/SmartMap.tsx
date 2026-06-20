"use client";

import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const parking = [
  {
    id: 1,
    name: "Dubai Marina Parking",
    lat: 25.08,
    lng: 55.14,
    status: "Available",
    slots: 120,
    distance: "1.2 km",
    aiScore: 92,
  },
  {
    id: 2,
    name: "Mall Parking",
    lat: 25.197,
    lng: 55.279,
    status: "Busy",
    slots: 15,
    distance: "2.5 km",
    aiScore: 64,
  },
  {
    id: 3,
    name: "Tower Parking",
    lat: 25.2048,
    lng: 55.2708,
    status: "Full",
    slots: 0,
    distance: "800 m",
    aiScore: 8,
  },
];

export default function SmartMap() {
  const [selectedParking, setSelectedParking] = useState<
    null | (typeof parking)[0]
  >(null);

  const getColor = (status: string) => {
    if (status === "Available") return "#22c55e";
    if (status === "Busy") return "#eab308";
    return "#ef4444";
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="w-full h-full min-h-[550px]">
        <Map
          mapId="smartpark-map"
          style={{ width: "100%", height: "100%" }}
          defaultZoom={12}
          defaultCenter={{ lat: 25.2048, lng: 55.2708 }}
          gestureHandling="greedy"
        >
          {parking.map((item) => (
            <AdvancedMarker
              key={item.id}
              position={{ lat: item.lat, lng: item.lng }}
              title={item.name}
              onClick={() => setSelectedParking(item)}
            >
              <Pin
                background={getColor(item.status)}
                borderColor={getColor(item.status)}
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
              <div className="space-y-2 p-2 text-sm">
                <h3 className="font-bold text-base">
                  {selectedParking.name}
                </h3>

                <p>Status: {selectedParking.status}</p>
                <p>Available Slots: {selectedParking.slots}</p>
                <p>Distance: {selectedParking.distance}</p>
                <p>AI Score: {selectedParking.aiScore}%</p>

                <button className="mt-2 rounded bg-black px-3 py-2 text-white">
                  Book Parking
                </button>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}