import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome Back</CardTitle>
        <CardDescription>Login with your Github Email Account</CardDescription>
      </CardHeader>

      <CardContent>
        <Button variant={"outline"} className={"w-full"}>
          <Image
            src={"/github.svg"}
            alt="Github"
            width={20}
            height={20}
            className="size-4 text-background"
          />
          Sign in with Github
        </Button>
      </CardContent>
    </Card>
  );
}
