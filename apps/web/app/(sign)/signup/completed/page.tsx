import Link from "next/link";
import type { JSX } from "react";
import { Prose } from "@/components/prose";

// todo: scroll to top
export default function Page(): JSX.Element {
  return (
    <main>
      <Prose>
        <h1>Signup completed!</h1>
        <ul>
          <li>
            <Link href="/">top page</Link>
          </li>
        </ul>
      </Prose>
    </main>
  );
}
