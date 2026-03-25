import { Place } from "@/data/destinations";
import { MapPin, IndianRupee, CalendarDays, CheckCircle2 } from "lucide-react";

interface TripSummaryProps {
  destination: string;
  days: number;
  budget: number;
  itinerary: Place[][];
}
const TripSummary = ({ destination, days, budget, itinerary }: TripSummaryProps) => {
  const totalPlaces = itinerary.reduce((sum, day) => sum + day.length, 0);
  const totalCost = itinerary.reduce(
    (sum, day) => sum + day.reduce((s, p) => s + p.estimatedCost, 0),
    0
  );
  const isWithinBudget = totalCost <= budget;

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="font-display text-xl font-bold text-foreground">Trip Summary</h3>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
          <MapPin className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Destination</p>
            <p className="font-medium text-foreground">{destination}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
          <CalendarDays className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Duration</p>
            <p className="font-medium text-foreground">{days} Days</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Total Places</p>
            <p className="font-medium text-foreground">{totalPlaces}</p>
          </div>
        </div>
        <div className={`flex items-center gap-3 rounded-lg p-3 ${isWithinBudget ? "bg-primary/10" : "bg-destructive/10"}`}>
          <IndianRupee className={`h-5 w-5 ${isWithinBudget ? "text-primary" : "text-destructive"}`} />
          <div>
            <p className="text-xs text-muted-foreground">Estimated Cost</p>
            <p className={`font-medium ${isWithinBudget ? "text-primary" : "text-destructive"}`}>
              ₹{totalCost.toLocaleString()} / ₹{budget.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripSummary;
