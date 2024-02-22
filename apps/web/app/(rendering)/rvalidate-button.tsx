import { Button } from "@/components/button";
import { revalidatePath } from "next/cache";

export function RevalidateButton({ children }: { children?: React.ReactNode }) {
  async function action() {
    "use server";

    revalidatePath("/dynamic_rendering");
  }

  return (
    <form action={action}>
      <Button color="dark">{children}</Button>
    </form>
  );
}
