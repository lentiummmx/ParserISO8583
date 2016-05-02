//llamar a las librerias files y readline
var fs = require('fs');
var lib = require('readline');

//armar interface para la pregunta del codigo
var interface1= lib.createInterface({
	input: process.stdin,
	output: process.stdout
});
//ingresar el codigo que se busca 
interface1.question("Ingresa el codigo que estas buscando : ", function(respuesta){
//leer el archivo con los mensajes ISO8583
var array = fs.readFileSync('ISO.txt').toString().split("\n");
var count = 0; //contador

console.log("resultados de " + respuesta + "!");
//recorrer todos los mensajes por separado y separar el codigo de transaccion
for (var i = 0; i < array.length; i++) {
	var pos = array[i].indexOf("ISO") + 48,							//position del primer parametro del codigo de transaccion
		pos2 = array[i].indexOf("ISO") + 12,						//position al primer parametro de la respuesta 0200 o 0210
    	codTrans = array[i].charAt(pos) + array[i].charAt(pos+1),	//tomar codigo de transaccion
    	fecha = array[i].slice(0,10),								//tomar fecha 
	    resp = array[i].slice(pos2, pos2+4),						//tomar respuesta
	    Hora = array[i].slice(11,24),								//tomar hora
	    codRes = array[i].slice(189, 191);									//codigo de respuesta del core
	if(pos<48){codTrans = "Ec"; resp = "0810";}						//Detectar Echo y cambia el codigo a "Ec"
	//mostrar datos en pantalla
    if(codTrans == respuesta){
       	console.log("Linea: " + (i+1) + ", Codigo: " + codTrans + ", Fecha: " + fecha + ", tipo: " + resp + ", Hora: " + Hora);
    if(resp == "0210"){console.log("Respuesta del Core: " + codRes)}
       	count++;													//en cada acierto, agregarlo al contador
    };
};
	console.log("Se encontraron " + count + " resultados!")
	interface1.close();
});