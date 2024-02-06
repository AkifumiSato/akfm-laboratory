import { css } from "@/styled-system/css";
import { type ReactNode } from "react";

export function H2({ children }: { children: ReactNode }) {
  return (
    <h1
      className={css({
        fontWeight: "bold",
        fontSize: "2xl",
      })}
    >
      {children}
    </h1>
  );
}
