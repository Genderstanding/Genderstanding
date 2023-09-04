
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "admin_level" INTEGER DEFAULT 1
);

CREATE TABLE "node" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES "user" (id),
	"node_name" VARCHAR(200),
	"category" VARCHAR(200)
);

CREATE TABLE "node_association" (
	"id" SERIAL PRIMARY KEY,
	"node_id" INTEGER REFERENCES "node" (id),
	"user_id" INTEGER REFERENCES "user" (id),
	"auth_code" VARCHAR(8) 
);

CREATE TABLE "posts" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES "user" (id),
	"content" VARCHAR(10000),
	"node_id" INTEGER REFERENCES "node" (id),
	"orig_post" BOOLEAN DEFAULT false,
	"reply_id" INTEGER,
	"post_time" TIMESTAMP,
	"edit" BOOLEAN DEFAULT false,
	"public" BOOLEAN DEFAULT false,
	"reported" BOOLEAN DEFAULT false,
	"votes" INTEGER DEFAULT 0,
	"replied" BOOLEAN DEFAULT false
);