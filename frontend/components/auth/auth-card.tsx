import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type AuthCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  prompt: string;
  action: string;
  href: string;
};

export function AuthCard({
  title,
  description,
  children,
  prompt,
  action,
  href,
}: AuthCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="gap-2 px-6">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          {title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 px-6">
        {children}
        <p className="text-muted-foreground text-center text-sm">
          {prompt}{" "}
          <Link href={href} className="text-primary font-medium hover:underline">
            {action}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
