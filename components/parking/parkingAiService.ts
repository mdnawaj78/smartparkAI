import type { ParkingWithDistance } from "./parkingData";

export type ParkingPrediction = {
  demandLevel: "Low" | "Medium" | "High";
  message: string;
};

export type RecommendedParking = ParkingWithDistance & {
  prediction: ParkingPrediction;
  recommendationReason: string;
};

export function predictParkingDemand(
  parking: ParkingWithDistance
): ParkingPrediction {
  if (parking.status === "Full" || parking.slots === 0) {
    return {
      demandLevel: "High",
      message: "This parking is currently full and demand is high.",
    };
  }

  if (parking.status === "Busy" || parking.slots < 25) {
    return {
      demandLevel: "Medium",
      message: "This parking may fill soon. Consider arriving quickly.",
    };
  }

  return {
    demandLevel: "Low",
    message: "Good availability expected for now.",
  };
}

export function getRecommendedParking(
  parkings: ParkingWithDistance[]
): RecommendedParking | null {
  const availableParkings = parkings.filter(
    (parking) => parking.status !== "Full" && parking.slots > 0
  );

  if (availableParkings.length === 0) return null;

  const sorted = [...availableParkings].sort((a, b) => {
    const scoreA =
      a.aiScore * 0.5 +
      a.slots * 0.3 -
      a.distanceValue * 10 -
      (a.estimatedMinutes ?? 999) * 0.5;

    const scoreB =
      b.aiScore * 0.5 +
      b.slots * 0.3 -
      b.distanceValue * 10 -
      (b.estimatedMinutes ?? 999) * 0.5;

    return scoreB - scoreA;
  });

  const bestParking = sorted[0];

  return {
    ...bestParking,
    prediction: predictParkingDemand(bestParking),
    recommendationReason:
      "Recommended based on availability, distance, ETA, slots, and AI score.",
  };
}