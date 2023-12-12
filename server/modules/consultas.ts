import conexion from "../db/conexion";
import conexiondos from "../db/conexion2";
import { Request, Response } from "express";


//PENDIENTE RESPUESTA


//@ts-ignore
exports.listarConsultasPrincipal = async (req: Request, res: Response) => { //ADMIN PRINCIPAL Y MUNICIPALIDADES

    const municipalidad: string = req.body.muni


    if (municipalidad == "principal") {
        const consultaa: string = "SELECT consultas.idconsulta, consultas.rutconsulta, consultas.estadoconsulta, datamunicipalidad.nombremunicipalidad FROM consultas JOIN datamunicipalidad ON consultas.municipalidadconsulta = datamunicipalidad.valormunicipalidad";
        conexion.query(consultaa, (err11, result11) => {
            if (err11) { throw err11; }
            else {
                res.send(result11);
            }
        })  
    }
    else {
        const consultla: string = "SELECT consultas.idconsulta, consultas.rutconsulta, consultas.estadoconsulta, datamunicipalidad.nombremunicipalidad FROM consultas JOIN datamunicipalidad ON consultas.municipalidadconsulta = datamunicipalidad.valormunicipalidad WHERE municipalidadconsulta = ?";

        console.log(municipalidad, "Valor municipaliad")


        conexiondos.query(consultla, [municipalidad], (err, result) => {
            if (err) { throw err; }
            else {

                res.send(result);


            }
        })


    }



}

exports.crearConsulta = async (req: Request, res: Response) => { //SOLO ADMIN MUNICIPALIDADE4S

    const rutConsulta: string = req.body.rut;
    const municipalidad: string = req.body.muni;
    const estadoConsulta: number = 1;
    const consulta: string = req.body.consulta;

    const agregarConsulta = "INSERT INTO consultas(rutconsulta, municipalidadconsulta, estadoconsulta, fechaI, consulta) VALUES(?,?,?,?,?)";


 


    const hoyA = new Date();
    const fechaHoy = hoyA.getFullYear() + "-" + (hoyA.getMonth() + 1) + "-" + hoyA.getDate();
    //@ts-ignore


    //@ts-ignore
    conexiondos.query(agregarConsulta, [rutConsulta, municipalidad, estadoConsulta, fechaHoy, consulta], (err, result) => {
        if (err) { throw err; }
        else {
            const mensajeCE = "CE";
            res.json({ message: mensajeCE });


        }

    })
    
}


exports.verEstado = async (req: Request, res: Response) => { //AL APRETAR MOD SI REDIRECCIONA A MUESTRA O MODIFICACION

    const idcons = req.body.idconsulta;

    const consulta = "SELECT * FROM consultas WHERE idconsulta = ?";
    conexiondos.query(consulta, [idcons], (err, result) => {
        if (err) { throw err; }
        else {
            const info = result[0];
            const estado = info.estadoconsulta;

            res.json({ estadoc: estado });
        }
    })
}

exports.listarConsultaMod = async (req: Request, res: Response) => { //PARA MODIFICAR O MOSTRAR LAS PENDIENTES

    const idconsulta = req.body.idconsulta;

    const listarConsulta: string = "SELECT * FROM consultas WHERE idconsulta = ?";

    conexion.query(listarConsulta, [idconsulta], (err, result) => {
        if (err) { throw err; }
        else {
            console.log(result[0], "Datos de la Consulta")
            const info = result[0];
            const rut = info.rutconsulta;
            const municipalidad = info.municipalidadconsulta;
            const estadoconsulta = info.estadoconsulta;
            const fechaI = info.fechaI;
            const consulta = info.consulta;
            let nombreEstado = "";
            if (estadoconsulta == 1) {
                nombreEstado = "Pendiente Respuesta"
            }


            res.json({ rutc: rut, munic: municipalidad, estado: estadoconsulta, fechai: fechaI, cons: consulta, nombre: nombreEstado });

        }
    })
}

exports.listarConsultaGen = async (req: Request, res: Response) => { //PARA MOSTRAR COMPLETA
    const idconsulta = req.body.idconsulta;

    console.log(idconsulta, "esta es la id consulta");

    const listarConsulta: string = "SELECT consultas.rutconsulta, consultas.estadoconsulta, consultas.fechaI, consultas.fechaF, consultas.consulta, consultas.respuestaconsulta, datamunicipalidad.nombremunicipalidad FROM consultas JOIN datamunicipalidad ON consultas.municipalidadconsulta = datamunicipalidad.valormunicipalidad WHERE idconsulta = ?";
 

    conexiondos.query(listarConsulta, [idconsulta], (err, result) => {
        if (err) { throw err; }
        else {
            console.log(result[0], "Datos de la Consulta")
            const info = result[0];
            const rut = info.rutconsulta;
            const municipalidad = info.nombremunicipalidad;
            const estadoconsulta = info.estadoconsulta;
            const fechaI = info.fechaI;
            const fechaF = info.fechaF;
            const consulta = info.consulta;
            const respuesta = info.respuestaconsulta;

            res.json({ rutc: rut, munic: municipalidad, estado: estadoconsulta, fechai: fechaI, fechaf: fechaF, cons: consulta, resp: respuesta });

        }
    })
}

exports.modificarCons = async(req: Request, res: Response) => {

    const id = req.body.id;
    const estado = req.body.estado;
    const resp = req.body.respu;


    const hoyA = new Date();
    const fechaHoy = hoyA.getFullYear() + "-" + (hoyA.getMonth() + 1) + "-" + hoyA.getDate();

    const actualizacion : string = "UPDATE consultas SET estadoconsulta = ?, fechaF = ?, respuestaconsulta = ? WHERE idconsulta = ?";

    if(resp == null || resp == "" || resp == undefined){
        const mensajeVacio = "IDR";
        res.json({message: mensajeVacio});
    }
    else{
        //@ts-ignore
        conexiondos.query(actualizacion, [estado, fechaHoy, resp, id], (err, result) => {
            if(err) {throw err;}
            else{
                const mensajeA = "ME";
                res.json({mensajeA});
            }
        })
    }
}