import "./globals.css";
import { Button } from "@/components/button";
import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import React, { JSX, Suspense } from "react";
import { css } from "../styled-system/css";
import { coreApiUrl } from "./lib/api-url";
import { getSession } from "./lib/session";
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
                <NavLink href="/signup">sign up</NavLink>
              </li>
              <li>
                <NavLink href="/signin">sign in</NavLink>
              </li>
              <li>
                <NavLink href="/dynamic_rendering">dynamic_rendering</NavLink>
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

type CurrentUserResponse = {
  name: string;
};

async function User() {
  async function logout() {
    "use server";

    const session = getSession();
    if (!session?.currentUser.isLogin) {
      return;
    }
    // fastifyのsession.destroy()だと、sessionが消える前にレスポンスが返ってるように見受けられるため、手動で初期化
    session.currentUser = {
      isLogin: false,
    };
    revalidatePath("/", "layout");
  }

  const session = getSession();
  if (!session?.currentUser.isLogin) {
    return <>guest</>;
  }
  const user: CurrentUserResponse = await fetch(`${coreApiUrl}/user/current`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${session?.currentUser?.token}`,
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
        <Button>logout</Button>
      </form>
    </div>
  );
}
