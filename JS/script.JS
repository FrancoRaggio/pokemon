//Buscar pokemon por nombre
function consultpokemon(poke) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
    .then(function (response) {
        response.json()
        .then(function (poke) {
          document.getElementById( 'poke' ).onclick = displayDate;
          function displayDate() {
            pokemon_element = document.getElementById("poke").innerHTML =poke.name ;
          }
/*             pokemon_element.innerText = poke.name;
            pokemon_element.innerText =poke.types[0].type.name; */
/*             console.log('Nombre Del pokemon:',pokemon.name)
            console.log('Tipo de pokemon:',pokemon.types[0].type.name)
            console.log('Stats:')
            console.log('base stat =',pokemon.stats[0].base_stat) */
        })
    })   
}
consultpokemon(poke)

/* document.getElementById("myBtn").onclick = displayDate;

function displayDate() {
  document.getElementById("demo").innerHTML = Date();
} */


/*Agarra entre 200 pokemones aleatoriamente 
function consultpokemons() {
    let firstid = Math.round ( Math.random()* 200 )
    let secondid = Math.round ( Math.random()* 200 )
    consultpokemon(firstid, 1)
    consultpokemon(secondid, 2)
}*/
