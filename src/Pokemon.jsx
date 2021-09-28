import React from 'react';
import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

function Pokemon({pokemon, handlePokemon}) {
    const detailPokemon =() => {
        handlePokemon(pokemon)
    }

  return (
    <div  style={{padding: 10 }}>
      <Card body inverse style={{backgroundColor:"#1d4e89"}}>
        <CardImg top width="100%" src={pokemon.sprites.front_default} alt={pokemon.name} />
        <CardBody >
          <CardTitle   tag="h5">{pokemon.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{pokemon.types[0].type.name}</CardSubtitle> 
          <Button color="primary" className="form-control" onClick={detailPokemon}>Detail</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Pokemon;