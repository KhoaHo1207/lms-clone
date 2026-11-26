"use client";

import { AuthField } from "@/components/auth/auth-field";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { useLogin } from "@/hooks/use-login";
import { ApiError } from "@/lib/api";
import { resendOtp } from "@/services/auth.service";
import { loginSchema, type LoginInput } from "@/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function EmailLoginForm() {
  const router = useRouter();
  const loginMutation = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    loginMutation.mutate(values, {
      onSuccess: (result) => {
        toast.add({
          type: "success",
          title: "Logged in",
          description: result.message,
        });
        router.push("/");
      },
      onError: async (error) => {
        if (error instanceof ApiError && error.status === 403) {
          try {
            const result = await resendOtp(values.email);
            toast.add({
              type: "info",
              title: "Email not verified",
              description: result.message,
            });
          } catch (resendError) {
            toast.add({
              type: "error",
              title: "Email not verified",
              description:
                resendError instanceof ApiError
                  ? resendError.message
                  : "Could not send a new code",
            });
          }

          router.push(
            `/verify-email?email=${encodeURIComponent(values.email)}`,
          );
          return;
        }

        toast.add({
          type: "error",
          title: "Login failed",
          description:
            error instanceof ApiError ? error.message : "Something went wrong",
        });
      },
    });
  });

  return (
    <form className="grid gap-5" onSubmit={onSubmit} noValidate>
      <FieldGroup className="gap-4">
        <AuthField
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email here"
          autoComplete="email"
          error={errors.email?.message}
          registration={register("email")}
        />
        <AuthField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password here"
          autoComplete="current-password"
          error={errors.password?.message}
          registration={register("password")}
        />
      </FieldGroup>
      <Button
        className="w-full"
        size="lg"
        type="submit"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
