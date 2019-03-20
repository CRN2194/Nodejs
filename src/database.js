const mysql=require('mysql');
const {promisify}=require('util');
const {database} = require('./keys');

const pool=mysql.createPool(database);

pool.getConnection((err, conex) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('La conexion fue cerrada');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Muchas conexiones');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('ERROR');
        }
    }
    if(conex) conex.release();
    console.log('Conectado');
    return;
});

pool.query=promisify(pool.query);
module.exports = pool;