function obtener_localstorage() {
    if (JSON.parse(localStorage.getItem("nombre")) ) {
        // se que existe el obejeto en el localstorage 
        // let nombre = JSON.parse(localStorage.getItem("nombre"));
        // var nombredelpoke = nombre.name;
        // var todoshistorial= [];
        // var todoshistorial = todoshistorial + nombredelpoke + ';';
        //  document.getElementById("historial").innerHTML = todoshistorial;
         Storage.prototype.setObj = function(nombre, poke) {
            return this.setItem(key, JSON.stringify(poke))
        }
        Storage.prototype.getObj = function(key) {
            return JSON.parse(this.getItem(key))
        }
         for (var i = 0; i < localStorage.length; i++) console.log( localStorage.key(i) +" has value " + localStorage[localStorage.key(i)] )
    }else {
        console.log("no hay entradas en el local storage");
    }
   
}
obtener_localstorage();






var search_input = document.getElementById('search-input');
search_input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        var pokemon_name = document.getElementById( 'search-input' ).value;
        var pokemon = await getPokemon( pokemon_name);
        pokemon.json().then( (poke) => { 
            setSkill( poke );
            setImage( poke );
            localStorage.setItem("nombre",JSON.stringify(poke));
           
/*            var nombreepokemon =(poke.name)
            localStorage.nombrepokemon= nombreepokemon
            lastName = localStorage.nombrepokemon */
/*   
            document.getElementById("historial").innerHTML = historys; */ 
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
 
    function passvalues(clicked_id) {
        var identificador=clicked_id;
        let url =`https://pokeapi.co/api/v2/pokemon/`;
        const api= new XMLHttpRequest();
        api.open('GET', url, true);
        api.send();

        api.onreadystatechange=function() {
            if(this.status == 200 && this.readyState == 4)
            {
                let pokemones=JSON.parse(this.responseText);
                    let i=0;
                        for(let uno of pokemones) {
                            if (identificador ==uno.id) {
                                localStorage.setItem("nombre",uno.name);
                            }
                        }
            }
        }
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
function mostrarhistoial() {
    if (typeof(Storage) !== "undefined") {
        console.log('funciona');
        // LocalStorage disponible
        } else {
        // LocalStorage no soportado en este navegador
        }
        
}
mostrarhistoial();

    
/*Agarra entre 200 pokemones aleatoriamente 
function consultpokemons() {
    let firstid = Math.round ( Math.random()* 200 )
    let secondid = Math.round ( Math.random()* 200 )
    consultpokemon(firstid, 1)
    consultpokemon(secondid, 2)
}*/
