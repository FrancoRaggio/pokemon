var searchList = [];

function save_localStorage(author,word,date){
    console.log(localStorage.getItem("Lista de Busquedas"))
    //Meto en la lista search los valores de author y word en la lista
    //Creo el elemento de la lista
    var ultima_busqueda = {
        palabra_clave: word,
        autor: author,
        fecha: date
    };

    var existe = false; 

    if (searchList.length < 5) {
        // si el historial todavía no está lleno
        var i = 0;
        while (i<searchList.length && existe == false) {
            if ((searchList[i].palabra_clave == ultima_busqueda.palabra_clave) &&
                (searchList[i].autor == ultima_busqueda.autor) &&
                (searchList[i].fecha == ultima_busqueda.fecha)) {
                existe = true;
            }            
            i++;
        }

        if (existe) {
            // si ya existe, desde que se repite reemplazamos con las búsquedas más antiguas
            for (j=i-1; j>0; j--) {
                searchList[j] = searchList[j-1];
            }
            searchList[0] = ultima_busqueda;
            addLocalStorage(searchList);
        } 
        else {
            // si la última búsqueda no existe en el historial, se agrega sin más
            searchList.unshift(ultima_busqueda);
            addLocalStorage(searchList);
        }
    }

    else {
        // si son 5 o más en el historial, hay que desencolar por FIFO
        var i = 0;
        while (i<5 && existe == false) {
            if ((searchList[i].palabra_clave == ultima_busqueda.palabra_clave) &&
                (searchList[i].autor == ultima_busqueda.autor) &&
                (searchList[i].fecha == ultima_busqueda.fecha)) {
                existe = true;
            }
            i++;
        }

        if (existe) {
            // ya existe, desde que se repite reemplazamos con las búsquedas más antiguas
            
            for (j=i-1; j>0; j--) {
                searchList[j] = searchList[j-1];
            }
            searchList[0] = ultima_busqueda;
            addLocalStorage(searchList);
        } 
        else {
           // la última búsqueda no existe en el historial, se agrega sin más
            searchList.unshift(ultima_busqueda);
            searchList.pop(); // pero también sacamos la primera en llegar
            addLocalStorage(searchList);
        }
    }

    get_localStorage();  
}






//Agrego a localStorage la lista de busquedas
function addLocalStorage(SList){

    localStorage.setItem('Lista de Busquedas', JSON.stringify(SList));
}

//LocalStorage solo interpresa strings, se parsea con el JSON
//localStorage.setItem("Search", JSON.stringify(search));

//Recupero los elementos de la lista
function get_localStorage(){
    var tendencias = document.getElementById('prueba-tendendencias');
    var listSearch = localStorage.getItem('Lista de Busquedas');
    if ( listSearch == null ){
        document.getElementById('sideHistory').style.visibility = 'hidden';
    }
    else{
        searchList = JSON.parse(listSearch);
        var contenido = "";
        document.getElementById('sideHistory').style.visibility = 'visible';
        for( let i=0; i < searchList.length; i++ ){
            if (searchList[i].palabra_clave.length < 20) {
                contenido_palabra_clave = searchList[i].palabra_clave
            }
            else {
                contenido_palabra_clave = '"' + searchList[i].palabra_clave.slice(0, 20) + '..."'
            }
            contenido += '<a href="#" id="elemento-sidebar" onclick="get_Value('+i+')"><span>' + contenido_palabra_clave + 
                '<br>' + searchList[i].autor;
            if (searchList[i].fecha != (null || '')) {
                contenido += ' - ' + searchList[i].fecha;
            }
            contenido +='</span></a>';

            tendencias.innerHTML = contenido;
        }
    }
}

 //Retorno el valor del boton a los input
 function get_Value(index){
    document.getElementById('input-pc').value = searchList[index].palabra_clave;
    document.getElementById('input-autor').value = searchList[index].autor;
    document.getElementById('input-date').value = searchList[index].fecha;
 }