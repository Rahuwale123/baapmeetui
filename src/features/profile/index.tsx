import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
import { useAuthStore } from "@features/auth/state";

const profileData = {
  name: "Raosaheb Ghuge",
  gender: "Male",
  handle: "RaosahebGhuge",
  email: "rao@baapcompany.com",
  phone: "+91 98765 43210",
  roomName: "baapconnect-room"
};

export const ProfileScreen = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-ink">Profile</h1>
        <p className="text-sm text-muted-ink">Manage your personal information and meeting preferences.</p>
      </header>
      <section className="space-y-6 rounded-2xl border border-border bg-white p-8 shadow-card">
        <dl className="grid gap-6 md:grid-cols-2">
          <div>
            <dt className="text-sm font-semibold text-muted-ink">Name</dt>
            <dd className="mt-1 text-lg font-medium text-ink">{profileData.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-muted-ink">Gender</dt>
            <dd className="mt-1 text-lg font-medium text-ink">{profileData.gender}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-muted-ink">Handle</dt>
            <dd className="mt-1 text-lg font-medium text-ink">{profileData.handle}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-muted-ink">Email</dt>
            <dd className="mt-1 text-lg font-medium text-ink">{profileData.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-muted-ink">Phone</dt>
            <dd className="mt-1 text-lg font-medium text-ink">{profileData.phone}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-muted-ink">Room Name</dt>
            <dd className="mt-1 text-lg font-medium text-ink">{profileData.roomName}</dd>
          </div>
        </dl>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </section>
    </div>
  );
};
