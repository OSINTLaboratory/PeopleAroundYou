DROP TABLE IF EXISTS users;
CREATE TABLE users (
	userId	SERIAL PRIMARY KEY,
	login	text NOT NULL,
	hash	bytea NOT NULL,
	viewed	integer ARRAY NULL
);

DROP TABLE IF EXISTS guests;
CREATE TABLE guests (
	viewed	integer ARRAY NULL
);

DROP TABLE IF EXISTS moderators;
CREATE TABLE moderators (
	login	text NOT NULL,
	hash	bytea NOT NULL
);

DROP TABLE IF EXISTS administrators;
CREATE TABLE administrators (
	login	text NOT NULL,
	hash	bytea NOT NULL
);

DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
	film	integer NOT NULL,
	userId	integer NOT NULL,
	textData 	text NOT NULL
);

DROP TABLE IF EXISTS membership;
CREATE TABLE membership (
	userId	integer NOT NULL,
	expDate	date NOT NULL
);

DROP TABLE IF EXISTS films;
CREATE TABLE films (
	filmID	integer PRIMARY KEY,
	title	text NOT NULL,
	year 	integer NOT NULL,
	rating	NUMERIC(3, 2) NOT NULL,
	views	integer  NOT NULL,
	poster	text NOT NULL,
	genre	integer NOT NULL,
	free 	boolean NOT NULL,
	url		text NOT NULL
);

DROP TABLE IF EXISTS genres;
CREATE TABLE genres (
	userId	integer NOT NULL,
	expDate	date NOT NULL
);
