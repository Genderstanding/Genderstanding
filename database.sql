
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "admin_level" INT
);

CREATE TABLE 'node' (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL,
	"node_name" varchar(200) NOT NULL,
	"catagory" varchar(200) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE 'node_association' (
	"id" SERIAL PRIMARY KEY,
	"node_id" INT NOT NULL,
	"user_id" INT NOT NULL,
	"auth_code" varchar(8) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE "posts" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT,
	"content" varchar(10000),
	"node_id" INT,
	"orig_post" BOOLEAN DEFAULT false,
	"reply_id" INT,
	"post_time" TIMESTAMP,
	"edit" BOOLEAN DEFAULT false,
	"public" BOOLEAN DEFAULT false,
	"reported" BOOLEAN DEFAULT false,
	"votes" INT,
	PRIMARY KEY ("id")
);