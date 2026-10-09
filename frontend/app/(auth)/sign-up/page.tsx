import SignUpForm from "@/components/auth/sign-up-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Up to your account",
};
export default function SignUpPage() {
  return <SignUpForm />;
}
