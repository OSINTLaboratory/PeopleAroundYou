DROP TABLE IF EXISTS users;
CREATE TABLE users (
	userId	SERIAL PRIMARY KEY,
	login	VARCHAR(60) NOT NULL,
	hash	bytea NOT NULL,
	viewed	integer ARRAY NULL
);

DROP TABLE IF EXISTS guests;
CREATE TABLE guests (
	viewed	integer ARRAY NULL
);

DROP TABLE IF EXISTS moderators;
CREATE TABLE moderators (
	login	VARCHAR(60) NOT NULL,
	hash	bytea NOT NULL
);

DROP TABLE IF EXISTS administrators;
CREATE TABLE administrators (
	login	VARCHAR(60) NOT NULL,
	hash	bytea NOT NULL
);

DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
	film	integer NOT NULL,
	userId	integer NOT NULL,
	textData 	VARCHAR(256) NOT NULL
);

DROP TABLE IF EXISTS membership;
CREATE TABLE membership (
	userId	integer NOT NULL,
	expDate	date NOT NULL
);

DROP TABLE IF EXISTS films;
CREATE TABLE films (
	filmID	SERIAL PRIMARY KEY,
	title	VARCHAR(60) NOT NULL,
	year 	integer NOT NULL,
	rating	NUMERIC(3, 2) NOT NULL,
	views	integer  NOT NULL,
	poster	VARCHAR(60) NOT NULL,
	genre	integer NOT NULL,
	free 	boolean NOT NULL,
	url		VARCHAR(60) NOT NULL
);

DROP TABLE IF EXISTS genres;
CREATE TABLE genres (
	userId	integer NOT NULL,
	expDate	date NOT NULL
);
