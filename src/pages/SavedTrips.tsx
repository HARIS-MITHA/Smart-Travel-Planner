import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SavedTrip } from "@/pages/PlanPage";
import { Bookmark, MapPin, CalendarDays, IndianRupee, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SavedTrips = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<SavedTrip[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedTrips") || "[]");
    setTrips(saved);
  }, []);

  const deleteTrip = (id: string) => {
    const updated = trips.filter((t) => t.id !== id);
    setTrips(updated);
    localStorage.setItem("savedTrips", JSON.stringify(updated));
    toast.success("Trip deleted");
  };

  return (
    <div className="container py-8 pb-20">
      <button onClick={() => navigate("/")} className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </button>

      <div className="flex items-center gap-3 mb-8">
        <Bookmark className="h-7 w-7 text-primary" />
        <h1 className="font-display text-3xl font-bold text-foreground">Saved Trips</h1>
      </div>

      {trips.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-20">
          <Bookmark className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">No saved trips yet</p>
          <p className="text-sm text-muted-foreground/70 mt-1">Plan a trip and save it to see it here.</p>
          <Button onClick={() => navigate("/")} className="mt-6">Plan a Trip</Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => {
            const totalPlaces = trip.itinerary.reduce((s, d) => s + d.length, 0);
            const totalCost = trip.itinerary.reduce(
              (s, d) => s + d.reduce((a, p) => a + p.estimatedCost, 0), 0
            );
            return (
              <div key={trip.id} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm animate-fade-in-up">
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" /> {trip.destination}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">Saved on {trip.savedAt}</p>
                    </div>
                    <button
                      onClick={() => deleteTrip(trip.id)}
                      className="rounded-full p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="rounded-lg bg-muted/50 p-2 text-center">
                      <CalendarDays className="mx-auto h-4 w-4 text-primary" />
                      <p className="mt-1 text-sm font-medium text-foreground">{trip.days} Days</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-2 text-center">
                      <MapPin className="mx-auto h-4 w-4 text-primary" />
                      <p className="mt-1 text-sm font-medium text-foreground">{totalPlaces} Places</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-2 text-center">
                      <IndianRupee className="mx-auto h-4 w-4 text-primary" />
                      <p className="mt-1 text-sm font-medium text-foreground">₹{totalCost}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-1">
                    {trip.itinerary.map((day, i) => (
                      <div key={i} className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">Day {i + 1}:</span>{" "}
                        {day.length > 0 ? day.map((p) => p.name).join(", ") : "No places"}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavedTrips;
