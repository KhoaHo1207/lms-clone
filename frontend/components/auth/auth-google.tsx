import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AuthGoogle({ form }: { form: any }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        type="button"
        variant="outline"
        className="w-full py-5"
        disabled={form.formState.isSubmitting}
      >
        <Image
          src={"/google.svg"}
          alt="Google"
          width={20}
          height={20}
          className="rounded-full shadow-md"
        />
        Sign in with Google
      </Button>
    </div>
  );
}
