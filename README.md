<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

# Kumparan.backend.test

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

```bash
# node version
node v16.12.0

# npm version
8.1.0

# yarn version
1.22.17
```

## Installation

```bash
$ npm install
```

## Run Docker
```bash
# redis (cache manager) and redis-commander (IDE for redis)
# redis port 6380
# redis-commander localhost:8082
$ docker-compose up --build
```

## Copy .env.example to .env
```bash
$ cp .env.example .env
```

## Run Migration using yarn
```bash
$ yarn migration:run
```

## Running the app
```bash
# using yarn
$ yarn start

# using npm
$ npm run start

# debug mode (yarn)
$ yarn start:debug

# debug mode (npm)
$ npm run start:debug
```

```bash
Application is running on: http://127.0.0.1:3000
```


## Postman Documentation
Click [Here](https://www.postman.com/solar-rocket-835799/workspace/kumparan-test/documentation/3098523-f2ca6d63-cdac-464d-95cb-32f9c907413b)

## Struct
```
.
├── migrations
├── modules
│   ├── articles
│   │   ├── controllers
│   │   ├── domains
│   │   ├── dtos
│   │   ├── entities
│   │   ├── services
│   │   ├── articles.module.ts
│   │   └── articles.constant.ts
│   └── index.ts
├── shared
│   ├── cache.config.ts
│   ├── config.service.ts
│   ├── shared.module.ts
│   └── typeorm.config.ts
└── main.ts
```
