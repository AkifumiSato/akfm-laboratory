import "./globals.css";
import { css } from "@/styled-system/css";
import type { Metadata } from "next";
import Link from "next/link";
import type { JSX } from "react";
import { NavLink } from "./nav-link";

export const metadata: Metadata = {
  title: "akfm laboratory",
};

// todo: sp design
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="ja">
      <body>
        <header
          className={css({
            position: "sticky",
            top: 0,
            display: "flex",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(5px)",
            borderBottom: "1px solid",
            borderColor: "gray.300",
            zIndex: "header",
          })}
        >
          <div
            className={css({
              width: "100%",
              maxWidth: "1200px",
            })}
          >
            <Link
              href="/"
              className={css({
                fontSize: "2xl",
                fontWeight: "bold",
                textDecoration: "none",
                color: "gray.700",
              })}
            >
              akfm laboratory
            </Link>
          </div>
        </header>
        <div
          className={css({
            display: "flex",
            margin: "0 auto",
            padding: "0 20px",
            maxWidth: "1240px",
            minWidth: "900px",
          })}
        >
          <div
            className={css({
              position: "sticky",
              top: "77px",
              paddingTop: "20px",
              alignSelf: "flex-start",
            })}
          >
            <ul
              className={css({
                display: "flex",
                flexDirection: "column",
                rowGap: "20px",
                width: "240px",
              })}
            >
              <li>
                <NavLink href="/dynamic_rendering">dynamic_rendering</NavLink>
              </li>
              <li>
                <NavLink href="/login/github">github sign in</NavLink>
              </li>
            </ul>
          </div>
          <div
            className={css({
              padding: "20px",
              minHeight: "100vh",
              width: "100%",
            })}
          >
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
