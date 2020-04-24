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
    document.getElementById('sig').addEventListener("click", function() {
      siguiente(data.next);
    });
  }

  function mostrarPorColor(data){
    data.pokemon_species.forEach(pokemon =>{
      pedirApi(pokemon.url, mostrarPokemon)
    });
    document.getElementById('sig').addEventListener("click", function() {
      siguiente(data.next);
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


}


function findByTypes() {
  document.getElementById('pokedex').innerHTML = " ";
  pedirApi("https://pokeapi.co/api/v2/type/"+ document.getElementById('tipos').value +"/", mostrarPorTipo);
}

function findByColors() {
  document.getElementById('pokedex').innerHTML = " ";
  pedirApi("https://pokeapi.co/api/v2/pokemon-color/"+ document.getElementById('colores').value +"/", mostrarPorColor);
}

  pedirApi("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=5", mostrar)