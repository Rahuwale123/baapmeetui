import { useState } from "react";
import type { KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { HeroWave } from "@components/Hero/HeroWave";

export const HomeScreen = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");

  const handleJoin = () => {
    if (!roomName.trim()) {
      return;
    }

    navigate(`/meeting/${encodeURIComponent(roomName.trim())}`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleJoin();
    }
  };

  return (
    <section className="relative overflow-hidden rounded-2xl bg-bg-soft px-6 py-10 md:px-10 md:py-14">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Baap Connect</p>
            <h1 className="text-4xl font-bold text-ink md:text-5xl">Let’s meet online</h1>
            <p className="text-base text-muted-ink">
              Start or schedule a meeting with your team in seconds. Collaborate with video, audio,
              and chat using Baap Connect.
            </p>
          </div>
          <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="roomName">
              Enter a room name to join
            </label>
            <Input
              id="roomName"
              placeholder="Enter a room name to join"
              value={roomName}
              onChange={(event) => setRoomName(event.target.value)}
              onKeyDown={handleKeyDown}
              aria-describedby="roomNameHelp"
            />
            <div id="roomNameHelp" className="text-sm text-muted-ink">
              Press Enter to join instantly.
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={handleJoin} aria-label="Join Meeting">
                Join Meeting
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/talk-now")}>
                Let’s talk now
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/schedule")}
                className="bg-white"
              >
                Schedule a meeting
              </Button>
            </div>
          </form>
        </div>
        <div className="relative">
          <div className="aspect-square w-full max-w-md rounded-full bg-white/60 p-10 shadow-soft md:ml-auto">
            <div className="flex h-full w-full items-center justify-center rounded-full border border-dashed border-brand/40">
              <div className="space-y-2 text-center">
                <p className="text-2xl font-semibold text-ink">High-quality video</p>
                <p className="text-sm text-muted-ink">Import hero illustration from XD assets.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HeroWave />
    </section>
  );
};
