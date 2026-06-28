// app/components/parking/parkingTypes.ts

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
  distanceKm: number;
  etaMinutes: number;
};

export type ParkingPrediction = {
  demandLevel: "Low" | "Medium" | "High";
  message: string;
};

export type RecommendedParking = ParkingWithDistance & {
  prediction: ParkingPrediction;
  recommendationReason: string;
};