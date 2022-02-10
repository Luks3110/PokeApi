import React, { useState, useEffect } from "react";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";
import PokeCard from "../../components/PokeList/PokeCard/PokeCard";

function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [prevPageUrl, setPrevPageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [pokemonDetails, setPokemonDetails] = useState("");
  const [pokemonData, setPokemonData] = useState("");

  async function getAllPokemon(url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then((res) => {
        resolve(res.data);
      });
    });
  }

  async function getPokemon(url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then((res) => {
        resolve(res);
      });
    });
  }

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      let response = await getAllPokemon(currentPageUrl);
      setNextPageUrl(response.next);
      setPrevPageUrl(response.previous);
      setPokemon(response.results.map((p) => p.name));
      await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, [currentPageUrl]);

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async pokemon => {
        let pokemonRecord = await getPokemon(pokemon.url);
        console.info(pokemonRecord.data.name);
        console.info(pokemonRecord.data.types);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }
  return (
    <div>
        { loading ? <h1>Loading...</h1> :(
            <>
            <div>
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
      {pokemonData.map((pokemon, i) => {
          return <PokeCard key={i} pokemon={pokemon} />
      })}
    </div>
    </>
  )}
  </div>
  )
}

export default Home;
