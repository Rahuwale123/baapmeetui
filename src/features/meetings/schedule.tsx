import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { Label } from "@components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { useMeetingsStore } from "@features/meetings/state";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

if (!dayjs.extend) {
  // noop to satisfy type checking without executing in runtime
}

dayjs.extend(utc);
dayjs.extend(timezone);

const scheduleSchema = z
  .object({
    title: z.string().min(3, "Title is required"),
    invitees: z.string().min(1, "Add at least one email"),
    meetingFor: z.string().min(1, "Select who the meeting is for"),
    participants: z.string().min(1, "Add participants"),
    date: z.string().min(1, "Select date"),
    hour: z.string().min(1, "Select hour"),
    minute: z.string().min(1, "Select minutes"),
    meridiem: z.enum(["AM", "PM"]),
    timezone: z.string().min(1, "Select timezone"),
    description: z.string().min(1, "Description is required"),
    notification: z.string().min(1, "Select notification preference")
  })
  .refine((values) => {
    const baseDate = dayjs(`${values.date} ${values.hour}:${values.minute} ${values.meridiem}`, "YYYY-MM-DD hh:mm A");
    return baseDate.isAfter(dayjs());
  }, {
    message: "Meeting time must be in the future",
    path: ["date"]
  })
  .refine((values) => values.invitees.split(/[,\n]+/).every((email) => email.trim() === "" || /.+@.+/.test(email.trim())), {
    message: "Enter valid email addresses",
    path: ["invitees"]
  });

const hours = Array.from({ length: 12 }, (_, index) => ((index + 1) % 13 || 1).toString().padStart(2, "0"));
const minutes = ["00", "15", "30", "45"];
const timezones = ["UTC", "Asia/Kolkata", "America/New_York", "Europe/London"];
const meetingForOptions = ["Client", "Team", "Personal"];
const notificationOptions = ["15 minutes before", "30 minutes before", "1 hour before"];

export const ScheduleMeetingScreen = () => {
  const navigate = useNavigate();
  const addMeeting = useMeetingsStore((state) => state.addMeeting);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof scheduleSchema>>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      hour: "10",
      minute: "30",
      meridiem: "AM",
      timezone: "Asia/Kolkata",
      notification: notificationOptions[0]
    }
  });

  const onSubmit = (values: z.infer<typeof scheduleSchema>) => {
    const meetingDate = dayjs(`${values.date} ${values.hour}:${values.minute} ${values.meridiem}`, "YYYY-MM-DD hh:mm A");
    addMeeting({
      id: nanoid(8),
      title: values.title,
      description: values.description,
      dateTime: meetingDate.tz(values.timezone).toISOString(),
      location: "BAAP Connect",
      participants: values.participants.split(/[,\n]+/).map((item) => item.trim()).filter(Boolean)
    });
    navigate("/meetings", { state: { success: "Meeting scheduled successfully" } });
    return Promise.resolve(values);
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-ink">Schedule Meeting</h1>
        <p className="text-sm text-muted-ink">Fill in the details below to set up your next session.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Meeting Title</Label>
          <Input id="title" {...register("title")} />
          {errors.title ? <p className="text-sm text-red-500">{errors.title.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="meetingFor">Meeting for</Label>
          <Controller
            name="meetingFor"
            control={control}
            render={({ field }) => (
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {meetingForOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.meetingFor ? <p className="text-sm text-red-500">{errors.meetingFor.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="invitees">Invite by email</Label>
          <Textarea id="invitees" rows={3} placeholder="rao@baapcompany.com" {...register("invitees")} />
          {errors.invitees ? <p className="text-sm text-red-500">{errors.invitees.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="participants">Participants</Label>
          <Textarea
            id="participants"
            rows={3}
            placeholder="Rasika Dalal, Ajay Masuri, info@baapcompany.com"
            {...register("participants")}
          />
          {errors.participants ? <p className="text-sm text-red-500">{errors.participants.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Select Date</Label>
          <Input id="date" type="date" {...register("date")} />
          {errors.date ? <p className="text-sm text-red-500">{errors.date.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label>Select Time</Label>
          <div className="grid grid-cols-3 gap-3">
            <Controller
              name="hour"
              control={control}
              render={({ field }) => (
                <Select value={field.value ?? ""} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="HH" />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Controller
              name="minute"
              control={control}
              render={({ field }) => (
                <Select value={field.value ?? ""} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {minutes.map((minute) => (
                      <SelectItem key={minute} value={minute}>
                        {minute}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Controller
              name="meridiem"
              control={control}
              render={({ field }) => (
                <Select value={field.value ?? ""} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(["AM", "PM"] as const).map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Timezone</Label>
          <Controller
            name="timezone"
            control={control}
            render={({ field }) => (
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.timezone ? <p className="text-sm text-red-500">{errors.timezone.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label>Notification</Label>
          <Controller
            name="notification"
            control={control}
            render={({ field }) => (
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {notificationOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.notification ? <p className="text-sm text-red-500">{errors.notification.message}</p> : null}
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="description">Meeting Description</Label>
          <Textarea id="description" rows={4} {...register("description")} />
          {errors.description ? <p className="text-sm text-red-500">{errors.description.message}</p> : null}
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isSubmitting}>
          Schedule
        </Button>
        <Button type="button" variant="outline" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
