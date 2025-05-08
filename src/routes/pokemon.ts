import https from 'https'; // Módulo nativo de Node.js
import { Router } from 'express';
import { fetchAndSavePokemonData } from '../services/pokemonServices'; // Ajusta la ruta según tu estructura de carpetas

const router = Router();

router.get('/pokemon-info/all', async (req, res) => {
  const limit = 2; // Límite de IDs (por defecto 5)

  const fetchPokemon = (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      https.get(`https://pokeapi.co/api/v2/pokemon/${id}`, (response) => {
        let data = '';

        // Recibir datos en fragmentos
        response.on('data', (chunk) => {
          data += chunk;
        });

        // Finalizar la recepción de datos
        response.on('end', () => {
          try {
            resolve(JSON.parse(data)); // Convertir a JSON
          } catch (error) {
            reject(error);
          }
        });
      }).on('error', (error) => {
        reject(error);
      });
    });
  };

  try {
    const allPokemon = await fetchAndSavePokemonData(limit, fetchPokemon); // Llamar al servicio
    res.status(200).json({ success: true, message: 'Datos guardados en pokemon-data.json', data: allPokemon });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener la información de los Pokémon' });
  }
});

export default router;