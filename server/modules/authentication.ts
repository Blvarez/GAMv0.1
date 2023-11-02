//import jwt from "jsonwebtoken";
import conexion from "../db/conexion";
import { Request, Response } from "express";
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
    const obtencioDatosMunicipalidades = "SELECT * FROM municipalidadesdisponibles;";

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
    const nombreusuario : string = req.body.nombreusuarioprincipal;
    const hashcontraseniaprincipal: string = await bcrypt.hash(contraseniaprincipal, 10);
    const nombreBaseMunicipalidad: string = req.body.municipalidad; 
    const departamentosACrear: number = req.body.departamentos;


    console.log(departamentosACrear, nombreBaseMunicipalidad);



    const creacionBaseDatosNombre: string = "CREATE DATABASE ?;"

    //CONFIRMACION SI EL USUARIO NO EXISTE CON EL MISMO RUT EN OTRA MUNICIPALIDAD
    const confirmacionUsuario: string = "SELECT * FROM usuariosprincipal WHERE rutprincipal = ?;";
    //INGRESO DEL NUEVO USUARIO A LA BASE DE DATOS PRINCIPAL
    const ingresoConfirmacionNuevoUsuario: string = "INSERT INTO usuariosprincipal(rutprincipal, nombreprincipal, contraseniaprincipal, valormunicipalidadprincipal, permisosprincipal) VALUES(?,?,?,?, 1000);";

    //BUSQUEDA SI LA BASE DE DATOS YA EXISTE
    const busquedaBasesDeDatos: string = "SELECT * FROM municipalidadescreadas WHERE valormunicipalidadcreada = ?;";
    //CREAMOS UNA NUEVA BASE DE DATOS EN LA TABLA MUNICIPALIDADES CREADAS
    const baseDatosCreadas: string = "INSERT INTO municipalidadescreadas(valormunicipalidadcreadas, departamentosmunicipalidadcreada) VALUES(?, ?);";

    //A CONTINUACION ESTARAN TODOS LOS SCHEMAS PARA CREACION DE LA BASE DE DATOS MUNICIPALES 

    //USAMOS LA BASE DE DATOS A ESPECIFICAS
    const usarBaseDeDatosMunicipal: string = "USE ?; "
    //QUERY CREACION DE LAS PRINCIPALES  TABLAS DE LA BASE DE DATOS
    const crearBaseDeDatosPrincipalMunicipal: string = "CREATE TABLE usuariomunicipal(rutusuario varchar(10) Primary Key, nombrecompletousuario varchar(50), contrasenia varchar(60), permisosusuario int, departamentousuario int, direccionusuario varchar(100), telefonousuario int ,correousuario varchar(100)); CREATE TABLE permisos(idpermiso int Primary Key, nombrepermiso varchar(50), descripcionpermiso longtext, puntuacionpermiso int); CREATE TABLE persona(rutpersona varchar(10) Primary Key, nombres varchar(36), apellidos varchar(36), edadpersona int, direccionpersona varchar(100), telefonopersona int, correopersona varchar(100));";
    //CREAMOS EL SCHEMA PARA LA CREACION DEL DEPARTAMENTO DE DIDECO
    const crearSchemaDideco: string = "CREATE SCHEMA departamentodidecogestionbeneficios;";
    //NOS CAMBIAMOS AL SCHEMA DEL DEPARTAMENTO DE DIDECO
    const usarschemaDideco: string = "USE departamentodidecogestionbeneficios;";
    //CREAMOS LA BASE DE DATOS DEL DEPARTAMENTO DE DIDECO
    const crearBaseDeDatosDideco: string = "CREATE TABLE tipobeneficio(idtipobeneficio int Primary Key, nombreBeneficio varchar(50), incialestipobeneficio varchar(4), tipotiempobeneficio int); CREATE TABLE beneficio(idbeneficio varchar(9) Primary Key, tipobeneficiobeneficio int , descripcionbeneficio longtext, estadoobtencion varchar(45), stockbeneficio int, cantidadanualentrega int); CREATE TABLE beneficiario(rutbeneficiario varchar(10) Primary Key, porcentajerhbeneficiario int, nombrepdf varchar(100), typepdf varchar(100), archivopdf blob); CREATE TABLE tipoclavesoperaciones(idtipoclave int Primary Key, nombretipoclave varchar(50)); INSERT INTO tipoclavesoperaciones(idtipoclave, nombretipoclave) VALUES(1, 'Para Eliminaciones');INSERT INTO tipoclavesoperaciones(idtipoclave, nombretipoclave) VALUES(2, 'Para Entregas');INSERT INTO tipoclavesoperaciones(idtipoclave, nombretipoclave) VALUES(3, 'Para Informes') ;CREATE TABLE clavesoperacion(idclavesoperacion int Primary Key AUTO_INCREMENT, tipoclaveoperacion int, claveoperacion varchar(60); CREATE TABLE solicitudes(idsolicitud int Primary Key AUTO_INCREMENT, rutbeneficiariosol varchar(10), idbeneficiosol varchar(9), estadosol varchar(45), fechacreacionsol date, fechafinalsol date, observacionsol longtext); CREATE TABLE tiposeliminacionesoacciones(idtipoeliminacionaccion int Primary Key, nombretipoeliminacionaccion varchar(50)); INSERT INTO tiposeliminacionesoacciones(idtipoeliminacionaccion, nombretipoeliminacionaccion) VALUES(1, 'beneficiario'); INSERT INTO tiposeliminacionesoacciones(idtipoeliminacionaccion, nombretipoeliminacionaccion) VALUES(2, 'beneficio'); INSERT INTO tiposeliminacionesoacciones(idtipoeliminacionaccion, nombretipoeliminacionaccion) VALUES(3, 'solicitud'); CREATE TABLE respaldoeliminaciones(idrespaldoeliminada int Primary Key AUTO_INCREMENT, ideliminado varchar(9), idtiposeliminacionesoacciones int, motivoeliminacion longtext, usuarioeliminando varchar(10)); CREATE TABLE acciones(idaccion int PRIMARY KEY, nombreaccion varchar(20)); INSERT INTO acciones(idaccion, nombreaccion) VALUES(1, 'AGREGAR'); INSERT INTO acciones(idaccion, nombreaccion) VALUES(2, 'MODIFICAR'); INSERT INTO acciones(idaccion, nombreaccion) VALUES(3, 'ELIMINAR'); CREATE TABLE historial(idhistorial int Primary Key AUTO_INCREMENT, idacciones int, idtiposeliminacionesoacciones int, idaccionada varchar(9), rutusuarioaccion varchar(10);";
    //CREAMOS EL SCHEMA DEL DEPARTAMENTO FALSO 1
    const crearSchemaFalso1: string = "CREATE SCHEMA departamentofalso1;";
    //NOS CAMBIAMOS AL SCHEMA NUEVO DEL DEPARTAMENTO FALSO 1
    const usarSchemafalso1: string = "USE departamentofalso1;";
    //CREAMOS LA BASE DE DATOS DEL DEPARTAMENTO FALSO 1
    const crearBaseDatosfalso1: string = "CREATE TABLE departamentofalso11(idfalso1 int Primary Key AUTO_INCREMENT, palabrarandomfalso1 varchar(200));";
    //CREAMOS EL SCHEMA DEL DEPARTAMENTO FALSO 2
    const crearschemaFalso2: string = "CREATE SCHEMA departamento falso2;";
    //NOS CAMBIAMOS AL SCHEMA NUEVO DEL DEPARTAMENTO FALSO 2
    const usarSchemafalso2: string = "USE departamentofalso2;";
    //CREAMOS LA BASE DE DATOS DEL DEPARTAMENTO FALSO 2
    const crearBaseDatosfalso2: string = "CREATE TABLE departamentofalso22(idfalso2 int Primary Key AUTO_INCREMENT, palabrarandomfalso2 varchar(200));";

    //VOLVIENDO A LA BASE DE DATOS PRINCIPAL GAM
    const volviendoPrincipal: string = "USE GAM;";




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
                                    conexion.query(creacionBaseDatosNombre, [nombreBaseMunicipalidad], (err4, creacion) => { //CREAMOS LA BASE DE DATOS MUNICIPAL NUEVA
                                        if (err4) { throw err4; }

                                        else {
                                            //@ts-ignore
                                            conexcion.query(usarBaseDeDatosMunicipal, [nombreBaseMunicipalidad], (err5, usandoBaseDatosMunicipal) => {
                                                if (err5) { throw err5; }
                                                else {
                                                    //@ts-ignore
                                                    conexion.query(crearBaseDeDatosPrincipalMunicipal, (err6, creandoBaseDatosMunicipalTablas) => {
                                                        if (err6) { throw err6; }
                                                        else {

                                                        }
                                                    })
                                                }
                                            })

                                            if (departamentosACrear == 100 || departamentosACrear >= 30) { //TODOS LOS DEPARTAMENTOS

                                                console.log("Se creara la base de datos con todos los departamentos;")

                                                //@ts-ignore
                                                conexion.query(crearSchemaDideco, (err7, creandoGrupoDideco) => { //CREAMOS EL APARTADO PARA EL DEPARTAMENTO DIDECO EL SCHEMA
                                                    if (err7) { throw err7; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(usarschemaDideco, (err8, usandoGrupoDideco) => {
                                                            if (err8) { throw err8; }
                                                            else {
                                                                //@ts-ignore
                                                                conexion.query(crearBaseDeDatosDideco, (err9, creandoBaseDatosDideco) => {
                                                                    if (err9) { throw err9; }
                                                                    else {
                                                                        //@ts-ignore
                                                                        conexion.query(usarBaseDeDatosMunicipal, [nombreBaseMunicipalidad], (err10, volviendoPrincipalMunicipal) => {
                                                                            if (err10) { throw err10; }
                                                                            else {
                                                                                //@ts-ignore
                                                                                conexion.query(crearSchemaFalso1, (err11, creandoGrupoFalso1) => {
                                                                                    if (err11) { throw err11; }
                                                                                    else {
                                                                                        //@ts-ignore
                                                                                        conexion.query(usarSchemafalso1, (err12, usandoGrupoFalso1) => {
                                                                                            if (err12) { throw err12; }
                                                                                            else {
                                                                                                //@ts-ignore
                                                                                                conexion.query(crearBaseDatosfalso1, (err13, creandoBaseDatosFalso1) => {
                                                                                                    if (err13) { throw err13; }
                                                                                                    else {
                                                                                                        //@ts-ignore
                                                                                                        conexion.query(usarBaseDeDatosMunicipal, [nombreBaseMunicipalidad], (err14, volviendoPrincipalMunicipal2) => {
                                                                                                            if (err14) { throw err14; }
                                                                                                            else {
                                                                                                                //@ts-ignore
                                                                                                                conexion.query(crearschemaFalso2, (err15, creandoGrupoFalso2) => {
                                                                                                                    if (err15) { throw err15; }
                                                                                                                    else {
                                                                                                                        //@ts-ignore
                                                                                                                        conexion.query(usarSchemafalso2, (err16, usandoGrupoFalso2) => {
                                                                                                                            if (err16) { throw err16; }
                                                                                                                            else {
                                                                                                                                //@ts-ignore
                                                                                                                                conexion.query(crearBaseDatosfalso2, (err17, creandoBaseDatosFalso2) => {
                                                                                                                                    if (err17) { throw err17; }
                                                                                                                                    else {
                                                                                                                                        //@ts-ignore
                                                                                                                                        conexion.query(volviendoPrincipal, (err18, volviendoPrincipalPrincipal) => {
                                                                                                                                            if (err18) { throw err18; }
                                                                                                                                            else {
                                                                                                                                                console.log("Se ha creado exitosamente la nueva base de datos de la municipalidad: ", nombreBaseMunicipalidad);
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
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                })




                                            }

                                            if (departamentosACrear == 3) {

                                                console.log("Se creara solo el departamento de Dideco (Gestion de Beneficios)");
                                                //@ts-ignore
                                                conexion.query(crearSchemaDideco, (err7, creandoGrupoDideco) => {
                                                    if (err7) { throw err7; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(usarschemaDideco, (err8, usandoDideco) => {
                                                            if (err8) { throw err8; }
                                                            else {
                                                                //@ts-ignore
                                                                conexion.query(crearBaseDeDatosDideco, (err9, creandoDideco) => {
                                                                    if (err9) { throw err9; }
                                                                    else {
                                                                        //@ts-ignore
                                                                        conexion.query(volviendoPrincipal, (err10, volviendoPrincipalPrincipal) => {
                                                                            if (err10) { throw err10; }
                                                                            else {
                                                                                console.log("Creacion completa de la municipalidad solo con el departamento de dideco;")
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                })


                                            }

                                            if (departamentosACrear == 10) {

                                                console.log("Se creara el primer departamento falso")
                                                //@ts-ignore
                                                conexion.query(crearSchemaFalso1, (err6, creandoSchemaFalso1) => {
                                                    if (err6) { throw err6 }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(usarSchemafalso1, (err7, usarSchemaFalso1) => {
                                                            if (err7) { throw err7; }
                                                            else {
                                                                //@ts-ignore
                                                                conexion.query(crearBaseDatosfalso1, (err8, creandoBaseFalso1) => {
                                                                    if (err8) { throw err8; }
                                                                    else {
                                                                        //@ts-ignore
                                                                        conexion.query(volviendoPrincipal, (err9, volviendo) => {
                                                                            if (err9) { throw err9; }
                                                                            else {
                                                                                console.log("Creacion base de datos con exito junto al departamento falso 1;")
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                })



                                            }

                                            if (departamentosACrear == 17) {

                                                console.log("Se creara el segundo departamento falso");
                                                //@ts-ignore
                                                conexion.query(crearschemaFalso2, (err6, creandoSchemaFalso2) => {
                                                    if (err6) { throw err6; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(usarSchemafalso2, (err7, usandoSchemaFalso2) => {
                                                            if (err7) { throw err7; }
                                                            else {
                                                                //@ts-ignore
                                                                conexion.query(crearBaseDatosfalso2, (err8, creandoBaseFalso2) => {
                                                                    if (err8) { throw err8; }
                                                                    else {
                                                                        //@ts-ignore
                                                                        conexion.query(volviendoPrincipal, (err9, volviendo) => {
                                                                            if (err9) { throw err9; }
                                                                            else {
                                                                                console.log("Creacion completa de la base de datos junto al departamento falso 2;")
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                })


                                            }

                                            if (departamentosACrear == 13) {

                                                console.log("Se creara el primer departamento falso y departamentod de dideco");
                                                //@ts-ignore
                                                conexion.query(crearSchemaDideco, (err7, creandoGrupoDideco) => {
                                                    if (err7) { throw err7; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(crearBaseDeDatosDideco, (err8, crearBaseDideco) => {
                                                            if (err8) { throw err8; }
                                                            else {
                                                                //@ts-ignore
                                                                conexion.query(usarBaseDeDatosMunicipal, [nombreBaseMunicipalidad], (err9, volviendoPrincipalMunicipal) => {
                                                                    if (err9) { throw err9; }
                                                                    else {
                                                                        //@ts-ignore
                                                                        conexion.query(crearSchemaFalso1, (err10, creandoGrupoFalso1) => {
                                                                            if (err10) { throw err10; }
                                                                            else {
                                                                                //@ts-ignore
                                                                                conexion.query(usarSchemafalso1, (err11, usarFalso1) => {
                                                                                    if (err11) { throw err11; }
                                                                                    else {
                                                                                        //@ts-ignore
                                                                                        conexion.query(crearBaseDatosfalso1, (err12, crearDatosFalso1) => {
                                                                                            if (err12) { throw err12; }
                                                                                            else {
                                                                                                //@ts-ignore
                                                                                                conexion.query(volviendoPrincipal, (err13, usarPrincipalPrincipal) => {
                                                                                                    if (err13) { throw err13; }
                                                                                                    else {
                                                                                                        console.log("Creacion completa de los departamentos de Dideco y Falso 1;")
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

                                            if (departamentosACrear == 20) {

                                                console.log("Se creara el segundo departamento falso y departamento de dideco");
                                                //@ts-ignore
                                                conexion.query(crearSchemaDideco, (err7, creandoGrupoDideco) => {
                                                    if (err7) { throw err7; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(usarschemaDideco, (err8, usandoGrupoDideco) => {
                                                            if (err8) { throw err8; }
                                                            else {
                                                                //@ts-ignore
                                                                conexion.query(crearBaseDeDatosDideco, (err9, creandoDideco) => {
                                                                    if (err9) { throw err9; }
                                                                    else {
                                                                        //@ts-ignore
                                                                        conexion.query(usarBaseDeDatosMunicipal, [nombreBaseMunicipalidad], (err10, volviendoMunicipal) => {
                                                                            if (err10) { throw err10; }
                                                                            else {
                                                                                //@ts-ignore
                                                                                conexion.query(crearschemaFalso2, (err11, creandoGrupoFalso2) => {
                                                                                    if (err11) { throw err11; }
                                                                                    else {
                                                                                        //@ts-ignore
                                                                                        conexion.query(usarSchemafalso2, (err12, usarFalso2) => {
                                                                                            if (err12) { throw err12; }
                                                                                            else {
                                                                                                //@ts-ignore
                                                                                                conexion.query(crearBaseDatosfalso2, (err13, crearBaseFalso2) => {
                                                                                                    if (err13) { throw err13; }
                                                                                                    else {
                                                                                                        //@ts-ignore
                                                                                                        conexion.query(volviendoPrincipal, (err14, volviendoPrincipalPrincipal) => {
                                                                                                            if (err14) { throw err14; }
                                                                                                            else {
                                                                                                                console.log("Creacion de la base de datos con los departamentos de Dideco y Falso 2;")
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

                                            if (departamentosACrear == 27) {

                                                console.log("Creando la Base De Datos junto a los Departamentos Falso 1 y Falso 2;")
                                                //@ts-ignore
                                                conexion.query(crearSchemaFalso1, (err7, crearGrupoFalso1) => {
                                                    if (err7) { throw err7; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(usarSchemafalso1, (err8, usarFalso1) => {
                                                            if (err8) { throw err8; }
                                                            else {
                                                                //@ts-ignore
                                                                conexion.query(crearBaseDatosfalso1, (err9, creandoBasoFalso1) => {
                                                                    if (err9) { throw err9; }
                                                                    else {
                                                                        //@ts-ignore
                                                                        conexion.query(usarBaseDeDatosMunicipal, [nombreBaseMunicipalidad], (err10, volviendoPrincipalMunicipal) => {
                                                                            if (err10) { throw err10; }
                                                                            else {
                                                                                //@ts-ignore
                                                                                conexion.query(crearschemaFalso2, (err11, crearSchemaFalso2) => {
                                                                                    if (err11) { throw err11; }
                                                                                    else {
                                                                                        //@ts-ignore
                                                                                        conexion.query(usarSchemafalso2, (err12, usarSchemaFalso2) => {
                                                                                            if (err12) { throw err12; }
                                                                                            else {
                                                                                                //@ts-ignore
                                                                                                conexion.query(crearBaseDatosfalso2, (err13, creandoBasoFalso2) => {
                                                                                                    if (err13) { throw err13; }
                                                                                                    else {
                                                                                                        //@ts-ignore
                                                                                                        conexion.query(volviendoPrincipal, (err14, volviendoPrincipalPrincipal) => {
                                                                                                            if (err14) { throw err14; }
                                                                                                            else {
                                                                                                                console.log("Se ha creado la base de datos con los departamentos Falso 1 y Falso 2;")
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
    const busquedaInformacionMunicipalidad: string = "SELECT * FROM municipalidadescreadas WHERE valormunicipalidadcreada = ?;";

    conexion.query(existenciaUsuario, [rut], (err1, cantidad) => {
        if (err1) { throw err1; }
        const cantidadUsusarios: number = contadorArregloSql(cantidad);

        if (cantidadUsusarios == 0) {
            console.log("El usuario no existe")
        }
        if (cantidadUsusarios == 1) {

            console.log("El usuario se ha encontrado")
            const datos = cantidad[0];
            console.log(datos);
            const municipalidad: string = datos.valormunicipalidadprincipal;
            console.log(municipalidad);
            const contraseniaAlmacenada: string = datos.contraseniaprincipal;
            const valorPermisos: number = datos.permisosprincipal;
            //@ts-ignore

            bcrypt.compare(contrasenia, contraseniaAlmacenada, (err2, resultadoContrasenias) => {
                if (err2) { throw err2; }

                if (resultadoContrasenias) {
                    console.log("Contrasenia es valida")
                    if (valorPermisos == 1000) {
                        console.log("El que esta ingresando es un administrador de la aplicacion");
                    }
                    else {
                        //@ts-ignore
                        conexion.query(busquedaInformacionMunicipalidad, [municipalidad], (err3, informacionMunicipalidad) => {
                            if (err3) { throw err3; }
                            else {
                                const datosMunicipales = informacionMunicipalidad[0];
                                console.log(datosMunicipales);
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

                                                res.cookie("muni", firmaCookie, { httpOnly: true, maxAge: 3600000 });
                                                const mensajeEntreda : string = "EP";
                                                res.json({mensaje: mensajeEntreda});
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
                                            const nombreGuardar: string = datosNuevos.nombrecompletousuario;
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

                                                res.cookie("muni", firmaCookie, { httpOnly: true, maxAge: 3600000 });
                                            }
                                        })

                                    })
                                }
                                //@ts-ignore

                            }
                        })

                    }
                }
                else {
                    console.log("Contrasenia es incorrecta");
                }
            })

        }





    })

}

