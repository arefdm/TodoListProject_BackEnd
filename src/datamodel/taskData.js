import { db } from "../core/database/connection.js";
import { tasks } from "../core/database/schema.js";
import { eq } from "drizzle-orm";

export const getUserTasks = async (UserId) => {
    try {
      const userId = UserId;
      const AllTasks = await db.select().from(tasks).where(eq(tasks.userId, userId));
      return AllTasks;
    } catch (err) {
      console.error(err.message);
    }
  };