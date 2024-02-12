# akfm laboratory

## Todo

- [x] custom server
- [x] github OAuth
- [x] storybook add
- [x] dynamic rendering page add
- [x] redis session
- [x] redis cache handler
- [ ] core api(REST)
  - [x] docker-composeの整理
  - [x] APIの挙動確認
  - [x] APIで全てのusersを取得するエンドポイントの実装
  - [ ] test
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
$ cargo loco start
```

### web server

```shell
# ./
$ pnpm dev
```

## localhost

- web: http://localhost:3000
- redis-stack: http://localhost:8001
