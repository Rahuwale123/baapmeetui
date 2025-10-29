import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@components/ui/button";

export const NotificationScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const message =
    type === "account-created"
      ? "Your account is created successfully"
      : "Your changes have been saved";

  return (
    <div
      role="status"
      className="mx-auto max-w-xl space-y-6 rounded-2xl border border-border bg-white p-8 text-center shadow-card"
    >
      <h1 className="text-2xl font-semibold text-ink">Notification</h1>
      <p className="text-base text-muted-ink">{message}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={() => navigate("/")}>Back to Home</Button>
        <Button variant="outline" onClick={() => navigate("/profile")}>
          Go to Profile
        </Button>
      </div>
    </div>
  );
};
