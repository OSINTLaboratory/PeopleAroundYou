'use strict';
const express = require('express');
const fileUpload = require('express-fileupload');
const parser = require('body-parser');
const userAgent = require('express-useragent');
const cookieParser = require('cookie-parser');
const http = require("http");
const mime = require('mime');
const path = require('path');
const fs = require("fs");

const Core = require('../core');
const { hash } = require('./crypto');

class Http {
  constructor(port, db){
	this.agents = new Array;
	this.sessions = new Object;
	this.sessions_id = new Object;
	this.admin_perm = false;
	this.moder_perm = false;
	this.user_perm = false;
	this.db = db;
    Core.log.info('Creating http server');
    this.port = port;
    this.static_root = "app/interfaces/html";
    this.app = express();
    this.app.use(cookieParser());
    this.app.use(userAgent.express());
    this.app.use(fileUpload({ createParentPath: true }));
    this.app.use(express.static(this.static_root));
    this.app.use(parser.json());       // to support JSON-encoded bodies
    this.app.use(parser.urlencoded({     // to support URL-encoded bodies
      extended: false
    }));
	
	this.app.route('/catalog')
		.post( async (req, res) => {
			const query = this.db.sql();
			query.select(['filmid', 'title', 'year', 'rating', 'views', 'poster', 'genre'])
				.inTable('films');
				
			if(req.query.top != undefined){
				// Getting top 10 according rating
				query.order('rating DESC LIMIT 10');
			}else{
				query.order('title ASC');
			}	
			
			if(req.query.word != undefined){
				// For search query
				query.where({title:`*${req.query.word}*`});
			}
			
			await query.exec((err, result) => {
				if(err){
					Core.log.warning(err);
					res.status(500).end();
					return;
				}				
				// test data
				//result = [{"filmid":1,"title":"Bitcoin","year":2017,"rating":"5.45","views":300469,"poster":"Bitcoin.png","genre":4},{"filmid":2,"title":"Bridge","year":2015,"rating":"7.25","views":76489,"poster":"Bridge.png","genre":2},{"filmid":3,"title":"Buildings","year":2002,"rating":"8.90","views":103538,"poster":"Buildings.png","genre":2},{"filmid":4,"title":"Car","year":2020,"rating":"9.56","views":3235900,"poster":"Car.png","genre":4},{"filmid":5,"title":"Cherry","year":2011,"rating":"8.98","views":7853234,"poster":"Cherry.png","genre":2},{"filmid":6,"title":"City","year":204,"rating":"5.02","views":4520683,"poster":"City.png","genre":2},{"filmid":7,"title":"Coffee","year":2020,"rating":"9.99","views":7099098,"poster":"Coffee.png","genre":3},{"filmid":8,"title":"Computer","year":1998,"rating":"3.67","views":367833,"poster":"Computer.png","genre":5},{"filmid":9,"title":"Design","year":2004,"rating":"4.39","views":46368008,"poster":"Design.png","genre":5},{"filmid":10,"title":"Dubai","year":2015,"rating":"8.77","views":52453,"poster":"Dubai.png","genre":2},{"filmid":11,"title":"Fire","year":2012,"rating":"4.91","views":34687900,"poster":"Fire.png","genre":1},{"filmid":12,"title":"Futuristic","year":2013,"rating":"6.72","views":12319056,"poster":"Futuristic.png","genre":4},{"filmid":13,"title":"Glitch","year":2020,"rating":"7.68","views":7099098,"poster":"Glitch.png","genre":5},{"filmid":14,"title":"Hud","year":2015,"rating":"5.48","views":5063452,"poster":"Hud.png","genre":5},{"filmid":15,"title":"Jellyfish","year":2001,"rating":"4.70","views":340657,"poster":"Jellyfish.png","genre":1},{"filmid":16,"title":"Landing","year":2018,"rating":"7.80","views":530034,"poster":"Landing.png","genre":2},{"filmid":17,"title":"Loading","year":2010,"rating":"8.60","views":102405,"poster":"Loading.png","genre":5},{"filmid":18,"title":"Music","year":2002,"rating":"9.50","views":7099098,"poster":"Music.png","genre":4},{"filmid":19,"title":"Nebula","year":2020,"rating":"6.65","views":808540,"poster":"Nebula.png","genre":1},{"filmid":20,"title":"Neon","year":2018,"rating":"8.50","views":39704210,"poster":"Neon.png","genre":4},{"filmid":21,"title":"Network","year":2020,"rating":"5.95","views":481024,"poster":"Network.png","genre":5},{"filmid":22,"title":"Ocean","year":2020,"rating":"8.84","views":1080040,"poster":"Ocean.png","genre":1},{"filmid":23,"title":"Palm Trees","year":2019,"rating":"9.42","views":1430078,"poster":"Palm Trees.png","genre":1},{"filmid":24,"title":"Seoul","year":2017,"rating":"7.90","views":802379,"poster":"Seoul.png","genre":2},{"filmid":25,"title":"Sparrow","year":2016,"rating":"5.16","views":6095601,"poster":"Sparrow.png","genre":1},{"filmid":26,"title":"Trees","year":2016,"rating":"4.34","views":5006062,"poster":"Trees.png","genre":1},{"filmid":27,"title":"Wireframe","year":2016,"rating":"8.43","views":4290063,"poster":"Wireframe.png","genre":4},{"filmid":28,"title":"World","year":2017,"rating":"9.31","views":10450090,"poster":"World.png","genre":1}];
				res.send(JSON.stringify(result)).end();
			});
		});
		
	this.app.route('/genres')
		.post( async (req, res) => {
			const query = this.db.sql();
			query.select(['lable'])
				.inTable('genres')
				.order('genreid');
			await query.exec((err, result) => {
				if(err){
					Core.log.warning(err);
					res.status(500).end();
					return;
				}
				res.send(JSON.stringify(result)).end();
			});
		});
	
	this.app.route('/login')
		.post(async (req, res) => {
			const salt = req.body.email;
			const hashed_pass = hash(req.body.password + salt);
			const query_users = this.db.sql();
			const query_admins = this.db.sql();
			const query_moders = this.db.sql();
			query_users.select(["hash"])
				.inTable('users')
				.where({ login: `=${req.body.email}` });
			query_admins.select(["hash"])
				.inTable('administrators')
				.where({ login: `=${req.body.email}` });
			query_moders.select(["hash"])
				.inTable('moderators')
				.where({ login: `=${req.body.email}` });
				
			const successAuth = () => {
				const session = Math.random().toString(16);
				res.cookie('session', session, { maxAge: 900000, httpOnly: true });
				this.sessions_id[hash(JSON.stringify(req.useragent))] = session;
				this.sessions[session] = req.body.email;
				res.status(200).end();
			};
			const userNotFound = () => {
				res.status(401).end();
			};
			const userInvalidPass = () => {
				res.status(401).end();
			};
			
			await query_users.exec( async (err, result) => {
				if(err) {
					Core.log.warning(err);
				}
				if(result[0] != undefined) {
					if(result[0].hash === hashed_pass) {
						this.user_perm = true;
						successAuth();
					} else {
						userInvalidPass();
					}
				} else {
					await query_moders.exec( async (err, result) => {
						if(err) {
							Core.log.warning(err);
						}
						if(result[0] != undefined) {
							if(result[0].hash === hashed_pass) {
								this.moder_perm = true;
								successAuth();
							} else {
								userInvalidPass();
							}
						} else {
							await query_admins.exec((err, result) => {
								if(err) {
									Core.log.warning(err);
								}
								if(result[0] != undefined) {
									if(result[0].hash === hashed_pass) {
										this.moder_perm = true;
										this.admin_perm = true;
										successAuth();
									} else {
										userInvalidPass();
									}
								} else {
									userNotFound();
								}
							});
						}
					});
				}
			});
		});
		
	this.app.route('/islogin')
		.post(async (req, res) => {
			if(
				this.admin_perm ||
				this.moder_perm ||
				this.user_perm
			){
				res.send("true").end(200);
			} else {
				res.send("false").end(200);
			}
		});
		
	this.app.route('/recomendations')
		.post(async (req, res) => {
			if(req.cookies === undefined){
				res.end(200);
				return;
			}
			
			if(req.cookies['session'] === undefined){
				res.end(200);
				return;
			}
			
			if(this.sessions_id[hash(JSON.stringify(req.useragent))] === undefined){
				res.end(200);
				return;
			}
			
			if(this.sessions_id[hash(JSON.stringify(req.useragent))] != req.cookies['session']){
				res.end(200);
				return;
			}
			// Get current user login from session
			const login = this.sessions[this.sessions_id[hash(JSON.stringify(req.useragent))]];
			// Get list of films if viewed by current user
			let query = this.db.sql();
			query.select(['viewed'])
				.inTable('users')
				.where({ login: `=${login}` });
			await query.exec( async (err, result) => {
				if (err) {
					Core.log.warning(err);
					res.status(500).end();
					return;
				}
				const arrOfFilmIDs = result[0].viewed;
				console.log(arrOfFilmIDs);
				// Create map of genre->count of viewed by this user
				const viewed_genres_dat = new Object;
				for(const filmId of arrOfFilmIDs){
					query = this.db.sql();
					query.select(['genre'])
						.inTable('films')
						.where({ filmid: parseInt(filmId) });
					await query.exec((err, result) => {
						if (err) {
							Core.log.warning(err);
							res.status(500).end();
							return;
						}
						if(result[0] === undefined){
							return;
						}
						
						if(viewed_genres_dat[result[0].genre] === undefined){
							viewed_genres_dat[result[0].genre] = 0;
						}else{
							viewed_genres_dat[result[0].genre]++;
						}
					});
				}
				
				// Search of max viewed genre
				const max_viewed_genre = {
					genre: 0,
					count: 0
				};
				for(const genre in viewed_genres_dat){
					const count = viewed_genres_dat[genre];
					if(count > max_viewed_genre.count){
						max_viewed_genre.count = count;
						max_viewed_genre.genre = genre;
					}
				}
				
				// Select first 3 film by rating with founded genre
				query = this.db.sql();
				query.select(['filmid', 'title', 'year', 'rating', 'views', 'poster', 'genre'])
					.inTable('films')
					.order('rating DESC LIMIT 3');
				await query.exec((err, result) => {
					if (err) {
						Core.log.warning(err);
						res.status(500).end();
						return;
					}
					res.send(JSON.stringify(result)).end();
				});
			});
		});
		
	this.app.route('/register')
		.post( async (req, res) => {
			const salt = req.body.email;
			const query = this.db.sql();
			query.insert({
					login: req.body.email,
					hash: hash(req.body.password + salt)
				})
				.inTable('users');
			await query.exec((err, result) => {
				if (err) {
					Core.log.warning(err);
					res.status(500).end();
					return;
				}
				res.status(200).end();
			});
		});
		
	this.app.route('/filter')
		.post( async (req, res) => {
			const query = this.db.sql();
			query.select(['filmid', 'title', 'year', 'rating', 'views', 'poster', 'genre'])
				.inTable('films');
				
			if(req.body.sort === 'RATING'){
				query.order('rating DESC');
			}else if(req.body.sort === 'ALP_ASC'){
				query.order('title ASC');
			}else if(req.body.sort === 'ALP_DESC'){
				query.order('title DESC');
			}else if(req.body.sort === 'YEAR_DESC'){
				query.order('year DESC');
			}else if(req.body.sort === 'YEAR_ASC'){
				query.order('year ASC');
			}else if(req.body.sort === 'VIEWS'){
				query.order('views ASC');
			}
			if(req.body.year_to != ''){
				query.where({year:`<${req.body.year_to}`});
			}
			if(req.body.year_from != ''){
				query.where({year:`>${req.body.year_from}`});
			}
			if(req.body.genre != ''){
				query.where({genre:parseInt(req.body.genre)});
			}
			await query.exec((err, result) => {
				if(err){
					Core.log.warning(err);
					res.status(500).end();
					return;
				}
				res.send(JSON.stringify(result)).end();
			});
		});
		
		this.app.route('/random')
		 .post(async (req, res) => {
			const query = this.db.sql();

			query.select(['filmid'])
			  .inTable('films')
			  .orderBy('RANDOM() LIMIT(1)');

			await query.exec(async (err, result) => {
			  if (err) {
				Core.log.warning(err);
				res.status(500).end();
				return;
			  }
			  res.send(result[0].filmid).end();
			});
		});

	  
	this.app.route('/player')
		.get(async (req, res) => {
			res.sendFile(path.join(__dirname + '/html/player.html'));
		});

	this.app.route('/getFilm')
		.post(async  (req, res) => {
			const id = req.body.id;		
			const query = this.db.sql();
			query.select(['filmid', 'title', 'year', 'rating', 'views', 'poster', 'genre'])
				.inTable('films')
				.where({ filmid: id });

			await query.exec((err, result) => {
				if(err) {
					Core.log.warning(err);
					res.status(500).end();
					return;
				}
				res.send(JSON.stringify(result)).end();
			});
		});
	  
	  
	this.app.route('/admin')
		.get(async (req, res) => {
			if(this.admin_perm){
				res.sendFile(path.join(__dirname + '/html/admin.html'));
			} else {
				res.status(403).end();
			};
		});

	this.app.route('/adminPanel')
		.post(async (req, res) => {
			console.log(req.body);
			const salt = req.body.email;
			const query = this.db.sql();
			const table = req.body.role === 'Администратор' ? 'administrators' : 'moderators';
			query.insert({
				  login: req.body.email,
				  hash: hash(req.body.password + salt)
				 })
				.inTable(table);

			await query.exec((err, result) => {
				if (err) {
					Core.log.warning(err);
					res.status(500).end();
					return;
				}
				res.status(200).end();
			});

		});
	  
	this.app.route('/moderation')
		.get(async (req, res) => {
			if (this.moder_perm) {
			    res.sendFile(path.join(__dirname + '/html/moderationPage.html'));
			} else {
			    res.status(403).end();
			};
		});
	  
	this.app.route('/showFilms')
		.post(async  (req, res) => {
			const query = this.db.sql();

			query.select(['filmid', 'title', 'year', 'rating', 'views', 'poster', 'genre', 'free', 'url'])
				.inTable('films');

			await query.exec((err, result) => {
				if (err) {
					Core.log.warning(err);
					res.status(500).end();
					return;
				}
				res.send(JSON.stringify(result)).end();
			});
		});
	  
	this.app.route('/removeFilm')
		.post(async  (req, res) => {
		  	if (this.moder_perm) {
				const query = this.db.sql();

				query.remove().inTable('films').where({ filmid: `=${req.body.id}` });

				await query.exec((err, result) => {
					if (err) {
						Core.log.warning(err);
						res.status(500).end();
						return;
					}

					res.status(200).end();
				});
			} else {
				res.status(403).end();
			}
		});
	  
	  this.app.route('/addFilm')
		  .post(async  (req, res) => {
			  const poster = req.files.poster;
			  const movie = req.files.url;
			  const posterType = poster.mimetype;
			  const movieType  =  movie.mimetype;
			  const posterName = req.body.title + `.${posterType.slice(posterType.indexOf('/') + 1)}`;
			  const movieName = req.body.title + `.${movieType.slice(movieType.indexOf('/') + 1)}`;

			  poster.mv('app/interfaces/html/posters/' + posterName);
			  movie.mv('app/interfaces/html/films/' + movieName);

			  let genre;
			  const genreQuery = this.db.sql();
			  genreQuery.select(['genreid']).inTable('genres').where({ lable: `=${req.body.genre}` });
			  await genreQuery.exec(async (err, result) => {
				  if (err) {
					  Core.log.warning(err);
					  res.status(500).end();
					  return;
				  }

				  genre = result[0].genreid;

				  const query = this.db.sql();
				  query.insert({
					  title: req.body.title,
					  year: +req.body.year,
					  poster: posterName,
					  genre,
					  free: !!req.body.free,
					  url: movieName,
				  }).inTable('films');

				  await query.exec((err) => {
					  if (err) {
						  Core.log.warning(err);
						  res.status(500).end();
						  return;
					  }
					  res.status(200).end();
				  });
			  });
		  });
	  
	  this.app.route('/showComments')
		  .post(async  (req, res) => {
			  const query = this.db.sql();

			  query.select(['commentid', 'filmid', 'userid', 'textdata', 'approved'])
				  .inTable('comments');

			  await query.exec((err, result) => {
				  if (err) {
					  Core.log.warning(err);
					  res.status(500).end();
					  return;
				  }
				  res.send(JSON.stringify(result)).end();
			  });
		  });

	  this.app.route('/removeComment')
		  .post(async  (req, res) => {
			  if (this.moder_perm) {
				  const query = this.db.sql();

				  query.remove().inTable('comments').where({ commentid: `=${req.body.id}` });

				  await query.exec(err => {
					  if (err) {
						  Core.log.warning(err);
						  res.status(500).end();
						  return;
					  }

					  res.status(200).end();
				  });
			  } else {
				  res.status(403).end();
			  }
		  });
	  
	  this.app.route('/approveComment')
		  .post(async  (req, res) => {
			  if (this.moder_perm) {
				  const query = this.db.sql();

				  query.update('approved')
					  .inTable('comments')
					  .set(true)
					  .where({ commentid: `=${req.body.id}` });

				  await query.exec(err => {
					  if (err) {
						  Core.log.warning(err);
						  res.status(500).end();
						  return;
					  }

					  res.status(200).end();
				  });
			  } else {
				  res.status(403).end();
			  }
		  });
  
	  
    this.app.listen(this.port, () => {
      Core.log.info('Http server started');
    });
  }

  App()
  {
    return this.app;
  }
};



module.exports = Http;
