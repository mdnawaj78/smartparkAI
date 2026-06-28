export type ParkingStatus = "Available" | "Busy" | "Full";

export type ParkingSpot = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: ParkingStatus;
  slots: number;
  aiScore: number;
};

export type ParkingWithDistance = ParkingSpot & {
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