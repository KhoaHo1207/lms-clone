import { Book } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <Book className="size-6" />
    </Link>
  );
}
