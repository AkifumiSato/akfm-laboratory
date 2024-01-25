import type { JSX } from "react";
import { css } from "../styled-system/css";

type ButtonProps = JSX.IntrinsicElements["button"];

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={css({
        padding: "10px 20px",
        borderRadius: "5px",
        backgroundColor: "black",
        border: "none",
        cursor: "pointer",
        fontSize: "m",
        fontWeight: "bold",
        color: "white",
        transition: "background-color 0.2s",
        _hover: {
          backgroundColor: "gray.800",
        },
      })}
    >
      {children}
    </button>
  );
}
