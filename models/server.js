const express = require("express");
const cors = require('cors');
const{dbConnection}= require("../database/config")

class Server{
  constructor(){
      this.app = express();
      this.port = process.env.PORT;
      this.authPath="/api/auth";
      this.usuariosPath= "/api/usuarios";
      this.roomsPath = '/api/habitacion';
      this.categoriasPath = '/api/categorias';
      this.buscarPath = '/api/buscar';

      this.conectarDB ();
      this.middlewares();
      this.routes();
      }

    async conectarDB(){
      await dbConnection();

      }

    middlewares(){
        //Cors
      this.app.use(cors())

        //leer datos del cuerpo en formato json
      this.app.use(express.json())

        // Carpeta public
      this.app.use(express.static("public"))
       }
      
    routes(){
      this.app.use(this.authPath ,require("../routes/auth"))
      this.app.use(this.usuariosPath ,require("../routes/usuarios"))
      this.app.use(this.roomsPath,require ('../routes/habitacion'))
      this.app.use(this.categoriasPath,require ('../routes/categorias'))
      this.app.use(this.buscarPath,require ('../routes/buscar'))

    }

    listen() {
      this.app.listen(this.port, ()=>{
      console.log("Server online port:", this.port);
    });
   } 
}

module.exports= Server;




