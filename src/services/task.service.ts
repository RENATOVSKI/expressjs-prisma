import { prisma } from "../database/prismaClient";
import cache from "../lib/cache";
import Cache, { cachedTaskKey } from "../lib/cache";

export const findAllTasks = async () => {
  const cachedTask = await Cache.get(cachedTaskKey);
  if (cachedTask) return cachedTask;

  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });

  Cache.set(cachedTaskKey, tasks, 60 * 10);
  return tasks;
}

export const findTaskById = async (id: string) => {
  const cachedTask = await Cache.get(`${cachedTaskKey}-${id}`);
  if (cachedTask) return cachedTask;
  const task = await prisma.task.findFirst({
    where: { id },
  });

  if (!task) throw new Error("Task not found");

  Cache.set(`${cachedTaskKey}-${id}`, task, 60 * 10);
  return task;
}

export const createTask = async (title: string, text: string) => {
  const create = await prisma.task.create({
    data: {
      title,
      text,
      completed: false,
    },
  });
  Cache.delPrefix(cachedTaskKey);
  return create;

}