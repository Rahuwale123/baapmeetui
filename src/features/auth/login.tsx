import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { useAuthStore } from "@features/auth/state";

const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Phone or Email is required")
    .refine((value) => /@/.test(value) || /^\+?[0-9\s-]{6,}$/.test(value), {
      message: "Enter a valid phone number or email"
    }),
  password: z.string().min(4, "Password / Security Code is required")
});

export const LoginScreen = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    login({ displayName: "Disha Sharma", roomName: "disha-room" });
    navigate("/profile");
    return Promise.resolve(values);
  };

  return (
    <div className="mx-auto max-w-lg space-y-8 rounded-2xl border border-border bg-white p-8 shadow-card">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold text-ink">Sign In / Up</h1>
        <p className="text-sm text-muted-ink">Enter your credentials to access Baap Connect.</p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-2">
          <Label htmlFor="identifier">Phone or Email</Label>
          <Input id="identifier" autoComplete="username" {...register("identifier")} />
          {errors.identifier ? (
            <p className="text-sm text-red-500" role="alert">
              {errors.identifier.message}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password / Security Code</Label>
          <Input id="password" type="password" autoComplete="current-password" {...register("password")} />
          {errors.password ? (
            <p className="text-sm text-red-500" role="alert">
              {errors.password.message}
            </p>
          ) : null}
        </div>
        <p className="text-xs text-muted-ink">
          Your login information is securely stored according to our privacy policy.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={isSubmitting}>
            Login
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <button
            type="button"
            className="text-sm font-medium text-brand underline-offset-4 hover:underline"
            onClick={() => navigate("/signup")}
          >
            Don’t have account? Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
