import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { useMeetingsStore } from "@features/meetings/state";
import { MeetingCard } from "@components/Meeting/MeetingCard";

export const MeetingsScreen = () => {
  const { state } = useLocation();
  const meetings = useMeetingsStore((store) => store.meetings);

  const today = dayjs().format("YYYY-MM-DD");
  const todaysMeetings = meetings.filter((meeting) => dayjs(meeting.dateTime).format("YYYY-MM-DD") === today);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-ink">My Meetings</h1>
        <p className="text-sm text-muted-ink">Keep track of your upcoming sessions and stay prepared.</p>
        {state?.success ? (
          <div className="rounded-full bg-brand/10 px-4 py-2 text-sm text-brand">{state.success}</div>
        ) : null}
      </header>
      <section className="rounded-2xl border border-border bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold text-ink">Calendar View</h2>
        <p className="mt-2 text-sm text-muted-ink">
          Integrate full calendar experience in phase 2. For now, view meetings scheduled per day below.
        </p>
      </section>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-ink">Today’s Meeting</h2>
          <span className="text-sm text-muted-ink">{today}</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {todaysMeetings.length > 0 ? (
            todaysMeetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)
          ) : (
            <p className="rounded-2xl border border-dashed border-border bg-white p-8 text-center text-sm text-muted-ink">
              No meetings scheduled for today.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
