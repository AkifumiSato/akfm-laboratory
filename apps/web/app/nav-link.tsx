"use client";

import { css } from "@/styled-system/css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function NavLink({
  href,
  children,
}: {
  children: ReactNode;
  href: string;
}) {
  const pathname = usePathname();
  const isCurrentPage = href === pathname;

  return (
    <Link
      aria-current={isCurrentPage ? "page" : undefined}
      href={href}
      className={css({
        fontSize: "l",
        color: "gray.500",
        _currentPage: {
          color: "blue.500",
        },
      })}
    >
      {children}
    </Link>
  );
}
