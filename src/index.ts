import { PrismaClient } from "@prisma/client";
import express from "express";
import redis from "./lib/cache";


const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const todosKey = "cachedTodos"

app.get("/todos", async (req, res) => {
  try {
    const cachedTodos = await redis.get(todosKey)

    if (cachedTodos) {
      return res.json(JSON.parse(cachedTodos));
    }

    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: "desc" },
    });

    await redis.set(todosKey, JSON.stringify(todos))
    return res.json(todos)

  } catch (error: any) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }
})

app.post("/todos", async (req, res) => {
  const todo = await prisma.todo.create({
    data: {
      completed: false,
      createdAt: new Date(),
      text: req.body.text ?? "Empty todo",
    },
  });
  redis.del(todosKey)
  return res.json(todo);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
