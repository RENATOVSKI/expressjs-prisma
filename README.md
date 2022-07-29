---
title: ExpressJS Prisma
description: An ExpressJS server that uses Prisma to connect to a PostgreSQL database
tags:
  - express
  - postgresql
  - prisma
  - typescript
---

## ✨ Features

- Prisma
- Express
- Postgres
- TypeScript

## 📝 Notes

This is a simple REST API for todo items. The available routes are

- `GET /todos` gets all todos
- `POST /todos` creates a new using `text` in the JSON body
- `GET /todos/:id` gets a todo by id
- `PUT /todos/:id` updates a todo by id
- `DELETE /todos/:id` deletes a todo by id

## 📝 Responsabilidades

This is a simple REST API for todo items. The available routes are

- `index` inicializa o servidor
- `express` ...
- `database`  ...
- `routes` cria diretório endpoint
- `controllers` armazena cache da requisição feita
- `services` ...
- `middleware` ...
- `env` armazena infos sensíveis de acesso ao db, arquivo oculto
- `lib` bibliotecas extras, cache das requisições do db com Redis
- `package.json` armazena infos do setup do servidor