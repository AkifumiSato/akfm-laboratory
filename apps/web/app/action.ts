"use server";

import { revalidatePath } from "next/cache";
import { RedirectType, redirect } from "next/navigation";
import { getMutableSession } from "./lib/session";

export async function logout() {
  const session = await getMutableSession();
  if (!session.currentUser.isLogin) {
    return;
  }
  await session.onLogout();
  revalidatePath("/", "layout");
  redirect("/", RedirectType.replace);
}
