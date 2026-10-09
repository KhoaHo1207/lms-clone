import SignInForm from "@/components/auth/sign-in-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In to your account",
  // keywords: ["sign in", "login", "authentication", "authorization"],
  // authors: [{ name: "John Doe", url: "https://www.google.com" }],
  // robots: "index, follow",
  // icons: {
  //   icon: "/favicon.ico",
  // },
};
export default function SignInPage() {
  return <SignInForm />;
}
