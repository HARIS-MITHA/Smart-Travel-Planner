import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, CalendarDays, IndianRupee, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { destinations } from "@/data/destinations";
import heroImg from "@/assets/hero-travel.jpg";
const Index = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(2);
  const [budget, setBudget] = useState(5000);

  const handleGenerate = () => {
    if (!destination) return;
    navigate(`/plan?dest=${destination}&days=${days}&budget=${budget}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="Travel landscape"
          width={1920}
          height={800}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-background" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
           <h1 className="font-display text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl animate-fade-in-up">
            Tamil Nadu Explorer
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
            Explore 20 stunning destinations across Tamil Nadu — from ancient temples to misty hill stations.
          </p>
        </div>
      </section>

      {/* Planner Form */}
      <section className="container -mt-16 relative z-20 pb-20">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">Start Planning</h2>
          <div className="space-y-5">
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-foreground">
                <MapPin className="h-4 w-4 text-primary" /> Destination
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-ring focus:ring-2"
              >
                <option value="">Select a destination</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-foreground">
                  <CalendarDays className="h-4 w-4 text-primary" /> Number of Days
                </label>
                <input
                  type="number"
                  min={1}
                  max={7}
                  value={days}
                  onChange={(e) => setDays(Math.max(1, Math.min(7, Number(e.target.value))))}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-ring focus:ring-2"
                />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-foreground">
                  <IndianRupee className="h-4 w-4 text-primary" /> Budget (₹)
                </label>
                <input
                  type="number"
                  min={1000}
                  step={500}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-ring focus:ring-2"
                />
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!destination}
              size="lg"
              className="w-full gap-2 text-base"
            >
              <Sparkles className="h-5 w-5" /> Generate Plan
            </Button>
          </div>
        </div>

        {/* Destination Cards */}
        <div className="mx-auto mt-16 max-w-5xl">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">Popular Destinations ({destinations.length})</h2>
          <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {destinations.map((d) => (
              <button
                key={d.id}
                onClick={() => setDestination(d.id)}
                className={`group overflow-hidden rounded-xl border text-left transition-all hover:shadow-lg ${
                  destination === d.id ? "border-primary ring-2 ring-primary" : "border-border"
                }`}
              >
                <div className="relative h-32 overflow-hidden">
                  <img src={d.image} alt={d.name} loading="lazy" width={640} height={480} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <h3 className="absolute bottom-2 left-2 font-display text-base font-bold text-primary-foreground">{d.name}</h3>
                </div>
                <div className="bg-card p-2">
                  <p className="text-xs text-muted-foreground line-clamp-2">{d.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
