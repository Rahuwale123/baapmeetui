import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "@app/App";
import { HomeScreen } from "@features/home";
import { LoginScreen } from "@features/auth/login";
import { SignupScreen } from "@features/auth/signup";
import { TalkNowScreen } from "@features/talknow";
import { ScheduleMeetingScreen } from "@features/meetings/schedule";
import { MeetingDetailScreen } from "@features/meetings/detail";
import { NotificationScreen } from "@features/notifications";
import { ProfileScreen } from "@features/profile";
import { MeetingsScreen } from "@features/meetings/list";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        index: true,
        element: <HomeScreen />
      },
      {
        path: "login",
        element: <LoginScreen />
      },
      {
        path: "signup",
        element: <SignupScreen />
      },
      {
        path: "talk-now",
        element: <TalkNowScreen />
      },
      {
        path: "schedule",
        element: <ScheduleMeetingScreen />
      },
      {
        path: "meeting/:id",
        element: <MeetingDetailScreen />
      },
      {
        path: "notification",
        element: <NotificationScreen />
      },
      {
        path: "profile",
        element: <ProfileScreen />
      },
      {
        path: "meetings",
        element: <MeetingsScreen />
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);
