# API

## Quick start

### boot db

```shell
$ docker run -p 5432:5432 -e POSTGRES_USER=akfm -e POSTGRES_DB=api_development -e POSTGRES_PASSWORD="akfm" postgres:15.3-alpine
```

### test

GET: http://localhost:3001/api/_ping
