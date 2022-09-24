const http = require('http');
const cursos = require('./cursos');

const servidor = http.createServer((req,res) => {
  const {method} = req;

  switch(method) {
    case 'GET':
      return manejarSolicitudGET(req, res);
    case 'POST':
      return manejarSolicitudPOST(req, res);
    default:
      res.statusCode = 501;
      res.end(`El metodo usado no puede ser manejador por el servidor:${method} `);
      break;
  }

});

function manejarSolicitudGET(req , res) {
  const path = req.url;
  
  console.log(res.statusCode)

  if (path === '/') {
    res.writeHead(200, {'Content-Type':'application/json'});// esto escribe cabeceras 
    res.statusCode = 200;
    return res.end('Bienvenido a mi primer servidor y api con NODE.js')
  } else if (path === '/api/cursos') {
    res.statusCode = 200; 
    return res.end(JSON.stringify(cursos.infoCursos));
  }  else if (path === '/api/cursos/programacion') {
    res.statusCode = 200;
    return res.end(JSON.stringify(cursos.infoCursos.programacion))
  }
  res.statusCode = 404;
  res.end('El recurso solicitado no existe')
}

function manejarSolicitudPOST (req, res) {
  const path = req.url;
  if (path === '/api/cursos/programacion') {

    let body = '';

    req.on('data', contenido => {
      body += contenido.toString();
    });

    req.on('end', ()=> {
      console.log(body);
      console.log(typeof body);
      // Conversion a un objeto de JS
      body = JSON.parse(body);
      console.log(typeof body);
      return res.end ('El servidor recibio una solicitud POST para cursos/programacion')
      console.log(body.titulo);
    });

    //return res.end ('El servidor recibio una solicitud POST para cursos/programacion')
  }
}

const PUERTO = 3000;

servidor.listen(PUERTO , () => {
  console.log(`El puerto esta escuchando en el puerto $${PUERTO}`)
});

