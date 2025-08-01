CREATE SCHEMA "todo";
--> statement-breakpoint
CREATE TABLE "todo"."tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"title" varchar(100) NOT NULL,
	"description" text,
	"due_date" date,
	"status" varchar(20) DEFAULT 'pending',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "todo"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "todo"."tasks" ADD CONSTRAINT "tasks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "todo"."users"("id") ON DELETE cascade ON UPDATE no action;