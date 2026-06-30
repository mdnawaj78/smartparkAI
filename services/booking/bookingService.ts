import type {
  ParkingSpot,
  ParkingWithDistance,
} from "@/components/map/parkingData";

export type BookingStatus = "Confirmed" | "Failed";

export type Booking = {
  id: string;
  parkingId: number;
  parkingName: string;
  status: BookingStatus;
  createdAt: string;
};

export function createDemoBooking(parking: ParkingWithDistance): Booking {
  return {
    id: `BK-${Date.now()}`,
    parkingId: parking.id,
    parkingName: parking.name,
    status: "Confirmed",
    createdAt: new Date().toISOString(),
  };
}

export function reserveParkingSlot(
  parkingSpots: ParkingSpot[],
  parkingId: number
): ParkingSpot[] {
  return parkingSpots.map((parking) => {
    if (parking.id !== parkingId) return parking;

    if (parking.availableSlots <= 0) return parking;

    return {
      ...parking,
      availableSlots: parking.availableSlots - 1,
      reservedSlots: parking.reservedSlots + 1,
      lastUpdated: new Date().toISOString(),
    };
  });
}

export function cancelParkingReservation(
  parkingSpots: ParkingSpot[],
  parkingId: number
): ParkingSpot[] {
  return parkingSpots.map((parking) => {
    if (parking.id !== parkingId) return parking;

    if (parking.reservedSlots <= 0) return parking;

    return {
      ...parking,
      availableSlots: parking.availableSlots + 1,
      reservedSlots: parking.reservedSlots - 1,
      lastUpdated: new Date().toISOString(),
    };
  });
}