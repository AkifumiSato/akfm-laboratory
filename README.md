# akfm laboratory

## Todo

- [x] custom server
- [x] github OAuth
- [x] storybook add
- [x] dynamic rendering page add
- [x] redis session
- [x] redis cache handler
- [ ] sign up/in
  - [x] docker-composeの整理
  - [x] APIの挙動確認
  - [x] APIで全てのusersを取得するエンドポイントの実装
  - [ ] test
    - [x] sign up
    - [x] sign up e2e
    - [x] sign up validation
    - [x] sign up success/failure
    - [ ] sign in
      - [ ] forgetのメールが届かない問題
  - [ ] OpenAPI
  - [ ] github認証を置き換えて削除
  - [ ] `/posts`
- [ ] GraphQL server
- [ ] pages with graphql
- [ ] Biome

## start

### redis, redis-stack, postgres

```sh
# redis, redis-stack serve
$ docker compose up
```

### api server

```shell
$ cd backend/akfm_laboratory_core
$ cargo loco start --server-and-worker
```

### web server

```shell
# ./
$ pnpm dev
```

## localhost

- web: http://localhost:3000
- core api: http://localhost:3001
- mail debug: http://localhost:1080
- redis-stack: http://localhost:8001
