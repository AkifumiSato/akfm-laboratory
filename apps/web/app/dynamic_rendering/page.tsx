import { H1 } from "@/components/h1";
import { css } from "@/styled-system/css";
import { stack } from "@/styled-system/patterns";
import type { JSX } from "react";

export default function Page(): JSX.Element {
  const random = Math.random();
  return (
    <main className={stack({ gap: "10" })}>
      <H1>Dynamic rendering page</H1>
      <p>
        random:{" "}
        <span
          className={css({
            color: "red",
            fontWeight: "bold",
          })}
        >
          {random}
        </span>
      </p>
    </main>
  );
}
