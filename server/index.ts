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
const controladorBeneficiarios : any = require("./modules/municipalidad/dideco/beneficios/beneficiarios");
const controladorSoli : any  =require("./modules/municipalidad/dideco/beneficios/solicitudes");
const controladorCons : any = require("./modules/consultas");


//INICIO DE SESION
//@ts-ignore
app.post("/inicioSesionPrincipal", controladorAM.inicioSesion, (req, res) => {
    console.log("Inicio de Sesion")
})
//CERRAR SESION
//@ts-ignore
app.get("/cerrarSesionCompleto", controladorAM.cerrarSesion, (req, res) => {
    console.log("Cerrando Sesion");
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

//Modificacion Obtencion
//@ts-ignore
app.post("/obtencionDatosMunicipalesMod", controladorAM.obtenerDatosMunicipales, (req, res) =>{
    console.log("Mostrando para modificacion");
})
//@ts-ignore
app.post("/obtencionDatosMunicipalesRut", controladorAM.obtenerDatosMunicipalesRut, (req, res) => {
    console.log("Buscando Datos Rut");
})

//MODIFICANDO MUNICIPALIDAD ESTADO
//@ts-ignore
app.put("/modificandoMunicipalidad", controladorAM.modificarDatosMunicipalies, (req, res)=>{
    console.log("Modificacion municipalidad");
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

//Obtencio datos beneficios
//@ts-ignore
app.post("/dideco/beneficios/obtenerTipoBeneficio", controladorBeneficio.listarModificacionBeneficio, (req, res) => {
    console.log("Obteniendo datos del Beneficio a modificar");
})

//Modificacion de Beneficios
//@ts-ignore
app.put("/dideco/beneficios/modificarBeneificio", controladorBeneficio.modificiarBeneficio, (req, res) => {
    console.log("Modificar datos de los beneficios")
})

//*********************
//BENEFICIARIOS
//********************* 

//LISTANDO BENEFICIARIOS
//@ts-ignore
app.get("/dideco/beneficiarios/listarbeneficiariospersona", controladorBeneficiarios.listarBeneficiariosPersonas, (req, res) => {
    console.log("Listando Beneficiarios")
} )

//AGREGANDO BENEFICIARIO
//@ts-ignore
app.post("/dideco/beneficiarios/agregarbeneficiario", controladorBeneficiarios.agregarBeneficiario, (req, res) => {
    console.log("Agregando Beneficiario");
})

//LISTANDO BENEFICIARIO EN MODAL MODIFICACION
//@ts-ignore
app.post("/dideco/beneficiarios/obtenerInformacionBeneficiarios", controladorBeneficiarios.listarModificacionBeneficiario, (req, res) => {
    console.log("Agregar Beneficiario");
})

//MODIFICANDO BENEFICIARIO (Datos Basicos)
//@ts-ignore
app.put("/dideco/beneficiarios/modificandobeneficiarios", controladorBeneficiarios.modificarBeneficiario, (req, res) => {
    console.log("Modificando Beneficiario Info Principal");
})

//MODIFICANDO BENEFICIARIO (Datos Pdf)
//@ts-ignore
app.put("/dideco/beneficiarios/modificandobeneficiariospdf", controladorBeneficiarios.modificarPdfBeneficiario, (req, res) => {
    console.log("Modificando Beneficiario Pdf");
})

//OBTENER DATOS DEL PDF
//@ts-ignore
app.post("/dideco/beneficiarios/obtenerPdf", controladorBeneficiarios.infoPdf, (req, res) => {
    console.log("Mostrando los datos del pdf");
})

//ELIMINAR BENEFICIARIO
//@ts-ignore
app.delete("/dideco/beneficiarios/eliminarbeneficiario", controladorBeneficiarios.eliminarBeneficiario, (req, res) => {
    console.log("Eliminando Beneficiario");
})

//*********************
//SOLICITUDES
//********************* 

//LISTANDO BENEFICIARIOS PARA SOLICITUDES MASIVAS
//@ts-ignore
app.get("/dideco/solicitudes/listarBeneficiariosMas", controladorSoli.obtencionBeneficiariosMas, (req, res) => {
    console.log("Listando Beneficiarios para solicitudes masivas");
})

//LISTANDO BENEFICIOS PARA SOLICITUDES MASIVAS (SOLO LOS QUE TIENE POR POSTULACION)
//@ts-ignore
app.get("/dideco/solicitudes/listarBeneficiosMas", controladorSoli.obtencionBeneficiosMas, (req, res) => {
    console.log("Listando Beneficios para solicitudes masivas");
})

//@ts-ignore
app.post("/dideco/solicitudes/creacionSolicitudesMas", controladorSoli.crearSolicitudesMasivas, (req, res) => {
    console.log("Creando Solicitudes Masivas");
})

//@ts-ignore
app.post("/dideco/solicitudes/creacionSolicitud", controladorSoli.crearSolicitudesUnitaria, (req, res) => {
    console.log("Creando Solicitud Unitaria");
})

//@ts-ignore
app.post("/dideco/solicitudes/listandoMod", controladorSoli.listarModificacion, (req, res) => {
    console.log("Listando solicitud para modificacion");
})

//@ts-ignore
app.put("/dideco/solicitudes/modificandoSolicitud", controladorSoli.modificarSolicitud, (req, res) => {
    console.log("Modificando Solicitud");
})






//@ts-ignore
app.post("/dideco/solicitudes/verificacionBeneficiario", controladorSoli.verificacionBeneficiario, (req, res) => {
    console.log("Verificando Beneficiario");
})

//@ts-ignore
app.get("/dideco/solicitudes/obtencionBeneficiosUni", controladorSoli.obtencionBeneficiosUni, (req, res) => {
    console.log("Obteniendo Beneficios");
})

//@ts-ignore
app.get("/dideco/solicitudes/obtencionSolicitudesC", controladorSoli.obtencionSolicitudes, (req, res) => {
    console.log("Obtencion de Solicitudes");
} )

//@ts-ignore
app.post("/dideco/solicitudes/obtenerEstadoSoli" , controladorSoli.obtenerEstadoSolicitud, (req, res) => {
    console.log("Obteniendo Estado Soli");
})

//@ts-ignore
app.post("/dideco/solicitudes/informacionPdf", controladorSoli.obtenerInformacionPdfEntrega, (req, res) => {
    console.log("Obteniendo Informacino PdF Entregas")
})

//*************************
//CONSULTAS
//************************* 
 
//@ts-ignore
app.post("/obtenerConsultas", controladorCons.listarConsultasPrincipal, (req, res) => {
    console.log("Obtencion Consultas")
})

//@ts-ignore
app.post("/crearConsulta", controladorCons.crearConsulta, (req, res) => {
    console.log("Creacion consulta");
})

//@ts-ignore
app.post("/listaConsultaGen", controladorCons.listarConsultaGen, (req, res) => {
    console.log("Obteniendo Para Mod o Visualizar")
})

//@ts-ignore
app.put("/modificacionConsulta", controladorCons.modificarCons, (req, res) => {
    console.log("Modificacion de Consulta")
})

/* 
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
 */
  




//IMPRIMIR ENTREGAS

//@ts-ignore
app.post("/dideco/solicitudes/verificacionEntre", controladorSoli.verificacionEntre, (req, res) => {
    console.log("Verificacion Solicitudes");
})

//@ts-ignore
app.post("/dideco/solicitudes/entregasA", controladorSoli.mostrarEntregasA, (req, res) => {
    console.log("Buscando Solicitudes Anuales");
})

//@ts-ignore
app.post("/dideco/solicitudes/entregasMA", controladorSoli.mostrarEntregasMA, (req, res) => {
    console.log("Buscando Solicitudes Anuales Mensuales");
})


//GRAFICOS DE TORTA

//@ts-ignore
app.post("/dideco/solicitudes/verificacionEntretorta", controladorSoli.verificacionEntretorta, (req, res) => {
    console.log("Verificacion Solicitudes");
})

//@ts-ignore
app.post("/dideco/solicitudes/entregasAtorta", controladorSoli.mostrarEntregasAtorta, (req, res) => {
    console.log("Buscando Solicitudes Anuales");
})

//@ts-ignore
app.post("/dideco/solicitudes/entregasMAtorta", controladorSoli.mostrarEntregasMAtorta, (req, res) => {
    console.log("Buscando Solicitudes Anuales Mensuales");
})