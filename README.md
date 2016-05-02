# ParserISO8583
Parseador de Mensaje ISO8583

<h3>Carpeta del proyecto</h3>

<p>En la carpeta raiz se encuentran los archivos app.js y el archivo ISO.txt.</p>
<p>El archivo donde se encuentran todos los mensajes ISO8583 se guardan con extension *.txt, en este caso ISO.txt</p>

![font samples - dark](https://github.com/alerolon15/ParserISO8583/blob/master/img/carpetaraiz.jpg)

<h3>Modo de Uso</h3>

<p>Se inicializa desde consola, con NodeJs.</p>
<p>ponemos en consola la linea <code>node app.js</code> desde la ruta donde se encuentra los archivos.</p>
<p>El script toma el archivo log desde la raiz del proyecto y lo lee linea por linea.</p>

![font samples - dark](https://github.com/alerolon15/ParserISO8583/blob/master/img/primeralinea.jpg)


<p>Una vez iniciado el servicio, nos pedira el codigo de transaccion que queremos discriminar en la busqueda (en este ejemplo "2P").</p>

![font samples - dark](https://github.com/alerolon15/ParserISO8583/blob/master/img/codigo.jpg)

<p>Una vez que ingresamos el codigo, el servicio imprime en pantalla la cantidad de resultados obtenidos.</p>
<p>Los campos que muestran son los de Fecha, Hora, Codigo de transaccion, tipo de mensaje y Linea donde se encuentra el mensaje en el archivo ISO.txt.</p>
<p>En el caso de que el tipo de mensaje sea 0210 (respuesta desde el core bancario), se muestra tambien el mensaje de respuesta del core.(En este ejemplo "91").</p>

![font samples - dark](https://github.com/alerolon15/ParserISO8583/blob/master/img/resultado.jpg)

