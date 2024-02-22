import type { JSX } from "react";
import { css } from "../styled-system/css";
import { stack } from "../styled-system/patterns";
import { Typography } from "@/components/typography";

export default function Page(): JSX.Element {
  return (
    <main>
      <div
        className={css({
          fontSize: "l",
          padding: "20px",
          backgroundColor: "gray.100",
          borderRadius: "10px",
          marginBottom: "20px",
        })}
      >
        <h3
          className={css({
            fontSize: "xl",
            fontWeight: "bold",
            paddingBottom: "10px",
          })}
        >
          Caution!
        </h3>
        <p>
          これは
          <a href="https://twitter.com/akfm_sato" target="_blank">
            @akfm_sato
          </a>
          がNext.jsの研究を行うための、実験的なサイトです。
        </p>
      </div>
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
