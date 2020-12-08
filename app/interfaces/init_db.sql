// Таблица пользователей
DROP TABLE IF EXISTS users;
CREATE TABLE users (
	UserID	integer PRIMARY KEY,
	Login	text NOT NULL,
	Salt	bytea NOT NULL,
	Viewed	integer ARRAY
);
// Таблица гостей
DROP TABLE IF EXISTS guests;
CREATE TABLE guests (
	Viewed	integer ARRAY
);
// Таблица модераторов
DROP TABLE IF EXISTS moderators;
CREATE TABLE moderators (
	Login	text NOT NULL,
	Salt	bytea NOT NULL
);
// Таблица админов
DROP TABLE IF EXISTS administrators;
CREATE TABLE administrators (
	Login	text NOT NULL,
	Salt	bytea NOT NULL
);

// Таблица комментариев
DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
	Film	integer NOT NULL,
	User	integer NOT NULL,
	Data 	text
);

// Таблица подписок
DROP TABLE IF EXISTS membership;
CREATE TABLE membership (
	User	integer NOT NULL,
	ExpDate	date NOT NULL
);

// Таблица фильмов
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

// Таблица жанров фильмов
DROP TABLE IF EXISTS genres;
CREATE TABLE genres (
	User	integer NOT NULL,
	ExpDate	date NOT NULL
);

