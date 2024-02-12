import type { JSX } from "react";
import { cva } from "../styled-system/css";

export const input = cva({
  base: {
    padding: "10px 20px",
    borderRadius: "5px",
    backgroundColor: "white",
    fontSize: "m",
    transitionProperty: "",
    transitionDuration: "0.5s",
    outlineWidth: "1px",
    outlineColor: "gray.300",
    outlineStyle: "solid",
    width: "100%",
    _focus: {
      outlineWidth: "2px",
      outlineColor: "blue.400",
    },
  },
});

type InputProps = JSX.IntrinsicElements["input"];

export function InputText({ ...props }: InputProps) {
  return <input {...props} className={input()} />;
}
