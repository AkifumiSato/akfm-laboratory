import { stack } from "@/styled-system/patterns";
import type { JSX } from "react";
import { Prose } from "@/components/prose";

export default function Page(): JSX.Element {
  return (
    <main className={stack({ gap: "10" })}>
      <Prose>
        <h1>Sign in page</h1>
        {/* todo: impl sing in */}
      </Prose>
    </main>
  );
}
