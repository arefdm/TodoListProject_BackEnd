import { db } from "../core/database/connection.js";
import { tasks } from "../core/database/schema.js";
import { eq,and } from "drizzle-orm";

export const getUserTasks = async (userId,title,dueDate) => {
    try {
      if(title && dueDate){
        const allTasks = await db.select().from(tasks).where(and(eq(tasks.userId, userId),eq(tasks.title, title), eq(tasks.dueDate, dueDate)));
        return allTasks;
      }
      if(title && !dueDate){
        const allTasks = await db.select().from(tasks).where(and(eq(tasks.userId, userId),eq(tasks.title, title)));
        return allTasks;
      }
      if(!title && dueDate){
        const allTasks = await db.select().from(tasks).where(and(eq(tasks.userId, userId), eq(tasks.dueDate, dueDate)));
        console.log(allTasks[0].title);
        return allTasks;
      }
      const allTasks = await db.select().from(tasks).where(eq(tasks.userId, userId));
      return allTasks;
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const addNewTask = async (userId,title,description,dueDate,status) => {
  try {
    const dateOnly = new Date(dueDate).toISOString().split('T')[0];
   await db.insert(tasks).values({userId: userId , title: title, description: description, dueDate: dateOnly,status: status });
  } catch (error) {
    return Promise.reject(error);
  }
}

export const editTask = async (taskId,userId,title,description,dueDate,status) => {
  try {
    const dateOnly = new Date(dueDate).toISOString().split('T')[0];
    const currentDate = new Date();
    await db.update(tasks)
    .set({ userId: userId , title: title, description: description, dueDate: dateOnly,status: status,updatedAt: currentDate })
    .where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)))
    .returning({ updatedId: tasks.id });
    console.log(newTask);
    return newTask;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const removeTask = async (taskId) => {
 try {
  const deletedTask = await db.delete(tasks)
  .where(eq(tasks.id, taskId))
  .returning({"deletedtask":tasks.id});
  return deletedTask;
 } catch (error) {
  return Promise.reject(error);
 }
}