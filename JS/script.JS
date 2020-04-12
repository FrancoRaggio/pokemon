//Buscar pokemon por nombre
var nombre = prompt('Ingrese el pokemon que desea buscar')
function consultpokemon(nombre) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
    .then(function (response) {
        response.json()
        .then(function (pokemon) {
            console.log('Nombre Del pokemon:',pokemon.name)
            console.log('Tipo de pokemon:',pokemon.types[0].type.name)
            console.log('Stats:')
            console.log('base stat =',pokemon.stats[0].base_stat)
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