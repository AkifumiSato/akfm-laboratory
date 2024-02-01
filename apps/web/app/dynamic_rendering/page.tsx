import { css } from "@/styled-system/css";
import { stack } from "@/styled-system/patterns";
import type { JSX } from "react";

export default function Page(): JSX.Element {
  const random = Math.random();
  return (
    <main className={stack({ gap: "10" })}>
      <h1
        className={css({
          fontWeight: "bold",
          fontSize: "3xl",
        })}
      >
        Dynamic rendering page
      </h1>
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
