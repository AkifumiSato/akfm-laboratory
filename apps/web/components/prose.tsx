import type { SystemStyleObject } from "@pandacss/dev";
import { css } from "../styled-system/css";

type Props = React.ComponentPropsWithoutRef<"div"> & {
  mergeCss?: SystemStyleObject;
};

export function Prose({ children, mergeCss, ...props }: Props) {
  return (
    <div
      className={css(
        {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          rowGap: "20px",

          "& h1": {
            fontWeight: "bold",
            fontSize: "3xl",
          },
          "& h2": {
            fontWeight: "bold",
            fontSize: "2xl",
          },
          "& ul": {
            listStyle: "inside",
          },
        },
        mergeCss,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
