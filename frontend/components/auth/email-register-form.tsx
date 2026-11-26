"use client";

import { AuthField } from "@/components/auth/auth-field";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { useRegister } from "@/hooks/use-register";
import { ApiError } from "@/lib/api";
import { registerSchema, type RegisterInput } from "@/schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function EmailRegisterForm() {
  const router = useRouter();
  const registerMutation = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    registerMutation.mutate(values, {
      onSuccess: (result) => {
        toast.add({
          type: "success",
          title: "Account created",
          description: result.message,
        });
        router.push(`/verify-email?email=${encodeURIComponent(values.email)}`);
      },
      onError: (error) => {
        toast.add({
          type: "error",
          title: "Registration failed",
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
          id="name"
          label="Name"
          placeholder="Enter your name here"
          autoComplete="name"
          error={errors.name?.message}
          registration={register("name")}
        />
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
          autoComplete="new-password"
          error={errors.password?.message}
          registration={register("password")}
        />
      </FieldGroup>
      <Button
        className="w-full"
        size="lg"
        type="submit"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
