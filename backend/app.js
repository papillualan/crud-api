const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();  // Carga las variables de entorno desde el archivo .env

const app = express();
app.use(cors());
app.use(express.json());

// Usa la cadena de conexión de Atlas desde el archivo .env
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado con éxito'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
