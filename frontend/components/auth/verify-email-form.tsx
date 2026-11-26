"use client";

import { AuthCard } from "@/components/auth/auth-card";
import { AuthField } from "@/components/auth/auth-field";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/toast";
import { useVerifyEmail } from "@/hooks/use-verify-email";
import { ApiError } from "@/lib/api";
import {
  verifyEmailSchema,
  type VerifyEmailInput,
} from "@/schemas/verify-email.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { KeyRound } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

export default function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verifyMutation = useVerifyEmail();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailInput>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: searchParams.get("email") ?? "",
      otp: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    verifyMutation.mutate(values, {
      onSuccess: (result) => {
        toast.add({
          type: "success",
          title: "Email verified",
          description: result.message,
        });
        router.push("/login");
      },
      onError: (error) => {
        toast.add({
          type: "error",
          title: "Verification failed",
          description:
            error instanceof ApiError ? error.message : "Something went wrong",
        });
      },
    });
  });

  return (
    <AuthCard
      title="Check your email"
      description="Enter the 6-digit code we sent. It expires in 10 minutes."
      prompt="Already verified?"
      action="Sign in"
      href="/login"
    >
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
          <Controller
            name="otp"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.error ? true : undefined}>
                <FieldLabel htmlFor="otp">Verification code</FieldLabel>
                <div className="flex items-center gap-3">
                  <KeyRound
                    aria-hidden="true"
                    className="text-muted-foreground size-4 shrink-0"
                  />
                  <InputOTP
                    id="otp"
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    aria-invalid={Boolean(fieldState.error)}
                  >
                    <InputOTPGroup>
                      {Array.from({ length: 6 }, (_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="size-11 text-base"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />
        </FieldGroup>
        <Button
          className="w-full"
          size="lg"
          type="submit"
          disabled={verifyMutation.isPending}
        >
          {verifyMutation.isPending ? "Verifying..." : "Verify email"}
        </Button>
      </form>
    </AuthCard>
  );
}
