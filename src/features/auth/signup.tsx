import { zodResolver } from "@lib/zod-resolver";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import { useAuthStore } from "@features/auth/state";

const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.enum(["Male", "Female"], {
    required_error: "Gender is required"
  }),
  contact: z
    .string()
    .min(1, "Phone or Email is required")
    .refine((value) => /@/.test(value) || /^\+?[0-9\s-]{6,}$/.test(value), {
      message: "Enter a valid phone number or email"
    }),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export const SignupScreen = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    login({ displayName: `${values.firstName} ${values.lastName}`, roomName: `${values.firstName}-room` });
    navigate("/notification?type=account-created");
    return Promise.resolve(values);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 rounded-2xl border border-border bg-white p-8 shadow-card">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold text-ink">Create your account</h1>
        <p className="text-sm text-muted-ink">Complete the form to get started with Baap Connect.</p>
      </div>
      <form className="grid gap-6 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" {...register("firstName")} autoComplete="given-name" />
          {errors.firstName ? (
            <p className="text-sm text-red-500" role="alert">
              {errors.firstName.message}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" {...register("lastName")} autoComplete="family-name" />
          {errors.lastName ? (
            <p className="text-sm text-red-500" role="alert">
              {errors.lastName.message}
            </p>
          ) : null}
        </div>
        <div className="space-y-3 md:col-span-2">
          <Label>Gender</Label>
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <RadioGroup className="flex flex-wrap gap-4" value={field.value} onValueChange={field.onChange}>
                <RadioGroupItem value="Male" label="Male" />
                <RadioGroupItem value="Female" label="Female" />
              </RadioGroup>
            )}
          />
          {errors.gender ? (
            <p className="text-sm text-red-500" role="alert">
              {errors.gender.message}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact">Phone or Email</Label>
          <Input id="contact" {...register("contact")} autoComplete="email" />
          {errors.contact ? (
            <p className="text-sm text-red-500" role="alert">
              {errors.contact.message}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password / Security Code</Label>
          <Input id="password" type="password" {...register("password")} autoComplete="new-password" />
          {errors.password ? (
            <p className="text-sm text-red-500" role="alert">
              {errors.password.message}
            </p>
          ) : null}
        </div>
        <p className="md:col-span-2 text-xs text-muted-ink">
          By creating an account, you agree that your data will be securely stored for scheduling and meeting
          notifications.
        </p>
        <div className="md:col-span-2 flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={isSubmitting}>
            Sign Up
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
