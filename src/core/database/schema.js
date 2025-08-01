import { pgSchema, uuid, serial, varchar, text, date, timestamp } from 'drizzle-orm/pg-core';

// Define the "todo" schema
export const todo = pgSchema('todo');

// Users table in "todo" schema
export const users = todo.table('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Tasks table in "todo" schema
export const tasks = todo.table('tasks', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 100 }).notNull(),
  description: text('description'),
  dueDate: date('due_date'),
  status: varchar('status', { length: 20 }).default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});