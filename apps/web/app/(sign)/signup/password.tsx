"use client";

import { InputText } from "@/components/input-text";
import { useState } from "react";
import { css } from "../../../styled-system/css";

export function Password({ name, testId }: { name: string; testId: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={css({
        position: "relative",
      })}
    >
      <InputText
        type={visible ? "text" : "password"}
        name={name}
        data-testid={testId}
      />
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
        onClick={() => setVisible((prev) => !prev)}
      >
        show
      </button>
    </div>
  );
}
