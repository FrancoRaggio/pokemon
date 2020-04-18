
var search_input = document.getElementById('search-input');
search_input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        var pokemon_name = document.getElementById( 'search-input' ).value;
        var pokemon = await getPokemon( pokemon_name);
        pokemon.json().then( (poke) => { 
            setSkill( poke );
        });
    }
});

var search_icon = document.getElementById('search-button');
search_icon.addEventListener('click', async (event) => {
    var pokemon_name = document.getElementById( 'search-input' ).value;
    var pokemon = await getPokemon(pokemon_name);
    pokemon.json().then( (poke) => { 
        setSkill( poke );
    });
}, false );

function getPokemon( pokemon_name ) {
    return new Promise( (resolve, reject ) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/` + pokemon_name).then( ( poke ) => {
            resolve( poke );
        })
    })
}

function setSkill( pokemon ) {
    document.getElementById("poke").innerHTML = pokemon.name; 
    pokemon.abilities.forEach(habilidades);
    function habilidades(nombre) {
        document.getElementById("habilidad").innerHTML =nombre.ability.name;
    }
}
/*Agarra entre 200 pokemones aleatoriamente 
function consultpokemons() {
    let firstid = Math.round ( Math.random()* 200 )
    let secondid = Math.round ( Math.random()* 200 )
    consultpokemon(firstid, 1)
    consultpokemon(secondid, 2)
}*/
