var pokemones= new Array()

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
 
  function guardarPokemon(data){
      pokemones.push(data);
  }

  filtrar(){
    if (document.getElementById('tipos').value != " ") {
        
      }
      if (document.getElementById('habitat').value != " ") {
        findByHabitat();
      }
      if (document.getElementById('colores').value != " ") {
        findByColors();
      }
    }

function buscarConFiltro(){
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=964")
    .then(checkStatus)
    .then(parseJson)
    .then(function(data) {
      console.log('Request succeeded with JSON response', data);
      return data;
    }).catch(function(error) {
      console.log('Request failed', error);
      return error;
    })
    .then(function(data){
        data.results.forEach(pokemon =>{
            pedirApi(pokemon.url, guardarPokemon)
        });
    })
    .then(filtrar);
}
