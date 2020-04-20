
var search_input = document.getElementById('search-input');
search_input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        var pokemon_name = document.getElementById( 'search-input' ).value;
        var pokemon = await getPokemon( pokemon_name);
        pokemon.json().then( (poke) => { 
            setSkill( poke );
            setImage( poke );
        });
    }
});

var search_icon = document.getElementById('search-button');
search_icon.addEventListener('click', async (event) => {
    var pokemon_name = document.getElementById( 'search-input' ).value;
    var pokemon = await getPokemon(pokemon_name);
    pokemon.json().then( (poke) => { 
        setSkill( poke );
        setImage( poke );
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
    var skills = '';
    for ( var skill of pokemon.abilities ) {
        skills = skills + skill.ability.name + ', ';
    }
    document.getElementById("habilidad").innerHTML = skills;
}

 const fetchPokemon = () => {
        const promises = [];
        for (let i = 1; i <= 6; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            promises.push(fetch(url).then((res) => res.json()));
        }
        Promise.all(promises).then((results) => {
            const pokemon = results.map((result) => ({
                name: result.name,
                image: result.sprites['front_default'],
                type: result.types.map((type) => type.type.name).join(', '),
                id: result.id
            })).sort((a, b) => a.type > b.type ? 1 : -1);
            displayPokemon(pokemon);
        });
    };
    const displayPokemon = (pokemon) => {
        const pokemonHTMLString = pokemon
            .map(
                (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
        </li>
    `
            )
            .join('');
        pokedex.innerHTML = pokemonHTMLString;
    };
    fetchPokemon();
/* filtro 1*/
/* var filter = document.getElementById("filter");

filter.onclick = function() {
  var arreglo_muestra = [{
    "name": "normal",
    "name": "fighting",
    "name": "dragon",
    "name": "electric"
  }];

  var filterpokemon = getElementById(arreglo_muestra, "name");
  console.log(filterpokemon);

  var elDemo = document.getElementById("demo");
  elDemo.innerHTML = "<pre>" + JSON.stringify(filterpokemon, null, 4) + "</pre>";

};
function getElementById(array,type, value) {
    return array.filter(function(e) {
      return e[name.type] == value;
    });
  } */




/*Agarra entre 200 pokemones aleatoriamente 
function consultpokemons() {
    let firstid = Math.round ( Math.random()* 200 )
    let secondid = Math.round ( Math.random()* 200 )
    consultpokemon(firstid, 1)
    consultpokemon(secondid, 2)
}*/
