import { Typography } from "@/components/typography";
import { css } from "../../../styled-system/css";
import { stack } from "../../../styled-system/patterns";
import { CurrentUserResponse } from "../../lib/api/types";
import { coreApiUrl } from "../../lib/api/url";
import { getSession } from "../../lib/session";

// todo: impl auth check middleware
export default async function Page() {
  const session = await getSession();
  if (!session.currentUser.isLogin) {
    throw new Error("Unauthorized");
  }
  const user: CurrentUserResponse = await fetch(`${coreApiUrl}/user/current`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.currentUser.token}`,
    },
  }).then((res) => res.json());

  return (
    <main>
      <div className={stack({ rowGap: 5 })}>
        <Typography tag="h1">User info</Typography>
        <ul
          className={css({
            listStyle: "inside",
          })}
        >
          <li>name: {user.name}</li>
          <li>email: {user.email}</li>
        </ul>
      </div>
    </main>
  );
}
