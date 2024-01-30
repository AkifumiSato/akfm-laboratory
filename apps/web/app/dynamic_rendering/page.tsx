import type { JSX } from "react";

export default function Page(): JSX.Element {
  const random = Math.random();
  return (
    <main>
      <h1>dynamic rendering page</h1>
      <p>random: {random}</p>
    </main>
  );
}
