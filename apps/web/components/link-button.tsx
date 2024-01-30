import { button } from "@/components/button";
import Link from "next/link";
import type { ReactNode } from "react";

type LinkButtonProps = Parameters<typeof Link>[0] & {
  color?: "dark" | "blue";
  children: ReactNode;
  href: string;
};

export function LinkButton({
  children,
  href,
  color = "dark",
  ...props
}: LinkButtonProps) {
  return (
    <Link href={href} className={button({ color })} {...props}>
      {children}
    </Link>
  );
}
