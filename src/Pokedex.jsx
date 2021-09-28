import React, { useEffect} from 'react'
import { Container,  Jumbotron, Button, Row, Col, Modal, ModalBody, ModalHeader, ModalFooter, CardImg, Card, List} from 'reactstrap'
 
import Pokemon from './Pokemon';
import Paginations from './Paginations';

export default function Pokedex() {
 
  const [result, setResult] = React.useState([]);  
  const [poke, setPoke] = React.useState([]); //To storage the pokemons list
  const [load, setLoad] = React.useState('true'); //Flag if loading the pokmeons list
  const [pokemon, setPokemon] = React.useState([]);  //One pokemon is selected to show the details
  const [pokeEvolution, setPokeEvolution] = React.useState([])  //Array of envolves of the pokemon selected
  const [showDetalle, setShowDetalle] = React.useState(false)   //Flag to show detail or hide
  const [currentPage, setCurrentPag] = React.useState(1)
  const [postsPerPage] = React.useState(30) 

  const arr = []; 
 
  //Fetch all Pokemons list
  useEffect(() => {
    const urlApi = 'https://pokeapi.co/api/v2/pokemon/?limit=150'
    fetch(urlApi)
    .then((response) => response.json())
    .then((data) => setResult(
      // eslint-disable-next-line array-callback-return
      data.results.map((item) => {
        fetch(item.url)
          .then((response) => response.json())
          .then((allpokemon) => arr.push(allpokemon));
          setPoke(arr); 
      }),
    ));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 

  setTimeout(() => {
    setLoad(false);  
    console.log(result);
  }, 1000);
 

  const handleModal = () => {
    setShowDetalle(!showDetalle);
  }

  const handlePokemonSelected = pokemonSelected => { 
      setPokemon(pokemonSelected);
      const evolutions = [];
      //Search the envolves of the pokemon
      fetch(pokemonSelected.species.url)
      .then((response) => response.json())
      .then((pokeDetail) => {
            fetch(pokeDetail.evolution_chain.url)
            .then((response) => response.json())
            .then((pokeEvolutionResult) => {
                //console.log(pokeEvolutionResult)  
                evolutions.push(pokeEvolutionResult.chain.species.name)
                if(pokeEvolutionResult.chain.evolves_to.length > 0) {                    
                    evolutions.push(pokeEvolutionResult.chain.evolves_to[0].species.name)
                    if(pokeEvolutionResult.chain.evolves_to[0].evolves_to.length > 0) {                    
                        evolutions.push(pokeEvolutionResult.chain.evolves_to[0].evolves_to[0].species.name)
                    }
                }
                setPokeEvolution(evolutions);
                setShowDetalle(true); 
            }); 
        });
  } 

  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirsPost = indexOfLastPost - postsPerPage;
  const currentPoke = poke.slice(indexOfFirsPost, indexOfLastPost)


  const pagNumberHandle =(pn) => {
    setCurrentPag(pn)
  } 

    return (
        <Container> 

            <Jumbotron style={{ backgroundColor: "#98c1d9", color:"#ffffff"}} className="container">
                <h1 className="display-3" >POKEDEX!</h1>
                <p className="lead">Illustrated Pokemon Encyclopedia!!</p>
                <p className="lead">Encyclopédie Pokemon illustrée !!</p>
                <hr className="my-2" />
                <p>Jose Emerson Aguilar De Leon</p> 
                <hr className="my-2" />
            </Jumbotron>

            <Paginations pagNumber = {pagNumberHandle}/> 

            <Row> 
                { load ? "Loading..." :
                    currentPoke.map((unPokemon, i) => (
                        <Col xl="2" lg="3" md="4" sm="6" key={i}>
                            <Pokemon pokemon= {unPokemon} handlePokemon={handlePokemonSelected} />
                        </Col>
                    ))
                } 
            </Row>

            {showDetalle ? 
                <Modal isOpen={showDetalle} toggle={handleModal}  >
                    <ModalHeader toggle={handleModal} charCode="" inverse style={{backgroundColor:"#1d4e89", color:"#FFFFFF"}}>{pokemon.name}</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col lg="4" md="6">
                                <Card>
                                    <CardImg top width="100%" src={pokemon.sprites.front_default} alt={pokemon.name} />
                                </Card>  
                            </Col>
                            <Col lg="4" md="6"> 
                                TYPE: <strong>{pokemon.types[0].type.name} </strong>
                                <br/>
                                ABILITIES:
                                <ul><strong>
                                    {pokemon.abilities.map((ab, j) =>(
                                        <li key={j}>{ab.ability.name}</li>
                                    ))} 
                                </strong></ul> 
                                WEIGHT: <strong>{pokemon.weight}</strong><br/>
                                HEIGHT: <strong>{pokemon.height}</strong><br/>
                            </Col>
                            <Col lg="4" md="12">
                                {pokeEvolution.length > 0 ? 
                                    <span>ENVOLVES:
                                        <List type="unstyled">
                                            {pokeEvolution.map((envolve, e) => (<li key={e}>{envolve}</li>))} 
                                        </List>
                                    </span>
                                : ""}
                            </Col>
                        </Row> 
                    </ModalBody>
                    <ModalFooter style={{ backgroundColor: "#ee6c4d", color:"#fffff"}} > 
                    <Button color="secondary" onClick={handleModal}>Close</Button>
                    </ModalFooter>
                </Modal>
            : ""}
            
        </Container>
    )
}
