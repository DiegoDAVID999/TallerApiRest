import  Router  from "express";

const routesParkin = Router();

import { postParkinCelda, getParkinCelda,getParkinCeldaById,getParkinCeldaEstado,putParkinCelda,deleteParkinCelda, parkear,valorApagar, liberarCelda } from "../controllers/parkinController.js";

routesParkin.post('/', postParkinCelda)
routesParkin.get('/', getParkinCelda)
routesParkin.get('/:id', getParkinCeldaById)
routesParkin.get('/estado/:estado', getParkinCeldaEstado)
routesParkin.put('/:id', putParkinCelda)
routesParkin.delete('/:id', deleteParkinCelda)
routesParkin.post('/parquear', parkear)
routesParkin.get('/pagar/:id', valorApagar)
routesParkin.post('/liberar/:id', liberarCelda)
export default routesParkin