import { db } from "../core/database/connection.js";
import { users } from "../core/database/schema.js";
import { eq } from "drizzle-orm";

export const getUser = async (email)=>{
    try {
        const user = await db.select().from(users).where(eq(users.email,email));
        return user; 
    } catch (error) {
        return Promise.reject(error);
    }  
};

export const getUserById = async (userId) => {
    try {
        const userEmail = await db.select({email: users.email}).from(users).where(eq(users.id,userId));
        return userEmail[0];
    } catch (error) {
        return Promise.reject(error);
    }
}


export const addUser = async (email,hashedPassword)=>{
    try {
        const newUser = await db.insert(users).values({ email: email, password: hashedPassword }).returning();
        return newUser; 
    } catch (error) {
        return Promise.reject(error);
    }
};