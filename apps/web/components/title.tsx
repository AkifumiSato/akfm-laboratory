import { css } from "@/styled-system/css";
import { type ReactNode } from "react";

export function Title({ children }: { children: ReactNode }) {
  return (
    <h1
      className={css({
        fontWeight: "bold",
        fontSize: "3xl",
      })}
    >
      {children}
    </h1>
  );
}
