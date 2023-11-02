import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
const cors = require("cors");
const app = express();



app.use(bodyParser.text());
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));


const corsOpciones = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };


app.use(cors(corsOpciones));

app.use(cookieParser());

// conexion.connect((error) => {
//     if(error){
//         console.error("Error en la conexion a la base de datos.", Error);
//     }              ESTO ES PARA COMPROBAR LA CONEXION DE OTRAS FORMAS
//     else{
//         console.log("Conexion a la base de datos exitosa.");
//     }
//     conexion.end();
// });


app.listen(3001, () => {
    console.log("Activo el puerto 3001 para metodos http.")
})

//Controladores
const controladorAM : any = require("./modules/authentication");


//INICIO DE SESION
//@ts-ignore
app.post("/inicioSesionPrincipal", controladorAM.inicioSesion, (req, res) => {
    console.log("Inicio de Sesion")
})

//Creacion de Municipalidades
//@ts-ignore
app.post("/inicioSesionPrincipal/operacionInicioSesion", controladorAM.ingresoMunicipalidad, (req, res) => {
    console.log("Creando Municipalidad")
})


//Obtencion de Datos de Admin Municipalidades
//@ts-ignore
app.get("/obtencionPersonasMunicipalidades", controladorAM.obtencionDatosPrincipalesMunicipalidades, (req, res) => {
    console.log("Carga de datos de Administradores Municipalidades");
})

//Obtencion de Datos de Municipalidades para el SELECT
//@ts-ignore
app.get("/obtencionDatosMunicipalidadesSelect", controladorAM.obtencionDatosSelectMunicipalidades, (req, res) => {
    console.log("Carga de datos de la municipalidad para el SELECT"); 
})

//Obtencion de Datos de Departamentos para el SELECT
//@ts-ignore
app.get("/obtencionDatosDepartamentosSelect", controladorAM.obtencionDatosSelectDepartamentos, (req, res) => {
    console.log("Carga de datos de los departamentos para el SELECT");
})