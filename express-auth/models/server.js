const config = require('config');
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        this.app  = express();
        this.port = config.get('PORT');
        this.usuariosPath = '/api/usuarios';

        this.initDB();
        this.middlewares();
        this.routes();
    }

    async initDB(){
        await dbConnection();
    }

    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.urlencoded({extended: true}) );
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;