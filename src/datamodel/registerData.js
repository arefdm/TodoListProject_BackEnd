import { db } from "../core/database/connection.js";
import { users } from "../core/database/schema.js";
import { eq } from "drizzle-orm";

export const getUser = async (email)=>{
    try {
        const user = await db.select().from(users).where(eq(users.email,email));
        return user; 
    } catch (error) {
        console.log(error);
    }  
};


export const addUser = async (email,hashedPassword)=>{
    try {
        const newUser = await db.insert(users).values({ email: email, password: hashedPassword }).returning();
        return newUser; 
    } catch (error) {
        console.log(error);
    }
};