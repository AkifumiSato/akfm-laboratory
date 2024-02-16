# API

## Quick start

### `rust -V`

```sh
$ rustc -V
# 1.78.0-nightly (a4472498d 2024-02-15)
```

### boot db

```shell
$ docker run -p 5432:5432 -e POSTGRES_USER=akfm -e POSTGRES_DB=akfm_laboratory_core_development -e POSTGRES_PASSWORD="akfm" postgres:15.3-alpine
```

### test

GET: http://localhost:3001/api/_health
