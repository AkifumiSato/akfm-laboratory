import Redis from "ioredis";
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";

const SESSION_COOKIE_NAME = "sessionId";

export const redisStore = new Redis({
  enableAutoPipelining: true,
});

type RedisSession = {
  currentUser:
    | {
        isLogin: false;
      }
    | {
        isLogin: true;
        token: string;
      };
};

class MutableSession {
  private readonly redisSession: RedisSession;

  constructor(redisSession: RedisSession) {
    this.redisSession = redisSession;
  }

  get currentUser() {
    return this.redisSession.currentUser;
  }

  async onLogin(token: string) {
    this.redisSession.currentUser = { isLogin: true, token };
    await this.save();
  }

  async onLogout() {
    this.redisSession.currentUser = { isLogin: false };
    await this.save();
  }

  private async save(): Promise<void> {
    const sessionIdFromCookie = cookies().get(SESSION_COOKIE_NAME)?.value;
    let sessionId: string;
    if (sessionIdFromCookie) {
      sessionId = sessionIdFromCookie;
    } else {
      sessionId = uuid();
      cookies().set(SESSION_COOKIE_NAME, sessionId, {
        httpOnly: true,
        // secure: true,
        // sameSite: "lax",
      });
    }
    await redisStore.set(sessionId, JSON.stringify(this.redisSession));
  }
}

async function loadPersistedSession(): Promise<RedisSession> {
  const sessionIdFromCookie = cookies().get(SESSION_COOKIE_NAME)?.value;
  const session = sessionIdFromCookie
    ? await redisStore.get(sessionIdFromCookie)
    : null;
  if (session) {
    return JSON.parse(session) as RedisSession;
  }
  return { currentUser: { isLogin: false } };
}

// use only in actions/route handlers
export async function getMutableSession(): Promise<MutableSession> {
  return new MutableSession(await loadPersistedSession());
}

// readonly session
export async function getReadonlySession(): Promise<Readonly<RedisSession>> {
  return await loadPersistedSession();
}
