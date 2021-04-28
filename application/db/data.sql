INSERT INTO "SystemUser" ("login", "password") VALUES
  ('admin', '$scrypt$N=32768,r=8,p=1,maxmem=67108864$XcD5Zfk+BVIGEyiksBjjy9LL42AFOOqlhEB650woECs$3CNOs25gOVV8AZMYQc6bFnrYdM+3xP996shxJEq5LxGt4gs1g9cocZmi/SYg/H16egY4j7qxTD/oygyEI80cgg'),
  ('marcus', '$scrypt$N=32768,r=8,p=1,maxmem=67108864$aGKuH5D2zndi6zFu74/rEj5m3u5kRh5b+QXYfKrhAU8$257up1h/3R9CoxH2382zX0+kbxRPrd+GwzJIxYI+K+gBYCcLrA8Z6wv7lSwLElfbDTJRgUhQJFhMT1tpp5AJxw'),
  ('user', '$scrypt$N=32768,r=8,p=1,maxmem=67108864$z5uf2xGdpgq5v2sZbgh36QoZG9CDmGmJUNJkrs1zs2w$3s3x22k4Td0jkup4WduFQGFVjrFKHjN1WV9k8/Bh3DKI58Wrlo/D4Js9j/DiskwI8rltDd8pF15JylivFu2T0g'),
  ('iskandar', '$scrypt$N=32768,r=8,p=1,maxmem=67108864$EfcPTou2sTms7Esp4lsbJddN2RLAqqZUhP6sflwT7KU$FJiY0ad+qeNtZyFa0sXfQfeSIDS5HYS8wMk2/gtUlqy5vBddzVgKQYDqF5lKMNCm7IpOaYUZtRv7BQbxbVgkYg');

-- Examples login/password
-- admin/123456
-- marcus/marcus
-- user/nopassword
-- iskandar/zulqarnayn

INSERT INTO "SystemGroup" ("name") VALUES
  ('admins'),
  ('moderators'),
  ('users'),
  ('guests');

INSERT INTO "SystemGroupSystemUser" ("systemGroupId", "systemUserId") VALUES
  (1, 1),
  (2, 2),
  (2, 3),
  (2, 4);

INSERT INTO genres(lable) VALUES ('Природа');
INSERT INTO genres(lable) VALUES ('Урбан');
INSERT INTO genres(lable) VALUES ('КофиЁчек');
INSERT INTO genres(lable) VALUES ('Киберпанк');
INSERT INTO genres(lable) VALUES ('Design hud');

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Bitcoin', 2017, 5.45, 300469, 'Bitcoin.png', 4, true, 'Bitcoin.mp4', 235600);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Bridge', 2015, 7.25, 76489, 'Bridge.png', 2, true, 'Bridge.mp4', 27457);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Buildings', 2002, 8.90, 103538, 'Buildings.png', 2, true, 'Buildings.mp4', 2657);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Car', 2020, 9.56, 3235900, 'Car.png', 4, false, 'Car.mp4', 934613);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Cherry', 2011, 8.98, 7853234, 'Cherry.png', 2, false, 'Cherry.mp4', 978900);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('City', 2004, 5.02, 4520683, 'City.png', 2, true, 'City.mp4', 90064);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Coffee', 2020, 9.99, 7099098, 'Coffee.png', 3, true, 'Coffee.mp4', 390342);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Computer', 1998, 3.67, 367833, 'Computer.png', 5, true, 'Computer.mp4', 237309);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Design', 2004, 4.39, 46368008, 'Design.png', 5, true, 'Design.mp4', 562457);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Dubai', 2015, 8.77, 52453, 'Dubai.png', 2, true, 'Dubai.mp4', 6796);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Fire', 2012, 4.91, 34687900, 'Fire.png', 1, true, 'Fire.mp4', 7895);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Futuristic', 2013, 6.72, 12319056, 'Futuristic.png', 4, true, 'Futuristic.mp4', 5678);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Glitch', 2020, 7.68, 7099098, 'Glitch.png', 5, false, 'Glitch.mp4', 2457);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Hud', 2015, 5.48, 5063452, 'Hud.png', 5, true, 'Hud.mp4', 624579);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Jellyfish', 2001, 4.7, 340657, 'Jellyfish.png', 1, true, 'Jellyfish.mp4', 24576);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Landing', 2018, 7.8, 530034, 'Landing.png', 2, true, 'Landing.mp4', 65796);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Loading', 2010, 8.6, 102405, 'Loading.png', 5, true, 'Loading.mp4', 46797);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Music', 2002, 9.5, 7099098, 'Music.png', 4, true, 'Music.mp4', 26089);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Nebula', 2020, 6.65, 808540, 'Nebula.png', 1, true, 'Nebula.mp4', 80769);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Neon', 2018, 8.5, 39704210, 'Neon.png', 4, true, 'Neon.mp4', 59008);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Network', 2020, 5.95, 481024, 'Network.png', 5, true, 'Network.mp4', 80090);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Ocean', 2020, 8.84, 1080040, 'Ocean.png', 1, true, 'Ocean.mp4', 3242308);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Palm Trees', 2019, 9.42, 1430078, 'Palm Trees.png', 1, true, 'Palm Trees.mp4', 97867);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Seoul', 2017, 7.9, 802379, 'Seoul.png', 2, true, 'Seoul.mp4', 46478);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Sparrow', 2016, 5.16, 6095601, 'Sparrow.png', 1, true, 'Sparrow.mp4', 23444);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Trees', 2016, 4.34, 5006062, 'Trees.png', 1, true, 'Trees.mp4', 42356);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('Wireframe', 2016, 8.43, 4290063, 'Wireframe.png', 4, true, 'Wireframe.mp4', 59098);

INSERT INTO films(title, year, rating, views, poster, genre, free, url, rating_count)
  VALUES ('World', 2017, 9.31, 10450090, 'World.png', 1, true, 'World.mp4', 7642311);

INSERT INTO comments(filmid, userid, textdata)
  VALUES (4, 2, 'Film so bad don`t rec');

INSERT INTO comments(filmid, userid, textdata, approved)
  VALUES (15, 3, 'Noice', true);

INSERT INTO comments(filmid, userid, textdata)
  VALUES (10, 2, 'Good');

INSERT INTO comments(filmid, userid, textdata)
  VALUES (4, 1, 'Bad');

INSERT INTO comments(filmid, userid, textdata)
  VALUES (1, 3, 'Nice film about tables');

INSERT INTO comments(filmid, userid, textdata)
  VALUES (1, 3, 'Есть кто-то с снг?');

INSERT INTO comments(filmid, userid, textdata)
  VALUES (1, 4, 'Ugandas power!!!!');

INSERT INTO comments(filmid, userid, textdata, approved)
  VALUES (15, 3, '11/10, админ хороший человек', true);


