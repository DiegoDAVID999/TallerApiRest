import Celda from '../models/celdaParkin.js';
import Counter from '../models/autoincrement.js';
import bcrypt from 'bcrypt';


//Hacer la insersion:post
export async function postParkinCelda(req, res) {
    try {
      const celdasCount = await Celda.countDocuments();
      if (celdasCount >= 10) {
        return res.status(400).json({ message: 'Límite de celdas alcanzado' });
      }
  
      const nuevaCelda = new Celda({
        numeroCelda: celdasCount + 1,
        estado: req.body.estado || 'disponible',
        placaVehiculo: req.body.placaVehiculo || '',
        fechaIngreso:  req.body.placaVehiculo ? new Date() : null,
        pin: req.body.pin || ''
      });
  
      const celdaGuardada = await nuevaCelda.save();
      res.status(201).json(celdaGuardada);
    } catch (error) {
      console.error('Error al crear la celda:', error); // Agrega más detalles aquí
      res.status(500).json({ message: 'Error al crear la celda.', error: error.message });
    }
  }
  

//celda por el id
export async function getParkinCeldaById(req, res) {
    try {
        const celda = await Celda.findById(req.params.id);
        if (!celda) {
          return res.status(404).json({ message: 'Celda no encontrada.' });
        }
        res.json(celda);
      } catch (error) {
        res.status(500).json({ message: 'Error al recuperar la celda.', error });
      }
    };


//recuperar todas las celdas 
export async function getParkinCelda(req, res) {
    try {
        const celdas = await Celda.find()
        res.json(celdas)
    } catch (error) {
        res.status(500).json({message: 'Error al recuperar las celdas.', error})
        
    }
}

//encontrar celda por el estado
export async function getParkinCeldaEstado(req, res) {
        try {
          const celdas = await Celda.find({ estado: req.params.estado });
          res.json(celdas);
        } catch (error) {
          res.status(500).json({ message: 'Error al recuperar las celdas.', error });
        }
      };
      




//actualizar: put
export async function putParkinCelda(req, res) {
    try {
        const celda = await Celda.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!celda) {
          return res.status(404).json({ message: 'Celda no encontrada.' });
        }
        res.json(celda);
      } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la celda.', error });
      }
    };

//eliminar celda por id
export async function deleteParkinCelda(req, res){
    try {
        const celda = await Celda.findByIdAndDelete(req.params.id);
        if (!celda) {
          return res.status(404).json({ message: 'Celda no encontrada.' });
        }
        res.json({ message: 'Celda eliminada.' });
      } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la celda.', error });
      }
    };

    
    export async function parkear(req, res) {
        
            try {
                // Buscar una celda disponible
                const celda = await Celda.findOne({ estado: 'disponible' });
                if (!celda) {
                  return res.status(404).send('No hay celdas disponibles');
                }
            
                // Mostrar información de la celda encontrada
                console.log('Celda encontrada:', celda);
            
                // Actualizar la celda con la información del vehículo
                celda.estado = 'no disponible';
                celda.placaVehiculo = req.body.placaVehiculo;
                celda.fechaIngreso = new Date();
                celda.pin = bcrypt.hashSync(`${celda.numeroCelda}${req.body.placaVehiculo}`, 10);
            
                // Mostrar información antes de guardar
                console.log('Celda actualizada:', celda);
            
                // Guardar los cambios
                const celdaActualizada = await celda.save();
            
                // Mostrar información de la celda actualizada
                console.log('Celda actualizada guardada:', celdaActualizada);
            
                // Enviar la respuesta con la celda actualizada
                res.send(celdaActualizada);
              } catch (error) {
                console.log('Error:', error);
                res.status(500).send('Error en el servidor');
              }
    };
          

      export async function valorApagar (req, res)  {
        try {
          const celda = await Celda.findById(req.params.id);
          if (!celda || !celda.fechaIngreso) {
            return res.status(400).json({ message: 'La celda no está ocupada.' });
          }
          const fechaSalida = new Date();
          const horas = Math.max(1, Math.floor((fechaSalida - celda.fechaIngreso) / (1000 * 60 * 60)));
          const valorAPagar = horas * 5000;
      
          res.json({ horas, valorAPagar });
        } catch (error) {
          res.status(500).json({ message: 'Error al calcular el valor a pagar.', error });
        }
      };


      export async function liberarCelda (req, res) {
        try {
          const celda = await Celda.findById(req.params.id);
          if (!celda || celda.estado === 'disponible') {
            return res.status(400).json({ message: 'La celda ya está disponible.' });
          }
      
          celda.estado = 'disponible';
          celda.placaVehiculo = '';
          celda.fechaIngreso = null;
          celda.fechaSalida = new Date();
          celda.pin = '';
      
          await celda.save();
          res.json(celda);
        } catch (error) {
          res.status(500).json({ message: 'Error al liberar la celda.', error });
        }
      };
      
      
      