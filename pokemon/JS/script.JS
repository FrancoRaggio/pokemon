
var search_input = document.getElementById('search-input');
search_input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        var pokemon_name = document.getElementById( 'search-input' ).value;
        var pokemon = await getPokemon( pokemon_name);
        pokemon.json().then( (poke) => { 
            setSkill( poke );
            setImage( poke );

            var arreglo_de_pokemones = JSON.parse(localStorage.getItem("pokemones"));
            if ( !arreglo_de_pokemones )  {
                arreglo_de_pokemones = [ ];
            }  
            arreglo_de_pokemones.push ( poke );
            localStorage.setItem( "pokemones", JSON.stringify( arreglo_de_pokemones ));
            var arreglo_nombres = [ ];
            for ( var pokemon of arreglo_de_pokemones ) {
                arreglo_nombres.pop( pokemon.name );
            }     
            var primeros_5_pokemones = arreglo_de_pokemones.slice( 1, 6);
            var arreglo_nombres = [ ];
            for ( var pokemon of primeros_5_pokemones ) {
                if (primeros_5_pokemones >= 5) {
                    arreglo_nombres.unshift(pokemon.name[0]);
                    arreglo_nombres.pop(pokemon.name );
                    } else {
                     arreglo_nombres.unshift( pokemon.name );
                    };
                document.getElementById("historial").innerHTML = arreglo_nombres;
            }            

        });
    }
});
const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 50; i++) {
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
    <div class="card">
        <img class="card-image" src="${pokeman.image}"/>
        <div class="cardSub">
        <h2 class="card-title"> ${pokeman.name}</h2>
        <p class="card-subtitle">Tipo: ${pokeman.type}</p>
        </div>
    </div>
`
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};
fetchPokemon();

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
function setImage(pokemon){
    document.getElementById("imagen-pokemon").src=pokemon.sprites.front_default;
}
 
    function loadTypes() {
        let url =`https://pokeapi.co/api/v2/type`;
        const api= new XMLHttpRequest();
        api.open('GET', url, true);
        api.send();
        api.onreadystatechange=function() {
            if(this.status == 200 && this.readyState == 4)
            {
                var res=JSON.parse(this.responseText);
                grp = document.getElementById('tipos');
                res.results.forEach(tipo =>{
                opt = document.createElement('option');
                opt.value = tipo.name;
                opt.innerText = tipo.name;        
                grp.appendChild(opt);
                });
                
            }
        }
    }
    
    function findByTypes() {
        let url ="https://pokeapi.co/api/v2/type/"+  document.getElementById('tipos').value +"/";
        const api= new XMLHttpRequest();
        api.open('GET', url, true);
        api.send();
        api.onreadystatechange=function() {
            if(this.status == 200 && this.readyState == 4)
            {
                var res=JSON.parse(this.responseText);
                console.log(res);
                
            }
        }
    }

function verhistorial(clicked_id){
    var identificador=clicked_id;
    let url=`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964`;
    const api= new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();
    api.onreadystatechange = function() {
      if(this.status==200 && this.readyState==4)
        {
          let pokemones=JSON.parse(this.responseText);
            let i=0;
              for(let uno of pokemones) {
                if (identificador == uno.id) {
                  localStorage.setItem("nombre", uno.name);
                }
              }
        }
    }
  }
    