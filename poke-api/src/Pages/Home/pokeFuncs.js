import axios from 'axios';

export async function getAllPokemon(url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
        console.error('Deu ruim', err);
      });
    });
  }

export async function getPokemon(url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
        console.error('Deu ruim', err);
      });
    });
  }