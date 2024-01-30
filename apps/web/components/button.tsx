import type { JSX } from "react";
import { cva } from "@/styled-system/css";

export const button = cva({
  base: {
    padding: "10px 20px",
    borderRadius: "5px",
    backgroundColor: "black",
    border: "none",
    cursor: "pointer",
    fontSize: "m",
    fontWeight: "bold",
    transition: "background-color 0.2s",
  },
  variants: {
    color: {
      dark: {
        backgroundColor: "black",
        color: "white",
        _hover: {
          backgroundColor: "gray.800",
        },
      },
      blue: {
        backgroundColor: "blue.500",
        color: "white",
        _hover: {
          backgroundColor: "blue.300",
        },
      },
    },
  },
});

type ButtonProps = {
  color?: "dark" | "blue";
} & JSX.IntrinsicElements["button"];

export function Button({ children, color = "dark", ...props }: ButtonProps) {
  return (
    <button {...props} className={button({ color })}>
      {children}
    </button>
  );
}
