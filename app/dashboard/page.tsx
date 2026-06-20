import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SmartMap from "@/components/map/SmartMap";

const parkingData = [
  {
    name: "Dubai Marina Parking",
    distance: "1.2 km",
    slots: 120,
    status: "Available",
  },
  {
    name: "Mall Parking",
    distance: "2.5 km",
    slots: 15,
    status: "Busy",
  },
  {
    name: "Tower Parking",
    distance: "800 m",
    slots: 0,
    status: "Full",
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
            <Card key={parking.name}>
              <CardContent className="p-5">
                <h3 className="font-bold">{parking.name}</h3>

                <p className="text-sm text-muted-foreground mt-1">
                  Distance: {parking.distance}
                </p>

                <p className="mt-3">
                  Available Slots: <span className="font-semibold">{parking.slots}</span>
                </p>

                <Badge className="mt-3" variant={parking.status === "Available" ? "default" : "secondary"}>
                  {parking.status}
                </Badge>

                <Button className="mt-4 w-full">Book Parking</Button>
              </CardContent>
            </Card>
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
            <h2 className="text-xl font-bold">AI Prediction</h2>

            <div className="mt-6">
              <p className="text-muted-foreground">Expected Occupancy</p>
              <h3 className="text-5xl font-bold mt-2">82%</h3>
            </div>

            <p className="mt-6 text-muted-foreground">
              Best arrival time: <span className="font-medium text-foreground">7:30 PM</span>
            </p>

            <Button className="mt-8 w-full">Get AI Recommendation</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}