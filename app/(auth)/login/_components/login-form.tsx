"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { Loader2, Send } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();

  const [githubPending, startGithubPending] = useTransition();
  const [emailPending, startEmailPending] = useTransition();
  const [email, setEmail] = useState("");

  async function signInWithGithub() {
    startGithubPending(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with Github successfully");
          },
          onError: (error) => {
            toast.error(error.error.message || "Failed to sign in with Github");
          },
        },
      });
    });
  }

  function signInWithEmail() {
    startEmailPending(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            router.push("/verify-request");
            toast.success("Verification code sent to your email");
          },
          onError: (error) => {
            toast.error(
              error.error.message || "Failed to send verification code",
            );
          },
        },
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome Back!</CardTitle>
        <CardDescription>Login with your Github Email Account</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Button
          variant={"outline"}
          className="w-full"
          onClick={signInWithGithub}
          disabled={githubPending || emailPending}
        >
          {githubPending ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <>
              <Image
                src={"/github.svg"}
                alt="Github"
                width={28}
                height={28}
                className="mr-2 size-4 object-contain"
              />
              Sign in with Github
            </>
          )}
        </Button>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10">
            Or continue with
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>

          <Button
            onClick={signInWithEmail}
            disabled={emailPending || !email || githubPending}
          >
            {emailPending ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <span className="flex items-center">
                <Send className="mr-2 size-4" />
                Continue with Email
              </span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
