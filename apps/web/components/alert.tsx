import { css } from "../styled-system/css";

export function Alert({ children }: { children?: React.ReactNode }) {
  return (
    <div
      className={css({
        fontSize: "l",
        padding: "20px",
        backgroundColor: "orange.100",
        borderRadius: "10px",
        marginBottom: "20px",
      })}
    >
      <h3
        className={css({
          fontSize: "xl",
          fontWeight: "bold",
          paddingBottom: "10px",
          color: "orange.700",
        })}
      >
        Caution!
      </h3>
      <div
        className={css({
          color: "orange.900",
        })}
      >
        {children}
      </div>
    </div>
  );
}
