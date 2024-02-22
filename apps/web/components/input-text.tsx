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
  errors?: string[];
  rightElement?: React.ReactNode;
};

export function InputText({
  label,
  errors,
  rightElement,
  ...props
}: InputProps) {
  if (label) {
    return (
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          rowGap: "2",
        })}
      >
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
        {errors?.map((error) => (
          <span
            className={css({
              color: "red.500",
              fontSize: "sm",
            })}
            key={error}
          >
            {error}
          </span>
        ))}
      </div>
    );
  }
  return <input {...props} className={input()} />;
}

const labelStyle = css({
  display: "flex",
  flexDirection: "column",
  rowGap: "1",
});
