"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Signed out successfully");
        },
        onError: (error) => {
          toast.error(error.error.message || "Failed to sign out");
        },
      },
    });
  }

  return (
    <div className="p-24">
      Home
      <ThemeToggle />
      {session ? (
        <>
          <p>{session.user.name}</p>
          <Button onClick={signOut}>Logout</Button>
        </>
      ) : null}
    </div>
  );
}
