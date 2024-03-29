import { Button } from "@/components/button";
import type { Metadata } from "next";
import Link from "next/link";
import React, { JSX, Suspense } from "react";
import { css } from "../styled-system/css";
import { logout } from "./action";
import "./globals.css";
import { CurrentUserResponse } from "./lib/api/types";
import { coreApiUrl } from "./lib/api/url";
import { getReadonlySession } from "./lib/session";
import { NavLink } from "./nav-link";
import ScrollUp from "./scroll-up";

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
        <ScrollUp />
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "44px",
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
            <Suspense>
              <User />
            </Suspense>
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
              display: "flex",
              flexDirection: "column",
              rowGap: "7",
              position: "sticky",
              top: "77px",
              paddingTop: "20px",
              alignSelf: "flex-start",
              width: "240px",
            })}
          >
            <NavGroup name="auth">
              <li>
                <NavLink href="/signup">sign up</NavLink>
              </li>
              <li>
                <NavLink href="/signin">sign in</NavLink>
              </li>
              <li>
                <NavLink href="/user">user(need auth)</NavLink>
              </li>
            </NavGroup>
            <NavGroup name="rendering">
              <li>
                <NavLink href="/dynamic_rendering">dynamic_rendering</NavLink>
              </li>
              <li>
                <NavLink href="/static_rendering">static_rendering</NavLink>
              </li>
            </NavGroup>
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

async function User() {
  const session = await getReadonlySession();
  if (!session.currentUser.isLogin) {
    return <>guest</>;
  }
  const user: CurrentUserResponse = await fetch(`${coreApiUrl}/user/current`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${session.currentUser?.token}`,
    },
  }).then((res) => res.json());
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        columnGap: "5",
      })}
    >
      <div>user: {user.name}</div>
      <form action={logout}>
        <Button type="submit">logout</Button>
      </form>
    </div>
  );
}

function NavGroup({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        rowGap: "3",
      })}
    >
      <p
        className={css({
          fontSize: "l",
          fontWeight: "bold",
          color: "gray.600",
        })}
      >
        {name}
      </p>
      <ul
        className={css({
          paddingLeft: "2",
          display: "flex",
          flexDirection: "column",
          rowGap: "3",
          borderColor: "gray.300",
          borderWidth: "0 0 0 1px",
        })}
      >
        {children}
      </ul>
    </div>
  );
}
