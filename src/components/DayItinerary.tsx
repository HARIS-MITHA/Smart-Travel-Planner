import { Place } from "@/data/destinations";
import { X, Calendar, GripVertical } from "lucide-react";

interface DayItineraryProps {
  day: number;
  places: Place[];
  onRemovePlace: (placeId: string) => void;
}

const DayItinerary = ({ day, places, onRemovePlace }: DayItineraryProps) => {
  return (
    <div className="rounded-lg border border-border bg-card p-4 animate-fade-in-up" style={{ animationDelay: `${day * 100}ms` }}>
      <div className="mb-3 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        <h3 className="font-display text-lg font-semibold text-foreground">Day {day}</h3>
        <span className="ml-auto rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {places.length} {places.length === 1 ? "place" : "places"}
        </span>
      </div>

      {places.length === 0 ? (
        <div className="rounded-md border-2 border-dashed border-border py-8 text-center">
          <p className="text-sm text-muted-foreground">
            No places added yet. Add places from the suggestions below.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {places.map((place, index) => (
            <div
              key={place.id}
              className="group flex items-center gap-3 rounded-md bg-muted/50 p-3 transition-colors hover:bg-muted"
            >
              <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/50" />
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {index + 1}
              </span>
              <img
                src={place.image}
                alt={place.name}
                loading="lazy"
                className="h-10 w-10 shrink-0 rounded-md object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{place.name}</p>
                <p className="text-xs text-muted-foreground">{place.category}</p>
              </div>
              <button
                onClick={() => onRemovePlace(place.id)}
                className="rounded-full p-1 text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DayItinerary;
