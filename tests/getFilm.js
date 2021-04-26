'use strict';

const Task = require('./framework/task');
const { assert } = require('./framework/helper');
const Database = require('../app/interfaces/db');

const fakeDB = () => new Database({
    connectionString: `postgresql://${process.env.USER}:${process.env.USER}@localhost:5432/application`,
    ssl: false
});

const fakeRegistration = (reqData, callback) => {
    const db = fakeDB();

    let result;
    db.isReady.then(async () => {
        const Register = require('../app/interfaces/routs/register.js');
        const req = { db };
        req.body = reqData;
        const res = {
            status() {
                return {
                    end() { }
                }
            },
            send(data) {
                callback(data);
                return {
                    end() { }
                }
            }
        };

        const query = db.sql().remove().inTable('users').where({ login: `=${reqData.email}` });
        await query.exec();
        await Register(req, res);
        const query2 = db.sql().remove().inTable('users').where({ login: `=${reqData.email}` });
        await query2.exec();
    });
}

const fakeGetFilm = (reqData, callback) => {
    const db = fakeDB();

    let result;
    db.isReady.then(async () => {
        const getFilm = require('../app/interfaces/routs/getFilmById.js');
        const req = { db };
        req.body = reqData;
        const res = {
            status() {
                return {
                    end() { }
                }
            },
            send(data) {
                callback(data);
                return {
                    end() { }
                }
            }
        };
        getFilm(req, res);
    });
}

module.exports = [	
	new Task(
		'Test comments quantity:',
		'post', '/showComments',
		(res, data) => assert(JSON.parse(data).length, 8)
	),

	new Task(
		'Test for userid of comment ¹4:',
		'post', '/showComments',
		(res, data) => assert(JSON.parse(data)[3].userid, 1)
    ),

    new Task(
        'Test of registration ',
        'post', '/register',
        (res, data1) => fakeRegistration(
            { email: 'new_user', password: 'new_password' },
            data2 => assert(data1, data2)
        ),
        '{"email":"new_user","password":"new_password"}'
    ),

    new Task(
        'Test for getting film with film id 1:',
        'post', '/getFilmById',
        (res, data1) => fakeGetFilm(
            { id: 1 },
            data2 => assert(data1, data2)
        ),
        '{"id":1}'
    ),

    new Task(
        'Test for getting film with film id 6:',
        'post', '/getFilmById',
        (res, data1) => fakeGetFilm(
            { id: 6 },
            data2 => assert(data1, data2)
        ),
        '{"id":6}'
    ),
];