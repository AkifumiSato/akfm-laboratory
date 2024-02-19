import type { JSX } from "react";
import { css, cva } from "../styled-system/css";

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

type InputProps = JSX.IntrinsicElements["input"] & {
  label?: string;
  rightElement?: React.ReactNode;
};

export function InputText({ label, rightElement, ...props }: InputProps) {
  if (label) {
    return (
      <label className={labelStyle}>
        {label}
        <span
          className={css({
            position: "relative",
          })}
        >
          <input {...props} className={input()} />
          {rightElement}
        </span>
      </label>
    );
  }
  return <input {...props} className={input()} />;
}

const labelStyle = css({
  display: "flex",
  flexDirection: "column",
  rowGap: "1",
});
