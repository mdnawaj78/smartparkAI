import type { ParkingSpot } from "@/components/data/mock/parkingData";

function getRandomChange() {
  return Math.floor(Math.random() * 7) - 3;
}

export function simulateParkingAvailability(
  parkingSpots: ParkingSpot[]
): ParkingSpot[] {
  return parkingSpots.map((parking) => {
    const change = getRandomChange();

    const newAvailableSlots = Math.max(
      0,
      Math.min(parking.totalSlots, parking.availableSlots + change)
    );

    const newOccupiedSlots = parking.totalSlots - newAvailableSlots - parking.reservedSlots;

    return {
      ...parking,
      availableSlots: newAvailableSlots,
      occupiedSlots: Math.max(0, newOccupiedSlots),
      lastUpdated: new Date().toISOString(),
    };
  });
}