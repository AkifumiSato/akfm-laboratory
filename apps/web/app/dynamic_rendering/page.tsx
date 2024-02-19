import type { JSX } from "react";
import { css } from "../../styled-system/css";
import { stack } from "../../styled-system/patterns";
import { Typography } from "@/components/typography";

export default function Page(): JSX.Element {
  const random = Math.random();
  return (
    <main className={stack({ gap: "10" })}>
      <div className={stack({ rowGap: 5 })}>
        <Typography tag="h1">Dynamic rendering page</Typography>
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
      </div>
    </main>
  );
}
