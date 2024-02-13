import mysql from 'mysql';
import * as util from 'util';
import database from './keys';

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }

    if (connection) {
        connection.release();
        console.log('DB is connected');
    }

    return;
});

pool.query = util.promisify(pool.query);

export default pool;