//@ts-ignore
import conexion from "../../../../db/conexion";
import { Request, Response } from "express";


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

exports.creacionBeneficios = async (req: Request, res: Response) => {

    const tipoBeneficio: number = req.body.tipobeneficio;
    const descripcionBeneficio: string = req.body.descripcionbeneficio;
    const estadoBeneficio: string = req.body.estadobeneficio;
    const stockBeneficio: number = req.body.stockbeneficio;
    const cantidadAnual: number = req.body.cantidadanual;

    const fechaNueva = informacionFecha();

    const queryBusquedaTipoBeneficio = "SELECT * FROM tipobeneficio WHERE idtipobeneficio = ?";
    const queryCreacionBeneficio = "INSERT INTO beneficio(idbeneficio, tipobeneficiobeneficio, descripcionbenficio, estadoobtencion, stockbeneficio, cantidadanualentrega) VALUES(?,?,?,?,?,?);"

    conexion.query(queryBusquedaTipoBeneficio, [tipoBeneficio], (err1, result1) => {
        if(err1){throw err1;}
        else{
            const datos = result1[0];
            const tipotiempobeneficio = datos.tipotiempobeneficio;
            const inicialestipobeneficio = datos.inicialestipobeneficio;
          
            if(tipotiempobeneficio == 1){
                const idBeneficio : string= inicialestipobeneficio+"M"+fechaNueva.Mes+fechaNueva.Anio;
                //@ts-ignore
                conexion.query(queryCreacionBeneficio, [idBeneficio, tipoBeneficio, descripcionBeneficio, estadoBeneficio, stockBeneficio, cantidadAnual], (err2, result2) => {
                    if(err2){throw err2;}
                    else {
                        res.send("Creado el beneficio Mensual con exito");
                        console.log("Creacion del Beneficio Mensual");
                    }
                })
            }

            else if(tipotiempobeneficio == 2){
                const idBeneficio : string= inicialestipobeneficio+"S"+fechaNueva.Semestre+fechaNueva.Anio;
                //@ts-ignore
                conexion.query(queryCreacionBeneficio, [idBeneficio, tipoBeneficio, descripcionBeneficio, estadoBeneficio, stockBeneficio, cantidadAnual], (err2, result2) => {
                    if(err2){throw err2;}
                    else {
                        res.send("Creado el beneficio Semestral con exito");
                        console.log("Creacion del beneficio semestral");
                    }
                })
            }

            else if(tipotiempobeneficio == 3){
                const idBeneficio : string= inicialestipobeneficio+"T"+fechaNueva.Trimestre+fechaNueva.Anio;
                //@ts-ignore
                conexion.query(queryCreacionBeneficio, [idBeneficio, tipoBeneficio, descripcionBeneficio, estadoBeneficio, stockBeneficio, cantidadAnual], (err2, result2) => {
                    if(err2){throw err2;}
                    else {
                        res.send("Creado el beneficio Trimestral con exito");
                        console.log("Creacio del beneficio trimestral");
                    }
                })
            }
        }
    })
}