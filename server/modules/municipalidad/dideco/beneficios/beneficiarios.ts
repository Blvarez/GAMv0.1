const { DataSaverOffTwoTone, DataSaverOn } = require("@mui/icons-material");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('pdf');
const dbDidecoGBeneficios = require("../../../bd/dbdidecogbeneficios");
import { Request, Response } from "express";
//@ts-ignore
exports.listarBeneficiariosPersonas = (req: Request, res: Response) => {//MUESTRA LOS BENEFICIARIOS/PERSONA EN UNA LISTA

    const queryListaPersonaBeneficiario = "SELECT beneficiario.rutbeneficiario, beneficiario.porcentajerh, persona.nombres, persona.apellidos, persona.edad, persona.direccion, persona.telefono, persona.correo FROM beneficiario JOIN persona ON beneficiario.rutbeneficiario = persona.rut";

    //@ts-ignore
    dbDidecoGBeneficios.query(queryListaPersonaBeneficiario, (err, result) => {
        if (err) { throw err; }
        else {

            res.send(result);
        } 
    })
}

//@ts-ignore
exports.listarBeneficiarios = (req:Request, res:Response) => {

    console.log("Estoy aca listando beneficiarios")

    const queryListarBeneficiario = "SELECT * FROM beneficiario";
    //@ts-ignore
    dbDidecoGBeneficios.query(queryListarBeneficiario, (err, result) => {

        if (err) { throw err; }

        else {
            res.send(result);
        }
    })

}


exports.agregarBeneficiario = (req:Request, res:Response) => {//AGREGA UN BENEFICIARIO


    const rutBeneficiario = req.body.rutAgr;
    const nombresBeneficiario = req.body.nombresAgr;
    const apellidosBeneficiario = req.body.apellidosAgr;
    const edadBeneficiario = req.body.edadAgr;
    const direccionBeneficiario = req.body.direccionAgr;
    const telefonoBeneficiario = req.body.telefonoAgr;
    const correoBeneficiario = req.body.correoAgr;
    const porcentajeRH = req.body.porcentajeRHAgr;


    const rut = req.body.rutpdf;
    const archivo = req.body.archivopdf;
    const nombre = req.body.nombrepdf;
    const tipo = req.body.tipopdf;


    const verificacionPersona = "SELECT * FROM persona WHERE rut = ?";
    const verificarBeneficiario = "SELECT * FROM beneficiario WHERE rutbeneficiario = ?";

    const queryAgregarPDF = "INSERT INTO pdfcartola (rutbeneficiariopdf, nombrepdf, typepdf, archivo) VALUES (?, ?, ?, ?)";
    const agregarBeneficiario = "INSERT INTO beneficiario(rutbeneficiario, porcentajerh) VALUES (?,?)";
    const agregarPersona = "INSERT INTO persona(rut, nombres, apellidos, direccion, edad, telefono, correo) VALUES (?,?,?,?,?,?,?)";

    //@ts-ignore
    dbDidecoGBeneficios.query(verificacionPersona, [rutBeneficiario], (err, result) => {
        if (err) { throw err; }

        var key, count = 0;
        for (key in result) {
            if (result.hasOwnProperty(key)) { //VERIFICO SI OBTUVO RESULTADOS
                count++;
            }
        }

        if (count > 0) {
            //@ts-ignore
            dbDidecoGBeneficios.query(verificarBeneficiario, [rutBeneficiario], (err1, result1) => {

                if (err1) { throw err1; }

                var key1, count1 = 0;
                for (key1 in result1) {
                    if (result1.hasOwnProperty(key1)) { //VERIFICO SI OBTUVO RESULTADOS
                        count1++;
                    }
                }

                if (count1 > 0) {
                    const mensajeBeneficiarioYaExistente = "BYE";
                    res.json({ message: mensajeBeneficiarioYaExistente });
                }

                if (count1 == 0) {
                    //@ts-ignore
                    dbDidecoGBeneficios.query(agregarBeneficiario, [rutBeneficiario, porcentajeRH], (err2, result2) => {

                        if (err2) { throw err2; }
                        //@ts-ignore
                        dbDidecoGBeneficios.query(queryAgregarPDF, [rut, nombre, tipo, Buffer.from(archivo)], (err8, result8) => {

                            if (err8) { throw err8; }


                            const mensajeBeneficiarioCreado = "BC";
                            res.json({ message: mensajeBeneficiarioCreado });

                            console.log("PDF agregado");

                        })

                    })
                }
            })
        }

        if (count == 0) {

            dbDidecoGBeneficios.query(agregarPersona, [rutBeneficiario, nombresBeneficiario, apellidosBeneficiario, direccionBeneficiario, edadBeneficiario, telefonoBeneficiario, correoBeneficiario], (err3, result3) => {

                if (err3) { throw err3; }
                //@ts-ignore
                dbDidecoGBeneficios.query(agregarBeneficiario, [rutBeneficiario, porcentajeRH], (err4, result4) => {

                    if (err4) { throw err4; }
                    //@ts-ignore
                    dbDidecoGBeneficios.query(queryAgregarPDF, [rut, nombre, tipo, Buffer.from(archivo)], (err9, result9) => {

                        if (err9) { throw err9; }

                        const mensajeBeneficiarioCreado = "BC";
                        res.json({ message: mensajeBeneficiarioCreado });

                        console.log("PDF agregado");
                    })



                })
            })
        }
    })
}


exports.listarModificacionBeneficiario = (req:Request, res: Response) => { //LISTO LOS VALORES DE FORMA UNITARIA PARA PODER MOSTRARLOS EN EL MODAL

    const rut = req.body.rut;

    const queryConsultarDatosBeneficiario = "SELECT * FROM beneficiario WHERE rutbeneficiario = ?";
    const queryConsultarDatosPersonas = "SELECT * FROM persona WHERE rut = ?";
    const queryConsultarInfoPdf = "SELECT * FROM pdfcartola WHERE rutbeneficiariopdf = ?";
    //@ts-ignore
    dbDidecoGBeneficios.query(queryConsultarDatosBeneficiario, [rut], (err, result) => {

        if (err) { throw err; }

        const porcentajerh = result[0].porcentajerh;
        //@ts-ignore
        dbDidecoGBeneficios.query(queryConsultarDatosPersonas, [rut], (err1, result1) => {

            if (err1) { throw err1; }

            const nombres = result1[0].nombres;
            const apellidos = result1[0].apellidos;
            const edad = result1[0].edad;
            const direccion = result1[0].direccion;
            const telefono = result1[0].telefono;
            const correo = result1[0].correo;
            //@ts-ignore
            dbDidecoGBeneficios.query(queryConsultarInfoPdf, [rut], (err2, result2) => {

                if (err2) { throw err2; }

                const nombrepdf = result2[0].nombrepdf;
                const tipopdf = result2[0].typepdf;
                const archivopdf = result2[0].archivo;

                res.json({ nombress: nombres, apellidoss: apellidos, edadd: edad, direccionn: direccion, telefonoo: telefono, correoo: correo, porcentaje: porcentajerh, nombreArchivo: nombrepdf, tipopdff: tipopdf, archivopdff: archivopdf });

            })

        })
    })
}


exports.eliminarBeneficiario = (req:Request, res:Response) => {

    const rutBeneficiario = req.body.rut;

    const queryEliminarBeneficiario = "DELETE FROM beneficiario WHERE rutbeneficiario = ?";
    const queryEliminarPersona = "DELETE FROM persona WHERE rut = ?";
    const queryEliminarPdf = "DELETE FROM pdfcartola WHERE rutbeneficiariopdf = ?";

    const queryConsultarSolicitudes = "SELECT * FROM solicitud WHERE rutbeneficiariosol = ?";

    //@ts-ignore
    dbDidecoGBeneficios.query(queryConsultarSolicitudes, [rutBeneficiario], (err2, result2) => {

        if(err2) {throw err2;}

        var key2, count2 = 0;
        for (key2 in result2) {
            if (result2.hasOwnProperty(key2)) {
                count2++;
            }
        }


        if(count2 == 0){
            //@ts-ignore
            dbDidecoGBeneficios.query(queryEliminarPdf, [rutBeneficiario], (err0, result0) => {

                if (err0) { throw err0; }
                
                //@ts-ignore
                dbDidecoGBeneficios.query(queryEliminarBeneficiario, [rutBeneficiario], (err, result) => {
                    
                    if (err) { throw err; }
                    //@ts-ignore
                    dbDidecoGBeneficios.query(queryEliminarPersona, [rutBeneficiario], (err1, result1) => {
                        
                        if (err1) { throw err1; }
        
                        const mensajeEliminadoConExito = "ECE";
                        res.json({ message: mensajeEliminadoConExito });
                    })
                })
        
            })

        }

        if(count2 > 0) {

            const mensajeNoEliminarTieneSolicitudes = "NES";
            res.json({ message: mensajeNoEliminarTieneSolicitudes});
        }



    })

    
}


exports.modificarBeneficiario = (req:Request, res:Response) => {

    const rutBeneficiario = req.body.rutBeneficiarioMod;

    const nombresBeneficiario = req.body.nombresMod;
    const apellidosBeneficiario = req.body.apellidosMod;
    const edadBeneficiario = req.body.edadMod;
    const direccionBeneficiario = req.body.direccionMod;
    const telefonoBeneficiario = req.body.telefonoMod;
    const correoBeneficiario = req.body.correoMod;

    const porcentajeRH = req.body.porcentaje;

    const queryModificacionBeneficiario = "UPDATE beneficiario SET porcentajerh = ? WHERE rutbeneficiario = ?";
    const queryModificacionPersona = "UPDATE persona SET nombres = ?, apellidos = ?, edad = ?, direccion = ?, telefono = ?, correo = ? WHERE rut = ?";

    dbDidecoGBeneficios.query(queryModificacionPersona, [nombresBeneficiario, apellidosBeneficiario, edadBeneficiario, direccionBeneficiario, telefonoBeneficiario, correoBeneficiario, rutBeneficiario], (err, result) => {

        if (err) { throw err; }
        //@ts-ignore
        dbDidecoGBeneficios.query(queryModificacionBeneficiario, [porcentajeRH, rutBeneficiario], (err1, result1) => {

            if (err1) { throw err1; }

            const mensajeExitoModificacionBeneficiario = "EMB";
            res.json({ message: mensajeExitoModificacionBeneficiario });
            next();

        })
    })


}


exports.modificarPdfBeneficiario = (req:Request, res:Response) => {

    const rutBeneficiario = req.body.rutBeneficiarioMod;

    const nombrePdf = req.body.nombrepdf;
    const typePdf = req.body.typepdf;
    const archivo = req.body.archivopdf;

    console.log(nombrePdf);
    console.log(typePdf);
    console.log(archivo);

    const queryModificacionPdf = "UPDATE pdfcartola SET nombrepdf = ?, typepdf = ?, archivo = ? WHERE rutbeneficiariopdf = ?";
    //@ts-ignore
    dbDidecoGBeneficios.query(queryModificacionPdf, [nombrePdf, typePdf, Buffer.from(archivo), rutBeneficiario], (err2, result2) => {

        if (err2) { throw err2; }

        const mensajeExitoModificacionBeneficiario = "EMB";
        res.json({ message: mensajeExitoModificacionBeneficiario });
    })

}



exports.infoPdf = (req:Request, res:Response) => {

    console.log("estoy aca en la parte del servidor")

    const rut = req.body.rut;

    const queryLeerPdf = "SELECT * FROM pdfcartola WHERE rutbeneficiariopdf = ?";
    //@ts-ignore
    dbDidecoGBeneficios.query(queryLeerPdf, [rut], (err, result) => {

        if (err) { throw err; }

        const pdf = result[0].archivo;

        res.send(pdf);
    })
}


exports.verificarBeneficiario = (req:Request, res:Response) => {

    console.log("entro aca al servidor verificacion beneficiario")

    const rut = req.body.rutbeneficiario;

    const queryVerificacion = "SELECT * FROM beneficiario WHERE rutbeneficiario = ?";
    //@ts-ignore
    dbDidecoGBeneficios.query(queryVerificacion, [rut], (err, result) => {

        if (err) { throw err; }

        var key, count = 0;
        for (key in result) {
            if (result.hasOwnProperty(key)) { //VERIFICO SI OBTUVO RESULTADOS
                count++;
            }
        }

        console.log(count)

        if (count == 0) {
            const mensajeBeneficiarioNoExiste = "BEARINE";
            res.json({ message: mensajeBeneficiarioNoExiste });
        }

        if (count > 0) {
            const imprimirBeneficiario = "IBARIO";
            res.json({ message: imprimirBeneficiario });
        }
    })
}




