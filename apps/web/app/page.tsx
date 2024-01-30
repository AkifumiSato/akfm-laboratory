import { Button } from "@/components/button";
import { css } from "@/styled-system/css";
import type { JSX } from "react";

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
        <p>This is a personal, experimental application.</p>
      </div>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          rowGap: "20px",
          padding: "50px 0",
        })}
      >
        <p>Sign in at Github to try out the feature?</p>
        <Button>Github</Button>
        <p
          className={css({
            color: "red.500",
            fontWeight: "bold",
          })}
        >
          todo: Button as props impl
        </p>
        <a href="/login/github">github login link</a>
      </div>
    </main>
  );
}
