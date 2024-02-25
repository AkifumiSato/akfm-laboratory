import { Alert } from "@/components/alert";
import { Typography } from "@/components/typography";
import type { JSX } from "react";
import { css } from "../styled-system/css";
import { stack } from "../styled-system/patterns";

export default function Page(): JSX.Element {
  return (
    <main>
      <Alert>
        これは
        <a
          href="https://twitter.com/akfm_sato"
          target="_blank"
          rel="noreferrer"
        >
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
          <li>Custom cache handler</li>
          <li>App Router session</li>
          <li>
            Server Action with{" "}
            <a href="https://conform.guide/" target="_blank" rel="noreferrer">
              conform
            </a>
          </li>
          <li>Sign up</li>
          <li>Sign in</li>
          <li>Github Sign in</li>
          <li>loco(Rust Web Framework) API</li>
        </ul>
      </div>
    </main>
  );
}
