//import jwt from "jsonwebtoken";
import conexion from "../db/conexion";
//@ts-ignore
import { query, Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { sign, SignOptions } from "jsonwebtoken";
//import {serialize} from "cookie";

dotenv.config();





//Funcion para verificar sql vacios o con datos 

function contadorArregloSql(arreglo: any) {

    let contador: number = 0;

    for (let clave in arreglo) {
        if (arreglo.hasOwnProperty(clave)) {
            contador++;
        }
    }

    return contador;

}




//GESTION USUARIOS PRINCIPALES MUNICIPALES Y MUNICIPALIDAD

//CIERRE SESION GLOBAL
//@ts-ignore
exports.cierreSesion = async (req: Request, res: Response) => {

    const vueltaPrincipal : string= "USE GAM";
    
    //@ts-ignore
    conexion.query(vueltaPrincipal, (err, resultado ) => {
        if(err) {throw err;}
        else{
            console.log("Ejecutando la salida de la base de datos volviento a la principal;")
        }
    })
}





//Obtencion de datos principales
//@ts-ignore
exports.obtencionDatosPrincipalesMunicipalidades = async (req: Request, res: Response) => {

    const noPrincipal: String = "principal";

    const queryObtencionDatosMunicipalidades = "SELECT * FROM usuariosprincipal WHERE valormunicipalidadprincipal != ?";

    conexion.query(queryObtencionDatosMunicipalidades, [noPrincipal], (err, result) => {
        if (err) { throw err; }
        else {
            res.send(result);
        }
    })
}


//OBTERNCION DE DATOS DEL SELECT DESDE LA BASE DE DATOS MUNICIPALIDADES
//@ts-ignore
exports.obtencionDatosSelectMunicipalidades = async (req: Request, res: Response) => {
    const obtencioDatosMunicipalidades = "SELECT * FROM datamunicipalidad;";

    conexion.query(obtencioDatosMunicipalidades, (err, resultadoDatosMunicipalidades) => {
        if (err) { throw err; }
        else {
            res.send(resultadoDatosMunicipalidades);
        }
    })
}

//OBTENCION DE DATOS DEL SELECT DESDE LA BASE DE DATOS DEPARTAMENTOSaa
//@ts-ignore
exports.obtencionDatosSelectDepartamentos = async (req: Request, res: Response) => {

    const obtencionDatosDepartamentos = "SELECT * FROM departamentosdisponibles;";

    conexion.query(obtencionDatosDepartamentos, (err, resultadoDatosDepartamentos) => {
        if (err) { throw err; }
        else {
            res.send(resultadoDatosDepartamentos);
        }
    })
}



//@ts-ignore
exports.ingresoMunicipalidad = async (req: Request, res: Response) => {

    //DATOS PARA LAS CREACIONES 
    const rutusuarioprincipal: string = req.body.rutusuarioprincipal;
    const contraseniaprincipal: string = req.body.contraseniaprincipal;
    const nombreusuario: string = req.body.nombreusuarioprincipal;
    const hashcontraseniaprincipal: string = await bcrypt.hash(contraseniaprincipal, 10);
    const nombreBaseMunicipalidad: string = req.body.municipalidad;
    const departamentosAaCrear: any = req.body.departamentos;


    console.log(nombreBaseMunicipalidad);
    console.log(departamentosAaCrear);




    const arregloNumeros = departamentosAaCrear.map((numero: any) => {
        return parseInt(numero, 10);
    })

    //@ts-ignore
    const resultadoSuma: number = arregloNumeros.reduce((acumulador, numero) => acumulador + numero, 0);
    //@ts-ignore
    const resultadoResta: number = arregloNumeros.reduce((acumulador, numero) => acumulador - numero, 0);
    const arregloResultado: number[] = [resultadoSuma, resultadoResta];

    console.log(arregloResultado);

    const departamentosACrear: number = resultadoSuma;
    console.log(departamentosACrear)




    const creacionBaseDatosNombre: string = `CREATE DATABASE ${nombreBaseMunicipalidad};`

    //CONFIRMACION SI EL USUARIO NO EXISTE CON EL MISMO RUT EN OTRA MUNICIPALIDAD
    const confirmacionUsuario: string = "SELECT * FROM usuariosprincipal WHERE rutprincipal = ?;";
    //INGRESO DEL NUEVO USUARIO A LA BASE DE DATOS PRINCIPAL
    const ingresoConfirmacionNuevoUsuario: string = "INSERT INTO usuariosprincipal(rutprincipal, nombreprincipal, contraseniaprincipal, valormunicipalidadprincipal, permisosprincipal) VALUES(?,?,?,?, 1000);";

    //BUSQUEDA SI LA BASE DE DATOS YA EXISTE
    const busquedaBasesDeDatos: string = "SELECT * FROM estadomunicipalidad WHERE valormunicipalidadcreada = ?;";
    //CREAMOS UNA NUEVA BASE DE DATOS EN LA TABLA MUNICIPALIDADES CREADAS
    const baseDatosCreadas: string = "INSERT INTO estadomunicipalidad(valormunicipalidadcreada, departamentosmunicipalidadcreada, estadoMunicipalidad) VALUES(?, ?, 1);";

    //A CONTINUACION ESTARAN TODOS LOS SCHEMAS PARA CREACION DE LA BASE DE DATOS MUNICIPALES 

    //USAMOS LA BASE DE DATOS A ESPECIFICAS
    const usarBaseDeDatosMunicipal: string = `USE ${nombreBaseMunicipalidad};`;


    //QUERY CREACION DE LAS PRINCIPALES  TABLAS DE LA BASE DE DATOS
    const crearBaseDeDatosPrincipalMunicipalParte1: string = "CREATE TABLE usuariomunicipal(rutusuario varchar(10) PRIMARY KEY, nombrecompletousuario varchar(50), permisosusuario int, departamentousuario int, direccionusuario varchar(100), telefonousuario int ,correousuario varchar(100)); ";
    const crearBaseDeDatosPrincipalMunicipalParte2: string = "CREATE TABLE permisos(idpermiso int PRIMARY KEY, nombrepermiso varchar(50), descripcionpermiso LONGTEXT, puntuacionpermiso int);";
    const crearBaseDeDatosPrincipalMunicipalParte3: string = "CREATE TABLE persona(rutpersona varchar(10) PRIMARY KEY, nombrecompleto varchar(120), edadpersona int, direccionpersona varchar(100), telefonopersona int, correopersona varchar(100));";



    //AQUI PARA ADELANTE ES LA CREACION PARA EL DEPARTAMENTO DE DIDECO

    const crearTipoBeneficio = "CREATE TABLE tipobeneficio(idtipobeneficio int Primary Key, nombreBeneficio varchar(50), incialestipobeneficio varchar(4), cantidadAnualPersona int);"

    const crearBeneficio = "CREATE TABLE beneficio(idbeneficio varchar(9) Primary Key, tipobeneficiobeneficio int , descripcionbeneficio longtext, estadoobtencion varchar(45), stockbeneficio int, cantidadanualentrega int);"

    const crearBeneficiario = "CREATE TABLE beneficiario(rutbeneficiario varchar(10) Primary Key, porcentajerhbeneficiario int, nombrepdf varchar(100), typepdf varchar(100), archivopdf blob);"


    const crearClavesOperaciones = "CREATE TABLE clavesoperacion(idclavesoperacion int Primary Key, tipoclaveoperacion varchar(36), claveoperacion varchar(60));"
    //TIPOS CLAVES = INFORMES, ENTREGAS, ELIMINACIONES

    const crearSolicitudes = "CREATE TABLE solicitudes(idsolicitud int Primary Key AUTO_INCREMENT, rutbeneficiariosol varchar(10), idbeneficiosol varchar(9), estadosol varchar(45), fechacreacionsol date, fechafinalsol date, observacionsol longtext);"

    const crearRespaldoEliminaciones = "CREATE TABLE respaldoeliminaciones(idrespaldoeliminada int Primary Key AUTO_INCREMENT, ideliminado varchar(9), idtiposeliminacionesoacciones varchar(30), motivoeliminacion longtext, usuarioeliminando varchar(10));"
    //TIPOS = BENEFICIO, BENEFICIARIO, SOLICITUD)

    const crearHistorial = "CREATE TABLE historial(idhistorial int Primary Key AUTO_INCREMENT, accion varchar(40), idaccionada varchar(9), tipo varchar(25), rutusuarioaccion varchar(10));"
    //ACCION = AGREGAR, ELIMINAR, MODIFICAR;
    //TIPOS = BENEFICIO, BENEFICIARIO, SOLICITUD





    //CREAMOS LA BASE DE DATOS DEL DEPARTAMENTO FALSO 1
    const crearBaseDatosfalso1: string = "CREATE TABLE departamentofalso11(idfalso1 int Primary Key AUTO_INCREMENT, palabrarandomfalso1 varchar(200));";

    //CREAMOS LA BASE DE DATOS DEL DEPARTAMENTO FALSO 2
    const crearBaseDatosfalso2: string = "CREATE TABLE departamentofalso22(idfalso2 int Primary Key AUTO_INCREMENT, palabrarandomfalso2 varchar(200));";

    //VOLVIENDO A LA BASE DE DATOS PRINCIPAL GAM
    const volviendoPrincipal: string = "USE GAM;";





    function creacionDideco() {
        //@ts-ignore
        conexion.query(crearTipoBeneficio, (err30, crearTipBeneficio) => {
            if (err30) { throw err30; }
            else {
                //@ts-ignore
                conexion.query(crearBeneficio, (err31, crearBenefici) => {
                    if (err31) { throw err31; }
                    else {
                        //@ts-ignore
                        conexion.query(crearBeneficiario, (err32, crearBeneficiari) => {
                            if (err32) { err32; }
                            else {

                                //@ts-ignore
                                conexion.query(crearClavesOperaciones, (err37, crearClavesOperacione) => {
                                    if (err37) { throw err37; }
                                    else {
                                        //@ts-ignore
                                        conexion.query(crearSolicitudes, (err38, crearSolicitude) => {
                                            if (err38) { throw err38; }
                                            else {
                                                //@ts-ignore
                                                conexion.query(crearHistorial, (err48, crearHistoria) => {
                                                    if (err48) { throw err48; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(crearRespaldoEliminaciones, (err36, creandoRespaldos) => {
                                                            if (err36) { throw err36; }
                                                            else {
                                                                //@ts-ignore
                                                                conexion.query(volviendoPrincipal, (err9, volviendo) => {
                                                                    if (err9) { throw err9; }
                                                                    else {
                                                                        console.log("vuelta")
                                                                        const msj: string = "CBDM";
                                                                        res.json({ message: msj })
                                                                    }
                                                                })
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }



    function creacionDepartamentoFalso1() {
        //@ts-ignore
        conexion.query(crearBaseDatosfalso1, (err8, creandoBaseFalso1) => {
            if (err8) { throw err8; }
            else {
                console.log("Se ha creado el departamento falso 1 con exito")
            }
        })
    }

    function creacionDepartamentoFalso2() {

        //@ts-ignore
        conexion.query(crearBaseDatosfalso2, (err8, creandoBaseFalso2) => {
            if (err8) { throw err8; }
            else {

                console.log("Se ha creado el departamento falso 2 con exito")

            }
        })
    }


    function vueltaPrincipal() {
        //@ts-ignore
        conexion.query(volviendoPrincipal, (err9, volviendo) => {
            if (err9) { throw err9; }
            else {
                console.log("vuelta")
                const msj: string = "CBDM";
                res.json({ message: msj })
            }
        })
    }






    async function crearDepartamentos() {
        try {
            if (departamentosACrear == 100 || departamentosACrear >= 30) {
                await creacionDepartamentoFalso1();
                await creacionDepartamentoFalso2();
                await creacionDideco();
            } else if (departamentosACrear == 3) {
                await creacionDideco();
            } else if (departamentosACrear == 10) {
                await creacionDepartamentoFalso1();
                await vueltaPrincipal();
            } else if (departamentosACrear == 17) {
                await creacionDepartamentoFalso2();
                await vueltaPrincipal();
            } else if (departamentosACrear == 13) {
                await creacionDepartamentoFalso1();
                await creacionDideco();
            } else if (departamentosACrear == 20) {
                await creacionDepartamentoFalso2();
                await creacionDideco();
            } else if (departamentosACrear == 27) {
                await creacionDepartamentoFalso1();
                await creacionDepartamentoFalso2();
                await vueltaPrincipal();
            }
        } catch (error) {
            console.error("Error en la creación de departamentos:", error);
        } finally {
            console.log("Termino de Codigo");
        }
    }




    conexion.query(confirmacionUsuario, [rutusuarioprincipal], (err1, usuariosRut) => { //COMPROBAMOS SI YA EXISTE UN USUARIO CON EL MISMO RUT
        if (err1) { throw err1; }

        const cantidadUsuarios: number = contadorArregloSql(usuariosRut);

        if (cantidadUsuarios == 0) {
            //@ts-ignore
            conexion.query(ingresoConfirmacionNuevoUsuario, [rutusuarioprincipal, nombreusuario, hashcontraseniaprincipal, nombreBaseMunicipalidad], (err2, ingresoNuevoUsusario) => { //INGRESAMOS EL NUEVO USUARIO ENCADENADO A LA CREACION DE LA NUEVA BASE DE DATOS
                if (err2) { throw err2; }
                else {
                    conexion.query(busquedaBasesDeDatos, [nombreBaseMunicipalidad], (err3, baseDatos) => { //COMPROBACION LA BASE DE DATOS YA EXISTE
                        if (err3) { throw err3; }
                        const cantidadBaseDatos: number = contadorArregloSql(baseDatos);

                        if (cantidadBaseDatos == 0) {
                            //@ts-ignore
                            conexion.query(baseDatosCreadas, [nombreBaseMunicipalidad, departamentosACrear], (err19, crearBaseTabla) => { //INGRESAMOS LOS DATOS A LA TABLA MUNICIPALIDADES CREADAS
                                if (err19) { throw err19; }
                                else {

                                    //@ts-ignore
                                    conexion.query(creacionBaseDatosNombre, (err4, creacion) => { //CREAMOS LA BASE DE DATOS MUNICIPAL NUEVA
                                        if (err4) { throw err4; }

                                        else {
                                            //@ts-ignore
                                            conexion.query(usarBaseDeDatosMunicipal, (err5, usandoBaseDatosMunicipal) => {
                                                if (err5) { throw err5; }
                                                else {
                                                    //@ts-ignore
                                                    conexion.query(crearBaseDeDatosPrincipalMunicipalParte1, (err6, creandoBaseDatosMunicipalTablas1) => {
                                                        if (err6) { throw err6; }
                                                        else {
                                                            //@ts-ignore
                                                            conexion.query(crearBaseDeDatosPrincipalMunicipalParte2, (err20, creandoBaseDatosMunicipalTablas2) => {
                                                                if (err20) { throw err20; }
                                                                else {
                                                                    //@ts-ignore
                                                                    conexion.query(crearBaseDeDatosPrincipalMunicipalParte3, (err21, creandoBaseDatosMunicipalTablas3) => {
                                                                        if (err21) { throw err21; }
                                                                        else {

                                                                            crearDepartamentos();

                                                                        }
                                                                    })
                                                                }
                                                            })



                                                        }
                                                    })
                                                }
                                            })



                                        }
                                    })
                                }
                            })
                        }
                        if (cantidadBaseDatos > 0) {
                            console.log("Aqui hay que poner que la base de datos ya fue creada y si es que quiera modificar la cantidad de departamentos que se le brindan.")

                        }

                    })
                }
            })
        }
        if (cantidadUsuarios > 0) {
            console.log("Aqui hay que poner que devuelva un valor que indique que el usuario ya existe por lo cual despliega una alerta o ventana modal.")
            const msj: string = "CBDE";
            res.json({ message: msj })
        }

    })

}

//@ts-ignore
exports.inicioSesion = async (req: Request, res: Response) => {

    const rut: string = req.body.rutUsuario;
    const contrasenia: string = req.body.contraseniaUsuario;

    const existenciaUsuario: string = "SELECT * FROM usuariosprincipal WHERE rutprincipal = ?;";
    const iniciarConexionBaseDatos: string = "USE ??;"
    const busquedaInformacionUsuarioMunicipal: string = "SELECT * FROM usuariomunicipal WHERE rutusuario = ?;";
    const busquedaInformacionUsuarioPrinciap: string = "SELECT * FROM usuariosprincipal WHERE rutprincipal = ?;"
    const busquedaInformacionMunicipalidad: string = "SELECT * FROM estadomunicipalidad WHERE valormunicipalidadcreada = ?;";
    const nombreMunicipalidad: string = "SELECT * FROM datamunicipalidad WHERE valormunicipalidad = ?";

    conexion.query(existenciaUsuario, [rut], (err1, cantidad) => {
        if (err1) { throw err1; }
        const cantidadUsusarios: number = contadorArregloSql(cantidad);

        if (cantidadUsusarios == 0) {
            console.log("El usuario no existe")
        }
        if (cantidadUsusarios == 1) {

            console.log("El usuario se ha encontrado")
            const datos = cantidad[0];
            console.log(datos, "Estos son los datos de la municipalidad");
            const municipalidad: string = datos.valormunicipalidadprincipal;
            console.log(municipalidad);
            const contraseniaAlmacenada: string = datos.contraseniaprincipal;
            const valorPermisos: number = datos.permisosprincipal;
            //@ts-ignore

            bcrypt.compare(contrasenia, contraseniaAlmacenada, (err2, resultadoContrasenias) => {
                if (err2) { throw err2; }

                if (resultadoContrasenias) {
                    console.log("Contrasenia es valida")
                    if (municipalidad == "principal" || municipalidad == "principalprincipal") {
                        const princi: string = "GAM";
                        //@ts-ignore
                        conexion.query(iniciarConexionBaseDatos, [princi], (err4, conectando) => {
                            if (err4) { throw err4; }
                            conexion.query(busquedaInformacionUsuarioPrinciap, [rut], (err5, busquedaUsuario) => {
                                if (err5) { throw err5; }
                                const datosNuevos = busquedaUsuario[0];
                                console.log(datosNuevos);
                                const nombreGuardar: string = datosNuevos.nombrePrincipal;
                                const rutGuardar: string = datosNuevos.rutprincipal;
                                const permisosGuardar: number = datosNuevos.permisosprincipal;
                                const nombreMunicipalidad: string = municipalidad;

                                const informacionGuardar = { nombreG: nombreGuardar, rutG: rutGuardar, permisosG: permisosGuardar, nombreMunicipalidadG: nombreMunicipalidad };

                                const cookieOpciones: SignOptions = {
                                    expiresIn: '3h',
                                    algorithm: 'HS256'
                                };

                                const claveSecreta = process.env.COOKIE_CLAVE;
                                if (!claveSecreta) {
                                    console.log("Error en clave secreta");
                                }
                                else {
                                    const firmaCookie = sign(informacionGuardar, claveSecreta, cookieOpciones);

                                    console.log(firmaCookie);

                                    res.cookie("muni", firmaCookie, { httpOnly: false, maxAge: 3600000 });
                                    const mensajeEntreda: string = "EP";
                                    res.json({ mensaje: mensajeEntreda });
                                }
                            })

                        })
                    }
                    else {
                        //@ts-ignore
                        conexion.query(busquedaInformacionMunicipalidad, [municipalidad], (err3, informacionMunicipalidad) => {
                            if (err3) { throw err3; }
                            else {
                                const datosMunicipales = informacionMunicipalidad[0];
                                const estadoMunicipal = datosMunicipales.estadoMunicipalidad;

                                if (estadoMunicipal == 1) { //MUNICIPALIDA DESBLOQUEADA
                                    conexion.query(nombreMunicipalidad, [municipalidad], (err23, informacionNombreMuni) => {
                                        if (err23) { throw err23; }
                                        else {
                                            const nombreMunicipalidad = informacionNombreMuni[0].nombremunicipalidad;



                                            const nombreM = nombreMunicipalidad;


                                            if (valorPermisos == 1000) {
                                                conexion.query(busquedaInformacionUsuarioPrinciap, [rut], (err4, busquedaUsuario) => {
                                                    if (err4) { throw err4; }
                                                    //@ts-ignore
                                                    conexion.query(iniciarConexionBaseDatos, [municipalidad], (err5, conectando) => {
                                                        if (err5) { throw err5; }
                                                        const datosNuevos = busquedaUsuario[0];
                                                        console.log(datosNuevos, "Estos son los datos nuevos");
                                                        const nombreGuardar = datosNuevos.nombrePrincipal;
                                                        const rutGuardar: string = datosNuevos.rutprincipal;
                                                        const permisosGuardar: number = datosNuevos.permisosprincipal;
                                                        const departamentoGuardar: number = datosMunicipales.departamentosmunicipalidadcreada;
                                                        const nombreMunicipalidad: string = municipalidad;
                                                        /*                                         const departamentosEnLaMunicipalidad: number = departamentosMunicipales;
                                                         */
                                                        const informacionGuardar = { nombreMuniG: nombreM, nombreG: nombreGuardar, rutG: rutGuardar, permisosG: permisosGuardar, departamentoG: departamentoGuardar, nombreMunicipalidadG: nombreMunicipalidad };

                                                        console.log(informacionGuardar);
                                                        const cookieOpciones: SignOptions = {
                                                            expiresIn: '3h',
                                                            algorithm: 'HS256'
                                                        };

                                                        const claveSecreta = process.env.COOKIE_CLAVE;
                                                        if (!claveSecreta) {
                                                            console.log("Error en clave secreta");
                                                        }
                                                        else {
                                                            const firmaCookie = sign(informacionGuardar, claveSecreta, cookieOpciones);

                                                            res.cookie("muni", firmaCookie, { httpOnly: false, maxAge: 3600000, secure: false });
                                                            const mensajeEntrada: string = "EM";
                                                            res.json({ mensaje: mensajeEntrada });
                                                            console.log("Cookie Establecida")
                                                        }
                                                    })

                                                })
                                            }
                                            else {
                                                //@ts-ignore 
                                                conexion.query(iniciarConexionBaseDatos, [municipalidad], (err4, conectando) => {
                                                    if (err4) { throw err4; }
                                                    conexion.query(busquedaInformacionUsuarioMunicipal, [rut], (err5, busquedaUsuario) => {
                                                        if (err5) { throw err5; }
                                                        const datosNuevos = busquedaUsuario[0];
                                                        console.log(datosNuevos, "Estos serias los datos del usuario");
                                                        const nombreGuardar: string = datosNuevos.nombrecompletousuario;
                                                        console.log(nombreGuardar);
                                                        const rutGuardar: string = datosNuevos.rutusuario;
                                                        const permisosGuardar: number = datosNuevos.permisosusuario;
                                                        const departamentoGuardar: number = datosNuevos.departamentousuario;
                                                        const nombreMunicipalidad: string = municipalidad;
                                                        /*                                         const departamentosEnLaMunicipalidad: number = departamentosMunicipales;
                                                         */
                                                        const informacionGuardar = { nombreG: nombreGuardar, rutG: rutGuardar, permisosG: permisosGuardar, departamentoG: departamentoGuardar, nombreMunicipalidadG: nombreMunicipalidad };


                                                        const cookieOpciones: SignOptions = {
                                                            expiresIn: '3h',
                                                            algorithm: 'HS256'
                                                        };

                                                        const claveSecreta = process.env.COOKIE_CLAVE;
                                                        if (!claveSecreta) {
                                                            console.log("Error en clave secreta");
                                                        }
                                                        else {
                                                            const firmaCookie = sign(informacionGuardar, claveSecreta, cookieOpciones);

                                                            res.cookie("muni", firmaCookie, { httpOnly: false, maxAge: 3600000 });
                                                            const mensajeEntrada: string = "EM";
                                                            res.json({ mensaje: mensajeEntrada });
                                                        }
                                                    })

                                                })
                                            }


                                        }
                                    })
                                }
                                else { //MUNICIPALIDAD BLOQUEADA SIN ACCESO PARA LOS USUARIOS CONTACTAR CON ADMINISTRADORES PRINCIPALES
                                    const msjjj: string = "AB"; //ACCESO BLOQUEADO
                                    res.json({ message: msjjj });
                                }


                            }
                        })
                    }



                }
                else {
                    console.log("Contrasenia es incorrecta");
                    const msjjjj: string = "UOCI" //USUARIO O CONTRASENIA INVALICOS
                    res.json({ message: msjjjj });
                }
            })

        }
  

    

    })

}

//DESBLOQUEAR MUNICIPALIDAD
exports.desbloqueoMunicipal = async (req: Request, res: Response) => {

    const valor = req.body.municipalidad;

    const valorNuevo = 1;
    const desbloq: string = "UPDATE estadoMunicipalidad = ? WHERE valormunicipalidadcreada = ?";
    //@ts-ignore
    conexion.query(desbloq, [valorNuevo, valor], (err, resultado) => {
        if (err) { throw err; }
        else {
            const msj: string = "MD"; //MUNICIPALIDAD DESBLOQUEADA
            res.json({ message: msj });
        }
    })
}

//BLOQUEAR MUNICIPALIAD
exports.bloquearMunicipalidad = async (req: Request, res: Response) => {
    const valor = req.body.municipalidad;

    const valorNuevo = 2;
    const desbloq: string = "UPDATE estadoMunicipalidad = ? WHERE valormunicipalidadcreada = ?";
    //@ts-ignore
    conexion.query(desbloq, [valorNuevo, valor], (err, resultado) => {
        if (err) { throw err; }
        else {
            const msj: string = "MB"; //MUNICIPALIDAD BLOQUEADA
            res.json({ message: msj });
        }
    })

}

//OBTENCION DE DATOS PARA BLOQUEAR O DESBLOQUEAR
exports.extraccionDatosMunicipalidad = async (req: Request, res: Response) => {
    const municipalidad = req.body.municipalidad;

    const obtencionDatos: string = "SELECT * FROM estadomunicipalidad WHERE valormunicipalidadcreada = ?";

    conexion.query(obtencionDatos, [municipalidad], (err, resultado) => {
        if (err) { throw err; }
        else {
            const datosMunicipaless = resultado[0];
            const estoadMunicipalidad = datosMunicipaless.estadoMunicipalidad;
            res.json({ estadoMuni: estoadMunicipalidad });
        }
    })
}









/* 

//GESTION DE USUARIOS MUNICIPALES


//LISTAR USUARIOS MUNICIPALES
//@ts-ignore
exports.listarUsuarios = async (req: Request, res: Response) => {

    const listarUsuario: string = "SELECT * FROM usuariomunicipal";

    conexion.query(listarUsuario, (err, resultadoLista) => {
        if (err) { throw err; }
        else {
            res.send(resultadoLista);
            console.log("usuarios", resultadoLista)
        }
    })
}

//LISTAR DEPARTAMENTOS GAM
//@ts-ignore
exports.listarUsuariosDepartamentos = async (req: Request, res: Response) => {

    const municipalidad = req.body.municipalidad;


    const obtencioDepartamentos = "SELECT * FROM estadomunicipalidad WHERE valormunicipalidadcreada = ?";


    conexionFija.query(obtencioDepartamentos, [municipalidad], (err, resultadoDatosDepartamentos) => {
        if (err) { throw err; }
        else {
            console.log(resultadoDatosDepartamentos, "departamentos");
            res.send(resultadoDatosDepartamentos);
        }
    })
}

//LISTAR PERMISOS
//@ts-ignore
exports.listarPermisos = async (req: Request, res: Response) => {

    const obtencionPermisos = "SELECT * FROM permisos";

    conexion.query(obtencionPermisos, (err, resultado) => {
        if (err) { throw err; }
        else {
            console.log(resultado, " permisos")
            res.send(resultado);
        }
    })
}

//MOSTRAR EN MODIFICACIONES
exports.mostrarModificacion = async (req: Request, res: Response) => {

    const rutUsuario = req.body.rutusuario;

    const obtencionDatosUsuario: string = "SELECT * FROM usuariomunicipal WHERE rutusuario = ?";

    conexion.query(obtencionDatosUsuario, [rutUsuario], (err, resultado) => {
        if (err) { throw err; }
        else {
            const datosUsuario = resultado[0];
            const rutt = datosUsuario.rutusuario;
            const nombree = datosUsuario.nombrecompletousuario;
            const permisoss = datosUsuario.permisosusuario;
            const departamentoss = datosUsuario.departamentousuario;
            const direccionn = datosUsuario.direccionusuario;
            const telefonoo = datosUsuario.telefonousuario;
            const correoo = datosUsuario.correousuario;

            res.json({ rut: rutt, nombre: nombree, permisos: permisoss, departamentos: departamentoss, direccion: direccionn, telefono: telefonoo, correo: correoo });
        }
    })
}

//CREAR USUARIOS MUNICIPALES    agregar historial
//@ts-ignore
exports.creacionUsuariosMunicipales = async (req: Request, res: Response) => {

    const rut = req.body.rutusuario;
    const nombre = req.body.nombrecompleto;
    const permisos = req.body.permisos;
    const departamentos = req.body.departamentos;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;
    const correo = req.body.correo;

    const municipalidad = req.body.municipalidad;
    const contrasenia = req.body.contrasenia;

    const verificacionPrincipal: string = "SELECT * FROM usuariosprincipal WHERE rutprincipal = ?"
    const creacionPrincipal: string = "INSERT INTO usuariosprincipal(rutprincipal, nombreprincipal, contraseniaprincipal, valormuncipalidadprincipal, permisosprincipal) VALUES (?,?,?,?,?)";


    /*     const verificacionExistencias: string = "SELECT * FROM usuariomunicipal WHERE rutusuario = ?"
     */
    /* const ingresoUsuario: string = "INSERT INTO usuariomunicipal(rutusuario, nombrecompletousuario, permisosusuario, departamentousuario, direccionusuario, telefonousuario, correousuario) VALUES(?,?,?,?,?,?,?)"


    conexionFija.query(verificacionPrincipal, [rut], (err, resultadoExistencias) => {
        if (err) { throw err; }
        else {
            const cantidad = contadorArregloSql(resultadoExistencias);

            if (cantidad > 0) {
                console.log("Usuario ya existe");
                const msj: string = "UYA" //USUARIO YA EXISTE
                res.json({ message: msj });
            }
            else {
                //@ts-ignore
                conexion.query(ingresoUsuario, [rut, nombre, permisos, departamentos, direccion, telefono, correo], (err1, ingreso) => {
                    if (err1) { throw err1; }
                    else {
                        //@ts-ignore
                        conexionFija.query(creacionPrincipal, [rut, nombre, contrasenia, municipalidad, permisos], (err23, resultadoa) => {
                            if (err23) { throw err23; }
                            else {
                                console.log("Creacion del usuario exitosa");
                                const msjj: string = "URE" // USUARIO REGISTRADO EXITOSAMENTE
                                res.json({ message: msjj });
                            }
                        })

                    }
                })
            }
        }
    })
} */

/* //MODIFICACION DE USUARIOS     agregar historial
exports.modificacionUsuariosMunicipales = async (req: Request, res: Response) => {

    const rut = req.body.rut;
    const nombre = req.body.nombre;
    const permisos = req.body.permisos;
    const departamentos = req.body.departamentos;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;
    const correo = req.body.correo;

    const actualizacionDatos: string = "UPDATE usuariomunicipal SET nombrecompletousuario = ?, permisosusuario = ?, departamentousuario = ?, direccionusuario = ?, telefonousuario = ?, correousuario = ? WHERE rutusuario = ?";

    //@ts-ignore
    conexion.query(actualizacionDatos, [nombre, permisos, departamentos, direccion, telefono, correo, rut], (err, resultado) => {
        if (err) { throw err; }
        else {
            const msj: string = "UA" //USUARIO ACTUALIZADO
            res.json({ message: msj });
        }
    })
} */

/* exports.eliminarUsuarios = async (req: Request, res: Response) => {

    const rut = req.body.rutusuario;

    const eliminarUsuario = "DELETE FROM usuariomunicipal WHERE rutusuario = ?";
    //@ts-ignore
    conexion.query(eliminarUsuario, [rut], (err, resultado) => {
        if (err) { throw err; }
        else {
            const msj: string = "UEE" //USUARIO ELIMINADO EXITOSAMENTE
            res.json({ message: msj });
        }
    })

}
 */



 