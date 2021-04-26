'use strict'

const Task = require('./framework/task');
const { assert } = require('./framework/helper');
const Database = require('../app/interfaces/db');

const fakeDB = () => new Database({
    connectionString: `postgresql://postgres:2002@localhost:5432/application`,
    ssl: false
});

const fakeUsername = (reqData, callback) => {
    const db = fakeDB();


    db.isReady.then(async () => {
        const GetUsername = require('../app/interfaces/routs/getUsername.js');
        const req = { db };
        req.body = reqData;
        const res = {
            status() {
                return {
                    end() {
                    }
                }
            },
            send(data) {
                callback(data);
                return {
                    end() {
                    }
                }
            }
        };
        GetUsername(req, res);
    });
}

const fakeAdmin = (reqData, callback) => {
    const db = fakeDB();


    db.isReady.then(async () => {
        const adminPanel = require('../app/interfaces/routs/adminPanel.js');
        const req = { db };
        req.body = reqData;
        const res = {
            status() {
                return {
                    end() {
                    }
                }
            },
            send(data) {
                callback(data);
                return {
                    end() {
                    }
                }
            }
        };
        const query = db.sql().remove().inTable('administrators').where({ login: `=${reqData.email}` });
        await query.exec();

        await adminPanel(req, res);

        const query1 = db.sql().remove().inTable('administrators').where({ login: `=${reqData.email}` });
        await query1.exec();

    });
}

module.exports = [
    new Task(
        'Test access to admin page',
        'get', '/admin',
        res => assert(res.statusCode, 403)
    ),
    new Task(
        'Test main page ',
        'post', '/',
        res => assert(res.statusCode, 404)
    ),
    new Task(
        'Test if user is authorized',
        'post', '/isLogin',
        (res,data) => assert(data,'false')
    ),
    new Task(
        'Test random button page',
        'post', '/random',
        (res) => assert(res.statusCode, 200)
    ),
    new Task(
        'Test receiving username',
        'post', '/getUsername',
        (res, data1) => fakeUsername( {id: 1},data2 => assert(data1, data2)),'{"id": 1}'
    ),
    new Task(
        'Test admin access to the panel',
        'get', '/adminPanel',
        (res, data1) => fakeAdmin( {role: 'Администратор', email: 'test', password: 'pass'},
        data2 => assert(data1, data2)),'{"role": "Администратор", "email": "test", "password": "pass"}'

    ),
];


