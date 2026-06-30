export type ParkingStatus = "Available" | "Busy" | "Full";

export type ParkingSpot = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  totalSlots: number;
  availableSlots: number;
  occupiedSlots: number;
  reservedSlots: number;
  aiScore: number;
  lastUpdated: string;
};

export type ParkingViewData = ParkingSpot & {
  status: ParkingStatus;
  slots: number;
};

export type ParkingWithDistance = ParkingViewData & {
  calculatedDistance: string;
  distanceValue: number;
  estimatedMinutes: number | null;
};

export const parkingSpots: ParkingSpot[] = [
  {
    id: 1,
    name: "Dubai Marina Parking",
    lat: 25.08,
    lng: 55.14,
    totalSlots: 150,
    availableSlots: 120,
    occupiedSlots: 25,
    reservedSlots: 5,
    aiScore: 92,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Mall Parking",
    lat: 25.197,
    lng: 55.279,
    totalSlots: 100,
    availableSlots: 15,
    occupiedSlots: 78,
    reservedSlots: 7,
    aiScore: 64,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Tower Parking",
    lat: 25.2048,
    lng: 55.2708,
    totalSlots: 80,
    availableSlots: 0,
    occupiedSlots: 80,
    reservedSlots: 0,
    aiScore: 8,
    lastUpdated: new Date().toISOString(),
  },
];