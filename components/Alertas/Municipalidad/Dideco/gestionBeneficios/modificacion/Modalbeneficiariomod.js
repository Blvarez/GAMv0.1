import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import ModalBeneficiarioModACE from "../confirmaciones/Modalbeneficiariomodace";

export default function ModalBeneficiarioMod({ estadoModalBeneficiarioMod, cambioEstadoModalBeneficiarioMod, rutMod }) {

    const rutt = rutMod;


    const [estadomodalbeneficiariomodace, cambioEstadomodalbeneficiariomodace] = useState(false);


    const [nombresBeneficiarioAnteriorMod, setNombresBeneficiarioAnteriorMod] = useState();
    const [apellidosBeneficiarioAnteriorMod, setApellidosBeneficiarioAnteriorMod] = useState();
    const [edadBeneficiarioAnteriorMod, setEdadBeneficiarioAnteriorMod] = useState();
    const [direccionBeneficiarioAnteriorMod, setDireccionBeneficiarioAnteriorMod] = useState();
    const [telefonoBeneficiarioAnteriorMod, setTelefonoBeneficiarioAnteriorMod] = useState();
    const [correoBeneficiarioAnteriorMod, setCorreoBeneficiarioAnteriorMod] = useState();

    const [porcentajeBeneficiarioAnteriorMod, setPorcentajeBeneficiarioAnteriorMod] = useState();

    const [nombrePdfCartolaAnteriorMod, setNombrePdfCartolaBeneficiarioAnteriorMod] = useState();

    const [nombrePdfNuevoMod, setNombrePdfNuevoMod] = useState();
    const [tipoPdfNuevoMod, setTipoPdfNuevoMod] = useState();
    const [archivoPdfNuevoMod, setArchivoPdfNuevoMod] = useState(null);

    const obtenerDatosBeneficiario = () => {
        axios({
            method: "post",
            data: {
                rut: rutt
            },
            url: "http://localhost:3001/dideco/gestionbeneficios/crudbeneficiario/listarMod",
            withCredentials: true
        }).then((response) => {

            const datos = response.data;

            setNombresBeneficiarioAnteriorMod(datos.nombress);
            setApellidosBeneficiarioAnteriorMod(datos.apellidoss);
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
                apellidosMod: apellidosBeneficiarioAnteriorMod,
                edadMod: edadBeneficiarioAnteriorMod,
                direccionMod: direccionBeneficiarioAnteriorMod,
                telefonoMod: telefonoBeneficiarioAnteriorMod,
                correoMod: correoBeneficiarioAnteriorMod,

                porcentaje: porcentajeBeneficiarioAnteriorMod,

            },
            url: "http://localhost:3001/dideco/gestionbeneficios/crudbeneficiario/modificar",
            withCredentials: true
        }).then((response) => {
            const mensaje = response.data.message;
            if (mensaje === "EMB") {
                cambioEstadomodalbeneficiariomodace(true);
            }
        })

    }

    const modificacionPdf = () => {

        const archivoInput = document.getElementById("cartolabeneficiarioagr");
        const prueba = archivoInput.files[0];

        if (archivoInput !== "" && prueba instanceof Blob) {

            const reader = new FileReader();
            reader.readAsArrayBuffer(archivoPdfNuevoMod);
            reader.onload = async () => {

                let arrayBuffer = reader.result;
                let bytes = new Uint8Array(arrayBuffer);

                const arregloPdf = [];

                for (const key in bytes) {
                    const valor = bytes[key];
                    arregloPdf.push(valor);
                }
                axios({
                    method: "put",
                    data: {
                        rutBeneficiarioMod: rutt,

                        nombrepdf: nombrePdfNuevoMod,
                        typepdf: tipoPdfNuevoMod,
                        archivopdf: arregloPdf

                    },
                    url: "http://localhost:3001/dideco/gestionbeneficios/crudbeneficiario/modificarpdf",
                    withCredentials: true
                }).then((response) => {
                    const mensaje = response.data.message;
                    if (mensaje === "EMB") {
                        cambioEstadomodalbeneficiariomodace(true);
                    }
                })
            }
        }
        else {
            console.log("Ningun archivo a sido seleccionado")
        }

    }

    const fusionModificacion = () => {
        const archivoInputt = document.getElementById("cartolabeneficiarioagr");
        if (archivoInputt !== "") {
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
            url: "http://localhost:3001/dideco/gestionbeneficios/crudbeneficiario/infoPdf",
            withCredentials: true
        }).then((response) => {

            const pdf = response.data;
            console.log(pdf)

            const unit8Pdf = Buffer.from(pdf);

            const blobPdf = new Blob([unit8Pdf], {type: "application/pdf"});

            console.log(unit8Pdf);


            const fileURL = URL.createObjectURL(blobPdf);
            window.open(fileURL);

        })
    }




    return (
        <>
            {estadoModalBeneficiarioMod &&
                <div className="z-10 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 fixed items-center justify-center flex">
                    <div className="modalColor bg-white w-[600px] h-[540px] relative p-2 rounded mt-[40px]">

                        <h1 className="textColor text-center text-3xl underline mb-[25px] mt-[5px] px-3"><strong>Agregar Beneficiario</strong></h1>

                        <button className="absolute ml-[550px] mt-[-75px]" onClick={() => cambioEstadoModalBeneficiarioMod(false)}><FontAwesomeIcon className="text-3xl colorX" icon={faTimes}></FontAwesomeIcon></button>

                        <form className="rounded px-3 pt-1">


                            <div className="mb-8 mt-[-20px]">
                                <label className="block textColor text-lg font-bold" for="Rutbeneficiarioagr">
                                    Rut Beneficiario
                                </label>
                                <input disabled value={rutt} className="mb-[-10px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="RutBeneficiariomod" name="RutBeneficiariomod" type="text" placeholder="Rut"></input>
                            </div>

                            <div className="mb-6 mt-[-28px]">
                                <label className="block textColor text-lg font-bold" for="Nombeneficiarioagr">
                                    Nombres
                                </label>
                                <input value={nombresBeneficiarioAnteriorMod} onChange={(e) => setNombresBeneficiarioAnteriorMod(e.target.value)} className="w-[260px] mb-[-10px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor mb-3 leading-tight focus:outline-none focus:shadow-outline" id="NombresBeneficiariomod" name="NombresBeneficiariomod" type="text" placeholder="Nombres"></input>
                            </div>

                            <div className="mb-8 absolute mt-[-80px] ml-[275px]">
                                <label className="block textColor text-lg font-bold" for="Apellbeneficiarioagr">
                                    Apellidos
                                </label>
                                <input value={apellidosBeneficiarioAnteriorMod} onChange={(e) => setApellidosBeneficiarioAnteriorMod(e.target.value)} className="w-[270px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="ApellidosBeneficiariomod" name="ApellidosBeneficiariomod" type="text" placeholder="Apellidos"></input>
                            </div>

                            <div className="mb-6 mt-[-20px]">
                                <label className="block textColor text-lg font-bold" for="Edadbeneficiarioagr">
                                    Edad
                                </label>
                                <input value={edadBeneficiarioAnteriorMod} onChange={(e) => setEdadBeneficiarioAnteriorMod(e.target.value)} className="w-[80px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="EdadBeneficiariomod" name="EdadBeneficiariomod" type="number" placeholder="Edad"></input>
                            </div>

                            <div className="mb-6 absolute mt-[-83px] ml-[100px]">
                                <label className="block textColor text-lg font-bold" for="Dirbeneficiarioagr">
                                    Direccion
                                </label>
                                <input value={direccionBeneficiarioAnteriorMod} onChange={(e) => setDireccionBeneficiarioAnteriorMod(e.target.value)} className="w-[443px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="DireccionBeneficiariomod" name="DireccionBeneficiariomod" type="text" placeholder="Direccion"></input>
                            </div>

                            <div className="mb-6 mt-[-25px]">
                                <label className="block textColor text-lg font-bold" for="Telbeneficiarioagr">
                                    Telefono
                                </label>
                                <input value={telefonoBeneficiarioAnteriorMod} onChange={(e) => setTelefonoBeneficiarioAnteriorMod(e.target.value)} className="w-[150px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="TelefonoBeneficiariomod" name="TelefonoBeneficiariomod" type="text" placeholder="Telefono"></input>
                            </div>

                            <div className="mb-6 absolute mt-[-84px] ml-[170px]">
                                <label className="block textColor text-lg font-bold" for="Corbeneficiarioagr">
                                    Correo
                                </label>
                                <input value={correoBeneficiarioAnteriorMod} onChange={(e) => setCorreoBeneficiarioAnteriorMod(e.target.value)} className="w-[372px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="Correobeneficiariomod" name="CorreoBeneficiariomod" type="text" placeholder="Correo"></input>
                            </div>

                            <div className="mb-8 mt-[-25px]">
                                <label className="block textColor text-lg font-bold" for="Porcbeneficiarioagr">
                                    Porcentaje Registro Hogar
                                </label>
                                {console.log(porcentajeBeneficiarioAnteriorMod)}
                                <input value={porcentajeBeneficiarioAnteriorMod} onChange={(e) => setPorcentajeBeneficiarioAnteriorMod(e.target.value)} className="inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="porcentajebeneficiarioagr" name="porcentajebeneficiarioagr" type="number" placeholder="Porcentaje Registro Hogar"></input>
                            </div>

                            <div className="mb-8 mt-[-25px]">
                                <Button onClick={obtenerDatosBeneficiarioPdf} className="ml-[-18px]"><FontAwesomeIcon className="colorX text-4xl" icon={faFilePdf} /></Button>
                                <input disabled value={nombrePdfCartolaAnteriorMod} className=" absolute ml-[5px] mt-[10px] w-[494px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" type="text" id="nombrePdfBeneficiario" name="nombrePdfBeneficiario" placeholder="Nombre PDF"></input>
                            </div>

                            <div className="mb-8 mt-[-25px]">
                                <label className="block textColor text-lg font-bold" for="pdfbeneficiarioagr">
                                    PDF Cartola Registro Hogares
                                </label>
                                <input onChange={modificoArchivo} className="w-[544px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="cartolabeneficiarioagr" name="cartolabeneficiarioagr" type="file" placeholder="Apellidos Beneficiario"></input>
                            </div>






                        </form>
                        <div className="flex items-center justify-between absolute">
                            <button onClick={fusionModificacion} className="navbarColor text-white font-bold  px-1 rounded focus:outline-none focus:shadow-outline text-lg mt-[-20px] ml-[210px] h-[30px]" type="button">
                                Modificar
                            </button>
                        </div>

                        <ModalBeneficiarioModACE estadoModalBeneficiarioModACE={estadomodalbeneficiariomodace} cambioEstadoModalBeneficiarioModACE={cambioEstadomodalbeneficiariomodace} rut={rutt}></ModalBeneficiarioModACE>
                    </div>
                </div>
            }
        </>
    )
}