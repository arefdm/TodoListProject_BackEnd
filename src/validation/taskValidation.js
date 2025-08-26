import {z} from 'zod';

export const addEditTaskSchema =z.object({
    title: z.string().min(1,"Title is required"),
    description: z.string().optional(),
    dueDate: z.iso.date("Invalid dueDate"),
    status: z.enum(["to do","in progress","completed"]),
});