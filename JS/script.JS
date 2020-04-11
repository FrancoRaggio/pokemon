function consultpokemon(id,num) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(function (response) {
        response.json()
        .then(function (pokemon) {
            console.log(pokemon.name)
            
         })
        })   
    }
    consultpokemon(25)

function consultpokemons() {
    let firstid = Math.round ( Math.random()* 200 )
    let secondid = Math.round ( Math.random()* 200 )
    consultpokemon(firstid, 1)
    consultpokemon(secondid, 2)
}
consultpokemons()