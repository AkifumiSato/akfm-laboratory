import "./globals.css";
import { css } from "@/styled-system/css";
import type { Metadata } from "next";
import Link from "next/link";
import type { JSX } from "react";
import { NavLink } from "./nav-link";

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="ja">
      <body>
        <div
          className={css({
            padding: "20px",
            backgroundColor: "gray.50",
            position: "fixed",
            left: 0,
            width: "300px",
            height: "100vh",
          })}
        >
          <div
            className={css({
              paddingBottom: "20px",
              borderBottom: "1px solid",
              borderColor: "gray.300",
            })}
          >
            <Link
              href="/"
              className={css({
                fontSize: "2xl",
                fontWeight: "bold",
              })}
            >
              akfm laboratory
            </Link>
          </div>
          <ul
            className={css({
              paddingTop: "20px",
            })}
          >
            <li>
              <NavLink href="/dynamic_rendering">dynamic_rendering</NavLink>
            </li>
          </ul>
        </div>
        <div
          className={css({
            padding: "77px 20px 20px 350px",
            minHeight: "100vh",
          })}
        >
          <div
            className={css({
              maxWidth: "700px",
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
