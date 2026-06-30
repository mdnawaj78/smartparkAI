import type {
  ParkingSpot,
  ParkingStatus,
  ParkingViewData,
} from "@/components/map/parkingData";

export function getParkingStatus(parking: ParkingSpot): ParkingStatus {
  if (parking.availableSlots <= 0) {
    return "Full";
  }

  const availabilityPercentage =
    (parking.availableSlots / parking.totalSlots) * 100;

  if (availabilityPercentage <= 25) {
    return "Busy";
  }

  return "Available";
}

export function normalizeParkingData(
  parkingSpots: ParkingSpot[]
): ParkingViewData[] {
  return parkingSpots.map((parking) => ({
    ...parking,
    status: getParkingStatus(parking),
    slots: parking.availableSlots,
  }));
}