import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ParkingCardProps = {
  name: string;
  distance: string;
  slots: number;
  status: "Available" | "Busy" | "Full";
  aiScore: number;
};

export default function ParkingCard({
  name,
  distance,
  slots,
  status,
  aiScore,
}: ParkingCardProps) {
  const statusStyle =
    status === "Available"
      ? "bg-green-100 text-green-700"
      : status === "Busy"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <Card>
      <CardContent className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">{name}</h3>
          <Badge className={statusStyle}>{status}</Badge>
        </div>

        <p className="text-sm text-muted-foreground">Distance: {distance}</p>

        <p>Available Slots: {slots}</p>

        <p className="text-sm">
          AI Availability Score:{" "}
          <span className="font-bold">{aiScore}%</span>
        </p>

        <Button className="w-full" disabled={status === "Full"}>
          {status === "Full" ? "Not Available" : "Book Parking"}
        </Button>
      </CardContent>
    </Card>
  );
}