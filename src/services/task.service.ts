import { prisma } from "../database/prismaClient";
import Cache, { cachedTaskKey } from "../lib/cache";

export const findAllTasks = async () => {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });

  Cache.set(cachedTaskKey, tasks, 60 * 10);
  return tasks;
}