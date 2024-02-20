"use client";

import { Button } from "@/components/button";
import { redirect } from "next/navigation";

export function GithubSignIn() {
  return (
    <Button color="dark" onClick={() => redirect("/login/github")}>
      GitHub Sign in
    </Button>
  );
}
