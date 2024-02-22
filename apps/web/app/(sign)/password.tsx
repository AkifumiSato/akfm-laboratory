"use client";

import { InputText } from "@/components/input-text";
import { useState } from "react";
import { css } from "../../styled-system/css";

export function Password({
  name,
  label,
  errors,
}: {
  name: string;
  label?: string;
  errors?: string[];
}) {
  const [visible, setVisible] = useState(false);

  return (
    <InputText
      type={visible ? "text" : "password"}
      name={name}
      label={label}
      errors={errors}
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
