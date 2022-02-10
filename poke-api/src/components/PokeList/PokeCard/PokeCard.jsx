import React from "react";

function PokeCard({ pokemon }) {
  return (
    <div className="Card">
      <div className="Card__img">
        <img src={pokemon.data.sprites.front_default} alt="pokemon" />
      </div>
      <div className="Card__Name">{(pokemon.data.name)}</div>
      <div className="Card__types">
        {pokemon.data.types.map((type) => {
          console.log(type);
          return <div className="Card__type">{type.name}</div>;
        })}
      </div>
      <div className="Card__info">
        <div className="Card__data Card__data--weight">
          <p className="title">Weight</p>
          <p> {pokemon.data.weight} </p>
        </div>
        <div className="Card__data Card__data--height">
          <p className="title">Height</p>
          <p> {pokemon.data.height} </p>
        </div>
      </div>
    </div>
  );
}

export default PokeCard;
