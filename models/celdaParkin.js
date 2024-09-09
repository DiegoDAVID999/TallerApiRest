
import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';


//define eñ esquema de la coleccion 
const celdaParkinSchema =  new Schema({ 
    numeroCelda: {
        type: Number,
        unique: true,
        required: true,
        
      },
      estado: {
        type: String,
        enum: ['disponible', 'no disponible'],
        default: 'disponible',
      },
      placaVehiculo: {
        type: String,
        maxlength: 6,
      
      
      },
      fechaIngreso: {
        type: Date,
      },
      fechaSalida: {
        type: Date,
      },
      pin: {
        type: String,
      },
    });

    celdaParkinSchema.pre('save', async function(next) {
      if (this.isModified('pin')) {
        this.pin = await bcrypt.hash(this.pin, 10);
      }
      next();
    });
// creamos una coleccion y la exporto
export default model('Celda', celdaParkinSchema, 'celda' )  