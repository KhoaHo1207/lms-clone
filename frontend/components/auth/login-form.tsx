import { EmailLoginForm } from "@/components/auth/email-login-form";
import { AuthCard } from "@/components/auth/auth-card";

export default function LoginForm() {
  return (
    <AuthCard
      title="Welcome back"
      description="Sign in with the email and password for your account."
      prompt="Don't have an account?"
      action="Create one"
      href="/register"
    >
      <EmailLoginForm />
    </AuthCard>
  );
}
