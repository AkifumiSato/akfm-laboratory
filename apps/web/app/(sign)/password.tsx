"use client";

import { InputText } from "@/components/input-text";
import { useState } from "react";
import { css } from "../../styled-system/css";

export function Password({
  name,
  testId,
  label,
}: {
  name: string;
  testId: string;
  label?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <InputText
      type={visible ? "text" : "password"}
      name={name}
      data-testid={testId}
      label={label}
      autoComplete="on"
      rightElement={
        <button
          className={css({
            position: "absolute",
            right: "3",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "sm",
            color: "gray.500",
            cursor: "pointer",
          })}
          type="button"
          onClick={() => setVisible((prev) => !prev)}
        >
          show
        </button>
      }
    />
  );
}
