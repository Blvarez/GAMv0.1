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
    credentials: true,
    optionsSuccessStatus: 204,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
};

//    ,    credentials: true,


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
const controladorAM: any = require("./modules/authentication");
const controladorBeneficio: any = require("./modules/municipalidad/dideco/beneficios/beneficios");


//INICIO DE SESION
//@ts-ignore
app.post("/inicioSesionPrincipal", controladorAM.inicioSesion, (req, res) => {
    console.log("Inicio de Sesion")
})


//*********************
//MUNICIPALIDADES
//********************* 



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


//*********************
//BENEFICIOS
//********************* 

//Creaciones de Beneficios
//@ts-ignore
app.post("/dideco/beneficios/creacionBeneficios", controladorBeneficio.creacionBeneficios, (req, res) => {
    console.log("Creacion del Beneficio Exitosamente");
})
//Eliminacion del Beneficio
//@ts-ignore
app.delete("/dideco/beneficios/eliminacionBeneficios", controladorBeneficio.eliminacionBeneficio, (req, res) => {
    console.log("Eliminando el Beneficio Exitosa");
})


//Obtencio de datos beneficios para la TABLA
//@ts-ignore
app.get("/dideco/beneficios/datosBeneficios", controladorBeneficio.obtencionDatosBeneficios, (req, res) => {
    console.log("Carga de datos de los Beneficios para la tabla");
})

//Obtencio de datos de los tipos de beneficios para el SELECT
//@ts-ignore
app.get("/dideco/beneficios/datosTiposBeneficios", controladorBeneficio.obtencionTiposBeneficios, (req, res) => {
    console.log("Carga de datos de los tipos  de beneficios para el select");
})


//*************************
//USUARIOS MUNICIPALES
//************************* 

//Listando Usuarios
//@ts-ignore
app.get("/municipalidad/gestionusuarios/listarusuarios", controladorAM.listarUsuarios, (req, res) => {
    console.log("Listando Usuarios Municipales")
})

//Listando Departamentos para usuarios
//@ts-ignore
app.post("/municipalidad/gestionusuarios/listardepartamentos", controladorAM.listarUsuariosDepartamentos, (req, res) => {
    console.log("Listando departamentos para los usuarios");
})

//Listando Departamentos para usuarios
//@ts-ignore
app.get("/municipalidad/gestionusuarios/listarpermisos", controladorAM.listarPermisos, (req, res) => {
    console.log("Listando departamentos para los usuarios");
})

//Creacion de usuarios
//@ts-ignore
app.post("/municipalidad/gestionusuarios/creacionusuarios", controladorAM.creacionUsuariosMunicipales, (req, res) => {
    console.log("Creando usuarios municipal");
})

//Modificacion de Usuarios
//@ts-ignore
app.put("/municipalidad/gestionusuarios/modificacionusuario", controladorAM.modificacionUsuariosMunicipales, (req, res) => {
    console.log("Modificando usuarios");
})

//Vista Modificacion de Usuarios
//@ts-ignore
app.post("/municipalidad/gestionusuarios/obtenciondatosusuario", controladorAM.mostrarModificacion, (req, res) => {
    console.log("Obtencion de datos de usuario");
})

//Eliminacion de Usuarios
//@ts-ignore
app.delete("/municipalidad/gestionusuarios/elimnacionususario", controladorAM.eliminarUsuarios, (req, res) => {
    console.log("Eliminando usuario");
})
