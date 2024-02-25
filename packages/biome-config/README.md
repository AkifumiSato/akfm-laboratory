# biome-config

v1.5.3現在、次のバージョンで以下のように`@repo/biome-config`な書き方ができるようになるので、それまでは相対パスでextendsすること。

```json
{
  "$schema": "https://biomejs.dev/schemas/1.5.3/schema.json",
  "extends": ["@repo/biome-config/base.json"]
}

```

https://github.com/biomejs/biome/issues/972#issuecomment-1943637910
