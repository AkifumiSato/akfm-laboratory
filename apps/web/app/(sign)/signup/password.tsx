"use client";

import { InputText } from "@/components/input-text";
import { css } from "@/styled-system/css";
import { useState } from "react";

export function Password({ name }: { name: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={css({
        position: "relative",
      })}
    >
      <InputText type={visible ? "text" : "password"} name={name} />
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
