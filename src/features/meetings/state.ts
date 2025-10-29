import { create } from "zustand";
import dayjs from "dayjs";

export interface Meeting {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  location: "BAAP Connect" | "Offline" | "Zoom";
  participants: string[];
}

interface MeetingsState {
  meetings: Meeting[];
  addMeeting: (meeting: Meeting) => void;
  getMeeting: (id: string) => Meeting | undefined;
}

export const useMeetingsStore = create<MeetingsState>((set, get) => ({
  meetings: [
    {
      id: "kickoff",
      title: "Discussion with Amar Ujala",
      description: "Discussion about new Project at BAAP",
      dateTime: dayjs().add(4, "hour").toISOString(),
      location: "BAAP Connect",
      participants: ["Rasika Dalal", "Ajay Masuri", "info@baapcompany.com"]
    }
  ],
  addMeeting: (meeting) => set((state) => ({ meetings: [meeting, ...state.meetings] })),
  getMeeting: (id) => get().meetings.find((meeting) => meeting.id === id)
}));
