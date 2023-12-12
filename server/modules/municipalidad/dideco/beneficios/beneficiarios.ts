//@ts-ignore
const { DataSaverOffTwoTone, DataSaverOn } = require("@mui/icons-material");
const multer = require("multer");
const storage = multer.memoryStorage();
//@ts-ignore
const upload = multer({ storage: storage }).single('pdf');
import conexion from "../../../../db/conexion";
import { Request, Response } from "express";





//@ts-ignore
exports.listarBeneficiariosPersonas = (req: Request, res: Response) => {//MUESTRA LOS BENEFICIARIOS/PERSONA EN UNA LISTA

    const queryListaPersonaBeneficiario = "SELECT beneficiario.rutbeneficiario, beneficiario.porcentajerhbeneficiario, persona.nombrecompleto, persona.edadpersona, persona.direccionpersona, persona.telefonopersona, persona.correopersona FROM beneficiario JOIN persona ON beneficiario.rutbeneficiario = persona.rutpersona";

    //@ts-ignore
    conexion.query(queryListaPersonaBeneficiario, (err, result) => {
        if (err) { throw err; }
        else {
            console.log(result);
            res.send(result);
        }
    })
}



//@ts-ignore
/* exports.listarBeneficiarios = (req:Request, res:Response) => {

    console.log("Estoy aca listando beneficiarios")

    const queryListarBeneficiario = "SELECT * FROM beneficiario";
    //@ts-ignore
    conexion.query(queryListarBeneficiario, (err, result) => { 

        if (err) { throw err; }

        else {   
            res.send(result);
        }
    })

} */


exports.agregarBeneficiario = (req: Request, res: Response) => {//AGREGA UN BENEFICIARIO


    const rutBeneficiario = req.body.rut;
    const nombresBeneficiario = req.body.nombreper;
    const edadBeneficiario = req.body.edadper;
    const direccionBeneficiario = req.body.direccionper;
    const telefonoBeneficiario = req.body.telefonoper;
    const correoBeneficiario = req.body.correoper;
    const porcentajeRH = req.body.porcentajepdf;


    console.log(rutBeneficiario, nombresBeneficiario, edadBeneficiario, direccionBeneficiario, telefonoBeneficiario, correoBeneficiario, porcentajeRH), "AQUIIIII";

    const rut = req.body.rutpdf;
    const archivo = req.body.archivopdf;
    const nombre = req.body.nombrepdf;
    const tipo = req.body.tipopdf;
    console.log(archivo);


    const verificacionPersona = "SELECT * FROM persona WHERE rutpersona = ?";
    const verificarBeneficiario = "SELECT * FROM beneficiario WHERE rutbeneficiario = ?";

    const queryAgregarPDF = "INSERT INTO beneficiario (rutbeneficiario, porcentajerhbeneficiario, nombrepdf, typepdf, archivopdf) VALUES (?, ?, ?, ?, ?)";

    const agregarPersona = "INSERT INTO persona(rutpersona, nombrecompleto, edadpersona, direccionpersona, telefonopersona, correopersona) VALUES (?, ?, ?, ?, ?, ?)";


    const validarCorreo = (inputCorreo: string) => {
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexCorreo.test(inputCorreo);
    };

    const validarRut = (inputRut: string) => {
        const rutSinFormato = inputRut.replace(/\./g, '');
        const regexRut = /^(\d{1,9}-[\dkK])$/;
        return regexRut.test(rutSinFormato);
    };


    if (validarRut(rut) == false || validarCorreo(correoBeneficiario) == false || validarRut(rutBeneficiario) == false) {
        const mensajeError = "FECB";
        res.json({message: mensajeError});
    }
    else {
        //@ts-ignore
        conexion.query(verificacionPersona, [rutBeneficiario], (err, result) => {
            if (err) { throw err; }

            var key, count = 0;
            for (key in result) {
                if (result.hasOwnProperty(key)) { //VERIFICO SI OBTUVO RESULTADOS
                    count++;
                }
            }

            if (count > 0) {
                //@ts-ignore
                conexion.query(verificarBeneficiario, [rutBeneficiario], (err1, result1) => {

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

                    else if (count1 == 0) {
                        //@ts-ignore
                        conexion.query(queryAgregarPDF, [rutBeneficiario, porcentajeRH, nombre, tipo, Buffer.from(archivo)], (err2, result2) => {


                            if (err2) { throw err2; }

                            const mensajeBeneficiarioCreado = "BC";
                            res.json({ message: mensajeBeneficiarioCreado });

                            console.log("PDF agregado");

                        })
                    }

                })
            }
            else if (count == 0) {
                //@ts-ignore
                conexion.query(agregarPersona, [rut, nombresBeneficiario, edadBeneficiario, direccionBeneficiario, telefonoBeneficiario, correoBeneficiario], (err3, result3) => {

                    if (err3) { throw err3; }
                    //@ts-ignore
                    conexion.query(queryAgregarPDF, [rutBeneficiario, porcentajeRH, nombre, tipo, Buffer.from(archivo)], (err2, result2) => {


                        if (err2) { throw err2; }

                        const mensajeBeneficiarioCreado = "BC";
                        res.json({ message: mensajeBeneficiarioCreado });

                        console.log("PDF agregado");

                    })
                })
            }
        })
    }


}







exports.listarModificacionBeneficiario = (req: Request, res: Response) => { //LISTO LOS VALORES DE FORMA UNITARIA PARA PODER MOSTRARLOS EN EL MODAL

    const rut = req.body.rut;

    const queryConsultarDatosBeneficiario = "SELECT * FROM beneficiario WHERE rutbeneficiario = ?";
    const queryConsultarDatosPersonas = "SELECT * FROM persona WHERE rutpersona = ?";

    //@ts-ignore
    conexion.query(queryConsultarDatosBeneficiario, [rut], (err, result) => {

        if (err) { throw err; }

        const porcentajerh = result[0].porcentajerhbeneficiario;
        const nombrepdf = result[0].nombrepdf;
        const tipopdf = result[0].typepdf;
        const archivopdf = result[0].archivopdf;

        //@ts-ignore
        conexion.query(queryConsultarDatosPersonas, [rut], (err1, result1) => {

            if (err1) { throw err1; }

            const nombres = result1[0].nombrecompleto;
            const edad = result1[0].edadpersona;
            const direccion = result1[0].direccionpersona;
            const telefono = result1[0].telefonopersona;
            const correo = result1[0].correopersona;

            res.json({ nombress: nombres, edadd: edad, direccionn: direccion, telefonoo: telefono, correoo: correo, porcentaje: porcentajerh, nombreArchivo: nombrepdf, tipopdff: tipopdf, archivopdff: archivopdf });


        })
    })
}



exports.eliminarBeneficiario = (req: Request, res: Response) => {

    const rutBeneficiario = req.body.rutBeneficiario;

    const queryEliminarBeneficiario = "DELETE FROM beneficiario WHERE rutbeneficiario = ?";
    const queryEliminarPersona = "DELETE FROM persona WHERE rutpersona = ?";

    const queryConsultarSolicitudes = "SELECT * FROM solicitudes WHERE rutbeneficiariosol = ?";

    //@ts-ignore
    conexion.query(queryConsultarSolicitudes, [rutBeneficiario], (err2, result2) => {

        if (err2) { throw err2; }

        var key2, count2 = 0;
        for (key2 in result2) {
            if (result2.hasOwnProperty(key2)) {
                count2++;
            }
        }


        if (count2 == 0) {
            //@ts-ignore
            conexion.query(queryEliminarBeneficiario, [rutBeneficiario], (err, result) => {

                if (err) { throw err; }
                //@ts-ignore
                conexion.query(queryEliminarPersona, [rutBeneficiario], (err1, result1) => {

                    if (err1) { throw err1; }

                    const mensajeEliminadoConExito = "ECE";
                    res.json({ message: mensajeEliminadoConExito });
                })
            })


        }

        if (count2 > 0) {

            const mensajeNoEliminarTieneSolicitudes = "NES";
            res.json({ message: mensajeNoEliminarTieneSolicitudes });
        }



    })


}
//ELIMNACION PENDIENTEEEEEEE




exports.modificarBeneficiario = (req: Request, res: Response) => {

    const rutBeneficiario = req.body.rutBeneficiarioMod;

    const nombresBeneficiario = req.body.nombresMod;
    const edadBeneficiario = req.body.edadMod;
    const direccionBeneficiario = req.body.direccionMod;
    const telefonoBeneficiario = req.body.telefonoMod;
    const correoBeneficiario = req.body.correoMod;

    const porcentajeRH = req.body.porcentaje;

    const queryModificacionBeneficiario = "UPDATE beneficiario SET porcentajerhbeneficiario = ? WHERE rutbeneficiario = ?";
    const queryModificacionPersona = "UPDATE persona SET nombrecompleto = ?, edadpersona = ?, direccionpersona = ?, telefonopersona = ?, correopersona = ? WHERE rutpersona = ?";

    //@ts-ignore
    conexion.query(queryModificacionPersona, [nombresBeneficiario, edadBeneficiario, direccionBeneficiario, telefonoBeneficiario, correoBeneficiario, rutBeneficiario], (err, result) => {

        if (err) { throw err; }

        //@ts-ignore
        conexion.query(queryModificacionBeneficiario, [porcentajeRH, rutBeneficiario], (err1, result1) => {

            if (err1) { throw err1; }

            const mensajeExitoModificacionBeneficiario = "EMB";
            res.json({ message: mensajeExitoModificacionBeneficiario });

        })
    })


}


exports.modificarPdfBeneficiario = (req: Request, res: Response) => {

    const rutBeneficiario = req.body.rutBeneficiarioMod;

    const nombrePdf = req.body.nombrepdf;
    const typePdf = req.body.typepdf;
    const archivo = req.body.archivopdf;

    console.log(nombrePdf);
    console.log(typePdf);
    console.log(archivo);

    const queryModificacionPdf = "UPDATE beneficiario SET nombrepdf = ?, typepdf = ?, archivopdf = ? WHERE rutbeneficiario = ?";
    //@ts-ignore
    conexion.query(queryModificacionPdf, [nombrePdf, typePdf, Buffer.from(archivo), rutBeneficiario], (err2, result2) => {

        if (err2) { throw err2; }

        const mensajeExitoModificacionBeneficiario = "EMB";
        res.json({ message: mensajeExitoModificacionBeneficiario });
    })

}



exports.infoPdf = (req: Request, res: Response) => {

    console.log("estoy aca en la parte del servidor")

    const rut = req.body.rut;

    const queryLeerPdf = "SELECT * FROM beneficiario WHERE rutbeneficiario = ?";
    //@ts-ignore
    conexion.query(queryLeerPdf, [rut], (err, result) => {

        if (err) { throw err; }

        const pdf = result[0].archivopdf

        res.send(pdf);
    })
}





exports.verificarBeneficiario = (req: Request, res: Response) => {

    console.log("entro aca al servidor verificacion beneficiario")

    const rut = req.body.rutbeneficiario;

    const queryVerificacion = "SELECT * FROM beneficiario WHERE rutbeneficiario = ?";
    //@ts-ignore
    conexion.query(queryVerificacion, [rut], (err, result) => {

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




