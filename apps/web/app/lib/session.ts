import { v4 as uuid } from "uuid";
import { cookies } from "next/headers";
import Redis from "ioredis";

const SESSION_COOKIE_NAME = "sessionId";

export const redisStore = new Redis({
  enableAutoPipelining: true,
});

type Session = {
  currentUser:
    | {
        isLogin: false;
      }
    | {
        isLogin: true;
        token: string;
      };
};

export async function getSession(): Promise<Session> {
  const sessionIdFromCookie = cookies().get(SESSION_COOKIE_NAME)?.value;
  const session = sessionIdFromCookie
    ? await redisStore.get(sessionIdFromCookie)
    : null;
  if (session) {
    // todo: validation
    return JSON.parse(session) as Session;
  }
  return {
    currentUser: {
      isLogin: false,
    },
  };
}

export async function updateSession(session: Session): Promise<void> {
  const sessionIdFromCookie = cookies().get(SESSION_COOKIE_NAME)?.value;
  let sessionId: string;
  if (sessionIdFromCookie) {
    sessionId = sessionIdFromCookie;
  } else {
    sessionId = uuid();
    cookies().set(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      // secure: true,
      sameSite: "lax",
    });
  }
  await redisStore.set(sessionId, JSON.stringify(session));
}
