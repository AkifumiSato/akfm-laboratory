import Link from "next/link";
import type { JSX } from "react";
import { stack } from "../../../../styled-system/patterns";
import { Typography } from "@/components/typography";

export default function Page(): JSX.Element {
  return (
    <main>
      <div className={stack({ rowGap: 5 })}>
        <Typography tag="h1">Signup completed!</Typography>
        <div>
          <Link href="/">top page</Link>
        </div>
      </div>
    </main>
  );
}
