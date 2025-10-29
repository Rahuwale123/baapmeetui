import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useMeetingsStore } from "@features/meetings/state";
import { Button } from "@components/ui/button";

if (!dayjs.extend) {
  // noop for types
}

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export const MeetingDetailScreen = () => {
  const { id } = useParams<{ id: string }>();
  const meeting = useMeetingsStore((state) => (id ? state.getMeeting(id) : undefined));

  if (!meeting) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-border bg-white p-10 text-center shadow-soft">
        <h2 className="text-2xl font-semibold text-ink">Meeting not found</h2>
        <p className="mt-2 text-sm text-muted-ink">Check the meeting link or create a new meeting.</p>
        <div className="mt-6 flex justify-center">
          <Button variant="outline" asChild>
            <a href="/schedule">Schedule a meeting</a>
          </Button>
        </div>
      </div>
    );
  }

  const dateTime = dayjs(meeting.dateTime);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-muted-ink">Hosted by Disha Sharma</p>
        <h1 className="text-3xl font-semibold text-ink">{meeting.title}</h1>
        <p className="text-sm text-muted-ink">{dateTime.format("dddd, MMMM D, YYYY h:mm A")}</p>
      </header>
      <section className="space-y-6 rounded-2xl border border-border bg-white p-8 shadow-card">
        <div>
          <h2 className="text-xl font-semibold text-ink">Description</h2>
          <p className="mt-2 text-base text-muted-ink">{meeting.description}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-ink">Room Name</h3>
            <p className="mt-2 text-lg font-medium text-ink">{meeting.id}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-ink">Participants</h3>
            <ul className="mt-2 space-y-1 text-base text-ink">
              {meeting.participants.map((participant) => (
                <li key={participant}>/{participant}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button type="button">Join</Button>
          <Button type="button" variant="outline">
            Copy link
          </Button>
        </div>
      </section>
    </div>
  );
};
