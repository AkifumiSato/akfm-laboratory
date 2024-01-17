import { css } from "../styled-system/css";
import type { JSX } from "react";

export default function Page(): JSX.Element {
  return (
    <main>
      <h1
        className={css({
          fontSize: "2xl",
          fontWeight: "bold",
        })}
      >
        Example Next.js App
      </h1>
    </main>
  );
}
