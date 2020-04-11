//Buscar pokemon por nombre
var nombre = prompt()
function consultpokemon(nombre) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
    .then(function (response) {
        response.json()
        .then(function (pokemon) {
            console.log(pokemon.name)
            
         })
        })   
    }
consultpokemon(nombre)
/*Agarra entre 200 pokemones aleatoriamente 
function consultpokemons() {
    let firstid = Math.round ( Math.random()* 200 )
    let secondid = Math.round ( Math.random()* 200 )
    consultpokemon(firstid, 1)
    consultpokemon(secondid, 2)
}*/