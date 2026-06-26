// src/components/map/DemoRouteLine.tsx

"use client";

import { Polyline } from "@vis.gl/react-google-maps";

type DemoRouteLineProps = {
  userLocation: google.maps.LatLngLiteral | null;
  parkingLocation: google.maps.LatLngLiteral | null;
};

export default function DemoRouteLine({
  userLocation,
  parkingLocation,
}: DemoRouteLineProps) {
  if (!userLocation || !parkingLocation) return null;

  return (
    <Polyline
      path={[userLocation, parkingLocation]}
      strokeColor="#2563eb"
      strokeOpacity={0.9}
      strokeWeight={4}
    />
  );
}