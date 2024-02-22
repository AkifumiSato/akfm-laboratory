"use server";

import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { getSession, updateSession } from "./lib/session";

export async function logout() {
  const session = await getSession();
  if (!session.currentUser.isLogin) {
    return;
  }
  // fastifyのsession.destroy()だと、sessionが消える前にレスポンスが返ってるように見受けられるため、手動で初期化
  session.currentUser = {
    isLogin: false,
  };
  await updateSession(session);
  revalidatePath("/", "layout");
  redirect("/", RedirectType.replace);
}
