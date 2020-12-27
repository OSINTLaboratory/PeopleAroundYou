DROP TABLE IF EXISTS users;
CREATE TABLE users (
	userid	SERIAL PRIMARY KEY,
	login	VARCHAR(60) NOT NULL,
	hash	VARCHAR(64) NOT NULL UNIQUE,
	viewed	integer ARRAY NULL
);

DROP TABLE IF EXISTS guests;
CREATE TABLE guests (
	viewed	integer ARRAY NULL
);

DROP TABLE IF EXISTS moderators;
CREATE TABLE moderators (
	login	VARCHAR(60) NOT NULL,
	hash	VARCHAR(64) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS administrators;
CREATE TABLE administrators (
	login	VARCHAR(60) NOT NULL,
	hash	VARCHAR(64) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
	filmid	integer NOT NULL,
	userid	integer NOT NULL,
	textdata 	VARCHAR(256) NOT NULL
);

DROP TABLE IF EXISTS membership;
CREATE TABLE membership (
	userid	integer NOT NULL,
	expdate	date NOT NULL
);

DROP TABLE IF EXISTS films;
CREATE TABLE films (
	filmid	SERIAL PRIMARY KEY,
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
	genreid	SERIAL PRIMARY KEY,
	lable	VARCHAR(60) NOT NULL
);

INSERT INTO users(login, hash, viewed) 
  VALUES ('user0', 'e79e1ec22b533d8777ae3082a6f478311525521b46c1fdd38ac90df37f0b4a34', '{1,0,9,24,5,16,7}');
INSERT INTO users(login, hash, viewed) 
  VALUES ('user1', '46720a28913e48a4327c155775e4f023f1af473a6c0ea0cc2ce60650c639318e', '{1,2,6,15,5,16,7,17,18,20}');
INSERT INTO users(login, hash, viewed) 
  VALUES ('user2', '6692c6d458ee6ad2951fbea3c65c8e779b18ec2ad5c8d611f693bb08842f72c1', '{19, 20, 22, 21, 13, 3, 14, 8, 9}');
INSERT INTO users(login, hash)
  VALUES ('user4', 'd7c908e405b358727174e6ff76b5ed277fc8e9f875c8d66c434c75ea8df296a7');

INSERT INTO genres(lable) VALUES ('Природа');
INSERT INTO genres(lable) VALUES ('Урбан');
INSERT INTO genres(lable) VALUES ('КофиЁчек');
INSERT INTO genres(lable) VALUES ('Киберпанк');
INSERT INTO genres(lable) VALUES ('Design hud');

INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Bitcoin', 2017, 5.45, 300469, 'Bitcoin.png', 4, true, 'Bitcoin.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Bridge', 2015, 7.25, 76489, 'Bridge.png', 2, true, 'Bridge.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Buildings', 2002, 8.90, 103538, 'Buildings.png', 2, true, 'Buildings.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Car', 2020, 9.56, 3235900, 'Car.png', 4, false, 'Car.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Cherry', 2011, 8.98, 7853234, 'Cherry.png', 2, false, 'Cherry.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('City', 204, 5.02, 4520683, 'City.png', 2, true, 'City.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Coffee', 2020, 9.99, 7099098, 'Coffee.png', 3, true, 'Coffee.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Computer', 1998, 3.67, 367833, 'Computer.png', 5, true, 'Computer.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Design', 2004, 4.39, 46368008, 'Design.png', 5, true, 'Design.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Dubai', 2015, 8.77, 52453, 'Dubai.png', 2, true, 'Dubai.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Fire', 2012, 4.91, 34687900, 'Fire.png', 1, true, 'Fire.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Futuristic', 2013, 6.72, 12319056, 'Futuristic.png', 4, true, 'Futuristic.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Glitch', 2020, 7.68, 7099098, 'Glitch.png', 5, false, 'Glitch.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Hud', 2015, 5.48, 5063452, 'Hud.png', 5, true, 'Hud.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Jellyfish', 2001, 4.7, 340657, 'Jellyfish.png', 1, true, 'Jellyfish.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Landing', 2018, 7.8, 530034, 'Landing.png', 2, true, 'Landing.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Loading', 2010, 8.6, 102405, 'Loading.png', 5, true, 'Loading.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Music', 2002, 9.5, 7099098, 'Music.png', 4, true, 'Music.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Nebula', 2020, 6.65, 808540, 'Nebula.png', 1, true, 'Nebula.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Neon', 2018, 8.5, 39704210, 'Neon.png', 4, true, 'Neon.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Network', 2020, 5.95, 481024, 'Network.png', 5, true, 'Network.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Ocean', 2020, 8.84, 1080040, 'Ocean.png', 1, true, 'Ocean.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Palm Trees', 2019, 9.42, 1430078, 'Palm Trees.png', 1, true, 'Palm Trees.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Seoul', 2017, 7.9, 802379, 'Seoul.png', 2, true, 'Seoul.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Sparrow', 2016, 5.16, 6095601, 'Sparrow.png', 1, true, 'Sparrow.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Trees', 2016, 4.34, 5006062, 'Trees.png', 1, true, 'Trees.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('Wireframe', 2016, 8.43, 4290063, 'Wireframe.png', 4, true, 'Wireframe.mp4');
  
INSERT INTO films(title, year, rating, views, poster, genre, free, url) 
  VALUES ('World', 2017, 9.31, 10450090, 'World.png', 1, true, 'World.mp4');
  
  
  
INSERT INTO administrators(login, hash)
  VALUES ('adminDanya', 'e79e1ec22b533d8777ae3082a6f478311525521b46c1fdd38ac90df37f0b4a34');

INSERT INTO administrators(login, hash)
  VALUES ('adminYulya', 'e79e1ec22b533d8777ae3082a6f478311525521b46c1fdd38ac90df37f0b4a34');

INSERT INTO administrators(login, hash)
  VALUES ('adminStepa', 'e79e1ec22b533d8777ae3082a6f478311525521b46c1fdd38ac90df37f0b4a34');

INSERT INTO administrators(login, hash)
  VALUES ('adminBodya', 'e79e1ec22b533d8777ae3082a6f478311525521b46c1fdd38ac90df37f0b4a34');
