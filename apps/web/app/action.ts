"use server";

import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { getSession } from "./lib/session";

export async function logout() {
  const session = await getSession();
  if (!session.currentUser.isLogin) {
    return;
  }
  await session.onLogout();
  revalidatePath("/", "layout");
  redirect("/", RedirectType.replace);
}
