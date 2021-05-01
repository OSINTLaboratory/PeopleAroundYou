CREATE TABLE "SystemUser" (
  "systemUserId" bigint generated always as identity,
  "login" varchar NOT NULL,
  "password" varchar NOT NULL,
  "fullName" varchar NULL
);

ALTER TABLE "SystemUser" ADD CONSTRAINT "pkSystemUser" PRIMARY KEY ("systemUserId");

CREATE TABLE "SystemGroup" (
  "systemGroupId" bigint generated always as identity,
  "name" varchar NOT NULL
);

ALTER TABLE "SystemGroup" ADD CONSTRAINT "pkSystemGroup" PRIMARY KEY ("systemGroupId");

CREATE TABLE "SystemGroupSystemUser" (
  "systemGroupId" bigint NOT NULL,
  "systemUserId" bigint NOT NULL
);

ALTER TABLE "SystemGroupSystemUser" ADD CONSTRAINT "pkSystemGroupSystemUser" PRIMARY KEY ("systemGroupId", "systemUserId");
ALTER TABLE "SystemGroupSystemUser" ADD CONSTRAINT "fkSystemGroupSystemUserSystemGroup" FOREIGN KEY ("systemGroupId") REFERENCES "SystemGroup" ("systemGroupId");
ALTER TABLE "SystemGroupSystemUser" ADD CONSTRAINT "fkSystemGroupSystemUserSystemUser" FOREIGN KEY ("systemUserId") REFERENCES "SystemUser" ("systemUserId");

CREATE TABLE "SystemSession" (
  "systemSessionId" bigint generated always as identity,
  "systemUserId" bigint NOT NULL,
  "token" varchar NOT NULL,
  "ip" varchar NOT NULL,
  "data" jsonb NOT NULL
);

ALTER TABLE "SystemSession" ADD CONSTRAINT "pkSystemSession" PRIMARY KEY ("systemSessionId");
ALTER TABLE "SystemSession" ADD CONSTRAINT "fkSystemSessionUser" FOREIGN KEY ("systemUserId") REFERENCES "SystemUser" ("systemUserId");




CREATE TABLE comments (
	commentid	SERIAL PRIMARY KEY,
	filmid	integer NOT NULL,
	userid	integer NOT NULL,
	textdata 	VARCHAR(256) NOT NULL,
	approved 	boolean NOT NULL DEFAULT false
);

CREATE TABLE membership (
	userid	integer NOT NULL,
	expdate	date NOT NULL
);

CREATE TABLE films (
	filmid	SERIAL PRIMARY KEY,
	title	VARCHAR(60) NOT NULL,
	year 	integer NOT NULL,
	rating	NUMERIC(3, 2) NOT NULL DEFAULT 0,
	rating_count integer DEFAULT 0,
	views	integer  NOT NULL DEFAULT 0,
	poster	VARCHAR(120) NOT NULL,
	genre	integer NOT NULL,
	free 	boolean NOT NULL,
	url		VARCHAR(120) NOT NULL
);

CREATE TABLE genres (
	genreid	SERIAL PRIMARY KEY,
	lable	VARCHAR(60) NOT NULL
);

