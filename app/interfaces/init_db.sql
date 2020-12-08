DROP TABLE IF EXIST users;

CREATE TABLE  users (
	UserID	integer PRIMARY KEY,
	Login	text NOT NULL,
	Salt	bytea NOT NULL,
	Viewed	integer ARRAY
);