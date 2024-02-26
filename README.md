# akfm laboratory

## start

### redis, redis-stack, postgres

```sh
$ docker compose up
```

### api server

```shell
$ cd backend/core
$ cargo loco start --server-and-worker
```

### web server

1. https://github.com/settings/developers
2. 「New OAuth App」
3. 「Application name」に `akfm-laboratory` を追加
4. 「Authorization callback URL」に `http://localhost:3000/api/auth/callback/github` を追加
5. 「Homepage URL」に `http://localhost:3000` を追加
6. Client ID と Client Secret を取得
7. `frontend/akfm_laboratory_web/.env.local`に環境変数を追加

```env
SESSION_SECRET="a secret with minimum length of 32 characters"
GITHUB_CLIENT_ID="[GITHUB_CLIENT_ID]"
GITHUB_CLIENT_SECRET="[GITHUB_CLIENT_SECRET]"
REDIS_STACK_URL="redis://localhost:7001"
```

```shell
# ./
$ pnpm dev
```

## localhost

- web: http://localhost:3000
- core api: http://localhost:3001
- mail debug: http://localhost:1080
- redis-stack: http://localhost:8001
