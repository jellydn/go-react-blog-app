# Welcome to go-react-blog-app 👋

![Version](https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Twitter: jellydn](https://img.shields.io/twitter/follow/jellydn.svg?style=social)](https://twitter.com/jellydn)

> Another blog app

## Install

```sh
yarn install
```

## Usage

```sh
go generate ./...
```

## Built with

- [Echo](https://echo.labstack.com/cookbook/crud/)
- [Prisma](https://github.com/prisma/prisma-client-go/blob/master/docs/quickstart.md)
- [New-web-app](https://github.com/jellydn/new-web-app) (ViteJs, ReactJs + Typescript + TailWind + Redux Toolkit)

## Database migration

```sh
cd packages/blog
# sync the database with your schema
go run github.com/prisma/prisma-client-go db push
```

Add new model to `schema.prisma` then run

```sh
go run github.com/prisma/prisma-client-go migrate dev
```

<details>
<summary>Example result</summary>
<code>
go run github.com/prisma/prisma-client-go migrate dev

Prisma schema loaded from schema.prisma
Datasource "db": SQLite database "dev.db" at "file:dev.db"

SQLite database dev.db created at file:dev.db

The following migration(s) have been applied:

migrations/
└─ 20210625142103_add_post_model/
└─ migration.sql
└─ 20210625142151_add_comment_model/
└─ migration.sql
✔ Enter a name for the new migration: … add tag model

The following migration(s) have been created and applied from new schema changes:

migrations/
└─ 20210625154046_add_tag_model/
└─ migration.sql

Your database is now in sync with your schema.

✔ Generated Prisma Client Go to ./db in 2.11s
</code>

</details>

## Author

👤 **Dung Huynh**

- Website: https://productsway.com/
- Twitter: [@jellydn](https://twitter.com/jellydn)
- Github: [@jellydn](https://github.com/jellydn)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
