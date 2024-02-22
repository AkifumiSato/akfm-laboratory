import type { JSX } from "react";
import { SingInPagePresentation } from "./presentation";
import { action } from "./action";

export default function Page(): JSX.Element {
  return <SingInPagePresentation action={action} />;
}
