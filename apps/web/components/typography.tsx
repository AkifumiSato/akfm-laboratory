import { css, cx } from "../styled-system/css";

type TagVariants = "h1" | "h2" | "p";

type Props = {
  children: React.ReactNode;
  tag: TagVariants;
  mergeCss?: string;
};

export function Typography({ children, tag, mergeCss }: Props) {
  const Element = tag;
  return <Element className={cx(styles[tag], mergeCss)}>{children}</Element>;
}

const styles = {
  h1: css({
    fontWeight: "bold",
    fontSize: "3xl",
  }),
  h2: css({
    fontWeight: "bold",
    fontSize: "2xl",
  }),
  p: css({
    fontSize: "l",
  }),
} satisfies Record<TagVariants, string>;
