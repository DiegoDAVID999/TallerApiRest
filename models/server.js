import express from 'express'
import 'dotenv/config'
import dbConection from '../dataBase/config.js'
import routesParkin from '../routes/routesParkinCelda.js'



export default class Server{
    constructor(){
        this.app = express()
        this.listen()
        this.dbConnect()
        this.pathParkin = '/api/parkin' //link publico de la api
        this.route()
    }

    //escuchar el servidor y especificar el puerto
    listen(){ 
        this.app.listen(process.env.PORT, ()=> {
            console.log(`Server is running in PORT ${process.env.PORT}`)
        })
    }

    async dbConnect(){
        await dbConection()
    }

    route(){
        this.app.use(express.json()) //convertir data a json
        this.app.use(this.pathParkin, routesParkin )
     
    }
}