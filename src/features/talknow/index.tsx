import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useAuthStore } from "@features/auth/state";

const tabs = [
  { label: "Home", path: "/" },
  { label: "My Meetings", path: "/meetings" },
  { label: "My Availability", path: "/schedule" }
];

export const TalkNowScreen = () => {
  const navigate = useNavigate();
  const { displayName, roomName } = useAuthStore();
  const [value, setValue] = useState("");

  const suggestedRoom = useMemo(
    () => roomName || `${displayName?.split(" ").join("-") || "baap"}-room`,
    [displayName, roomName]
  );

  const handleJoin = () => {
    if (!value.trim()) {
      return;
    }
    navigate(`/meeting/${encodeURIComponent(value.trim())}`);
  };

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-sm text-muted-ink">Logged in as</p>
        <h1 className="text-3xl font-semibold text-ink">{displayName || "Disha Sharma"}</h1>
      </header>
      <div className="space-y-6 rounded-2xl border border-border bg-white p-8 shadow-card">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-ink">Talk now</h2>
          <p className="text-sm text-muted-ink">
            Start an instant call by sharing your room link with your participants.
          </p>
        </div>
        <div className="space-y-4">
          <label className="text-sm font-medium text-muted-ink" htmlFor="room-name">
            Your room name
          </label>
          <Input
            id="room-name"
            placeholder={suggestedRoom}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <div className="rounded-full bg-bg-soft px-5 py-3 text-sm text-muted-ink">
            Suggested: <span className="font-medium text-ink">{suggestedRoom}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={handleJoin}>
              Join Meeting
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate("/schedule")}>
              Schedule a meeting
            </Button>
          </div>
        </div>
      </div>
      <nav className="flex flex-wrap gap-4">
        {tabs.map((tab) => (
          <Button key={tab.path} variant="ghost" onClick={() => navigate(tab.path)}>
            {tab.label}
          </Button>
        ))}
      </nav>
    </div>
  );
};
