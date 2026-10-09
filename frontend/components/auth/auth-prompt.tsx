import Link from "next/link";

interface AuthPromptProps {
  title: string;

  link: {
    label: string;
    href: string;
  };
}

export default function AuthPrompt({ title, link }: AuthPromptProps) {
  return (
    <div className="mt-4 flex items-center justify-center">
      <h2>{title} </h2>
      <Link
        href={link.href}
        className="text-primary ml-1 text-sm font-medium hover:underline"
      >
        {link.label}
      </Link>
    </div>
  );
}
