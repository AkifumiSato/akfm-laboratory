"use client";

import { Alert } from "@/components/alert";
import { Typography } from "@/components/typography";
import Link from "next/link";
import { useEffect } from "react";
import { css } from "../../../styled-system/css";
import { stack } from "../../../styled-system/patterns";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main>
      <Alert>こちらのページでは、sign inが必須です。</Alert>
      <div className={stack({ rowGap: 5 })}>
        <Typography tag="h1">Error</Typography>
        <p>エラーが発生しました。sign inとログを確認してください。</p>
        <ul
          className={css({
            listStyle: "inside",
            fontSize: "l",
            display: "flex",
            flexDirection: "column",
            rowGap: 2,
          })}
        >
          <li>
            <Link href="/signin">sign in</Link>
          </li>
          <li>
            <button
              type="submit"
              onClick={() => reset()}
              className={css({
                color: "blue.500",
                cursor: "pointer",
                textDecoration: "underline",
              })}
            >
              再読み込み
            </button>
          </li>
        </ul>
      </div>
    </main>
  );
}
