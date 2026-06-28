// app/components/parking/AIRecommendedCard.tsx


import type { RecommendedParking } from "./parkingAiService";

type AIRecommendedCardProps = {
  parking: RecommendedParking | null;
};

export default function AIRecommendedCard({
  parking,
}: AIRecommendedCardProps) {
  if (!parking) {
    return (
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold">AI Recommended Parking</h2>
        <p className="mt-2 text-sm text-gray-500">
          No suitable parking available right now.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">AI Recommended Parking</h2>
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          Best Match
        </span>
      </div>

      <div className="mt-3">
        <h3 className="font-semibold">{parking.name}</h3>

        <p className="mt-1 text-sm text-gray-600">
          {parking.recommendationReason}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500">Distance</p>
          <p className="font-medium">{parking.distanceValue.toFixed(2)} km</p>
        </div>

        <div>
          <p className="text-gray-500">ETA</p>
          <p className="font-medium">{parking.estimatedMinutes} min</p>
        </div>

        <div>
          <p className="text-gray-500">Slots</p>
          <p className="font-medium">{parking.slots}</p>
        </div>

        <div>
          <p className="text-gray-500">AI Score</p>
          <p className="font-medium">{parking.aiScore}%</p>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-gray-50 p-3">
        <p className="text-sm font-medium">
          Demand: {parking.prediction.demandLevel}
        </p>
        <p className="mt-1 text-sm text-gray-600">
          {parking.prediction.message}
        </p>
      </div>
    </div>
  );
}