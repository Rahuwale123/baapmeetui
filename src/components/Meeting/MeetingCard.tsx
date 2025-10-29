import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { cn } from "@lib/utils";
import { Meeting } from "@features/meetings/state";

if (!dayjs.extend) {
  // noop for typing in environments without runtime
}

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface MeetingCardProps {
  meeting: Meeting;
}

const locationColors: Record<Meeting["location"], string> = {
  "BAAP Connect": "bg-brand/10 text-brand",
  Offline: "bg-orange-100 text-orange-700",
  Zoom: "bg-sky-100 text-sky-700"
};

export const MeetingCard = ({ meeting }: MeetingCardProps) => {
  const dateTime = dayjs(meeting.dateTime);
  const isPast = dateTime.isBefore(dayjs());

  return (
    <article className="space-y-4 rounded-2xl border border-border bg-white p-6 shadow-soft transition hover:-translate-y-1">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-ink">{meeting.title}</h3>
        <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", locationColors[meeting.location])}>
          {meeting.location}
        </span>
      </header>
      <p className="text-sm text-muted-ink">{meeting.description}</p>
      <ul className="space-y-2 text-sm text-ink">
        <li className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-brand" />
          {dateTime.format("DD/MM/YYYY")} {dateTime.format("hh:mm A")}
        </li>
        <li className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-brand" />
          <span className={cn(isPast ? "text-red-500" : "text-brand")}>{isPast ? "Completed" : dateTime.fromNow()}</span>
        </li>
        <li className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-brand" />
          Participants: {meeting.participants.join(", ")}
        </li>
      </ul>
    </article>
  );
};
