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

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }
  function parseJson(response) {
    return response.json()
  }
 
function pedirApi(api, funcion){
    fetch(api)
    .then(checkStatus)
    .then(parseJson)
    .then(function(data) {
      console.log('Request succeeded with JSON response', data);
      return data;
    }).catch(function(error) {
      console.log('Request failed', error);
      return error;
    })
    .then(funcion);
}


function mostrarPokemon(pokemon){
    grp = document.getElementById('pokedex');
    var d1 = document.createElement('div');
    d1.className = "card";
    var img = document.createElement('img');
    img.className= "card-image";
    img.src=pokemon.sprites['front_default'];
    var d2 = document.createElement('div');
    d2.className="cardSub";
    var h2 = document.createElement('h2');
    h2.className="card-title";
    h2.innerText=pokemon.name;
    var p = document.createElement('p');
    p.className="card-subtitle";
    p.innerText='tipo: ' + pokemon.types.map((type) => type.type.name).join(', ');

    d2.appendChild(h2);
    d2.appendChild(p);
    d1.appendChild(img);
    d1.appendChild(d2);
    grp.appendChild(d1);
  }


function mostrar(data){
    data.results.forEach(pokemon =>{
      pedirApi(pokemon.url, mostrarPokemon)
    });
    document.getElementById('sig').addEventListener("click", function() {
      siguiente(data.next);
    });
  }

  function mostrarPorTipo(data){
    data.pokemon.forEach(pokemon =>{
      pedirApi(pokemon.pokemon.url, mostrarPokemon)
    });
  }

  function mostrarPokemonSpecie(data){
    pedirApi(data.varieties[0].pokemon.url, mostrarPokemon)
  }

  function mostrarporHabitat(data) {
    data.pokemon_species.forEach(pokemon =>{
      pedirApi(pokemon.url, mostrarPokemonSpecie)
    });
  }
  function mostrarPorColor(data){
    data.pokemon_species.forEach(pokemon =>{
      pedirApi(pokemon.url, mostrarPokemonSpecie)
    });
  }
  
function siguiente(url){
  document.getElementById('pokedex').innerHTML = " ";
  pedirApi(url, mostrar);
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
  };

  let url2 =`https://pokeapi.co/api/v2/pokemon-color/`;
  const api2= new XMLHttpRequest();
  api2.open('GET', url2, true);
  api2.send();
  api2.onreadystatechange=function() {
      if(this.status == 200 && this.readyState == 4)
      {
          var res=JSON.parse(this.responseText);
          grp = document.getElementById('colores');
          res.results.forEach(tipo =>{
          opt = document.createElement('option');
          opt.value = tipo.name;
          opt.innerText = tipo.name;        
          grp.appendChild(opt);
          });
          
      }
  }


  let url3 =`https://pokeapi.co/api/v2/pokemon-habitat/`;
  const api3= new XMLHttpRequest();
  api3.open('GET', url3, true);
  api3.send();
  api3.onreadystatechange=function() {
      if(this.status == 200 && this.readyState == 4)
      {
          var res=JSON.parse(this.responseText);
          grp = document.getElementById('habitat');
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
  
  pedirApi("https://pokeapi.co/api/v2/type/"+ document.getElementById('tipos').value +"/", mostrarPorTipo);
}

function findByColors() {
  pedirApi("https://pokeapi.co/api/v2/pokemon-color/"+ document.getElementById('colores').value +"/", mostrarPorColor);
}

function findByHabitat() {
  pedirApi("https://pokeapi.co/api/v2/pokemon-habitat/"+ document.getElementById('habitat').value +"/", mostrarporHabitat);

}

function filtrar(){
   document.getElementById('pokedex').innerHTML = "";
  if (document.getElementById('tipos').value != " ") 
    findByTypes();
  
  if (document.getElementById('habitat').value != " ") 
    findByHabitat();
  
  if (document.getElementById('colores').value != " ") 
    findByColors();
  
}

  pedirApi("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964", mostrar)

  function mostrarmenu() {
    document.getElementById("filtros").style.width = "300px";
    document.getElementById("casilleros").style.marginLeft = "300px";
    document.getElementById("abrir").style.display = "none";
    document.getElementById("abrir").style.display = "inline";
}

function ocultar() {
    document.getElementById("filtros").style.width = "0";
    document.getElementById("casilleros").style.marginLeft = "0";
    document.getElementById("abrir").style.display = "inline";
    document.getElementById("abrir").style.display = "none";
}
