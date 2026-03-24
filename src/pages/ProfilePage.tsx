import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, MapPin, Bookmark, CalendarDays, Edit2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SavedTrip } from "@/pages/PlanPage";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(() => localStorage.getItem("profileName") || "Traveller");
  const [email, setEmail] = useState(() => localStorage.getItem("profileEmail") || "explorer@tamilnadu.travel");
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [trips, setTrips] = useState<SavedTrip[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedTrips") || "[]");
    setTrips(saved);
  }, []);

  const saveName = () => {
    localStorage.setItem("profileName", name);
    setEditingName(false);
  };
  const saveEmail = () => {
    localStorage.setItem("profileEmail", email);
    setEditingEmail(false);
  };

  const totalPlaces = trips.reduce(
    (s, t) => s + t.itinerary.reduce((a, d) => a + d.length, 0),
    0
  );

  return (
    <div className="container py-8 pb-20">
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">My Profile</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <User className="h-12 w-12 text-primary" />
          </div>

          {/* Name */}
          <div className="mb-2 flex items-center justify-center gap-2">
            {editingName ? (
              <>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-40 rounded-lg border border-input bg-background px-3 py-1 text-center text-sm text-foreground outline-none ring-ring focus:ring-2"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && saveName()}
                />
                <button onClick={saveName} className="text-primary"><Check className="h-4 w-4" /></button>
              </>
            ) : (
              <>
                <span className="font-display text-xl font-bold text-foreground">{name}</span>
                <button onClick={() => setEditingName(true)} className="text-muted-foreground hover:text-foreground"><Edit2 className="h-4 w-4" /></button>
              </>
            )}
          </div>

          {/* Email */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            {editingEmail ? (
              <>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-52 rounded-lg border border-input bg-background px-3 py-1 text-center text-sm text-foreground outline-none ring-ring focus:ring-2"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && saveEmail()}
                />
                <button onClick={saveEmail} className="text-primary"><Check className="h-4 w-4" /></button>
              </>
            ) : (
              <>
                <span>{email}</span>
                <button onClick={() => setEditingEmail(true)} className="text-muted-foreground hover:text-foreground"><Edit2 className="h-3 w-3" /></button>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-muted/50 p-3 text-center">
              <Bookmark className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-lg font-bold text-foreground">{trips.length}</p>
              <p className="text-xs text-muted-foreground">Saved Trips</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3 text-center">
              <MapPin className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-lg font-bold text-foreground">{totalPlaces}</p>
              <p className="text-xs text-muted-foreground">Total Places</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3 text-center">
              <CalendarDays className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-lg font-bold text-foreground">
                {trips.reduce((s, t) => s + t.days, 0)}
              </p>
              <p className="text-xs text-muted-foreground">Total Days</p>
            </div>
          </div>
        </div>

        {/* Recent Trips */}
        <div className="lg:col-span-2">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Recently Planned Trips</h2>
          {trips.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-16">
              <Bookmark className="h-10 w-10 text-muted-foreground/40 mb-3" />
              <p className="text-muted-foreground">No trips planned yet</p>
              <Button onClick={() => navigate("/")} className="mt-4">Plan Your First Trip</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {trips.slice(0, 5).map((trip) => {
                const places = trip.itinerary.reduce((s, d) => s + d.length, 0);
                return (
                  <div key={trip.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-foreground truncate">{trip.destination}</h3>
                      <p className="text-xs text-muted-foreground">
                        {trip.days} days · {places} places · Saved on {trip.savedAt}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
