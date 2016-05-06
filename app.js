"use strict";


var express = require("express");
var expressHandlebars = require("express-handlebars");
var app = express();
var hbs = require("handlebars");
var async = require("async");
var bodyParser = require('body-parser');
var session = require("client-sessions");
var multipart = require('connect-multiparty');

var mongoose = require("mongoose");
var hbs = require("handlebars");mongoose.connect('mongodb://localhost/isos')
var db = mongoose.connection;


app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(multipart());
//app.use(session({secret:"h17hd87ahhd917793dgasdg6",resave:false,saveUninitialized:true}));
app.use(session({
	cookieName: 'session',
	secret: 'h17hd87ahhd917793dgasdg6',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000
}));
app.use('/public', express.static('public'));
app.set('view engine','handlebars');
app.engine('html',expressHandlebars());

//schema

var isoSchema = {
  Linea: { type: String },
  Codigo: { type: String },
  Fecha: { type: String },
  Hora: { type: String },
  codRes: { type: String },
  Tipo: { type: String },
  codSec: { type: String }
};

var Iso = mongoose.model("Iso", isoSchema);

//routes
app.get('/',function(req,res){

		var options = {
        layout:"dashboard.html",
        hide: "hide"
    };
    res.render('admin.html',options);
});

app.get('/tablaautos',function(req,res){
  Iso.find({},function(err,docus){
    if(err){console.log(err)}

		var options = {
        layout:"dashboard.html",
        msjIso: docus

    };
    res.render('tablaautos.html',options);
});
});

app.post('/upload', function(req, res) {
   //El modulo 'fs' (File System) que provee Nodejs nos permite manejar los archivos
   var fs = require('fs')

   var path = req.files.archivo.path
   var newPath = 'ISO.txt'

   var is = fs.createReadStream(path)
   var os = fs.createWriteStream(newPath)

   is.pipe(os)

   is.on('end', function() {
      //eliminamos el archivo temporal
      fs.unlinkSync(path)
   res.redirect('/upload1')

   });

});

//leer el archivo con los mensajes ISO8583
app.get('/upload1', function(req, res) {
     var fs = require('fs')
var count = 0; //contador

  Iso.remove({},function(err){
    if(err){console.log(err)}
  });

fs.readFileSync('ISO.txt').toString().split('\n').forEach(function (line) { 


   var pos = line.indexOf("ISO") + 48,                   //position del primer parametro del codigo de transaccion
       pos2 = line.indexOf("ISO") + 12,                //position al primer parametro de la respuesta 0200 o 0210
       codTrans = line.slice(pos, pos+2),        //tomar codigo de transaccion
       fecha = line.slice(0,10),                       //tomar fecha 
       resp = line.slice(pos2, pos2+4),                  //tomar respuesta
       hora = line.slice(11,24),                      //tomar hora
       codResp = line.slice(189, 191),               //codigo de respuesta del core
       codSecu = line.slice(pos+104, pos+116);
       count++;


    if(pos<48){codTrans = "Echo"; resp = "0810"; codResp = "00"};            //Detectar Echo y cambia el codigo a "Ec"
    if(resp == "0200" || resp == "0205" || resp == "0220" || resp == "0221" || resp == "0420" || resp == "0421"){codResp = "--"};
   //mostrar datos en pantalla
    
    var data = {
    Linea: count,
    Codigo: codTrans,
    Fecha: fecha,
    Hora: hora,
    codRes: codResp,
    Tipo: resp,
    codSec: codSecu
  };
   var iso = new Iso(data);

  iso.save(function(err){
    console.log(err)
  });
});

   res.redirect('/tablaautos')
});


app.listen(8080,function(){
    console.log("El Servidor esta listo");
});