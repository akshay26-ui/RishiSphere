ALTER TABLE "sessions" RENAME COLUMN "updated_at" TO "expires_at";--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "user_agent" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "ip_address" DROP NOT NULL;