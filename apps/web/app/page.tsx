import type { JSX } from "react";
import { Prose } from "@/components/prose";
import { css } from "../styled-system/css";

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
      <Prose>
        <h1>Implement list</h1>
        <ul>
          <li>fastify server</li>
          <li>fastify auth</li>
          <li>custom cache handler</li>
        </ul>
      </Prose>
    </main>
  );
}
