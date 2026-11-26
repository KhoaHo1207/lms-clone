"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "cn";
import { Eye, EyeOff, Lock, Mail, User, type LucideIcon } from "lucide-react";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

const fieldIcons: Record<string, LucideIcon> = {
  name: User,
  email: Mail,
  password: Lock,
};

type AuthFieldProps = {
  id: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  registration: UseFormRegisterReturn;
};

const iconForField = (
  type: React.HTMLInputTypeAttribute,
  autoComplete?: string,
) => {
  if (type === "password" || autoComplete?.includes("password")) {
    return fieldIcons.password;
  }

  if (type === "email" || autoComplete === "email") {
    return fieldIcons.email;
  }

  if (autoComplete === "name") {
    return fieldIcons.name;
  }

  return undefined;
};

export function AuthField({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  error,
  registration,
}: AuthFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const Icon = iconForField(type, autoComplete);

  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        {Icon ? (
          <Icon
            aria-hidden="true"
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
        ) : null}
        <Input
          {...registration}
          id={id}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          className={cn("h-10", Icon && "pl-9", isPassword && "pr-10")}
        />
        {isPassword ? (
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 outline-none focus-visible:ring-3"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((current) => !current)}
          >
            {showPassword ? (
              <EyeOff aria-hidden="true" className="size-4" />
            ) : (
              <Eye aria-hidden="true" className="size-4" />
            )}
          </button>
        ) : null}
      </div>
      <FieldError>{error}</FieldError>
    </Field>
  );
}
