import { db } from "../core/database/connection.js";
import { tasks } from "../core/database/schema.js";
import { eq,and } from "drizzle-orm";

export const getUserTasks = async (userId) => {
    try {
      const allTasks = await db.select().from(tasks).where(eq(tasks.userId, userId));
      return allTasks;
    } catch (err) {
      console.error(err.message);
    }
  };

export const addNewTask = async (userId,title,description,dueDate,status) => {
  try {
    const dateOnly = new Date(dueDate).toISOString().split('T')[0];
    const newTask = await db.insert(tasks).values({userId: userId , title: title, description: description, dueDate: dateOnly,status: status });
    return newTask;
  } catch (err) {
    console.error(err.message);
  }
}

export const editTask = async (taskId,userId,title,description,dueDate,status) => {
  try {
    const dateOnly = new Date(dueDate).toISOString().split('T')[0];
    const currentDate = new Date();
    const newTask = await db.update(tasks)
    .set({ userId: userId , title: title, description: description, dueDate: dateOnly,status: status,updatedAt: currentDate })
    .where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)))
    .returning({ updatedId: tasks.id });
    console.log(newTask);
    return newTask;
  } catch (err) {
    console.error(err.message);
  }
}

export const removeTask = async (taskId) => {
 try {
  const deletedTask = await db.delete(tasks)
  .where(eq(tasks.id, taskId))
  .returning({"deletedtask":tasks.id});
  return deletedTask;
 } catch (err) {
  console.error(err.message);
 }
}