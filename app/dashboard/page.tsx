import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SmartMap from "@/components/map/SmartMap";
import ParkingCard from "@/app/dashboard/ParkingCard"

const parkingData = [
  {
    name: "Dubai Marina Parking",
    distance: "1.2 km",
    slots: 120,
    status: "Available" as const,
    aiScore: 92,
  },
  {
    name: "Mall Parking",
    distance: "2.5 km",
    slots: 15,
    status: "Busy" as const,
    aiScore: 64,
  },
  {
    name: "Tower Parking",
    distance: "800 m",
    slots: 0,
    status: "Full" as const,
    aiScore: 8,
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">
        AI Smart Parking Dashboard
      </h1>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Parking List */}
        <div className="lg:col-span-3 space-y-4">
          <h2 className="font-semibold text-xl">Nearby Parking</h2>

          {parkingData.map((parking) => (
  <ParkingCard key={parking.name} {...parking} />
))}
        </div>

        {/* Map - FIXED */}
        <Card className="lg:col-span-6">
          <CardContent className="p-3">
            <SmartMap />
          </CardContent>
        </Card>

        {/* AI Panel */}
        <Card className="lg:col-span-3">
  <CardContent className="p-6">
    <h2 className="text-xl font-bold">AI Recommendation</h2>

    <p className="mt-4 text-sm text-muted-foreground">Best Parking Choice</p>

    <h3 className="text-2xl font-bold mt-2">
      Dubai Marina Parking
    </h3>

    <div className="mt-5 space-y-3">
      <p>Availability Score: <b>92%</b></p>
      <p>Distance: <b>1.2 km</b></p>
      <p>Expected Occupancy: <b>82%</b></p>
      <p>Best Arrival Time: <b>7:30 PM</b></p>
    </div>

    <Button className="mt-6 w-full">
      Navigate To Best Parking
    </Button>
  </CardContent>
</Card>
      </div>
    </div>
  );
}