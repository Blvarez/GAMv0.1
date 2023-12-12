import conexion from "../../../../db/conexion";
import { Response, Request } from "express";

//EstadoBeneficio 1 = Postulacion
//EstadoBeneficio 2 = Para Entrega (Solo Solicitudes Unitarias)

//EstadoSolicitud 1 = Postulando
//EstadoSolicitud 2 = Entregado
//EstadoSolicitud 3 = Rechazado
//EstadoSolicitud 4 = Pendiente a Entrega


function contadorArregloSql(arreglo: any) {

    let contador: number = 0;

    for (let clave in arreglo) {
        if (arreglo.hasOwnProperty(clave)) {
            contador++;
        }
    }

    return contador;

}


//@ts-ignore
exports.obtencionBeneficiosMas = async (req: Request, res: Response) => { //OBTENCION DE DATOS BENEFICIOS SOLO SOLICITUDES MASIVAS

    const obtencionBeneficiosMas: string = "SELECT * FROM beneficio WHERE estadobeneficio = ? AND stockbeneficio > 0";

    const estadoBeneficio: number = 1;

    conexion.query(obtencionBeneficiosMas, [estadoBeneficio], (err, result) => {
        if (err) { throw err; }
        else {
            res.send(result);
        }
    })

}

//@ts-ignore
exports.obtencionBeneficiariosMas = async (req: Request, res: Response) => { //OBTENCION DE BENEFICIARIOS SOLO SOLICITUDES MASIVAS

    const obtencionBeneficiariosMas: string = "SELECT * FROM beneficiario";

    conexion.query(obtencionBeneficiariosMas, (err, result) => {
        if (err) { throw err; }
        else {
            res.send(result);
        }
    })
}

//@ts-ignore
exports.obtencionBeneficiosUni = async (req: Request, res: Response) => { //OBTENCION DE DATOS BENEFICIOS SOLO SOLICITUDES UNITARIAS

    const obtencionBeneficioUni: string = "SELECT * FROM beneficio WHERE stockbeneficio > 0";

    conexion.query(obtencionBeneficioUni, (err, result) => {
        if (err) { throw err; }
        else {
            res.send(result);
        }
    })
}


exports.crearSolicitudesMasivas = async (req: Request, res: Response) => { //CREAR SOLICITUDES MASIVAS (SOLO POSTULACIONES)

    const arrayBeneficiario: any = req.body.arrayRutBene;
    const idBeneficio: string = req.body.idbeneficio;

    console.log(arrayBeneficiario, "Estos son los array que llegan al servidor");
    console.log(idBeneficio, "Esta es la id del beneficio que llega al servidor");

    const consultaInfoBeneficio: string = "SELECT * FROM beneficio WHERE idbeneficio = ?";
    const crearSoliMas: string = "INSERT INTO solicitudes(rutbeneficiariosol, idbeneficiosol, estadosol, fechacreacionsol) VALUES(?,?,?,?)";

    conexion.query(consultaInfoBeneficio, [idBeneficio], (err, result) => {
        if (err) { throw err; }
        else {
            const datosBeneficio = result[0];
            console.log(datosBeneficio, "Datos Beneficio");
            const estadoBeneficio: number = datosBeneficio.estadobeneficio;

            //ESTADO BENEFICIO 1 = POSTULACION 2 = ENTREGA LISTA

            //@ts-ignore
            const accionAgrMas = arrayBeneficiario.map((beneficiario: string) => {

                const rutBeneficiario = beneficiario;

                const hoyA = new Date();
                const fechaHoy = hoyA.getFullYear() + "-" + (hoyA.getMonth() + 1) + "-" + hoyA.getDate();

                //@ts-ignore
                conexion.query(crearSoliMas, [rutBeneficiario, idBeneficio, estadoBeneficio, fechaHoy], (err2, result2) => {
                    if (err2) { throw err2; }
                    else {
                        console.log("CREANDO UNA SOLICITUD DE POSTULACION");
                    }
                })

            })

            const mensajeCreacionPostulaciones: string = "CPSM" //CREACION POSTULACION SOLICITUDES MASIVAS
            res.json({ message: mensajeCreacionPostulaciones });
        }
    })
}

exports.crearSolicitudesUnitaria = async (req: Request, res: Response) => { //CREAR SOLICITUDES UNITARIAMENTE CON VALIDACION DE ENTREGAS

    const rutBeneficiario: string = req.body.rut;
    const idBeneficio: string = req.body.idbeneficio;

    const datosBeneficio: string = "SELECT * FROM beneficio WHERE idbeneficio = ?";


    //TIPO 1 BENEFICIO
    const consultaEFMA = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (1,2,3,4) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //ENERO-FEBRERO-MARZO-ABRIL
    const consultaMJJA = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (5,6,7,8) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"  //MAYO-JUNIO-JULIO-AGOSTO
    const consultaSOND = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (9,10,11,12) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"  //SEPTIEMBRE-OCTUBRE-NOVIEMBRE-DICIEMBRE

    //TIPO 2 BENEFICIO
    const consultaE = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (1) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //ENERO
    const consultaF = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (2) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //FEBRERO
    const consultaMAR = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (3) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //MARZO
    const consultaAB = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (4) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //ABRIL
    const consultaMAY = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (5) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //MAYO
    const consultaJUN = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (6) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //JUNIO
    const consultaJUL = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (7) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //JULIO
    const consultaAG = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (8) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //AGOSTO
    const consultaS = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (9) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //SEPTIEMBRE
    const consultaO = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (10) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //OCTUBRE
    const consultaN = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (11) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //NOVIEMBRE
    const consultaD = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (12) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //DICIEMBRE


    const creacionSolicitudPost: string = "INSERT INTO solicitudes(rutbeneficiariosol, idbeneficiosol, estadosol, fechacreacionsol) VALUES(?,?,?,?)";

    const creacionsolicitudEnt: string = "INSERT INTO solicitudes(rutbeneficiariosol, idbeneficiosol, estadosol, fechacreacionsol, fechafinalsol) VALUEs(?,?,?,?,?)";


    const hoyA = new Date();
    const fechaHoy = hoyA.getFullYear() + "-" + (hoyA.getMonth() + 1) + "-" + hoyA.getDate();
    const mes = hoyA.getMonth() + 1;

    const actualizacionStock: string = "UPDATE beneficio SET stockbeneficio = ? WHERE idbeneficio = ?";

    const validarRut = (inputRut: string) => {
        const rutSinFormato = inputRut.replace(/\./g, '');
        const regexRut = /^(\d{1,9}-[\dkK])$/;
        return regexRut.test(rutSinFormato);
    };


    if (validarRut(rutBeneficiario) == false || validarRut(rutBeneficiario) == false) {
        const mensajeError = "FECB";
        res.json({ message: mensajeError });
    }
    else {
        conexion.query(datosBeneficio, [idBeneficio], (err, result) => {
            if (err) { throw err; }
            else {
                const datosBeneficio = result[0];
                const estadoBeneficio = datosBeneficio.estadobeneficio;
                const stockbeneficoo: number = datosBeneficio.stockbeneficio;
                const stocknuevo: number = stockbeneficoo - 1;


                const idNueva: string = datosBeneficio.idbeneficio;
                const variableTipo: string = idNueva.substring(4, 6);



                if (variableTipo == "T1") { //TIPO DE BENEFICO 1 CUATRIMESTRAL

                    if (estadoBeneficio == 1) { //CREACION PARA POSTULACIONES

                        const estadoPostulacion: number = 1;

                        if (mes == 1 || mes == 2 || mes == 3 || mes == 4) {
                            conexion.query(consultaEFMA, [idBeneficio, rutBeneficiario], (errt11, resultt11) => {
                                if (errt11) { throw errt11; }

                                else {
                                    const cantidadEFMA = contadorArregloSql(resultt11);

                                    if (cantidadEFMA > 0) {
                                        const mensajeEFMAPostE = "T1PE" //TIPO 1 POSTULACION ERRONEA
                                        res.json({ message: mensajeEFMAPostE });
                                    }
                                    else if (cantidadEFMA == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionSolicitudPost, [rutBeneficiario, idBeneficio, estadoPostulacion, fechaHoy], (err21, result21) => {
                                            if (err21) { throw err21; }
                                            else {
                                                const mensajeEFMAPost = "PR";
                                                res.json({ message: mensajeEFMAPost }) //CUANDO YA SE REALIZO LA POSTULACION
                                            }
                                        })
                                    }
                                }
                            })
                        }
                        else if (mes == 5 || mes == 6 || mes == 7 || mes == 8) {
                            conexion.query(consultaMJJA, [idBeneficio, rutBeneficiario], (errt12, resultt12) => {
                                if (errt12) { throw errt12; }
                                else {
                                    const cantidadMJJA = contadorArregloSql(resultt12);

                                    if (cantidadMJJA > 0) {
                                        const mensajeMJJAPostE = "T1PE" //TIPO 1 POSTULACION ERRONEA
                                        res.json({ message: mensajeMJJAPostE });
                                    }
                                    else if (cantidadMJJA == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionSolicitudPost, [rutBeneficiario, idBeneficio, estadoPostulacion, fechaHoy], (err22, result22) => {
                                            if (err22) { throw err22; }
                                            else {
                                                const mensajeMJJAPost = "PR";
                                                res.json({ message: mensajeMJJAPost })
                                            }
                                        })
                                    }
                                }
                            })

                        }
                        else if (mes == 9 || mes == 10 || mes == 11 || mes == 12) {
                            conexion.query(consultaSOND, [idBeneficio, rutBeneficiario], (errt13, resultt13) => {
                                if (errt13) { throw errt13; }
                                else {
                                    const cantidadSOND = contadorArregloSql(resultt13);

                                    if (cantidadSOND > 0) {
                                        const mensajeSONDPostE = "T1PE";
                                        res.json({ message: mensajeSONDPostE });
                                    }
                                    else if (cantidadSOND == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionSolicitudPost, [rutBeneficiario, idBeneficio, estadoPostulacion, fechaHoy], (err23, result23) => {
                                            if (err23) { throw err23; }
                                            else {
                                                const mensajeSONDPost = "PR";
                                                res.json({ message: mensajeSONDPost });
                                            }
                                        })
                                    }
                                }
                            })
                        }

                    }

                    else if (estadoBeneficio == 2) { //CREACION PARA ENTREGAS



                        const estadoEntrega: number = 2;

                        if (mes == 1 || mes == 2 || mes == 3 || mes == 4) {
                            conexion.query(consultaEFMA, [idBeneficio, rutBeneficiario], (errt11E, resultt11E) => {
                                if (errt11E) { throw errt11E; }

                                else {
                                    const cantidadEFMA = contadorArregloSql(resultt11E);

                                    if (cantidadEFMA > 0) {
                                        const mensajeEFMAEntE = "T1EE" //TIPO 1 ENTREGA ERRONEA
                                        res.json({ message: mensajeEFMAEntE });
                                    }
                                    else if (cantidadEFMA == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionsolicitudEnt, [rutBeneficiario, idBeneficio, estadoEntrega, fechaHoy, fechaHoy], (err21E, result21E) => {
                                            if (err21E) { throw err21E; }
                                            else {
                                                //@ts-ignore
                                                conexion.query(actualizacionStock, [stocknuevo, idBeneficio], (erroStock, resultadoStock) => {
                                                    if (erroStock) { throw erroStock; }
                                                    else {
                                                        const mensajeEFMAEnt = "ER";
                                                        res.json({ message: mensajeEFMAEnt }) //CUANDO YA SE REALIZO LA ENTREGA
                                                    }
                                                })

                                            }
                                        })
                                    }
                                }
                            })
                        }
                        else if (mes == 5 || mes == 6 || mes == 7 || mes == 8) {
                            conexion.query(consultaMJJA, [idBeneficio, rutBeneficiario], (errt12E, resultt12E) => {
                                if (errt12E) { throw errt12E; }
                                else {
                                    const cantidadMJJA = contadorArregloSql(resultt12E);

                                    if (cantidadMJJA > 0) {
                                        const mensajeMJJAEntE = "T1EE" //TIPO 1 POSTULACION ERRONEA
                                        res.json({ message: mensajeMJJAEntE });
                                    }
                                    else if (cantidadMJJA == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionsolicitudEnt, [rutBeneficiario, idBeneficio, estadoPostulacion, fechaHoy, fechaHoy], (err22E, result22E) => {
                                            if (err22E) { throw err22E; }
                                            else {
                                                //@ts-ignore
                                                conexion.query(actualizacionStock, [stocknuevo, idBeneficio], (erroStock, resultadoStock) => {
                                                    if (erroStock) { throw erroStock; }
                                                    else {
                                                        const mensajeMJJAEnt = "ER";
                                                        res.json({ message: mensajeMJJAEnt });
                                                    }
                                                })

                                            }
                                        })
                                    }
                                }
                            })

                        }
                        else if (mes == 9 || mes == 10 || mes == 11 || mes == 12) {
                            conexion.query(consultaSOND, [idBeneficio, rutBeneficiario], (errt13E, resultt13E) => {
                                if (errt13E) { throw errt13E; }
                                else {
                                    const cantidadSOND = contadorArregloSql(resultt13E);

                                    if (cantidadSOND > 0) {
                                        const mensajeSONDEntE = "T1EE";
                                        res.json({ message: mensajeSONDEntE });
                                    }
                                    else if (cantidadSOND == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionsolicitudEnt, [rutBeneficiario, idBeneficio, estadoPostulacion, fechaHoy, fechaHoy], (err23E, result23E) => {
                                            if (err23E) { throw err23E; }
                                            else {
                                                //@ts-ignore
                                                conexion.query(actualizacionStock, [stocknuevo, idBeneficio], (erroStock, resultadoStock) => {
                                                    if (erroStock) { throw erroStock; }
                                                    else {
                                                        const mensajeSONDEnt = "ER";
                                                        res.json({ message: mensajeSONDEnt });
                                                    }
                                                })
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                }

                else if (variableTipo == "T2") { //TIPO DE BENEFICIO 2 MENSUAL

                    if (estadoBeneficio == 1) { //CREACION PARA POSTULACIONES

                        const estadoPostulacionT2: number = 1;

                        if (mes == 1) {
                            conexion.query(consultaE, [idBeneficio, rutBeneficiario], (erre, resulte) => {
                                if (erre) { throw erre; }
                                else {
                                    const cantidadE = contadorArregloSql(resulte);

                                    if (cantidadE > 0) {
                                        const mensajeEPostE: string = "T2EP"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeEPostE });
                                    }
                                    else if (cantidadE == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionSolicitudPost, [rutBeneficiario, idBeneficio, estadoPostulacionT2, fechaHoy], (erre2, resulte2) => {
                                            if (erre2) { throw erre2; }
                                            else {
                                                const mensajeEPostR: string = "T2PR";
                                                res.json({ message: mensajeEPostR });
                                            }
                                        })
                                    }
                                }
                            })
                        }

                        else if (mes == 2) {
                            conexion.query(consultaF, [idBeneficio, rutBeneficiario], (errf, resultf) => {
                                if (errf) { throw errf; }
                                else {
                                    const cantidadF = contadorArregloSql(resultf);

                                    if (cantidadF > 0) {
                                        const mensajeEPostF: string = "T2EP"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeEPostF });
                                    }
                                    else if (cantidadF == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionSolicitudPost, [rutBeneficiario, idBeneficio, estadoPostulacionT2, fechaHoy], (errf2, resultf2) => {
                                            if (errf2) { throw errf2; }
                                            else {
                                                const mensajeFPostR: string = "T2PR";
                                                res.json({ message: mensajeFPostR });
                                            }
                                        })
                                    }
                                }
                            })
                        }

                        else if (mes == 3) {
                            conexion.query(consultaMAR, [idBeneficio, rutBeneficiario], (errmar, resultmar) => {
                                if (errmar) { throw errmar; }
                                else {
                                    const cantidadMAR = contadorArregloSql(resultmar);

                                    if (cantidadMAR > 0) {
                                        const mensajeMARPostF: string = "T2EP"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeMARPostF });
                                    }
                                    else if (cantidadMAR == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionSolicitudPost, [rutBeneficiario, idBeneficio, estadoPostulacionT2, fechaHoy], (errmar2, resultmar2) => {
                                            if (errmar2) { throw errmar2; }
                                            else {
                                                const mensajeMARPostR: string = "T2PR";
                                                res.json({ message: mensajeMARPostR });
                                            }
                                        })
                                    }
                                }
                            })
                        }

                        else if (mes == 4) {
                            conexion.query(consultaAB, [idBeneficio, rutBeneficiario], (errab, resultab) => {
                                if (errab) { throw errab; }
                                else {
                                    const cantidadAB = contadorArregloSql(resultab);

                                    if (cantidadAB > 0) {
                                        const mensajeEPostAB: string = "T2EP"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeEPostAB });
                                    }
                                    else if (cantidadAB == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionSolicitudPost, [rutBeneficiario, idBeneficio, estadoPostulacionT2, fechaHoy], (errab2, resultab2) => {
                                            if (errab2) { throw errab2; }
                                            else {
                                                const mensajeABPostR: string = "T2PR";
                                                res.json({ message: mensajeABPostR });
                                            }
                                        })
                                    }
                                }
                            })
                        }

                        else if (mes == 5) {
                            conexion.query(consultaMAY, [idBeneficio, rutBeneficiario], (errmay, resultmay) => {
                                if (errmay) { throw errmay; }
                                else {
                                    const cantidadMAY = contadorArregloSql(resultmay);

                                    if (cantidadMAY > 0) {
                                        const mensajeEPostMAY: string = "T2EP"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeEPostMAY });
                                    }
                                    else if (cantidadMAY == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionSolicitudPost, [rutBeneficiario, idBeneficio, estadoPostulacionT2, fechaHoy], (errmay2, resultmay2) => {
                                            if (errmay2) { throw errmay2; }
                                            else {
                                                const mensajeMAYPostR: string = "T2PR";
                                                res.json({ message: mensajeMAYPostR });
                                            }
                                        })
                                    }
                                }
                            })
                        }

                        else if (mes == 6) {
                            conexion.query(consultaJUN, [idBeneficio, rutBeneficiario], (errjun, resultjun) => {
                                if (errjun) { throw errjun; }
                                else {
                                    const cantidadJUN = contadorArregloSql(resultjun);

                                    if (cantidadJUN > 0) {
                                        const mensajeEPostJUN: string = "T2EP"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeEPostJUN });
                                    }
                                    else if (cantidadJUN == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionSolicitudPost, [rutBeneficiario, idBeneficio, estadoPostulacionT2, fechaHoy], (errjun2, resultjun2) => {
                                            if (errjun2) { throw errjun2; }
                                            else {
                                                const mensajeJUNPostR: string = "T2PR";
                                                res.json({ message: mensajeJUNPostR });
                                            }
                                        })
                                    }
                                }
                            })
                        }

                        else if (mes == 7) {
                            conexion.query(consultaJUL, [idBeneficio, rutBeneficiario], (errjul, resultjul) => {
                                if (errjul) { throw errjul; }
                                else {
                                    const cantidadJUL = contadorArregloSql(resultjul);

                                    if (cantidadJUL > 0) {
                                        const mensajeEPostJUL: string = "T2EP"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeEPostJUL });
                                    }
                                    else if (cantidadJUL == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionSolicitudPost, [rutBeneficiario, idBeneficio, estadoPostulacionT2, fechaHoy], (errjul2, resultjul2) => {
                                            if (errjul2) { throw errjul2; }
                                            else {
                                                const mensajeJULPostR: string = "T2PR";
                                                res.json({ message: mensajeJULPostR });
                                            }
                                        })
                                    }
                                }
                            })
                        }

                        else if (mes == 8) {
                            conexion.query(consultaAG, [idBeneficio, rutBeneficiario], (errag, resultag) => {
                                if (errag) { throw errag; }
                                else {
                                    const cantidadAG = contadorArregloSql(resultag);

                                    if (cantidadAG > 0) {
                                        const mensajeEPostAG: string = "T2EP"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeEPostAG });
                                    }
                                    else if (cantidadAG == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionSolicitudPost, [rutBeneficiario, idBeneficio, estadoPostulacionT2, fechaHoy], (errag2, resultag2) => {
                                            if (errag2) { throw errag2; }
                                            else {
                                                const mensajeAGPostR: string = "T2PR";
                                                res.json({ message: mensajeAGPostR });
                                            }
                                        })
                                    }
                                }
                            })
                        }

                        else if (mes == 9) {
                            conexion.query(consultaS, [idBeneficio, rutBeneficiario], (errs, results) => {
                                if (errs) { throw errs; }
                                else {
                                    const cantidadS = contadorArregloSql(results);

                                    if (cantidadS > 0) {
                                        const mensajeEPostS: string = "T2EP"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeEPostS });
                                    }
                                    else if (cantidadS == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionSolicitudPost, [rutBeneficiario, idBeneficio, estadoPostulacionT2, fechaHoy], (errs2, results2) => {
                                            if (errs2) { throw errs2; }
                                            else {
                                                const mensajeSPostR: string = "T2PR";
                                                res.json({ message: mensajeSPostR });
                                            }
                                        })
                                    }
                                }
                            })
                        }

                        else if (mes == 10) {
                            conexion.query(consultaO, [idBeneficio, rutBeneficiario], (erro, resulto) => {
                                if (erro) { throw erro; }
                                else {
                                    const cantidadO = contadorArregloSql(resulto);

                                    if (cantidadO > 0) {
                                        const mensajeEPostO: string = "T2EP"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeEPostO });
                                    }
                                    else if (cantidadO == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionSolicitudPost, [rutBeneficiario, idBeneficio, estadoPostulacionT2, fechaHoy], (erro2, resulto2) => {
                                            if (erro2) { throw erro2; }
                                            else {
                                                const mensajeOPostR: string = "T2PR";
                                                res.json({ message: mensajeOPostR });
                                            }
                                        })
                                    }
                                }
                            })
                        }

                        else if (mes == 11) {
                            conexion.query(consultaN, [idBeneficio, rutBeneficiario], (errn, resultn) => {
                                if (errn) { throw errn; }
                                else {
                                    const cantidadN = contadorArregloSql(resultn);

                                    if (cantidadN > 0) {
                                        const mensajeEPostN: string = "T2EP"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeEPostN });
                                    }
                                    else if (cantidadN == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionSolicitudPost, [rutBeneficiario, idBeneficio, estadoPostulacionT2, fechaHoy], (errn2, resultn2) => {
                                            if (errn2) { throw errn2; }
                                            else {
                                                const mensajeNPostR: string = "T2PR";
                                                res.json({ message: mensajeNPostR });
                                            }
                                        })
                                    }
                                }
                            })
                        }

                        else if (mes == 12) {
                            conexion.query(consultaD, [idBeneficio, rutBeneficiario], (errd, resultd) => {
                                if (errd) { throw errd; }
                                else {
                                    const cantidadD = contadorArregloSql(resultd);

                                    if (cantidadD > 0) {
                                        const mensajeEPostD: string = "T2EP"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeEPostD });
                                    }
                                    else if (cantidadD == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionSolicitudPost, [rutBeneficiario, idBeneficio, estadoPostulacionT2, fechaHoy], (errd2, resultd2) => {
                                            if (errd2) { throw errd2; }
                                            else {
                                                const mensajeDPostR: string = "T2PR";
                                                res.json({ message: mensajeDPostR });
                                            }
                                        })
                                    }
                                }
                            })
                        }

                    }
                    else if (estadoBeneficio == 2) { //CREACION PARA ENTREGAS
                        const estadoEntregaT2: number = 2;

                        if (mes == 1) {
                            conexion.query(consultaE, [idBeneficio, rutBeneficiario], (erree, resultee) => {
                                if (erree) { throw erree; }
                                else {
                                    const cantidadEe = contadorArregloSql(resultee);

                                    if (cantidadEe > 0) {
                                        const mensajeEPostEe: string = "T2EE"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeEPostEe });
                                    }
                                    else if (cantidadEe == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionsolicitudEnt, [rutBeneficiario, idBeneficio, estadoEntregaT2, fechaHoy, fechaHoy], (erre2e, resulte2e) => {
                                            if (erre2e) { throw erre2e; }
                                            else {
                                                //@ts-ignore
                                                conexion.query(actualizacionStock, [stocknuevo, idBeneficio], (erroStock, resultadoStock) => {
                                                    if (erroStock) { throw erroStock; }
                                                    else {
                                                        const mensajeEEntR: string = "T2ER";
                                                        res.json({ message: mensajeEEntR });
                                                    }
                                                })

                                            }
                                        })
                                    }
                                }
                            })
                        }

                        else if (mes == 2) {
                            conexion.query(consultaF, [idBeneficio, rutBeneficiario], (errfe, resultfe) => {
                                if (errfe) { throw errfe; }
                                else {
                                    const cantidadFe = contadorArregloSql(resultfe);

                                    if (cantidadFe > 0) {
                                        const mensajeEPostFe: string = "T2EE"; //TIPO 2 ERROR ENTREGA
                                        res.json({ message: mensajeEPostFe });
                                    }
                                    else if (cantidadFe == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionsolicitudEnt, [rutBeneficiario, idBeneficio, estadoEntregaT2, fechaHoy, fechaHoy], (errf2e, resultf2e) => {
                                            if (errf2e) { throw errf2e; }
                                            else {
                                                //@ts-ignore
                                                conexion.query(actualizacionStock, [stocknuevo, idBeneficio], (erroStock, resultadoStock) => {
                                                    if (erroStock) { throw erroStock; }
                                                    else {
                                                        const mensajeFEntR: string = "T2ER";
                                                        res.json({ message: mensajeFEntR });
                                                    }
                                                })

                                            }
                                        })
                                    }
                                }
                            })
                        }

                        else if (mes == 3) {
                            conexion.query(consultaMAR, [idBeneficio, rutBeneficiario], (errmare, resultmare) => {
                                if (errmare) { throw errmare; }
                                else {
                                    const cantidadMARe = contadorArregloSql(resultmare);

                                    if (cantidadMARe > 0) {
                                        const mensajeMAREntF: string = "T2EE"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeMAREntF });
                                    }
                                    else if (cantidadMARe == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionsolicitudEnt, [rutBeneficiario, idBeneficio, estadoEntregaT2, fechaHoy, fechaHoy], (errmar2e, resultmar2e) => {
                                            if (errmar2e) { throw errmar2e; }
                                            else {
                                                //@ts-ignore
                                                conexion.query(actualizacionStock, [stocknuevo, idBeneficio], (erroStock, resultadoStock) => {
                                                    if (erroStock) { throw erroStock; }
                                                    else {
                                                        const mensajeMAREntR: string = "T2ER";
                                                        res.json({ message: mensajeMAREntR });
                                                    }
                                                })

                                            }
                                        })
                                    }
                                }
                            })
                        }

                        else if (mes == 4) {
                            conexion.query(consultaAB, [idBeneficio, rutBeneficiario], (errabe, resultabe) => {
                                if (errabe) { throw errabe; }
                                else {
                                    const cantidadABe = contadorArregloSql(resultabe);

                                    if (cantidadABe > 0) {
                                        const mensajeEEntAB: string = "T2EE"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeEEntAB });
                                    }
                                    else if (cantidadABe == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionsolicitudEnt, [rutBeneficiario, idBeneficio, estadoEntregaT2, fechaHoy, fechaHoy], (errab2e, resultab2e) => {
                                            if (errab2e) { throw errab2e; }
                                            else {
                                                //@ts-ignore
                                                conexion.query(actualizacionStock, [stocknuevo, idBeneficio], (erroStock, resultadoStock) => {
                                                    if (erroStock) { throw erroStock; }
                                                    else {
                                                        const mensajeABEntR: string = "T2ER";
                                                        res.json({ message: mensajeABEntR });
                                                    }
                                                })

                                            }
                                        })
                                    }
                                }
                            })
                        }

                        else if (mes == 5) {
                            conexion.query(consultaMAY, [idBeneficio, rutBeneficiario], (errmaye, resultmaye) => {
                                if (errmaye) { throw errmaye; }
                                else {
                                    const cantidadMAYe = contadorArregloSql(resultmaye);

                                    if (cantidadMAYe > 0) {
                                        const mensajeEEntMAY: string = "T2EE"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeEEntMAY });
                                    }
                                    else if (cantidadMAYe == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionsolicitudEnt, [rutBeneficiario, idBeneficio, estadoEntregaT2, fechaHoy, fechaHoy], (errmay2e, resultmay2e) => {
                                            if (errmay2e) { throw errmay2e; }
                                            else {
                                                //@ts-ignore
                                                conexion.query(actualizacionStock, [stocknuevo, idBeneficio], (erroStock, resultadoStock) => {
                                                    if (erroStock) { throw erroStock; }
                                                    else {
                                                        const mensajeMAYEntR: string = "T2ER";
                                                        res.json({ message: mensajeMAYEntR });
                                                    }
                                                })

                                            }
                                        })
                                    }
                                }
                            })
                        }

                        else if (mes == 6) {
                            conexion.query(consultaJUN, [idBeneficio, rutBeneficiario], (errjune, resultjune) => {
                                if (errjune) { throw errjune; }
                                else {
                                    const cantidadJUNe = contadorArregloSql(resultjune);

                                    if (cantidadJUNe > 0) {
                                        const mensajeEEntJUN: string = "T2EE"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeEEntJUN });
                                    }
                                    else if (cantidadJUNe == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionsolicitudEnt, [rutBeneficiario, idBeneficio, estadoEntregaT2, fechaHoy, fechaHoy], (errjun2e, resultjun2e) => {
                                            if (errjun2e) { throw errjun2e; }
                                            else {
                                                //@ts-ignore
                                                conexion.query(actualizacionStock, [stocknuevo, idBeneficio], (erroStock, resultadoStock) => {
                                                    if (erroStock) { throw erroStock; }
                                                    else {
                                                        const mensajeJUNEntR: string = "T2ER";
                                                        res.json({ message: mensajeJUNEntR });
                                                    }
                                                })

                                            }
                                        })
                                    }
                                }
                            })
                        }

                        else if (mes == 7) {
                            conexion.query(consultaJUL, [idBeneficio, rutBeneficiario], (errjule, resultjule) => {
                                if (errjule) { throw errjule; }
                                else {
                                    const cantidadJULe = contadorArregloSql(resultjule);

                                    if (cantidadJULe > 0) {
                                        const mensajeEEntJUL: string = "T2EE"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeEEntJUL });
                                    }
                                    else if (cantidadJULe == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionsolicitudEnt, [rutBeneficiario, idBeneficio, estadoEntregaT2, fechaHoy, fechaHoy], (errjul2e, resultjul2e) => {
                                            if (errjul2e) { throw errjul2e; }
                                            else {
                                                //@ts-ignore
                                                conexion.query(actualizacionStock, [stocknuevo, idBeneficio], (erroStock, resultadoStock) => {
                                                    if (erroStock) { throw erroStock; }
                                                    else {
                                                        const mensajeJULEntR: string = "T2ER";
                                                        res.json({ message: mensajeJULEntR });
                                                    }
                                                })

                                            }
                                        })
                                    }
                                }
                            })
                        }

                        else if (mes == 8) {
                            conexion.query(consultaAG, [idBeneficio, rutBeneficiario], (errage, resultage) => {
                                if (errage) { throw errage; }
                                else {
                                    const cantidadAGe = contadorArregloSql(resultage);

                                    if (cantidadAGe > 0) {
                                        const mensajeEEntAG: string = "T2EE"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeEEntAG });
                                    }
                                    else if (cantidadAGe == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionsolicitudEnt, [rutBeneficiario, idBeneficio, estadoEntregaT2, fechaHoy, fechaHoy], (errag2e, resultag2e) => {
                                            if (errag2e) { throw errag2e; }
                                            else {
                                                //@ts-ignore
                                                conexion.query(actualizacionStock, [stocknuevo, idBeneficio], (erroStock, resultadoStock) => {
                                                    if (erroStock) { throw erroStock; }
                                                    else {
                                                        const mensajeAGEntR: string = "T2ER";
                                                        res.json({ message: mensajeAGEntR });
                                                    }
                                                })

                                            }
                                        })
                                    }
                                }
                            })
                        }

                        else if (mes == 9) {
                            conexion.query(consultaS, [idBeneficio, rutBeneficiario], (errse, resultse) => {
                                if (errse) { throw errse; }
                                else {
                                    const cantidadSe = contadorArregloSql(resultse);

                                    if (cantidadSe > 0) {
                                        const mensajeEEntS: string = "T2EE"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeEEntS });
                                    }
                                    else if (cantidadSe == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionsolicitudEnt, [rutBeneficiario, idBeneficio, estadoEntregaT2, fechaHoy, fechaHoy], (errs2e, results2e) => {
                                            if (errs2e) { throw errs2e; }
                                            else {
                                                //@ts-ignore
                                                conexion.query(actualizacionStock, [stocknuevo, idBeneficio], (erroStock, resultadoStock) => {
                                                    if (erroStock) { throw erroStock; }
                                                    else {
                                                        const mensajeSEntR: string = "T2ER";
                                                        res.json({ message: mensajeSEntR });
                                                    }
                                                })

                                            }
                                        })
                                    }
                                }
                            })
                        }

                        else if (mes == 10) {
                            conexion.query(consultaO, [idBeneficio, rutBeneficiario], (erroe, resultoe) => {
                                if (erroe) { throw erroe; }
                                else {
                                    const cantidadOe = contadorArregloSql(resultoe);

                                    if (cantidadOe > 0) {
                                        const mensajeEEntO: string = "T2EE"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeEEntO });
                                    }
                                    else if (cantidadOe == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionsolicitudEnt, [rutBeneficiario, idBeneficio, estadoEntregaT2, fechaHoy, fechaHoy], (erro2e, resulto2e) => {
                                            if (erro2e) { throw erro2e; }
                                            else {
                                                //@ts-ignore
                                                conexion.query(actualizacionStock, [stocknuevo, idBeneficio], (erroStock, resultadoStock) => {
                                                    if (erroStock) { throw erroStock; }
                                                    else {
                                                        const mensajeOEntR: string = "T2ER";
                                                        res.json({ message: mensajeOEntR });
                                                    }
                                                })


                                            }
                                        })
                                    }
                                }
                            })
                        }

                        else if (mes == 11) {
                            conexion.query(consultaN, [idBeneficio, rutBeneficiario], (errne, resultne) => {
                                if (errne) { throw errne; }
                                else {
                                    const cantidadNe = contadorArregloSql(resultne);

                                    if (cantidadNe > 0) {
                                        const mensajeEEntN: string = "T2EE"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeEEntN });
                                    }
                                    else if (cantidadNe == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionsolicitudEnt, [rutBeneficiario, idBeneficio, estadoEntregaT2, fechaHoy, fechaHoy], (errn2e, resultn2e) => {
                                            if (errn2e) { throw errn2e; }
                                            else {
                                                //@ts-ignore
                                                conexion.query(actualizacionStock, [stocknuevo, idBeneficio], (erroStock, resultadoStock) => {
                                                    if (erroStock) { throw erroStock; }
                                                    else {
                                                        const mensajeNEntR: string = "T2ER";
                                                        res.json({ message: mensajeNEntR });
                                                    }
                                                })

                                            }
                                        })
                                    }
                                }
                            })
                        }

                        else if (mes == 12) {
                            conexion.query(consultaD, [idBeneficio, rutBeneficiario], (errde, resultde) => {
                                if (errde) { throw errde; }
                                else {
                                    const cantidadDe = contadorArregloSql(resultde);

                                    if (cantidadDe > 0) {
                                        const mensajeEEntD: string = "T2EE"; //TIPO 2 ERROR POSTULACION
                                        res.json({ message: mensajeEEntD });
                                    }
                                    else if (cantidadDe == 0) {
                                        //@ts-ignore
                                        conexion.query(creacionsolicitudEnt, [rutBeneficiario, idBeneficio, estadoEntregaT2, fechaHoy, fechaHoy], (errd2e, resultd2e) => {
                                            if (errd2e) { throw errd2e; }
                                            else {
                                                //@ts-ignore
                                                conexion.query(actualizacionStock, [stocknuevo, idBeneficio], (erroStock, resultadoStock) => {
                                                    if (erroStock) { throw erroStock; }
                                                    else {
                                                        const mensajeDEntR: string = "T2ER";
                                                        res.json({ message: mensajeDEntR });
                                                    }
                                                })

                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                }
            }
        })
    }



}

exports.modificarSolicitud = async (req: Request, res: Response) => {

    const idsolicitud: number = req.body.idsolicitud;
    const estadoNuevo: number = req.body.estadoNuevo;
    const observacion: string = req.body.observacion;

    console.log("Entrando funcion");

    console.log(idsolicitud, "idsoli");
    console.log(estadoNuevo, "Estado nuevo");
    console.log(observacion, "Nueva obersacion")


    //TIPO 1 BENEFICIO
    const consultaEFMA = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (1,2,3,4) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //ENERO-FEBRERO-MARZO-ABRIL
    const consultaMJJA = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (5,6,7,8) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"  //MAYO-JUNIO-JULIO-AGOSTO
    const consultaSOND = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (9,10,11,12) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"  //SEPTIEMBRE-OCTUBRE-NOVIEMBRE-DICIEMBRE

    //TIPO 2 BENEFICIO
    const consultaE = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (1) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //ENERO
    const consultaF = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (2) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //FEBRERO
    const consultaMAR = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (3) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //MARZO
    const consultaAB = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (4) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //ABRIL
    const consultaMAY = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (5) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //MAYO
    const consultaJUN = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (6) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //JUNIO
    const consultaJUL = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (7) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //JULIO
    const consultaAG = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (8) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //AGOSTO
    const consultaS = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (9) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //SEPTIEMBRE
    const consultaO = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (10) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //OCTUBRE
    const consultaN = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (11) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //NOVIEMBRE
    const consultaD = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) IN (12) AND idbeneficiosol = ? AND rutbeneficiariosol = ?"; //DICIEMBRE


    const actualizacionRechazo: string = "UPDATE solicitudes SET estadosol = ?, fechafinalsol = ?, observacionsol = ? WHERE idsolicitud = ?"; //ESTADOSOL 3
    const actualizacionPendienteEntrega: string = "UPDATE solicitudes SET estadosol = ? WHERE idsolicitud = ?"; //ESTADOSOL 4
    const actualizacionEntrega: string = "UPDATE solicitudes SET estadosol = ?, fechafinalsol = ? WHERE idsolicitud = ?"; //ESTADOSOL 2

    const obtenerInformacionBeneficio: string = "SELECT * FROM beneficio WHERE idbeneficio = ?"; //ACTUALIZACION DE STOCK
    const actualizacionStock: string = "UPDATE beneficio SET stockbeneficio = ? WHERE idbeneficio = ?";

    const obtenerInformacionSoli: string = "SELECT * FROM solicitudes WHERE idsolicitud = ?";

    const hoyA = new Date();
    const fechaHoy = hoyA.getFullYear() + "-" + (hoyA.getMonth() + 1) + "-" + hoyA.getDate();
    const mes = hoyA.getMonth() + 1;

    conexion.query(obtenerInformacionSoli, [idsolicitud], (err, result) => {
        if (err) { throw err; }
        else {
            const infoSoli = result[0];


            const estadoAnterior = infoSoli.estadosol;
            const rutBeneficiario: string = infoSoli.rutbeneficiariosol;
            const idbeneficio: string = infoSoli.idbeneficiosol;

            const ultimoDigitos: string = idbeneficio.substring(4, 6);

            conexion.query(obtenerInformacionBeneficio, [idbeneficio], (errinfobene, resultinfobene) => {
                if (errinfobene) { throw errinfobene; }
                else {

                    const datosBeneficio = resultinfobene[0];
                    const stockAntiguo: number = datosBeneficio.stockbeneficio;

                    const stockNuevoPEOE: number = stockAntiguo - 1; //DEJAR ENTREGADO O PENDIENTE A ENTREGA
                    const stockNuevoRE: number = stockAntiguo + 1; //RECHAZAR UN PENDIENTE ENTREGA

                    if (estadoAnterior == 1) { //POSTULACIONES ACA SE MANEJARIA TODO EL STOCK

                        if (estadoNuevo == 3) { //RECHAZO
                            //@ts-ignore
                            conexion.query(actualizacionRechazo, [estadoNuevo, fechaHoy, observacion, idsolicitud], (err1, result1) => {
                                if (err1) { throw err1; }
                                else {
                                    const mensajeSR: string = "SR"; //SOLICITUD RECHAZADA
                                    res.json({ message: mensajeSR });
                                }
                            })
                        }

                        else if (estadoNuevo == 4) { //PENDIENTE A ENTREGAR

                            if (ultimoDigitos == "T1") { //TIPO 1 BENEFICIO CUATRIMESTRAL

                                if (mes == 1 || mes == 2 || mes == 3 || mes == 4) {

                                    conexion.query(consultaEFMA, [idbeneficio, rutBeneficiario], (errt11E, resultt11E) => {
                                        if (errt11E) { throw errt11E; }

                                        else {
                                            const cantidadEFMA = contadorArregloSql(resultt11E);

                                            if (cantidadEFMA > 0) {
                                                const mensajeEFMAEntE = "T1EE4" //TIPO 1 ENTREGA ERRONEA
                                                res.json({ message: mensajeEFMAEntE });
                                            }

                                            else if (cantidadEFMA == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionPendienteEntrega, [estadoNuevo, idsolicitud], (err21E, result21E) => {
                                                    if (err21E) { throw err21E; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeEFMAEnt = "ER4";
                                                                res.json({ message: mensajeEFMAEnt }) //CUANDO YA SE REALIZO LA ENTREGA
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                                else if (mes == 5 || mes == 6 || mes == 7 || mes == 8) {

                                    conexion.query(consultaMJJA, [idbeneficio, rutBeneficiario], (errt12E, resultt12E) => {

                                        if (errt12E) { throw errt12E; }

                                        else {
                                            const cantidadMJJA = contadorArregloSql(resultt12E);

                                            if (cantidadMJJA > 0) {
                                                const mensajeMJJAEntE = "T1EE4" //TIPO 1 POSTULACION ERRONEA
                                                res.json({ message: mensajeMJJAEntE });
                                            }

                                            else if (cantidadMJJA == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionPendienteEntrega, [estadoNuevo, idsolicitud], (err22E, result22E) => {
                                                    if (err22E) { throw err22E; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeMJJAEnt = "ER4";
                                                                res.json({ message: mensajeMJJAEnt });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })

                                }
                                else if (mes == 9 || mes == 10 || mes == 11 || mes == 12) {
                                    conexion.query(consultaSOND, [idbeneficio, rutBeneficiario], (errt13E, resultt13E) => {
                                        if (errt13E) { throw errt13E; }
                                        else {
                                            const cantidadSOND = contadorArregloSql(resultt13E);

                                            if (cantidadSOND > 0) {
                                                const mensajeSONDEntE = "T1EE4";
                                                res.json({ message: mensajeSONDEntE });
                                            }

                                            else if (cantidadSOND == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionPendienteEntrega, [estadoNuevo, idsolicitud], (err23E, result23E) => {
                                                    if (err23E) { throw err23E; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeSONDEnt = "ER4";
                                                                res.json({ message: mensajeSONDEnt });
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            }


                            else if (ultimoDigitos == "T2") {

                                if (mes == 1) {
                                    conexion.query(consultaE, [idbeneficio, rutBeneficiario], (erree, resultee) => {
                                        if (erree) { throw erree; }
                                        else {
                                            const cantidadEe = contadorArregloSql(resultee);

                                            if (cantidadEe > 0) {
                                                const mensajeEPostEe: string = "T2EE4"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEPostEe });
                                            }

                                            else if (cantidadEe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionPendienteEntrega, [estadoNuevo, idsolicitud], (erre2e, resulte2e) => {
                                                    if (erre2e) { throw erre2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeEEntR: string = "T2ER4";
                                                                res.json({ message: mensajeEEntR });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 2) {
                                    conexion.query(consultaF, [idbeneficio, rutBeneficiario], (errfe, resultfe) => {
                                        if (errfe) { throw errfe; }
                                        else {
                                            const cantidadFe = contadorArregloSql(resultfe);

                                            if (cantidadFe > 0) {
                                                const mensajeEPostFe: string = "T2EE4"; //TIPO 2 ERROR ENTREGA
                                                res.json({ message: mensajeEPostFe });
                                            }

                                            else if (cantidadFe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionPendienteEntrega, [estadoNuevo, idsolicitud], (errf2e, resultf2e) => {
                                                    if (errf2e) { throw errf2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeFEntR: string = "T2ER4";
                                                                res.json({ message: mensajeFEntR });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 3) {
                                    conexion.query(consultaMAR, [idbeneficio, rutBeneficiario], (errmare, resultmare) => {
                                        if (errmare) { throw errmare; }
                                        else {
                                            const cantidadMARe = contadorArregloSql(resultmare);

                                            if (cantidadMARe > 0) {
                                                const mensajeMAREntF: string = "T2EE4"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeMAREntF });
                                            }

                                            else if (cantidadMARe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionPendienteEntrega, [estadoNuevo, idsolicitud], (errmar2e, resultmar2e) => {
                                                    if (errmar2e) { throw errmar2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeMAREntR: string = "T2ER4";
                                                                res.json({ message: mensajeMAREntR });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 4) {
                                    conexion.query(consultaAB, [idbeneficio, rutBeneficiario], (errabe, resultabe) => {
                                        if (errabe) { throw errabe; }
                                        else {
                                            const cantidadABe = contadorArregloSql(resultabe);

                                            if (cantidadABe > 0) {
                                                const mensajeEEntAB: string = "T2EE4"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntAB });
                                            }

                                            else if (cantidadABe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionPendienteEntrega, [estadoNuevo, idsolicitud], (errab2e, resultab2e) => {
                                                    if (errab2e) { throw errab2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeABEntR: string = "T2ER4";
                                                                res.json({ message: mensajeABEntR });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 5) {
                                    conexion.query(consultaMAY, [idbeneficio, rutBeneficiario], (errmaye, resultmaye) => {
                                        if (errmaye) { throw errmaye; }
                                        else {
                                            const cantidadMAYe = contadorArregloSql(resultmaye);

                                            if (cantidadMAYe > 0) {
                                                const mensajeEEntMAY: string = "T2EE4"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntMAY });
                                            }

                                            else if (cantidadMAYe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionPendienteEntrega, [estadoNuevo, idsolicitud], (errmay2e, resultmay2e) => {
                                                    if (errmay2e) { throw errmay2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeMAYEntR: string = "T2ER4";
                                                                res.json({ message: mensajeMAYEntR });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 6) {
                                    conexion.query(consultaJUN, [idbeneficio, rutBeneficiario], (errjune, resultjune) => {
                                        if (errjune) { throw errjune; }
                                        else {
                                            const cantidadJUNe = contadorArregloSql(resultjune);

                                            if (cantidadJUNe > 0) {
                                                const mensajeEEntJUN: string = "T2EE4"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntJUN });
                                            }

                                            else if (cantidadJUNe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionPendienteEntrega, [estadoNuevo, idsolicitud], (errjun2e, resultjun2e) => {
                                                    if (errjun2e) { throw errjun2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeJUNEntR: string = "T2ER4";
                                                                res.json({ message: mensajeJUNEntR });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 7) {
                                    conexion.query(consultaJUL, [idbeneficio, rutBeneficiario], (errjule, resultjule) => {
                                        if (errjule) { throw errjule; }
                                        else {
                                            const cantidadJULe = contadorArregloSql(resultjule);

                                            if (cantidadJULe > 0) {
                                                const mensajeEEntJUL: string = "T2EE4"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntJUL });
                                            }
                                            else if (cantidadJULe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionPendienteEntrega, [estadoNuevo, idsolicitud], (errjul2e, resultjul2e) => {
                                                    if (errjul2e) { throw errjul2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeJULEntR: string = "T2ER4";
                                                                res.json({ message: mensajeJULEntR });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 8) {
                                    conexion.query(consultaAG, [idbeneficio, rutBeneficiario], (errage, resultage) => {
                                        if (errage) { throw errage; }
                                        else {
                                            const cantidadAGe = contadorArregloSql(resultage);

                                            if (cantidadAGe > 0) {
                                                const mensajeEEntAG: string = "T2EE4"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntAG });
                                            }

                                            else if (cantidadAGe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionPendienteEntrega, [estadoNuevo, idsolicitud], (errag2e, resultag2e) => {
                                                    if (errag2e) { throw errag2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeAGEntR: string = "T2ER4";
                                                                res.json({ message: mensajeAGEntR });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 9) {
                                    conexion.query(consultaS, [idbeneficio, rutBeneficiario], (errse, resultse) => {
                                        if (errse) { throw errse; }
                                        else {
                                            const cantidadSe = contadorArregloSql(resultse);

                                            if (cantidadSe > 0) {
                                                const mensajeEEntS: string = "T2EE4"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntS });
                                            }
                                            else if (cantidadSe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionPendienteEntrega, [estadoNuevo, idsolicitud], (errs2e, results2e) => {
                                                    if (errs2e) { throw errs2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeSEntR: string = "T2ER4";
                                                                res.json({ message: mensajeSEntR });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 10) {
                                    conexion.query(consultaO, [idbeneficio, rutBeneficiario], (erroe, resultoe) => {
                                        if (erroe) { throw erroe; }
                                        else {
                                            const cantidadOe = contadorArregloSql(resultoe);

                                            if (cantidadOe > 0) {
                                                const mensajeEEntO: string = "T2EE4"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntO });
                                            }

                                            else if (cantidadOe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionPendienteEntrega, [estadoNuevo, idsolicitud], (erro2e, resulto2e) => {
                                                    if (erro2e) { throw erro2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeOEntR: string = "T2ER4";
                                                                res.json({ message: mensajeOEntR });
                                                            }
                                                        })


                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 11) {
                                    conexion.query(consultaN, [idbeneficio, rutBeneficiario], (errne, resultne) => {
                                        if (errne) { throw errne; }
                                        else {
                                            const cantidadNe = contadorArregloSql(resultne);

                                            if (cantidadNe > 0) {
                                                const mensajeEEntN: string = "T2EE4"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntN });
                                            }
                                            else if (cantidadNe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionPendienteEntrega, [estadoNuevo, idsolicitud], (errn2e, resultn2e) => {
                                                    if (errn2e) { throw errn2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeNEntR: string = "T2ER4";
                                                                res.json({ message: mensajeNEntR });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 12) {
                                    conexion.query(consultaD, [idbeneficio, rutBeneficiario], (errde, resultde) => {
                                        if (errde) { throw errde; }
                                        else {
                                            const cantidadDe = contadorArregloSql(resultde);

                                            if (cantidadDe > 0) {
                                                const mensajeEEntD: string = "T2EE4"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntD });
                                            }

                                            else if (cantidadDe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionPendienteEntrega, [estadoNuevo, idsolicitud], (errd2e, resultd2e) => {
                                                    if (errd2e) { throw errd2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeDEntR: string = "T2ER4";
                                                                res.json({ message: mensajeDEntR });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                            }
                        }


                        else if (estadoNuevo == 2) { //ENTREGADO

                            if (ultimoDigitos == "T1") { //TIPO 1 BENEFICIO CUATRIMESTRAL

                                if (mes == 1 || mes == 2 || mes == 3 || mes == 4) {

                                    conexion.query(consultaEFMA, [idbeneficio, rutBeneficiario], (errt11E, resultt11E) => {
                                        if (errt11E) { throw errt11E; }

                                        else {
                                            const cantidadEFMA = contadorArregloSql(resultt11E);

                                            if (cantidadEFMA > 0) {
                                                const mensajeEFMAEntE = "T1EE2" //TIPO 1 ENTREGA ERRONEA
                                                res.json({ message: mensajeEFMAEntE });
                                            }

                                            else if (cantidadEFMA == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (err21E, result21E) => {
                                                    if (err21E) { throw err21E; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeEFMAEnt = "ER2";
                                                                res.json({ message: mensajeEFMAEnt }) //CUANDO YA SE REALIZO LA ENTREGA
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                                else if (mes == 5 || mes == 6 || mes == 7 || mes == 8) {

                                    conexion.query(consultaMJJA, [idbeneficio, rutBeneficiario], (errt12E, resultt12E) => {

                                        if (errt12E) { throw errt12E; }

                                        else {
                                            const cantidadMJJA = contadorArregloSql(resultt12E);

                                            if (cantidadMJJA > 0) {
                                                const mensajeMJJAEntE = "T1EE2" //TIPO 1 POSTULACION ERRONEA
                                                res.json({ message: mensajeMJJAEntE });
                                            }

                                            else if (cantidadMJJA == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (err22E, result22E) => {
                                                    if (err22E) { throw err22E; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeMJJAEnt = "ER2";
                                                                res.json({ message: mensajeMJJAEnt });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })

                                }
                                else if (mes == 9 || mes == 10 || mes == 11 || mes == 12) {
                                    conexion.query(consultaSOND, [idbeneficio, rutBeneficiario], (errt13E, resultt13E) => {
                                        if (errt13E) { throw errt13E; }
                                        else {
                                            const cantidadSOND = contadorArregloSql(resultt13E);

                                            if (cantidadSOND > 0) {
                                                const mensajeSONDEntE = "T1EE2";
                                                res.json({ message: mensajeSONDEntE });
                                            }

                                            else if (cantidadSOND == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (err23E, result23E) => {
                                                    if (err23E) { throw err23E; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeSONDEnt = "ER2";
                                                                res.json({ message: mensajeSONDEnt });
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            }


                            else if (ultimoDigitos == "T2") {

                                if (mes == 1) {
                                    conexion.query(consultaE, [idbeneficio, rutBeneficiario], (erree, resultee) => {
                                        if (erree) { throw erree; }
                                        else {
                                            const cantidadEe = contadorArregloSql(resultee);

                                            if (cantidadEe > 0) {
                                                const mensajeEPostEe: string = "T2EE2"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEPostEe });
                                            }

                                            else if (cantidadEe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (erre2e, resulte2e) => {
                                                    if (erre2e) { throw erre2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeEEntR: string = "T2ER2";
                                                                res.json({ message: mensajeEEntR });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 2) {
                                    conexion.query(consultaF, [idbeneficio, rutBeneficiario], (errfe, resultfe) => {
                                        if (errfe) { throw errfe; }
                                        else {
                                            const cantidadFe = contadorArregloSql(resultfe);

                                            if (cantidadFe > 0) {
                                                const mensajeEPostFe: string = "T2EE2"; //TIPO 2 ERROR ENTREGA
                                                res.json({ message: mensajeEPostFe });
                                            }

                                            else if (cantidadFe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (errf2e, resultf2e) => {
                                                    if (errf2e) { throw errf2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeFEntR: string = "T2ER2";
                                                                res.json({ message: mensajeFEntR });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 3) {
                                    conexion.query(consultaMAR, [idbeneficio, rutBeneficiario], (errmare, resultmare) => {
                                        if (errmare) { throw errmare; }
                                        else {
                                            const cantidadMARe = contadorArregloSql(resultmare);

                                            if (cantidadMARe > 0) {
                                                const mensajeMAREntF: string = "T2EE2"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeMAREntF });
                                            }

                                            else if (cantidadMARe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (errmar2e, resultmar2e) => {
                                                    if (errmar2e) { throw errmar2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeMAREntR: string = "T2ER2";
                                                                res.json({ message: mensajeMAREntR });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 4) {
                                    conexion.query(consultaAB, [idbeneficio, rutBeneficiario], (errabe, resultabe) => {
                                        if (errabe) { throw errabe; }
                                        else {
                                            const cantidadABe = contadorArregloSql(resultabe);

                                            if (cantidadABe > 0) {
                                                const mensajeEEntAB: string = "T2EE2"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntAB });
                                            }

                                            else if (cantidadABe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (errab2e, resultab2e) => {
                                                    if (errab2e) { throw errab2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeABEntR: string = "T2ER2";
                                                                res.json({ message: mensajeABEntR });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 5) {
                                    conexion.query(consultaMAY, [idbeneficio, rutBeneficiario], (errmaye, resultmaye) => {
                                        if (errmaye) { throw errmaye; }
                                        else {
                                            const cantidadMAYe = contadorArregloSql(resultmaye);

                                            if (cantidadMAYe > 0) {
                                                const mensajeEEntMAY: string = "T2EE2"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntMAY });
                                            }

                                            else if (cantidadMAYe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (errmay2e, resultmay2e) => {
                                                    if (errmay2e) { throw errmay2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeMAYEntR: string = "T2ER2";
                                                                res.json({ message: mensajeMAYEntR });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 6) {
                                    conexion.query(consultaJUN, [idbeneficio, rutBeneficiario], (errjune, resultjune) => {
                                        if (errjune) { throw errjune; }
                                        else {
                                            const cantidadJUNe = contadorArregloSql(resultjune);

                                            if (cantidadJUNe > 0) {
                                                const mensajeEEntJUN: string = "T2EE2"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntJUN });
                                            }

                                            else if (cantidadJUNe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (errjun2e, resultjun2e) => {
                                                    if (errjun2e) { throw errjun2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeJUNEntR: string = "T2ER2";
                                                                res.json({ message: mensajeJUNEntR });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 7) {
                                    conexion.query(consultaJUL, [idbeneficio, rutBeneficiario], (errjule, resultjule) => {
                                        if (errjule) { throw errjule; }
                                        else {
                                            const cantidadJULe = contadorArregloSql(resultjule);

                                            if (cantidadJULe > 0) {
                                                const mensajeEEntJUL: string = "T2EE2"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntJUL });
                                            }
                                            else if (cantidadJULe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (errjul2e, resultjul2e) => {
                                                    if (errjul2e) { throw errjul2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeJULEntR: string = "T2ER2";
                                                                res.json({ message: mensajeJULEntR });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 8) {
                                    conexion.query(consultaAG, [idbeneficio, rutBeneficiario], (errage, resultage) => {
                                        if (errage) { throw errage; }
                                        else {
                                            const cantidadAGe = contadorArregloSql(resultage);

                                            if (cantidadAGe > 0) {
                                                const mensajeEEntAG: string = "T2EE2"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntAG });
                                            }

                                            else if (cantidadAGe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (errag2e, resultag2e) => {
                                                    if (errag2e) { throw errag2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeAGEntR: string = "T2ER2";
                                                                res.json({ message: mensajeAGEntR });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 9) {
                                    conexion.query(consultaS, [idbeneficio, rutBeneficiario], (errse, resultse) => {
                                        if (errse) { throw errse; }
                                        else {
                                            const cantidadSe = contadorArregloSql(resultse);

                                            if (cantidadSe > 0) {
                                                const mensajeEEntS: string = "T2EE2"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntS });
                                            }
                                            else if (cantidadSe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (errs2e, results2e) => {
                                                    if (errs2e) { throw errs2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeSEntR: string = "T2ER2";
                                                                res.json({ message: mensajeSEntR });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 10) {
                                    conexion.query(consultaO, [idbeneficio, rutBeneficiario], (erroe, resultoe) => {
                                        if (erroe) { throw erroe; }
                                        else {
                                            const cantidadOe = contadorArregloSql(resultoe);

                                            if (cantidadOe > 0) {
                                                const mensajeEEntO: string = "T2EE2"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntO });
                                            }

                                            else if (cantidadOe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (erro2e, resulto2e) => {
                                                    if (erro2e) { throw erro2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeOEntR: string = "T2ER2";
                                                                res.json({ message: mensajeOEntR });
                                                            }
                                                        })


                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 11) {
                                    conexion.query(consultaN, [idbeneficio, rutBeneficiario], (errne, resultne) => {
                                        if (errne) { throw errne; }
                                        else {
                                            const cantidadNe = contadorArregloSql(resultne);

                                            if (cantidadNe > 0) {
                                                const mensajeEEntN: string = "T2EE2"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntN });
                                            }
                                            else if (cantidadNe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (errn2e, resultn2e) => {
                                                    if (errn2e) { throw errn2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeNEntR: string = "T2ER2";
                                                                res.json({ message: mensajeNEntR });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 12) {
                                    conexion.query(consultaD, [idbeneficio, rutBeneficiario], (errde, resultde) => {
                                        if (errde) { throw errde; }
                                        else {
                                            const cantidadDe = contadorArregloSql(resultde);

                                            if (cantidadDe > 0) {
                                                const mensajeEEntD: string = "T2EE2"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntD });
                                            }

                                            else if (cantidadDe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (errd2e, resultd2e) => {
                                                    if (errd2e) { throw errd2e; }
                                                    else {
                                                        //@ts-ignore
                                                        conexion.query(actualizacionStock, [stockNuevoPEOE, idbeneficio], (erroStock, resultadoStock) => {
                                                            if (erroStock) { throw erroStock; }
                                                            else {
                                                                const mensajeDEntR: string = "T2ER2";
                                                                res.json({ message: mensajeDEntR });
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                            }
                        }
                    }


                    else if (estadoAnterior == 2 || estadoAnterior == 3) { //SI ES ENTREGADO O RECHAZADO EL ESTADO ANTERIOR MANDAR ALERTA QUE NO SE PUEDE MODIFICAR
                        const mensajeRechazadoEntregado = "SROE";
                        res.json({ message: mensajeRechazadoEntregado });
                    }


                    else if (estadoAnterior == 4) { //PENDIENTE A ENTREGA

                        if (estadoNuevo == 3) { //SE RECHAZA LA ENTREGA SE DEVUELVE EL STOCK
                            //@ts-ignore
                            conexion.query(actualizacionRechazo, [estadoNuevo, fechaHoy, observacion, idsolicitud], (err111, result111) => {
                                if (err111) { throw err111; }
                                else {
                                    //@ts-ignore
                                    conexion.query(actualizacionStock, [stockNuevoRE, idbeneficio], (errer, resultt) => {
                                        if (errer) { throw errer; }
                                        else {
                                            const mensajeSR: string = "SRS"; //SOLICITUD RECHAZADA
                                            res.json({ message: mensajeSR });
                                        }
                                    })

                                }
                            })
                        }
                        else if (estadoNuevo == 2) { //AQUI SERIA SIN MANEJO DE STOCK


                            if (ultimoDigitos == "T1") { //TIPO 1 BENEFICIO CUATRIMESTRAL

                                if (mes == 1 || mes == 2 || mes == 3 || mes == 4) {

                                    conexion.query(consultaEFMA, [idbeneficio, rutBeneficiario], (errt11E, resultt11E) => {
                                        if (errt11E) { throw errt11E; }

                                        else {
                                            const cantidadEFMA = contadorArregloSql(resultt11E);

                                            if (cantidadEFMA > 0) {
                                                const mensajeEFMAEntE = "T1EEENT" //TIPO 1 ENTREGA ERRONEA
                                                res.json({ message: mensajeEFMAEntE });
                                            }

                                            else if (cantidadEFMA == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (err21E, result21E) => {
                                                    if (err21E) { throw err21E; }
                                                    else {
                                                        const mensajeEFMAEnt = "ERENT";
                                                        res.json({ message: mensajeEFMAEnt })

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                                else if (mes == 5 || mes == 6 || mes == 7 || mes == 8) {

                                    conexion.query(consultaMJJA, [idbeneficio, rutBeneficiario], (errt12E, resultt12E) => {

                                        if (errt12E) { throw errt12E; }

                                        else {
                                            const cantidadMJJA = contadorArregloSql(resultt12E);

                                            if (cantidadMJJA > 0) {
                                                const mensajeMJJAEntE = "T1EEENT" //TIPO 1 POSTULACION ERRONEA
                                                res.json({ message: mensajeMJJAEntE });
                                            }

                                            else if (cantidadMJJA == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (err22E, result22E) => {
                                                    if (err22E) { throw err22E; }
                                                    else {
                                                        const mensajeMJJAEnt = "ERENT";
                                                        res.json({ message: mensajeMJJAEnt });

                                                    }
                                                })
                                            }
                                        }
                                    })

                                }
                                else if (mes == 9 || mes == 10 || mes == 11 || mes == 12) {
                                    conexion.query(consultaSOND, [idbeneficio, rutBeneficiario], (errt13E, resultt13E) => {
                                        if (errt13E) { throw errt13E; }
                                        else {
                                            const cantidadSOND = contadorArregloSql(resultt13E);

                                            if (cantidadSOND > 0) {
                                                const mensajeSONDEntE = "T1EEENT";
                                                res.json({ message: mensajeSONDEntE });
                                            }

                                            else if (cantidadSOND == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (err23E, result23E) => {
                                                    if (err23E) { throw err23E; }
                                                    else {
                                                        const mensajeSONDEnt = "ERENT";
                                                        res.json({ message: mensajeSONDEnt });
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            }


                            else if (ultimoDigitos == "T2") {

                                if (mes == 1) {
                                    conexion.query(consultaE, [idbeneficio, rutBeneficiario], (erree, resultee) => {
                                        if (erree) { throw erree; }
                                        else {
                                            const cantidadEe = contadorArregloSql(resultee);

                                            if (cantidadEe > 0) {
                                                const mensajeEPostEe: string = "T2EEENT"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEPostEe });
                                            }

                                            else if (cantidadEe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (erre2e, resulte2e) => {
                                                    if (erre2e) { throw erre2e; }
                                                    else {
                                                        const mensajeEEntR: string = "T2ERENT";
                                                        res.json({ message: mensajeEEntR });

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 2) {
                                    conexion.query(consultaF, [idbeneficio, rutBeneficiario], (errfe, resultfe) => {
                                        if (errfe) { throw errfe; }
                                        else {
                                            const cantidadFe = contadorArregloSql(resultfe);

                                            if (cantidadFe > 0) {
                                                const mensajeEPostFe: string = "T2EEENT"; //TIPO 2 ERROR ENTREGA
                                                res.json({ message: mensajeEPostFe });
                                            }

                                            else if (cantidadFe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (errf2e, resultf2e) => {
                                                    if (errf2e) { throw errf2e; }
                                                    else {
                                                        const mensajeFEntR: string = "T2ERENT";
                                                        res.json({ message: mensajeFEntR });

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 3) {
                                    conexion.query(consultaMAR, [idbeneficio, rutBeneficiario], (errmare, resultmare) => {
                                        if (errmare) { throw errmare; }
                                        else {
                                            const cantidadMARe = contadorArregloSql(resultmare);

                                            if (cantidadMARe > 0) {
                                                const mensajeMAREntF: string = "T2EEENT"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeMAREntF });
                                            }

                                            else if (cantidadMARe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (errmar2e, resultmar2e) => {
                                                    if (errmar2e) { throw errmar2e; }
                                                    else {
                                                        const mensajeMAREntR: string = "T2ERENT";
                                                        res.json({ message: mensajeMAREntR });

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 4) {
                                    conexion.query(consultaAB, [idbeneficio, rutBeneficiario], (errabe, resultabe) => {
                                        if (errabe) { throw errabe; }
                                        else {
                                            const cantidadABe = contadorArregloSql(resultabe);

                                            if (cantidadABe > 0) {
                                                const mensajeEEntAB: string = "T2EEENT"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntAB });
                                            }

                                            else if (cantidadABe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (errab2e, resultab2e) => {
                                                    if (errab2e) { throw errab2e; }
                                                    else {
                                                        const mensajeABEntR: string = "T2ERENT";
                                                        res.json({ message: mensajeABEntR });

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 5) {
                                    conexion.query(consultaMAY, [idbeneficio, rutBeneficiario], (errmaye, resultmaye) => {
                                        if (errmaye) { throw errmaye; }
                                        else {
                                            const cantidadMAYe = contadorArregloSql(resultmaye);

                                            if (cantidadMAYe > 0) {
                                                const mensajeEEntMAY: string = "T2EEENT"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntMAY });
                                            }

                                            else if (cantidadMAYe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (errmay2e, resultmay2e) => {
                                                    if (errmay2e) { throw errmay2e; }
                                                    else {
                                                        const mensajeMAYEntR: string = "T2ERENT";
                                                        res.json({ message: mensajeMAYEntR });

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 6) {
                                    conexion.query(consultaJUN, [idbeneficio, rutBeneficiario], (errjune, resultjune) => {
                                        if (errjune) { throw errjune; }
                                        else {
                                            const cantidadJUNe = contadorArregloSql(resultjune);

                                            if (cantidadJUNe > 0) {
                                                const mensajeEEntJUN: string = "T2EEENT"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntJUN });
                                            }

                                            else if (cantidadJUNe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (errjun2e, resultjun2e) => {
                                                    if (errjun2e) { throw errjun2e; }
                                                    else {
                                                        const mensajeJUNEntR: string = "T2ERENT";
                                                        res.json({ message: mensajeJUNEntR });

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 7) {
                                    conexion.query(consultaJUL, [idbeneficio, rutBeneficiario], (errjule, resultjule) => {
                                        if (errjule) { throw errjule; }
                                        else {
                                            const cantidadJULe = contadorArregloSql(resultjule);

                                            if (cantidadJULe > 0) {
                                                const mensajeEEntJUL: string = "T2EEENT"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntJUL });
                                            }
                                            else if (cantidadJULe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (errjul2e, resultjul2e) => {
                                                    if (errjul2e) { throw errjul2e; }
                                                    else {
                                                        const mensajeJULEntR: string = "T2ERENT";
                                                        res.json({ message: mensajeJULEntR });

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 8) {
                                    conexion.query(consultaAG, [idbeneficio, rutBeneficiario], (errage, resultage) => {
                                        if (errage) { throw errage; }
                                        else {
                                            const cantidadAGe = contadorArregloSql(resultage);

                                            if (cantidadAGe > 0) {
                                                const mensajeEEntAG: string = "T2EEENT"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntAG });
                                            }

                                            else if (cantidadAGe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (errag2e, resultag2e) => {
                                                    if (errag2e) { throw errag2e; }
                                                    else {
                                                        const mensajeAGEntR: string = "T2ERENT";
                                                        res.json({ message: mensajeAGEntR });

                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 9) {
                                    conexion.query(consultaS, [idbeneficio, rutBeneficiario], (errse, resultse) => {
                                        if (errse) { throw errse; }
                                        else {
                                            const cantidadSe = contadorArregloSql(resultse);

                                            if (cantidadSe > 0) {
                                                const mensajeEEntS: string = "T2EEENT"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntS });
                                            }
                                            else if (cantidadSe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (errs2e, results2e) => {
                                                    if (errs2e) { throw errs2e; }
                                                    else {
                                                        const mensajeSEntR: string = "T2ERENT";
                                                        res.json({ message: mensajeSEntR });
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 10) {
                                    conexion.query(consultaO, [idbeneficio, rutBeneficiario], (erroe, resultoe) => {
                                        if (erroe) { throw erroe; }
                                        else {
                                            const cantidadOe = contadorArregloSql(resultoe);

                                            if (cantidadOe > 0) {
                                                const mensajeEEntO: string = "T2EEENT"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntO });
                                            }

                                            else if (cantidadOe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (erro2e, resulto2e) => {
                                                    if (erro2e) { throw erro2e; }
                                                    else {
                                                        const mensajeOEntR: string = "T2ERENT";
                                                        res.json({ message: mensajeOEntR });


                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 11) {
                                    conexion.query(consultaN, [idbeneficio, rutBeneficiario], (errne, resultne) => {
                                        if (errne) { throw errne; }
                                        else {
                                            const cantidadNe = contadorArregloSql(resultne);

                                            if (cantidadNe > 0) {
                                                const mensajeEEntN: string = "T2EEENT"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntN });
                                            }
                                            else if (cantidadNe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (errn2e, resultn2e) => {
                                                    if (errn2e) { throw errn2e; }
                                                    else {
                                                        const mensajeNEntR: string = "T2ERENT";
                                                        res.json({ message: mensajeNEntR });


                                                    }
                                                })
                                            }
                                        }
                                    })
                                }

                                else if (mes == 12) {
                                    conexion.query(consultaD, [idbeneficio, rutBeneficiario], (errde, resultde) => {
                                        if (errde) { throw errde; }
                                        else {
                                            const cantidadDe = contadorArregloSql(resultde);

                                            if (cantidadDe > 0) {
                                                const mensajeEEntD: string = "T2EEENT"; //TIPO 2 ERROR POSTULACION
                                                res.json({ message: mensajeEEntD });
                                            }

                                            else if (cantidadDe == 0) {
                                                //@ts-ignore
                                                conexion.query(actualizacionEntrega, [estadoNuevo, hoyA, idsolicitud], (errd2e, resultd2e) => {
                                                    if (errd2e) { throw errd2e; }
                                                    else {
                                                        const mensajeDEntR: string = "T2ERENT";
                                                        res.json({ message: mensajeDEntR });
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            }
                        }

                    }
                }
            })


        }
    })

}

exports.listarModificacion = async (req: Request, res: Response) => {

    const idsolicitud: number = req.body.idsoli;

    const obtenerInformacinoMod: string = "SELECT solicitudes.rutbeneficiariosol, solicitudes.estadosol, solicitudes.fechacreacionsol, solicitudes.fechafinalsol, solicitudes.observacionsol, beneficio.stockbeneficio, beneficio.idbeneficio FROM solicitudes JOIN beneficio ON solicitudes.idbeneficiosol = beneficio.idbeneficio WHERE solicitudes.idsolicitud = ?";

    conexion.query(obtenerInformacinoMod, [idsolicitud], (err, result) => {
        if (err) { throw err; }
        else {

            const informacion = result[0];

            console.log(informacion);

            const rutBeneficiario = informacion.rutbeneficiariosol;
            const stockbene = informacion.stockbeneficio;
            const idbeneficio = informacion.idbeneficio;
            const estadoSoli = informacion.estadosol;
            const fechainicio = informacion.fechacreacionsol;
            const fechafinal = informacion.fechafinalsol;
            const obs = informacion.observacionsol;

            res.json({
                rutB: rutBeneficiario,
                idBene: idbeneficio,
                estadoSolicitud: estadoSoli,
                stockB: stockbene,
                fechaI: fechainicio,
                fechaF: fechafinal,
                observacion: obs
            })
        }
    })
}


exports.verificacionBeneficiario = async (req: Request, res: Response) => {

    const rutBeneficiario: string = req.body.rut;
    const busquedaBeneficiario: string = "SELECT * FROM beneficiario WHERE rutbeneficiario = ?";

    conexion.query(busquedaBeneficiario, [rutBeneficiario], (err, result) => {
        if (err) { throw err; }
        else {
            const cantidad = contadorArregloSql(result);

            if (cantidad > 0) {
                const mensajeSiExiste: string = "SEB";
                res.json({ message: mensajeSiExiste });
            }
            else if (cantidad == 0) {
                const mensajeNoExiste: string = "NEB";
                res.json({ message: mensajeNoExiste });
            }
        }
    })
}

//@ts-ignore
exports.obtencionSolicitudes = async (req: Request, res: Response) => {

    const obtencionsoli: string = "SELECT * FROM solicitudes";

    conexion.query(obtencionsoli, (err, result) => {
        if (err) { throw err; }
        else {
            console.log(result);
            res.send(result);
        }
    })
}

//@ts-ignore
exports.obtencionBeneficiosUni = async (req: Request, res: Response) => {

    const obtencionBeneficios: string = "SELECT * FROM beneficio WHERE stockbeneficio > 0";

    conexion.query(obtencionBeneficios, (err, result) => {
        if (err) { throw err; }
        else {
            res.send(result);
        }
    })
}

exports.obtenerEstadoSolicitud = async (req: Request, res: Response) => {

    const idSoli = req.body.solicitud;

    const consultaEstadoSoli: string = "SELECT * FROM solicitudes WHERE idsolicitud = ?";

    conexion.query(consultaEstadoSoli, [idSoli], (err, result) => {
        if (err) { throw err; }
        else {
            const datos = result[0];
            const estadoAnterior = datos.estadosol;
            console.log(datos);

            if (estadoAnterior == 1) { //POSTULACION
                const mensajePost = "POST";
                res.json({ message: mensajePost })
            }
            else if (estadoAnterior == 2) { //INTOCABLES ENTREGA Y RECHAZO
                const mensajeInt = "ENT";
                res.json({ message: mensajeInt });
            }
            else if (estadoAnterior == 3) {
                const mensajeRE = "RE";
                res.json({ message: mensajeRE });
            }
            else if (estadoAnterior == 4) { //PENDIENTE A ENTREGA
                const mensajePend = "Pend";
                res.json({ message: mensajePend })
            }
        }
    })
}



exports.obtenerInformacionPdfEntrega = async (req: Request, res: Response) => { //CARGA DE DATOS PARA EL PDF

    const idSoli: number = req.body.idSolicitud;

    const consultaInfo: string = "SELECT * FROM solicitudes WHERE idsolicitud = ?";
    const consultaBeneficiario: string = "SELECT * FROM persona WHERE rutpersona = ?";
    const consultaTipoBeneficio: string = "SELECT * FROM tipobeneficio WHERE incialestipobeneficio = ?"


    conexion.query(consultaInfo, [idSoli], (err, result) => {
        if (err) { throw err; }
        else {
            const info = result[0];

            const rutBeneficiario = info.rutbeneficiariosol;
            const idbeneficio: string = info.idbeneficiosol;
            const fechaInicial = info.fechacreacionsol;
            const fechaFinal = info.fechafinalsol;

            const iniciales: string = idbeneficio.substring(0, 2);
            conexion.query(consultaBeneficiario, [rutBeneficiario], (err1, result1) => {

                if (err1) { throw err1; }

                else {
                    const infoPer = result1[0];

                    const nombrePer = infoPer.nombrecompleto;
                    const direccionPer = infoPer.direccionpersona;

                    conexion.query(consultaTipoBeneficio, [iniciales], (err2, result2) => {
                        if (err2) { throw err2; }
                        else {
                            const infoBe = result2[0];
                            const nombreBeneficio = infoBe.nombretipobeneficio;

                            res.json({ rutbeneficiario: rutBeneficiario, nombresbeneficiario: nombrePer, direccionbeneficiario: direccionPer, fechacreacion: fechaInicial, fechafinal: fechaFinal, nombrebeneficio: nombreBeneficio })
                        }
                    })
                }

            })
        }
    })
}



  


//IMPRIMIR PANTALLA

exports.verificacionEntre = async (req: Request, res: Response) => {

    const idBeneficio = req.body.idBeneficio;

    const mes = req.body.mesFecha;
    const anio = req.body.anioFecha;

    if(mes == null && anio == null || mes == undefined && anio == undefined || mes == "" && anio == "" || idBeneficio == null || idBeneficio == undefined || idBeneficio == "" || anio == null || anio == undefined || anio == ""){
        const mensajeIE = "IE"; //INGRESAR DATOS CORREACTAMENTE
        res.json({message: mensajeIE});
    }
    else if(mes == null || mes == undefined || mes == ""  ){

        const querySolicitudesFiltroAnio = "SELECT * FROM solicitudes WHERE estadosol = 2 AND YEAR(fechafinalsol) = ? AND idbeneficiosol = ?";

        conexion.query(querySolicitudesFiltroAnio, [anio, idBeneficio], (err, result) => {
            if(err) {throw err;}
            else{
                const cantidadA = contadorArregloSql(result);
                if(cantidadA > 0){
                    const mensajeSEA = "SEA";
                    res.json({message: mensajeSEA}); //si existen anio
                }
                else{
                    const mensajeNEA = "NEA";
                    res.json({message: mensajeNEA}); //no existen anio
                }
            }
        })

    }
    else{
        const querySoicitudesFiltroMesAnio = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) = ? AND YEAR(fechafinalsol) = ? AND idbeneficiosol = ?";

        conexion.query(querySoicitudesFiltroMesAnio, [mes, anio, idBeneficio], (err1, result1) =>{
            if(err1){throw err1;}
            else{
                const cantidadA = contadorArregloSql(result1);
                if(cantidadA > 0){
                    const mensajeSEAM = "SEAM";
                    res.json({message: mensajeSEAM}); //si existen anio
                }
                else{
                    const mensajeNEAM = "NEAM";
                    res.json({message: mensajeNEAM}); //no existen anio
                }
            }
        })
    }

}

exports.mostrarEntregasA = async (req:Request, res:Response) => {

    const anio = req.body.anioConsulta;
    const id = req.body.beneficio;

    const querySolicitudesFiltroAnio = "SELECT * FROM solicitudes WHERE estadosol = 2 AND YEAR(fechafinalsol) = ? AND idbeneficiosol = ?";

    conexion.query(querySolicitudesFiltroAnio, [anio, id], (err, result) => {
        if(err) {throw err;}
        else{
            res.send(result);
        }
    })

} 
  

exports.mostrarEntregasMA = async (req:Request, res:Response) => {

    const anio = req.body.anioConsulta;
    const mes = req.body.mesConsulta;

    const id = req.body.beneficio;


    const querySoicitudesFiltroMesAnio = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) = ? AND YEAR(fechafinalsol) = ? AND idbeneficiosol = ?";

    conexion.query(querySoicitudesFiltroMesAnio , [mes, anio, id], (err, result) => {
        if(err) {throw err;}
        else{
            res.send(result);
        }
    })

}


//GRAFICOTORTA

exports.verificacionEntretorta = async (req: Request, res: Response) => {


    const mes = req.body.mesFecha;
    const anio = req.body.anioFecha;
    console.log(mes, "Este es el mes");

    if(mes == null && anio == null || mes == undefined && anio == undefined || mes == "" && anio == "" || anio == null || anio == undefined || anio == ""){
        const mensajeIE = "IE"; //INGRESAR DATOS CORREACTAMENTE
        res.json({message: mensajeIE});
    }
    else if(mes == null || mes == undefined || mes == ""  ){

        const querySolicitudesFiltroAnio = "SELECT * FROM solicitudes WHERE estadosol = 2 AND YEAR(fechafinalsol) = ? ";

        conexion.query(querySolicitudesFiltroAnio, [anio], (err, result) => {
            if(err) {throw err;}
            else{
                const cantidadA = contadorArregloSql(result);
                if(cantidadA > 0){
                    const mensajeSEA = "SEA";
                    res.json({message: mensajeSEA}); //si existen anio
                }
                else{
                    const mensajeNEA = "NEA";
                    res.json({message: mensajeNEA}); //no existen anio
                }
            }
        })

    }
    else{
        const querySoicitudesFiltroMesAnio = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) = ? AND YEAR(fechafinalsol) = ?";

        conexion.query(querySoicitudesFiltroMesAnio, [mes, anio], (err1, result1) =>{
            if(err1){throw err1;}
            else{
                const cantidadA = contadorArregloSql(result1);
                if(cantidadA > 0){
                    const mensajeSEAM = "SEAM";
                    res.json({message: mensajeSEAM}); //si existen anio
                }
                else{
                    const mensajeNEAM = "NEAM";
                    res.json({message: mensajeNEAM}); //no existen anio
                }
            }
        })
    }

}

exports.mostrarEntregasAtorta = async (req:Request, res:Response) => {

    const anio = req.body.anioConsulta;

    const querySolicitudesFiltroAnio = "SELECT * FROM solicitudes WHERE estadosol = 2 AND YEAR(fechafinalsol) = ? ";

    conexion.query(querySolicitudesFiltroAnio, [anio], (err, result) => {
        if(err) {throw err;}
        else{
            res.send(result);
        }
    })

} 
  

exports.mostrarEntregasMAtorta = async (req:Request, res:Response) => {

    const anio = req.body.anioConsulta;
    const mes = req.body.mesConsulta;



    const querySoicitudesFiltroMesAnio = "SELECT * FROM solicitudes WHERE estadosol = 2 AND MONTH(fechafinalsol) = ? AND YEAR(fechafinalsol) = ?";

    conexion.query(querySoicitudesFiltroMesAnio , [mes, anio], (err, result) => {
        if(err) {throw err;}
        else{
            res.send(result);
        }
    })

}