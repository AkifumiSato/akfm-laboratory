"use client";

import type { JSX } from "react";
import { SingInPagePresentation } from "./presentation";
import { login } from "./action";

export default function Page(): JSX.Element {
  return <SingInPagePresentation login={login} />;
}
