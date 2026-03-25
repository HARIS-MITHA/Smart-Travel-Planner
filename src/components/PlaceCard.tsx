import { Place } from "@/data/destinations";
import { Plus, Minus, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlaceCardProps {
  place: Place;
  isAdded?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
}
const PlaceCard = ({ place, isAdded, onAdd, onRemove }: PlaceCardProps) => {
  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-md animate-scale-in">
      <div className="relative h-40 overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          loading="lazy"
          width={640}
          height={512}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute left-2 top-2 rounded-full bg-card/90 px-2.5 py-0.5 text-xs font-medium text-foreground backdrop-blur-sm">
          {place.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-foreground">{place.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{place.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="flex items-center gap-0.5 text-sm font-medium text-primary">
            <IndianRupee className="h-3.5 w-3.5" />
            {place.estimatedCost === 0 ? "Free" : place.estimatedCost}
          </span>
          {onAdd && !isAdded && (
            <Button size="sm" onClick={onAdd} className="gap-1">
              <Plus className="h-3.5 w-3.5" /> Add
            </Button>
          )}
          {onRemove && isAdded && (
            <Button size="sm" variant="destructive" onClick={onRemove} className="gap-1">
              <Minus className="h-3.5 w-3.5" /> Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
