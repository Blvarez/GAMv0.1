//@ts-ignore
import conexion from "../../../../db/conexion";
import { Request, Response } from "express";


function contadorArregloSql(arreglo: any) {

    let contador: number = 0;

    for (let clave in arreglo) {
        if (arreglo.hasOwnProperty(clave)) {
            contador++;
        }
    }

    return contador;

}


function informacionFecha() {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1;
    const anioActual = fechaActual.getFullYear();
    const anioActualS = anioActual.toString();
    const finalAnio = anioActualS.slice(2);
    let semestre: number = 1;
    let trimestre: number = 1;
    let mensual: number = mesActual;

    if (1 <= mesActual && mesActual <= 6) {
        semestre = 1;

        if (1 <= mesActual && mesActual <= 3) {
            trimestre = 1;
        }
        else if (4 <= mesActual && mesActual <= 6) {
            trimestre = 2;
        }

    }
    else if (7 <= mesActual && mesActual <= 12) {
        semestre = 2;

        if (7 <= mesActual && mesActual <= 9) {
            trimestre = 3;
        }
        else if (10 <= mesActual && mesActual <= 12) {
            trimestre = 4;
        }
    }

    const informacionFecha = { "Mes": mensual, "Semestre": semestre, "Trimestre": trimestre, "Anio": finalAnio };
    return informacionFecha;
}

//@ts-ignore
exports.obtencionDatosBeneficios = async (req: Request, res: Response) => {
    const obtencioDatosBeneficios = "SELECT * FROM beneficio";

    conexion.query(obtencioDatosBeneficios, (err, resultadoBeneficios) => {
        if (err) { throw err; }
        else {
            res.send(resultadoBeneficios);
        }
    })
}

//@ts-ignore
exports.obtencionTiposBeneficios = async (req: Request, res: Response) => {
    const obtencioTiposBeneficios = "SELECT * FROM tipobeneficio";

    conexion.query(obtencioTiposBeneficios, (err, resultadoTiposBeneficios) => {
        if (err) { throw err; }
        else {
            res.send(resultadoTiposBeneficios);
        }
    })
}



exports.creacionBeneficios = async (req: Request, res: Response) => {

    console.log("Entrando a la funcion creacion de los beneficios")


    const tipoBeneficio: number = req.body.idtipobeneficio;
    const estadoBeneficio: string = req.body.estadobeneficio;
    const stockBeneficio: number = req.body.stockbeneficio;
    console.log(estadoBeneficio);


    const queryBusquedaTipoBeneficio = "SELECT * FROM tipobeneficio WHERE idtipobeneficio = ?";

    const queryVerificacionExistencias = "SELECT * FROM beneficio WHERE idbeneficio = ?";

    const queryIngresoBeneficios = "INSERT INTO beneficio(idbeneficio, idtipobeneficio, estadobeneficio, stockbeneficio) VALUES(?,?,?,?);"

    if (stockBeneficio <= 0 || stockBeneficio == undefined || stockBeneficio == null) {

        const mensaje = "EID";
        res.json({ message: mensaje });
    }

    else {
        conexion.query(queryBusquedaTipoBeneficio, [tipoBeneficio], (err, resultadoTipoBeneficio) => {
            if (err) { throw err; }
            else {
                const datosTiposBenefcios = resultadoTipoBeneficio[0];
                if (tipoBeneficio == 1 || tipoBeneficio == 2) {
                    const fecha = informacionFecha();
                    const anio = fecha.Anio;
                    const idBeneficio = datosTiposBenefcios.incialestipobeneficio + anio + "T1";

                    conexion.query(queryVerificacionExistencias, [idBeneficio], (err4, cantidadBeneficios) => {
                        if (err4) { throw err4; }
                        else {
                            const cantidad: number = contadorArregloSql(cantidadBeneficios);
                            if (cantidad == 0) {
                                //@ts-ignore
                                conexion.query(queryIngresoBeneficios, [idBeneficio, tipoBeneficio, estadoBeneficio, stockBeneficio], (err2, resultadoFinal) => {
                                    if (err2) { throw err2; }
                                    else {
                                        console.log("Creacio Completa del Beneficio")
                                        const mensaje: string = "CBE" //CREACION BENEFICIO EXITOSA
                                        res.json({ message: mensaje, idBeneficioo: idBeneficio });
                                    }
                                })
                            }
                            else {
                                const mensaje: string = "CBYE" //CREACION BENEFICIO YA EXISTE
                                res.json({ message: mensaje, idBeneficioo: idBeneficio });
                            }
                        }
                    })


                }

                else {
                    const fecha = informacionFecha();
                    const anio = fecha.Anio;
                    const idBeneficio = datosTiposBenefcios.incialestipobeneficio + anio + "T2";

                    conexion.query(queryVerificacionExistencias, [idBeneficio], (err4, cantidadBeneficios) => {
                        if (err4) { throw err4; }
                        else {
                            const cantidad: number = contadorArregloSql(cantidadBeneficios);
                            if (cantidad == 0) {
                                //@ts-ignore
                                conexion.query(queryIngresoBeneficios, [idBeneficio, tipoBeneficio, estadoBeneficio, stockBeneficio], (err2, resultadoFinal) => {
                                    if (err2) { throw err2; }
                                    else {
                                        console.log("Creacio Completa del Beneficio")
                                        const mensaje: string = "CBE" //CREACION BENEFICIO EXITOSA
                                        res.json({ message: mensaje, idBeneficioo: idBeneficio });
                                    }
                                })
                            }
                            else {
                                const mensaje: string = "CBYE" //CREACION BENEFICIO YA EXISTE
                                res.json({ message: mensaje, idBeneficioo: idBeneficio });
                            }
                        }
                    })
                }


            }
        })
    }



}


exports.eliminacionBeneficio = async (req: Request, res: Response) => {

    const idbeneficio: string = req.body.idbeneficio;

    const queryEliminacionBeneficio: string = "DELETE FROM beneficio WHERE idbeneficio = ?";
    const verificacionBeneficio: string = "SELECT * FROM beneficio WHERE idbeneficio = ?";

    const verificacionSolicitud: string = "SELECT * FROM solicitudes WHERE idbeneficiosol = ?";





    conexion.query(verificacionBeneficio, idbeneficio, (err1, verificacion) => {
        if (err1) { throw err1; }
        else {
            const cantidadBeneficio = contadorArregloSql(verificacion);

            if (cantidadBeneficio > 0) {

                conexion.query(verificacionSolicitud, idbeneficio, (err3, verificacionSoli) => {
                    if (err3) { throw err3; }
                    else {
                        const cantidadSolicitudesConBeneficio = contadorArregloSql(verificacionSoli);

                        if (cantidadSolicitudesConBeneficio > 0) {
                            console.log("El Beneficio ya cuenta con unas solicitudes ya asimiladas, ver eliminar esas solicitudes o no se podra eliminar;")
                            const msjj: string = "FBE"; //BENEFICIO YA TIENE UNA SOLICITUD
                            res.json({ message: msjj })
                        }

                        if (cantidadSolicitudesConBeneficio == 0) {
                            //@ts-ignore
                            conexion.query(queryEliminacionBeneficio, idbeneficio, (err2, eliminacion) => {
                                if (err2) { throw err2; }
                                else {
                                    console.log("Eliminacion Exitosa de Beneficio, mandar algo al Front-End");
                                    const msj: string = "BEE"; //BENEFICIO ELIMINADO EXITOSAMENTE
                                    res.json({ message: msj });
                                }
                            })
                        }
                    }
                })


            }

            else {
                console.log("Id de Beneficio no existe reingresar una correcta, mandar alerta al front");
                const msjjj: string = "NE"; //NO EXISTE EL BENEFICIO
                res.json({ message: msjjj });
            }
        }
    })
}


//@ts-ignore
exports.modificiarBeneficio = async (req: Request, res: Response) => {
    const stockBeneficio = req.body.stockbeneficio;
    const idBeneficio = req.body.idbene;
    /*     const rutusuario = req.body.rutususario;            
     */
    const queryVerificacionSinSolicitudes = "SELECT * FROM solicitudes WHERE idbeneficiosol = ?;"
    const queryActualizarStockBeneficio = "UPDATE beneficio  SET stockbeneficio = ? WHERE idbeneficio = ?";
    /*     const modHistorial = "INSERT INTO historial(accion, idaccionada, tipo, rutusuarioaccion, observacionaccion) VALUES(?,?,?,?,?);"     IMPLEMENTAR LA ACCION DE GUARDAR EN EL HISTORIAL
     */
    conexion.query(queryVerificacionSinSolicitudes, [idBeneficio], (err1, cantidadSolicitudes) => {
        if (err1) { throw err1; }
        else {
            const cantidadSoli = contadorArregloSql(cantidadSolicitudes);
            if (cantidadSoli > 0) {
                console.log("No se puede eliminar porque ya a ha sido enlazada a una Solicitud");
            }
            else {
                //@ts-ignore
                conexion.query(queryActualizarStockBeneficio, [stockBeneficio, idBeneficio], (err2, resultadoActua) => {
                    if (err2) { throw err2; }
                    else {
                        const msj: string = "BAE"; //BENEFICIO ACTUALIZADO EXITOSAMENTE
                        res.json({ message: msj });
                    }
                })
            }
        }
    })

}

//@ts-ignore  
exports.listarModificacionBeneficio = async (req: Request, res: Response) => {

    const idBeneficio: string = req.body.idbene;

    const consultarBeneficio :string = "SELECT beneficio.estadobeneficio, beneficio.stockbeneficio, tipobeneficio.nombretipobeneficio, tipobeneficio.descripciontipobeneficio, tipobeneficio.cantidadAnualPersona FROM beneficio JOIN tipobeneficio ON beneficio.idtipobeneficio =  tipobeneficio.idtipobeneficio WHERE beneficio.idbeneficio = ?";

    conexion.query(consultarBeneficio, [idBeneficio], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al consultar el beneficio' });
            return;
        }

        console.log(result);
        if (result.length === 0) {
            res.status(404).json({ error: 'Beneficio no encontrado' });
            return;
        }

        const beneficio = result[0];
        const stock = beneficio.stockbeneficio;
        const estadoBeneficio = beneficio.estadobeneficio;
        let nombreEstado = '';

        if (estadoBeneficio == 1) {
            nombreEstado = 'Por Postulacion';
        } else if (estadoBeneficio == 2) {
            nombreEstado = 'Por Entrega Inmediata';
        }

        const nombreTB = beneficio.nombretipobeneficio;
        const descripcionTB = beneficio.descripciontipobeneficio;
        const cantidadPorPersona = beneficio.cantidadAnualPersona;

        let nombreCantidad = '';

        if (cantidadPorPersona == 3) {
            nombreCantidad = 'Cuatrimestral';
        } else if (cantidadPorPersona == 12) {
            nombreCantidad = 'Mensual';
        }

        res.json({
            nombreTipoBeneficio: nombreTB,
            descripcionTipoBeneficio: descripcionTB,
            stockBeneficio: stock,
            cantidadA: nombreCantidad,
            estadoBeneObtencion: nombreEstado,
        });
    });

}
 