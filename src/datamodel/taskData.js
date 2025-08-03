import { db } from "../core/database/connection.js";
import { tasks } from "../core/database/schema.js";
import { eq } from "drizzle-orm";

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
  } catch (err) {
    console.error(err.message);
  }
}

export const editTask = async (taskId,userId,title,description,dueDate,status) => {
  try {
    const dateOnly = new Date(dueDate).toISOString().split('T')[0];
    const newTask = await db.update(tasks)
    .set({ userId: userId , title: title, description: description, dueDate: dateOnly,status: status })
    .where(eq(tasks.id, taskId))
    .returning({ updatedId: users.id });
  } catch (err) {
    console.error(err.message);
  }
}