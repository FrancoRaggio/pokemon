
function obtenerdatos(){
  
    var texto = document.getElementById("tipo").value;
    var texto1 = document.getElementById("abilities").value;
    var texto2 = document.getElementById("moves").value;
    
    //console.log(texto);
    
    const api = new XMLHttpRequest();
    api.open("GET", "https://pokeapi.co/api/v2/pokemon/", true);
    
    api.send();
    
    api.onreadystatechange = function(){
        if(this.status == 200 && this.readyState ==4 ){
    
            let datos = JSON.parse(this.responseText);
           // console.log(datos.response);
            let resul = document.querySelector('#pokedex');
            resul.innerHTML = '';
    
            var arreglo = [];
    
            
                for(let item of datos.response){
                      
                
                   var jsona = item.tipo.name;
                   var jsona1 = item.abilities.name;
                   var jsona2 = item.moves.name;
    
                   if (texto != '' && texto1 == '' && texto2 == '') {
    
                    if( jsona >= texto ){
                        
                         arreglo.push(item);  
    
                    }
                 } 
    
                 if (texto != '' && texto1 != '' && texto2 == '') {
                    if( jsona >= texto && jsona1 >= texto1){
                        
                         arreglo.push(item);  
        
                     }
                }
    
                if (texto != '' && texto1 != '' && texto2 != '') {
    
                    if( jsona >= texto && jsona1 >= texto1 && jsona2 >= texto2){
                        
                         arreglo.push(item);  
            
                    }
                }   
                    
                if (texto != '' && texto1 == '' && texto2 != '') {
    
                    
                    if( jsona >= texto && jsona2 >= texto2){
                        
                        arreglo.push(item);  
           
                   }
                }   
    
                if (texto == '' && texto1 != '' && texto2 != '') {
    
                    if( jsona1 >= texto1 && jsona2 >= texto2){
                        
                         arreglo.push(item);  
                
                    }
                }   
    
                if (texto == '' && texto1 == '' && texto2 != '') {
    
                    if( jsona2 >= texto2){
                        
                        arreglo.push(item);  
               
                   }
                }  
    
                if (texto == '' && texto1 != '' && texto2 == '') {
    
                    if( jsona1 >= texto1 ){
                        
                    arreglo.push(item);  
           
                     }
                    }    
                }
    
            if (arreglo.length > 0) {   
                mostrarPokemon(arreglo);   
            }
        }
       }
    }

    function mostrarPokemon(arreglo){
        for(var i = 0; i < ; i++){
        var fila = '';
        fila += "<div>";
        fila += "<h3>tipo: "+arreglo[i].types.name+"</h3>";
        fila += "<h3>tipo</h3>";
        fila += "<p>abilities: "+arreglo[i].abilities.name+"</p>";
        fila += "<h3>abilities</h3>";
        fila += "<p>moves: "+arreglo[i].moves.name+"</p>";
        fila += "<h3>moves</h3>";
        fila += "</div>";
    
        lista += fila;
        }
        $('#pokedex').html(lista);
        
    }
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
    
    
    function mostrarPoooookemon(pokemon){
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
        data.results.forEach(arreglo =>{
          pedirApi(arreglo.url, mostrarPokemon)
        });
        document.getElementById('sig').addEventListener("click", function() {
          siguiente(data.next);
        });
      }

      pedirApi("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964", mostrar)

      function mostrarPorTipo(data){
        data.pokemon.forEach(pokemon =>{
          pedirApi(pokemon.type.url, mostrarPokemon)
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
    let url =`https://pokeapi.co/api/v2/type/`;
    const api= new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();
    api.onreadystatechange=function() {
        if(this.status == 200 && this.readyState == 4)
        {
            var res=JSON.parse(this.responseText);
            grp = document.getElementById('types');
            res.results.forEach(types =>{
            opt = document.createElement('option');
            opt.value = types.name;
            opt.innerText = types.name;        
            grp.appendChild(opt);
            });
            
        }
    };
  
    let url2 =`https://pokeapi.co/api/v2/ability/4/`;
    const api2= new XMLHttpRequest();
    api2.open('GET', url2, true);
    api2.send();
    api2.onreadystatechange=function() {
        if(this.status == 200 && this.readyState == 4)
        {
            var res=JSON.parse(this.responseText);
            grp = document.getElementById('abilities');
            res.results.forEach(abilities =>{
            opt = document.createElement('option');
            opt.value = abilities.name;
            opt.innerText = abilities.name;        
            grp.appendChild(opt);
            });
            
        }
    }
  
  
    let url3 =`https://pokeapi.co/api/v2/move/`;
    const api3= new XMLHttpRequest();
    api3.open('GET', url3, true);
    api3.send();
    api3.onreadystatechange=function() {
        if(this.status == 200 && this.readyState == 4)
        {
            var res=JSON.parse(this.responseText);
            grp = document.getElementById('moves');
            res.results.forEach(moves =>{
            opt = document.createElement('option');
            opt.value = moves.name;
            opt.innerText = moves.name;        
            grp.appendChild(opt);
            });
            
        }
    }
  
  
  }    