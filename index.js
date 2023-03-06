const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

//Definir dominios para recibir las peticiones
const whitelist = ['http://localhost:3000',' https://javierpazz.github.io/calendarfront'];
const corsOptions = {
  origin: (origin, callback) => {
    // Recisar si la peticion viene de un servidor que esta en la whitelist
    const existe = whitelist.some((dominio) => dominio === origin);
    if (existe) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por Cors'));
    }
  },
};

// CORS
app.use(cors(corsOptions));

// Directorio Público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
