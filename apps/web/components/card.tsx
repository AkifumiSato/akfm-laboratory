import { css } from "../styled-system/css";
import { stack } from "../styled-system/patterns";

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={css({
        padding: "5",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        width: "100%",
        maxWidth: "600px",
      })}
    >
      <div className={stack({ gap: "10" })}>{children}</div>
    </div>
  );
}
