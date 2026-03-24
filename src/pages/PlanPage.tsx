import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { destinations, Place } from "@/data/destinations";
import PlaceCard from "@/components/PlaceCard";
import DayItinerary from "@/components/DayItinerary";
import TripSummary from "@/components/TripSummary";
import Checklist from "@/components/Checklist";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export interface SavedTrip {
  id: string;
  destination: string;
  days: number;
  budget: number;
  itinerary: Place[][];
  savedAt: string;
}

const PlanPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const destId = searchParams.get("dest") || "";
  const days = Number(searchParams.get("days")) || 2;
  const budget = Number(searchParams.get("budget")) || 5000;

  const dest = destinations.find((d) => d.id === destId);

  const [itinerary, setItinerary] = useState<Place[][]>(() =>
    Array.from({ length: days }, () => [])
  );
  const [activeDay, setActiveDay] = useState(0);

  const addedPlaceIds = useMemo(() => {
    const set = new Set<string>();
    itinerary.forEach((day) => day.forEach((p) => set.add(p.id)));
    return set;
  }, [itinerary]);

  if (!dest) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Destination not found.</p>
        <Button onClick={() => navigate("/")} className="mt-4">Go Home</Button>
      </div>
    );
  }

  const addPlace = (place: Place) => {
    setItinerary((prev) => {
      const next = [...prev];
      next[activeDay] = [...next[activeDay], place];
      return next;
    });
    toast.success(`${place.name} added to Day ${activeDay + 1}`);
  };

  const removePlace = (dayIndex: number, placeId: string) => {
    setItinerary((prev) => {
      const next = [...prev];
      next[dayIndex] = next[dayIndex].filter((p) => p.id !== placeId);
      return next;
    });
  };

  const saveTrip = () => {
    const trip: SavedTrip = {
      id: Date.now().toString(),
      destination: dest.name,
      days,
      budget,
      itinerary,
      savedAt: new Date().toLocaleDateString(),
    };
    const existing = JSON.parse(localStorage.getItem("savedTrips") || "[]");
    localStorage.setItem("savedTrips", JSON.stringify([trip, ...existing]));
    toast.success("Trip saved successfully!");
  };

  return (
    <div className="container py-8 pb-20">
      <button onClick={() => navigate("/")} className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </button>

      {/* Header */}
      <div className="relative mb-8 overflow-hidden rounded-2xl">
        <img src={dest.image} alt={dest.name} className="h-48 w-full object-cover sm:h-56" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <div className="absolute bottom-4 left-6">
          <h1 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl">{dest.name}</h1>
          <p className="mt-1 text-sm text-primary-foreground/80">{dest.description}</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: Itinerary Builder */}
        <div className="lg:col-span-2 space-y-6">
          {/* Day Tabs */}
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: days }, (_, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeDay === i
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                Day {i + 1}
                {itinerary[i].length > 0 && (
                  <span className="ml-1.5 rounded-full bg-primary-foreground/20 px-1.5 py-0.5 text-xs">
                    {itinerary[i].length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Current Day Itinerary */}
          <DayItinerary
            day={activeDay + 1}
            places={itinerary[activeDay]}
            onRemovePlace={(id) => removePlace(activeDay, id)}
          />

          {/* Place Suggestions */}
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Suggested Places for {dest.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {dest.places.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  isAdded={addedPlaceIds.has(place.id)}
                  onAdd={() => addPlace(place)}
                  onRemove={() => {
                    // find which day has this place and remove
                    itinerary.forEach((day, di) => {
                      if (day.some((p) => p.id === place.id)) {
                        removePlace(di, place.id);
                      }
                    });
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Summary + Checklist + Save */}
        <div className="space-y-6">
          <TripSummary
            destination={dest.name}
            days={days}
            budget={budget}
            itinerary={itinerary}
          />

          <Checklist items={dest.checklist} />

          <Button onClick={saveTrip} size="lg" className="w-full gap-2">
            <Save className="h-5 w-5" /> Save Trip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
