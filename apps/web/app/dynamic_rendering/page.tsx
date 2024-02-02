import { Title } from "@/components/title";
import { css } from "@/styled-system/css";
import { stack } from "@/styled-system/patterns";
import type { JSX } from "react";

export default function Page(): JSX.Element {
  const random = Math.random();
  return (
    <main className={stack({ gap: "10" })}>
      <Title>Dynamic rendering page</Title>
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
