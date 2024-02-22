import { Alert } from "@/components/alert";
import type { JSX } from "react";
import { css } from "../styled-system/css";
import { stack } from "../styled-system/patterns";
import { Typography } from "@/components/typography";

export default function Page(): JSX.Element {
  return (
    <main>
      <Alert>
        これは
        <a href="https://twitter.com/akfm_sato" target="_blank">
          @akfm_sato
        </a>
        がNext.jsの研究を行うための、実験的なサイトです。
      </Alert>
      <div className={stack({ rowGap: 5 })}>
        <Typography tag="h1">Implement list</Typography>
        <ul
          className={css({
            listStyle: "inside",
          })}
        >
          <li>fastify server</li>
          <li>fastify auth</li>
          <li>custom cache handler</li>
        </ul>
      </div>
    </main>
  );
}
