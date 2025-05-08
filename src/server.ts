import express from 'express';
import pokemonRoutes from './routes/pokemon'; // Asegúrate de que este sea el nombre correcto del archivo y exportación

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use('/api', pokemonRoutes); // Usa el enrutador para manejar las rutas bajo '/api'


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});