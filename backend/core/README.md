# API

## Quick start

### `rust -V`

```sh
$ rustc -V
# rustc 1.79.0-nightly (7f2fc33da 2024-04-22)
```

### boot db

```shell
$ docker run -p 5432:5432 -e POSTGRES_USER=akfm -e POSTGRES_DB=akfm_laboratory_core_development -e POSTGRES_PASSWORD="akfm" postgres:15.3-alpine
```

### test

GET: http://localhost:3001/api/_health

### with mailer

```shell
$ cargo loco start --worker
```
