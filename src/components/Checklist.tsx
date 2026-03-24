import { useState } from "react";
import { CheckSquare, Square, ListChecks } from "lucide-react";

interface ChecklistProps {
  items: string[];
}

const Checklist = ({ items }: ChecklistProps) => {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <ListChecks className="h-5 w-5 text-primary" />
        <h3 className="font-display text-xl font-bold text-foreground">Packing Checklist</h3>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-muted/50"
          >
            {checked.has(i) ? (
              <CheckSquare className="h-4 w-4 shrink-0 text-primary" />
            ) : (
              <Square className="h-4 w-4 shrink-0 text-muted-foreground" />
            )}
            <span className={`text-sm ${checked.has(i) ? "text-muted-foreground line-through" : "text-foreground"}`}>
              {item}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {checked.size}/{items.length} packed
      </p>
    </div>
  );
};

export default Checklist;
