import RegisterForm from "@/components/auth/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your account",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
