import https from 'https'; // Módulo nativo de Node.js
import fs from 'fs/promises'; // Para manejar archivos de forma asíncrona

export const fetchAndSavePokemonData = async (limit: number, fetchPokemon: (id: number) => Promise<any>): Promise<any[]> => {
  const allPokemon: any[] = [];

  // Leer el archivo JSON existente (si existe)
  try {
    const existingData = await fs.readFile('pokemon-data.json', 'utf-8');
    const parsedData = JSON.parse(existingData);
    allPokemon.push(...parsedData); // Agregar los datos existentes al array
  } catch (error) {
    console.log('No se encontró un archivo existente. Se creará uno nuevo.');
  }

  try {
    for (let id = 1; id <= limit; id++) { // Iterar desde el ID 1 hasta el límite especificado
      const data = await fetchPokemon(id); // Llamar a la función para obtener datos del Pokémon
      allPokemon.push(data); // Agregar los datos del Pokémon al array
    }

    // Guardar los datos acumulados en un archivo JSON
    await fs.writeFile('pokemon-data.json', JSON.stringify(allPokemon, null, 2), 'utf-8');

    return allPokemon; // Retornar los datos obtenidos
  } catch (error) {
    console.error('Error al consumir la API externa:', error);
    throw new Error('Error al obtener la información de los Pokémon');
  }
};