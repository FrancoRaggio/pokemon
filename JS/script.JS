$('form').on('submit',function (eventito) {
  eventito.preventDefault();
  consultpokemon(document.getElementById('buscar'));
  return console.log('hola mundo');
}); 
//Buscar pokemon por nombre
function consultpokemon(poke) {
    fetch(`https://pokeapi.co/api/v2/pokemon/`+poke.value)
    .then(function (response) {
        response.json()
        .then(function (poke) {
            document.getElementById("poke").innerHTML =poke.name; 
            poke.abilities.forEach(habilidades);
            function habilidades(nombre) {
                document.getElementById("habilidad").innerHTML =nombre.ability.name;
            }
/*             pokemon_element.innerText = poke.name;
            pokemon_element.innerText =poke.types[0].type.name; */

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
