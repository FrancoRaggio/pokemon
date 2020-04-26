

function obtenerdatos(){

    
var texto = document.getElementById("numer").value;
var texto1 = document.getElementById("numer1").value;
var texto2 = document.getElementById("numer2").value;



//console.log(texto);

const api = new XMLHttpRequest();
api.open("GET", "https://covid-193.p.rapidapi.com/statistics", true);
api.setRequestHeader("x-rapidapi-host", "covid-193.p.rapidapi.com");
api.setRequestHeader("x-rapidapi-key", "e36276b33cmsh57102616fcf9f63p147c63jsn1df6492e52a8");

api.send();

api.onreadystatechange = function(){
    if(this.status == 200 && this.readyState ==4 ){

        let datos = JSON.parse(this.responseText);
       // console.log(datos.response);
        let resul = document.querySelector('#resul');
        resul.innerHTML = '';

        var arreglo = [];

        
            for(let item of datos.response){
                  
            
               var jsona = item.cases.active;
               var jsona1 = item.deaths.total;
               var jsona2 = item.tests.total;

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

            var pag = 1;
            var totales = arreglo.length;
            var xPag = 10;
            var nPag = Math.ceil(totales / xPag);
            var offset = (pag - 1) * xPag;
            var hasta = pag * xPag;
            eliminarBotones();
            mostrarLista(arreglo,offset,hasta);
            mostrarBotones(nPag);
            
            $( document ).ready(function(){
                // Activar el primer botón
                $('#botones button:first-child').addClass('active');
                
                // Poner oyentes a cada botón
                var losBotones = document.querySelectorAll('#botones button');
                for(var i = 0; i < losBotones.length; i++){
                    losBotones[i].addEventListener('click',function(){
                        quitarActivo();
                        var indice = parseInt(this.textContent);
                        var o = (indice -1) * xPag;
                        var h = indice * xPag;
                        mostrarLista(arreglo,o,h);
                        $(this).addClass('active');
                    });
                }
            });
            

        }

    }
   }
}


            
  //HISTORIALL//      
        function mostrarhistorial(){

            var texto = document.getElementById("numer").value;
            var texto1 = document.getElementById("numer1").value;
            var texto2 =   document.getElementById("numer2").value;

            if (texto == '' && texto1 == '' && texto2 == '') {
                  
                 
            } else { 
          

            if (texto != '' && texto1 == '' && texto2 == '') {
                
                let alldatos=[];
                datos=[];
                datos.push(document.getElementById("numer").value);
                alldatos.push(datos)
                arjson = JSON.stringify(alldatos);
                localStorage.setItem("id",arjson);
    
             
                    mostrar();

             } 
            if (texto != '' && texto1 != '' && texto2 == '') {
              
                let alldatos1=[];
                datos1=[];

                let alldatos=[];
                datos=[];

                datos.push(document.getElementById("numer").value);
                datos1.push(document.getElementById("numer1").value);

                alldatos.push(datos);
                alldatos1.push(datos1);

                arjson = JSON.stringify(alldatos);
                arjson1 = JSON.stringify(alldatos1);

                localStorage.setItem("id",arjson);
                localStorage.setItem("id1",arjson1);
    
             
                    mostrar();
                    mostrar1();
                 
            }

            if (texto != '' && texto1 != '' && texto2 != '') {
                let alldatos1=[];
                datos1=[];

                let alldatos=[];
                datos=[];

                let alldatos2=[];
                datos2=[];

                datos.push(document.getElementById("numer").value);
                datos1.push(document.getElementById("numer1").value);
                datos2.push(document.getElementById("numer2").value);

                alldatos.push(datos);
                alldatos1.push(datos1);
                alldatos2.push(datos2);

                arjson = JSON.stringify(alldatos);
                arjson1 = JSON.stringify(alldatos1);
                arjson2 = JSON.stringify(alldatos2);

                localStorage.setItem("id",arjson);
                localStorage.setItem("id1",arjson1);
                localStorage.setItem("id2",arjson2);
    
             
                    mostrar();
                    mostrar1();
                    mostrar2();
           
            }   
                
            if (texto != '' && texto1 == '' && texto2 != '') {
                let alldatos=[];
                datos=[];

                let alldatos2=[];
                datos2=[];

                datos.push(document.getElementById("numer").value);
                datos2.push(document.getElementById("numer2").value);

                alldatos.push(datos);
                alldatos2.push(datos2);

                arjson = JSON.stringify(alldatos);
                arjson2 = JSON.stringify(alldatos2);

                localStorage.setItem("id",arjson);
                localStorage.setItem("id2",arjson2);
    
             
                mostrar();
               
                mostrar2();
       
           
            }   

            if (texto == '' && texto1 != '' && texto2 != '') {
                let alldatos1=[];
                datos1=[];


                let alldatos2=[];
                datos2=[];

        
                datos1.push(document.getElementById("numer1").value);
                datos2.push(document.getElementById("numer2").value);

           
                alldatos1.push(datos1);
                alldatos2.push(datos2);

            
                arjson1 = JSON.stringify(alldatos1);
                arjson2 = JSON.stringify(alldatos2);

         
                localStorage.setItem("id1",arjson1);
                localStorage.setItem("id2",arjson2);
    
             
               
                mostrar1();
                mostrar2();
       
            
            }   

            if (texto == '' && texto1 == '' && texto2 != '') {
      
                let alldatos2=[];
                datos2=[];
        
                datos2.push(document.getElementById("numer2").value);
            
                alldatos2.push(datos2);
            
                arjson2 = JSON.stringify(alldatos2);

                localStorage.setItem("id2",arjson2);
    
             
                mostrar2();
       
            }  

            if (texto == '' && texto1 != '' && texto2 == '') {
                let alldatos1=[];
                datos1=[];

                datos1.push(document.getElementById("numer1").value);
           
                alldatos1.push(datos1);
   
                arjson1 = JSON.stringify(alldatos1);
       
                localStorage.setItem("id1",arjson1);
     
              
                mostrar1();
               
       
                } 
    }

               



 }
                    

function mostrar(){

 campos = JSON.parse(localStorage.getItem("id"));
var selector = document.getElementById("select");
    if (selector.length>4){
        selector.remove(selector.length-2);
    }
    for(x=0; x < campos.length; x++){    
        $("#select").prepend("<option value="+x+"> "+campos[x][0]+"</option>");
      }
 } 

 function mostrar1(){

    campos1 = JSON.parse(localStorage.getItem("id1"));
    var selector = document.getElementById("select1");
    if (selector.length>4){
        selector.remove(selector.length-2);
    }
   
         for(x=0; x < campos.length; x++){    
             $("#select1").prepend("<option value="+x+"> "+campos1[x][0]+"</option>");
           }
    } 

function mostrar2(){

    campos2 = JSON.parse(localStorage.getItem("id2"));
    var selector = document.getElementById("select2");
    if (selector.length>4){
        selector.remove(selector.length-2);
    }
       
    for(x=0; x < campos.length; x++){    
        $("#select2").prepend("<option value="+x+"> "+campos2[x][0]+"</option>");
               }
        } 

// TERMINA HISTORIAL


            
function mostrarLista(arreglo,desde,hasta){
    var lista = '';
    var long = arreglo.length;
    if (hasta>long) {
    hasta = hasta - (hasta - long);   
    }
    for(var i = desde; i < hasta; i++){
    var fila = '';
    fila += "<div class='individual'>";
    fila += "<h3>Pais: "+arreglo[i].country+"</h3>";
    fila += "<h3>Casos</h3>";
    fila += "<p>Activos: "+arreglo[i].cases.active+"</p>";
    fila += "<h3>Muertes</h3>";
    fila += "<p>Totales: "+arreglo[i].deaths.total+"</p>";
    fila += "<h3>Testeos</h3>";
    fila += "<p>Totales: "+arreglo[i].tests.total+"</p>";
    fila += "<button id='compar' onClick=compartir()>Compartir</button>";
    fila += "</div>";

    lista += fila;
    }
    $('#resul').html(lista);
    
}

function mostrarBotones(t){

    var botones = '';
    for(var i = 0; i < t; i++){
       var cada = '';
        cada = "<button type='button' "+
            "class='btnbtn-info'>"+(i+1)+
            "</button>";
        botones += cada;
    }
    
    $('#botones').append(botones);
}

function eliminarBotones() {
    $("#botones").empty();
}

function quitarActivo(){
    var losBotones = document.querySelectorAll('#botones button');
    for(var i = 0; i < losBotones.length; i++){
        $(losBotones[i]).removeClass('active');
    }
}

