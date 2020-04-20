$('form').on('submit',function (eventito) {
  eventito.preventDefault();
  consultpokemon('pikachu');
  return console.log (poke,tipo);
  
});
//Buscar pokemon por nombre
function consultpokemon(poke) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
    .then(function (response) {
        response.json()
        .then(function (poke) {
          document.getElementById("poke").innerHTML=poke.name;
          document.getElementById("tipo").innerHTML=poke.types[0].type.name;    

        })
    })   
}
/*Agarra entre 200 pokemones aleatoriamente 
function consultpokemons() {
    let firstid = Math.round ( Math.random()* 200 )
    let secondid = Math.round ( Math.random()* 200 )
    consultpokemon(firstid, 1)
    consultpokemon(secondid, 2)
}*/
