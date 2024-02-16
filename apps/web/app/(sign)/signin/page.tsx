import type { JSX } from "react";
import { SingInPagePresentation } from "./presentation";

export default function Page(): JSX.Element {
  async function action(data: FormData) {
    "use server";
    console.log(data);
  }

  return <SingInPagePresentation action={action} />;
}
