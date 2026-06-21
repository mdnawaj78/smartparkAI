"use client";

import { useEffect, useState } from "react";

export function useCurrentLocation() {
  const [location, setLocation] = useState({
    lat: 25.2048,
    lng: 55.2708,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        console.log("Location access denied");
      }
    );
  }, []);

  return location;
}