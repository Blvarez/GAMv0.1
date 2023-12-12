import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import RespuestaModificacionBeneficiario from "./respuestaModificacionBeneficiario";


interface Props {
    estadoModalBeneficiarioMod: boolean,
    cambioEstadoModalBeneficiarioMod: (nuevoEstado: boolean) => void,
    rutMod: any,
    lector: any
}

//@ts-ignore
export default function VentanaModBeneficiario({ estadoModalBeneficiarioMod, cambioEstadoModalBeneficiarioMod, rutMod, lector }: Props) {

    const rutt = rutMod;



    const [nombresBeneficiarioAnteriorMod, setNombresBeneficiarioAnteriorMod] = useState<string>();
    const [edadBeneficiarioAnteriorMod, setEdadBeneficiarioAnteriorMod] = useState<number>();
    const [direccionBeneficiarioAnteriorMod, setDireccionBeneficiarioAnteriorMod] = useState<string>();
    const [telefonoBeneficiarioAnteriorMod, setTelefonoBeneficiarioAnteriorMod] = useState<number>();
    const [correoBeneficiarioAnteriorMod, setCorreoBeneficiarioAnteriorMod] = useState<string>();

    const [porcentajeBeneficiarioAnteriorMod, setPorcentajeBeneficiarioAnteriorMod] = useState<number>();

    const [nombrePdfCartolaAnteriorMod, setNombrePdfCartolaBeneficiarioAnteriorMod] = useState();

    const [nombrePdfNuevoMod, setNombrePdfNuevoMod] = useState();
    const [tipoPdfNuevoMod, setTipoPdfNuevoMod] = useState();
    const [archivoPdfNuevoMod, setArchivoPdfNuevoMod] = useState<Blob>();

    const [ventanaMod, setVentanaMod] = useState(false);
    const [error, setError] = useState<number>();


    const obtenerDatosBeneficiario = () => {
        axios({
            method: "post",
            data: {
                rut: rutt
            },
            url: "http://localhost:3001/dideco/beneficiarios/obtenerInformacionBeneficiarios",
            withCredentials: true
        }).then((response) => {

            const datos = response.data;

            setNombresBeneficiarioAnteriorMod(datos.nombress);
            setEdadBeneficiarioAnteriorMod(datos.edadd);
            setDireccionBeneficiarioAnteriorMod(datos.direccionn);
            setTelefonoBeneficiarioAnteriorMod(datos.telefonoo);
            setCorreoBeneficiarioAnteriorMod(datos.correoo);

            setPorcentajeBeneficiarioAnteriorMod(datos.porcentaje);

            setNombrePdfCartolaBeneficiarioAnteriorMod(datos.nombreArchivo);

        })
    }

    useEffect(() => {
        if (estadoModalBeneficiarioMod == true) {
            obtenerDatosBeneficiario();
        }
    }, [estadoModalBeneficiarioMod])

    //@ts-ignore
    const modificoArchivo = event => {

        setArchivoPdfNuevoMod(event.target.files[0]);
        setNombrePdfNuevoMod(event.target.files[0].name);
        setTipoPdfNuevoMod(event.target.files[0].type);

    };



    const modificacionBeneficiario = () => {

        console.log(nombrePdfNuevoMod + "este es el nombre nuevo");

        axios({
            method: "put",
            data: {
                rutBeneficiarioMod: rutt,

                nombresMod: nombresBeneficiarioAnteriorMod,
                edadMod: edadBeneficiarioAnteriorMod,
                direccionMod: direccionBeneficiarioAnteriorMod,
                telefonoMod: telefonoBeneficiarioAnteriorMod,
                correoMod: correoBeneficiarioAnteriorMod,

                porcentaje: porcentajeBeneficiarioAnteriorMod,

            },
            url: "http://localhost:3001/dideco/beneficiarios/modificandobeneficiarios",
            withCredentials: true
        }).then((response) => {
            const mensaje = response.data.message;
            if (mensaje === "EMB") {
                setError(1);
                setVentanaMod(true);
                console.log("Modificarcion Beneficiario exitosamente");
            }
        })

    }

    const modificacionPdf = () => {

        const archivoInput = document.getElementById("cartolabeneficiarioagr") as HTMLInputElement | null;
        const prueba = (archivoInput?.files || [])[0];

        if (archivoInput !== null && prueba instanceof Blob && archivoPdfNuevoMod !== undefined) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(archivoPdfNuevoMod);
            reader.onload = async () => {
                const arrayBuffer = reader.result as ArrayBuffer | null;

                if (arrayBuffer !== null) {
                    const bytes = new Uint8Array(arrayBuffer);

                    const arregloPdf = Array.from(bytes);

                    axios({
                        method: "put",
                        data: {
                            rutBeneficiarioMod: rutt,
                            nombrepdf: nombrePdfNuevoMod,
                            typepdf: tipoPdfNuevoMod,
                            archivopdf: arregloPdf,
                        },
                        url: "http://localhost:3001/dideco/beneficiarios/modificandobeneficiariospdf",
                        withCredentials: true,
                    }).then((response) => {
                        const mensaje = response.data.message;
                        if (mensaje === "EMB") {

                            console.log("Modificacion Exitosa del PDF");
                        }
                    });
                }
            };
        }
        else {
            console.log("Ningun archivo a sido seleccionado")
        }

    }


    const fusionModificacion = () => {
        const archivoInputt = document.getElementById("cartolabeneficiarioagr");
        if (archivoInputt !== null) {
            modificacionBeneficiario();
            modificacionPdf();
        }
        else {
            modificacionBeneficiario();
        }
    }


    const obtenerDatosBeneficiarioPdf = () => {
        console.log("estoy aca en l principal cliente")

        axios({
            method: "post",
            data: {
                rut: rutt
            },
            url: "http://localhost:3001/dideco/beneficiarios/obtenerPdf",
            withCredentials: true
        }).then((response) => {

            const pdf = response.data;
            console.log(pdf)

            const unit8Pdf = Buffer.from(pdf);

            const blobPdf = new Blob([unit8Pdf], { type: "application/pdf" });

            console.log(unit8Pdf);


            const fileURL = URL.createObjectURL(blobPdf);
            window.open(fileURL);

        })
    }

    let modificarArc = null;

    if (lector == 1) {

        modificarArc = (
            <div className="modalColor bg-white w-[600px] h-[460px] relative p-2 rounded mt-[40px]">
                <h1 className="textColor text-center text-3xl underline mb-[25px] mt-[5px] px-3"><strong>Informacion de Beneficiario</strong></h1>

                <button className="absolute ml-[550px] mt-[-95px] " onClick={() => cambioEstadoModalBeneficiarioMod(false)}>sd<FontAwesomeIcon className="text-3xl text-red-500" icon={faTimes}></FontAwesomeIcon></button>


                <form className="rounded px-3 pt-1">


                    <div className="mb-8 mt-[-20px]">
                        <label className="block textColor text-lg font-bold" htmlFor="Rutbeneficiarioagr">
                            Rut Beneficiario
                        </label>
                        <input disabled value={rutt} className="mb-[-10px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="RutBeneficiariomod" name="RutBeneficiariomod" type="text" placeholder="Rut"></input>
                    </div>

                    <div className="mb-6 mt-[-28px]">
                        <label className="block textColor text-lg font-bold" htmlFor="Nombeneficiarioagr">
                            Nombre
                        </label>
                        <input disabled value={nombresBeneficiarioAnteriorMod} onChange={(e) => setNombresBeneficiarioAnteriorMod(e.target.value)} className="w-[260px] mb-[-10px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor  leading-tight focus:outline-none focus:shadow-outline" id="NombresBeneficiariomod" name="NombresBeneficiariomod" type="text" placeholder="Nombres"></input>
                    </div>

                    <div className="mb-6 mt-[-20px]">
                        <label className="block textColor text-lg font-bold" htmlFor="Edadbeneficiarioagr">
                            Edad
                        </label>
                        <input disabled value={edadBeneficiarioAnteriorMod} onChange={(e) => setEdadBeneficiarioAnteriorMod(Number(e.target.value))} className="w-[80px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="EdadBeneficiariomod" name="EdadBeneficiariomod" type="number" placeholder="Edad"></input>
                    </div>

                    <div className="mb-6 absolute mt-[-83px] ml-[100px]">
                        <label className="block textColor text-lg font-bold" htmlFor="Dirbeneficiarioagr">
                            Direccion
                        </label>
                        <input disabled value={direccionBeneficiarioAnteriorMod} onChange={(e) => setDireccionBeneficiarioAnteriorMod(e.target.value)} className="w-[443px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="DireccionBeneficiariomod" name="DireccionBeneficiariomod" type="text" placeholder="Direccion"></input>
                    </div>

                    <div className="mb-6 mt-[-25px]">
                        <label className="block textColor text-lg font-bold" htmlFor="Telbeneficiarioagr">
                            Telefono
                        </label>
                        <input disabled value={telefonoBeneficiarioAnteriorMod} onChange={(e) => setTelefonoBeneficiarioAnteriorMod(Number(e.target.value))} className="w-[150px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="TelefonoBeneficiariomod" name="TelefonoBeneficiariomod" type="text" placeholder="Telefono"></input>
                    </div>

                    <div className="mb-6 absolute mt-[-84px] ml-[170px]">
                        <label className="block textColor text-lg font-bold" htmlFor="Corbeneficiarioagr">
                            Correo
                        </label>
                        <input disabled value={correoBeneficiarioAnteriorMod} onChange={(e) => setCorreoBeneficiarioAnteriorMod(e.target.value)} className="w-[372px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="Correobeneficiariomod" name="CorreoBeneficiariomod" type="text" placeholder="Correo"></input>
                    </div>

                    <div className="mb-8 mt-[-25px]">
                        <label className="block textColor text-lg font-bold" htmlFor="Porcbeneficiarioagr">
                            Porcentaje Registro Hogar
                        </label>
                        <input disabled value={porcentajeBeneficiarioAnteriorMod} onChange={(e) => setPorcentajeBeneficiarioAnteriorMod(Number(e.target.value))} className="inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="porcentajebeneficiarioagr" name="porcentajebeneficiarioagr" type="number" placeholder="Porcentaje Registro Hogar"></input>
                    </div>

                    <div className="mb-8 mt-[-25px]">
                        <Button onClick={obtenerDatosBeneficiarioPdf} className="ml-[-18px]"><FontAwesomeIcon className="colorX text-4xl" icon={faFilePdf} /></Button>
                        <input disabled value={nombrePdfCartolaAnteriorMod} className=" absolute ml-[5px] mt-[10px] w-[494px] inputColor shadow appearance-none border rounded py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" type="text" id="nombrePdfBeneficiario" name="nombrePdfBeneficiario" placeholder="Nombre PDF"></input>
                    </div>



                </form>

                <div className="flex items-center justify-between absolute">
                    <button onClick={() => cambioEstadoModalBeneficiarioMod(false)} className="navbarColor text-white bg-[#427DA2]  font-bold  px-1 rounded focus:outline-none focus:shadow-outline text-lg mt-[-20px] ml-[245px] h-[30px]" type="button">
                        Aceptar
                    </button>
                </div>
            </div>

        )

    }
    else if (lector == 2) {

        modificarArc = (
            <div className="modalColor bg-white w-[600px] h-[540px] relative p-2 rounded mt-[40px]">
                <h1 className="textColor text-center text-3xl underline mb-[25px] mt-[5px] px-3"><strong>Modificar Beneficiario</strong></h1>

                <button className="absolute ml-[550px] mt-[-75px]" onClick={() => cambioEstadoModalBeneficiarioMod(false)}><FontAwesomeIcon className="text-3xl colorX" icon={faTimes}></FontAwesomeIcon></button>


                <form className="rounded px-3 pt-1">


                    <div className="mb-8 mt-[-20px]">
                        <label className="block textColor text-lg font-bold" htmlFor="Rutbeneficiarioagr">
                            Rut Beneficiario
                        </label>
                        <input disabled value={rutt} className="mb-[-10px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="RutBeneficiariomod" name="RutBeneficiariomod" type="text" placeholder="Rut"></input>
                    </div>

                    <div className="mb-6 mt-[-28px]">
                        <label className="block textColor text-lg font-bold" htmlFor="Nombeneficiarioagr">
                            Nombre
                        </label>
                        <input value={nombresBeneficiarioAnteriorMod} onChange={(e) => setNombresBeneficiarioAnteriorMod(e.target.value)} className="w-[260px] mb-[-10px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor  leading-tight focus:outline-none focus:shadow-outline" id="NombresBeneficiariomod" name="NombresBeneficiariomod" type="text" placeholder="Nombres"></input>
                    </div>

                    <div className="mb-6 mt-[-20px]">
                        <label className="block textColor text-lg font-bold" htmlFor="Edadbeneficiarioagr">
                            Edad
                        </label>
                        <input value={edadBeneficiarioAnteriorMod} onChange={(e) => setEdadBeneficiarioAnteriorMod(Number(e.target.value))} className="w-[80px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="EdadBeneficiariomod" name="EdadBeneficiariomod" type="number" placeholder="Edad"></input>
                    </div>

                    <div className="mb-6 absolute mt-[-83px] ml-[100px]">
                        <label className="block textColor text-lg font-bold" htmlFor="Dirbeneficiarioagr">
                            Direccion
                        </label>
                        <input value={direccionBeneficiarioAnteriorMod} onChange={(e) => setDireccionBeneficiarioAnteriorMod(e.target.value)} className="w-[443px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="DireccionBeneficiariomod" name="DireccionBeneficiariomod" type="text" placeholder="Direccion"></input>
                    </div>

                    <div className="mb-6 mt-[-25px]">
                        <label className="block textColor text-lg font-bold" htmlFor="Telbeneficiarioagr">
                            Telefono
                        </label>
                        <input value={telefonoBeneficiarioAnteriorMod} onChange={(e) => setTelefonoBeneficiarioAnteriorMod(Number(e.target.value))} className="w-[150px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="TelefonoBeneficiariomod" name="TelefonoBeneficiariomod" type="text" placeholder="Telefono"></input>
                    </div>

                    <div className="mb-6 absolute mt-[-84px] ml-[170px]">
                        <label className="block textColor text-lg font-bold" htmlFor="Corbeneficiarioagr">
                            Correo
                        </label>
                        <input value={correoBeneficiarioAnteriorMod} onChange={(e) => setCorreoBeneficiarioAnteriorMod(e.target.value)} className="w-[372px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="Correobeneficiariomod" name="CorreoBeneficiariomod" type="text" placeholder="Correo"></input>
                    </div>

                    <div className="mb-8 mt-[-25px]">
                        <label className="block textColor text-lg font-bold" htmlFor="Porcbeneficiarioagr">
                            Porcentaje Registro Hogar
                        </label>
                        <input value={porcentajeBeneficiarioAnteriorMod} onChange={(e) => setPorcentajeBeneficiarioAnteriorMod(Number(e.target.value))} className="inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="porcentajebeneficiarioagr" name="porcentajebeneficiarioagr" type="number" placeholder="Porcentaje Registro Hogar"></input>
                    </div>

                    <div className="mb-8 mt-[-25px]">
                        <Button onClick={obtenerDatosBeneficiarioPdf} className="ml-[-18px]"><FontAwesomeIcon className="colorX text-4xl" icon={faFilePdf} /></Button>
                        <input disabled value={nombrePdfCartolaAnteriorMod} className=" absolute ml-[5px] mt-[10px] w-[494px] inputColor shadow appearance-none border rounded py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" type="text" id="nombrePdfBeneficiario" name="nombrePdfBeneficiario" placeholder="Nombre PDF"></input>
                    </div>

                    <div className="mb-8 mt-[-25px]">
                        <label className="block textColor text-lg font-bold" htmlFor="pdfbeneficiarioagr">
                            PDF Cartola Registro Hogares
                        </label>
                        <input onChange={modificoArchivo} className="w-[544px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="cartolabeneficiarioagr" name="cartolabeneficiarioagr" type="file" placeholder="Apellidos Beneficiario"></input>
                    </div>

                </form>
                <div className="flex items-center justify-between absolute">
                    <button onClick={fusionModificacion} className="navbarColor text-white bg-[#427DA2]  font-bold  px-1 rounded focus:outline-none focus:shadow-outline text-lg mt-[-20px] ml-[210px] h-[30px]" type="button">
                        Modificar
                    </button>
                </div>
            </div>

        )
    }




    return (
        <>
            {estadoModalBeneficiarioMod &&
                <div className="z-10 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 fixed items-center justify-center flex">

                        {modificarArc}



                    <RespuestaModificacionBeneficiario estadoRespuestaEliminacion={ventanaMod} cambioEstadoRespuestaEliminacion={setVentanaMod} rut={rutt} error={error} />
                </div>
            }
        </>
    )
}