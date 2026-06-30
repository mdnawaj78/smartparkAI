"use client";

import { useEffect, useMemo, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

import { useCurrentLocation } from "@/app/hooks/useCurrentLocation";
import { calculateDistance } from "@/lib/calculateDistance";

import {
  parkingSpots,
  type ParkingWithDistance,
} from "@/components/data/mock/parkingData";
import DemoRouteLine from "./DemoRouteLine";
import ParkingInfoWindow from "./ParkingInfoWindow";
import { normalizeParkingData } from "@/services/parking/availabilityService";
import { simulateParkingAvailability } from "@/services/parking/parkingSimulationService";
import {
  createDemoBooking,
  reserveParkingSlot,
  cancelParkingReservation,
  type Booking,
} from "@/services/booking/bookingService";
import ParkingList from "./ParkingList";

import AIRecommendedCard from "../parking/AIRecommendedCard";
import { getRecommendedParking } from "@/services/parking/parkingAiService";
import BookingDetailsCard from "./BookingDetailsCard";
import ParkingMarkers from "./ParkingMarkers";

export default function SmartMap() {
  const location = useCurrentLocation();

  const [liveParkingSpots, setLiveParkingSpots] = useState(parkingSpots);
  const [selectedParkingId, setSelectedParkingId] = useState<number | null>(
    null
  );
  const [routeParkingId, setRouteParkingId] = useState<number | null>(null);
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveParkingSpots((currentParkings) =>
        simulateParkingAvailability(currentParkings)
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const parkingWithDistance = useMemo<ParkingWithDistance[]>(() => {
    return normalizeParkingData(liveParkingSpots)
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
  }, [location, liveParkingSpots]);

  const recommendedParking = useMemo(() => {
    return getRecommendedParking(parkingWithDistance);
  }, [parkingWithDistance]);

  const selectedParking = useMemo(() => {
    return parkingWithDistance.find((p) => p.id === selectedParkingId) ?? null;
  }, [parkingWithDistance, selectedParkingId]);

  const routeParking = useMemo(() => {
    return parkingWithDistance.find((p) => p.id === routeParkingId) ?? null;
  }, [parkingWithDistance, routeParkingId]);

  const handleBookParking = (parking: ParkingWithDistance) => {
    if (parking.slots <= 0 || parking.status === "Full") {
      alert("Sorry, this parking is currently full.");
      return;
    }

    const booking = createDemoBooking(parking);

    setLiveParkingSpots((currentParkings) =>
      reserveParkingSlot(currentParkings, parking.id)
    );

    setLastBooking(booking);

    alert(`Booking confirmed for ${booking.parkingName}`);
  };

    const handleCancelBooking = (booking: Booking) => {
        setLiveParkingSpots((currentParkings) =>
          cancelParkingReservation(currentParkings, booking.parkingId)
        );

        setLastBooking(null);

        alert(`Booking cancelled for ${booking.parkingName}`);
      };
        return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="space-y-6">
        <AIRecommendedCard parking={recommendedParking} />

        {lastBooking && (
          <BookingDetailsCard
            booking={lastBooking}
            onCancel={() => handleCancelBooking(lastBooking)}
          />
        )}

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

           <ParkingMarkers
            parkings={parkingWithDistance}
            onSelectParking={setSelectedParkingId}
          />

            {selectedParking && (
              <ParkingInfoWindow
                parking={selectedParking}
                onClose={() => setSelectedParkingId(null)}
                onShowRoute={() => setRouteParkingId(selectedParking.id)}
                onBookParking={() => handleBookParking(selectedParking)}
              />
            )}
          </Map>
        </div>
            <ParkingList
            parkings={parkingWithDistance}
            onSelectParking={setSelectedParkingId}
            onShowRoute={setRouteParkingId}
          />
       
      </div>
    </APIProvider>
  );
}