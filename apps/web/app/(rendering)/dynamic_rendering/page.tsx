import type { JSX } from "react";
import { css } from "../../../styled-system/css";
import { stack } from "../../../styled-system/patterns";
import { Typography } from "@/components/typography";
import { RevalidateButton } from "../rvalidate-button";

export default function Page(): JSX.Element {
  const random = Math.random();
  return (
    <main className={stack({ gap: "10" })}>
      <div className={stack({ rowGap: 5 })}>
        <Typography tag="h1">Dynamic rendering</Typography>
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
        <RevalidateButton>Revalidate</RevalidateButton>
      </div>
    </main>
  );
}

export const dynamic = "force-dynamic";
