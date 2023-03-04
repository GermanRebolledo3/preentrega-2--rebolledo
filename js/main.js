//form de validacion
function validateform(){
    var nombre = document.getElementById("nombre").value;
    var edad = document.getElementById("edad").value;
    var direccion = document.getElementById("direccion").value;
    var mail = document.getElementById("mail").value;
    
if(nombre == ""){
    alert("Ingrese un nombre")
    return false;
}
if(edad == ""){
    alert("Ingrese una edad")
    return false;
}
else if (edad < 1){
    alert("La edad no puede ser menor de 1 año")
    return false;
}
if (direccion ==""){
    alert("Indique su direccion")
    return false;
}
if (mail ==""){
    alert("Ingrese su email")
    return false;
}else if(!mail.includes("@")){
    alert("Ingrese un mail valido")
    return false;
}
return true;
}
//function para mostrar la data
function showData(){
    var lista ;
    
    if(localStorage.getItem("lista")== null){
        lista = [];
    }
    else{
        lista = JSON.parse(localStorage.getItem("lista"))
    }
    var html = "";

    lista .forEach( function(element, index )  {
        html += "<tr>"
        html += "<td>" + element.nombre + "<td>";
        html += "<td>" + element.edad + "<td>";
        html += "<td>" + element.mail + "<td>";
        html += "<td>" + element.direccion + "<td>";
        html += '<td>  <button onclick="deleteData ('+ index +')"class="btn btn-danger">Delete</button> <button onclick="updateData ('+ index +')"class="btn btn-warning m-2">Editar</button></td>';
       
        html +="</tr>";
        
    });
    document.querySelector("#TablaDeResultados tbody").innerHTML = html;
}
 
document.onload = showData();

//function para añadir data


function addData(){
    
    if(validateform() == true){
        var nombre = document.getElementById("nombre").value;
        var edad = document.getElementById("edad").value;
        var direccion = document.getElementById("direccion").value;
        var mail = document.getElementById("mail").value;

        var lista;
        if(localStorage.getItem("lista") == null){
            lista = [];
        }else {
            lista = JSON.parse(localStorage.getItem("lista"));
        }
        lista.push({
            nombre: nombre ,
            edad: edad ,
            direccion: direccion ,
            mail: mail ,
        });

        localStorage.setItem("lista",JSON.stringify(lista));
        showData();
        document.getElementById("nombre").value = "";
        document.getElementById("edad").value = "";
        document.getElementById("direccion").value = "";
        document.getElementById("mail").value = "";
    }
}

//function para eliminar data del local

function deleteData (index){
    var lista;
    if(localStorage.getItem("lista")== null){
        lista = [];
    }
    else{
        lista = JSON.parse(localStorage.getItem("lista"))
    }
    lista.splice(index, 1);
    localStorage.setItem("lista", JSON.stringify(lista));
    showData();
}

//function para editar data

function updateData(index){
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";
   
    var lista;
    if(localStorage.getItem("lista")== null){
        lista = [];
    }
    else{
        lista = JSON.parse(localStorage.getItem("lista"))
    }
    lista.splice(index, 1);
    localStorage.setItem("lista", JSON.stringify(lista));
    showData();

    document.getElementById("nombre").value = lista[index].nombre;
    document.getElementById("edad").value = lista[index].edad;
    document.getElementById("direccion").value = lista[index].direccion;
    document.getElementById("mail").value = lista[index].mail;

    document.querySelector("#update").onclick = function()
{
if(validateform()== true){
    lista[index].nombre = document.getElementById("nombre").value;
    lista[index].edad = document.getElementById("edad").value;
    lista[index].direccion = document.getElementById("direccion").value;
    lista[index].mail = document.getElementById("mail").value;

    localStorage.setItem("lista", JSON.stringify(lista));
    showData();
    
    document.getElementById("nombre").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("mail").value = "";
    
    
        document.getElementById("submit").style.display = "block";
        document.getElementById("update").style.display = "none";
}
} 
}
