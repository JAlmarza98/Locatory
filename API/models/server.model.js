const express = require('express');
const cors = require('cors');
const path = require('path');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        //Endpoints API
        this.userPath = '/api/users';
        this.authPath = '/api/auth';
        this.categoryPath = '/api/categories';
        this.pinPath = '/api/pin';

        //DB conect
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.userPath, require('../routes/user.routes'));
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.categoryPath, require('../routes/category.routes'));
        this.app.use(this.pinPath, require('../routes/pin.routes'));
        this.app.use('*',(req, res) => {
            res.sendFile(path.resolve('public/index.html'));
        });
    }

    listen() {
        this.app.listen(this.port, () => console.log('Servidor corriendo en el puerto', this.port));
    }

}

module.exports = Server;