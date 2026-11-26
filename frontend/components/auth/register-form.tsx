import { AuthCard } from "@/components/auth/auth-card";
import { EmailRegisterForm } from "@/components/auth/email-register-form";

export default function RegisterForm() {
  return (
    <AuthCard
      title="Create your account"
      description="Use your name, email, and a password. We'll send a code to verify the email."
      prompt="Already have an account?"
      action="Sign in"
      href="/login"
    >
      <EmailRegisterForm />
    </AuthCard>
  );
}
