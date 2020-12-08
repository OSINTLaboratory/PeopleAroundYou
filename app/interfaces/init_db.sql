DROP TABLE IF EXISTS users;
CREATE TABLE users (
	UserID	integer PRIMARY KEY,
	Login	text NOT NULL,
	Salt	bytea NOT NULL,
	Viewed	integer ARRAY
);

DROP TABLE IF EXISTS guests;
CREATE TABLE guests (
	Viewed	integer ARRAY
);

DROP TABLE IF EXISTS moderators;
CREATE TABLE moderators (
	Login	text NOT NULL,
	Salt	bytea NOT NULL
);

DROP TABLE IF EXISTS administrators;
CREATE TABLE administrators (
	Login	text NOT NULL,
	Salt	bytea NOT NULL
);

DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
	Film	integer NOT NULL,
	User	integer NOT NULL,
	Data 	text
);

DROP TABLE IF EXISTS membership;
CREATE TABLE membership (
	User	integer NOT NULL,
	ExpDate	date NOT NULL
);

DROP TABLE IF EXISTS films;
CREATE TABLE films (
	FilmID	integer NOT NULL PRIMARY KEY,
	Title	text NOT NULL,
	Year 	integer NOT NULL,
	Rating	NUMERIC(3, 2) NOT NULL,
	Views	integer  NOT NULL,
	Poster	text NOT NULL,
	Genre	integer NOT NULL,
	Free 	boolean NOT NULL,
	Url		text NOT NULL
);

DROP TABLE IF EXISTS genres;
CREATE TABLE genres (
	User	integer NOT NULL,
	ExpDate	date NOT NULL
);

