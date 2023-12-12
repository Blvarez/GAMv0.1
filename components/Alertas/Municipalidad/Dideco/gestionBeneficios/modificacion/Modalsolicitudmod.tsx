import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import RespuestaSolEnt from "./respuestaSolEnt";
import RespuestaSolRec from "./respuestaSolRec";
import RespuestaUno from "./respuestaUno";
import RespuestaTres from "./respuestatres";
import RespuestaDos from "./respuestaDos";
import RespuestaCuatro from "./respuestacuatro";

interface Props {
    estadoModalSoliMod: boolean,
    cambioEstadoModalSoliMod: (nuevoEstado: boolean) => void,
    idsoli: any,
    estadoAnterior: any,
    lector: any

}



export default function VentanaModSoli({ estadoModalSoliMod, cambioEstadoModalSoliMod, idsoli, estadoAnterior, lector }: Props) {

    const idmod: number = idsoli;
    const modoLector = lector;
    const modoEstadoAnterior = estadoAnterior;

    console.log(idmod, modoLector, modoEstadoAnterior, "Prueba de entrada")


    const [rut, setRut] = useState<string>();
    const [beneficio, setBenefcio] = useState<string>();
    const [fechaInicio, setFechaInicio] = useState<any>();
    const [fechaFinal, setFechaFinal] = useState<any>();
    const [observacion, setObservacion] = useState<string>();

    const crearPDFEntrega = async (idd: number) => {
        try {
            const response = await axios({
                method: 'post',
                data: {
                    idSolicitud: idd
                },
                url: 'http://localhost:3001/dideco/solicitudes/informacionPdf',
                withCredentials: true
            });

            const idSolicitud: number = idd;

            const fechaCreacion: string = response.data.fechacreacion;

            const fechacreacion: string = fechaCreacion.slice(0, 10);

            const fechaFinal: string = response.data.fechafinal;
            const rutBeneficiario: string = response.data.rutbeneficiario;
            const nombresBeneficiario: string = response.data.nombresbeneficiario;
            const direccionBeneficiario: string = response.data.direccionbeneficiario + ', El Quisco';
            const nombreBeneficio: string = response.data.nombrebeneficio;

            console.log(fechaFinal);

            const doc = new jsPDF();

            const fechafinal: string = fechaFinal.slice(0, 10);
            const fechafinaldia: string = fechafinal.slice(8, 10);
            const numerodiamas: number = parseInt(fechafinaldia, 10);
            const numerodianor: number = numerodiamas + 1;
            const numerofinal: string = numerodianor.toString();
            const fechafinalmod: string = fechafinal.slice(0, 8) + numerofinal;

            const fechamod = new Date(fechafinalmod);
            const opciones = { month: 'long' };
            //@ts-ignore
            const mes: string = fechamod.toLocaleString('es-ES', opciones).slice(0, 1).toUpperCase() + fechamod.toLocaleString('es-ES', opciones).slice(1);
            const anio: number = fechamod.getFullYear();
            const opcionesDia = { weekday: 'long' };
            //@ts-ignore
            const diaEscrito: string = fechamod.toLocaleString('es-ES', opcionesDia).slice(0, 1).toUpperCase() + fechamod.toLocaleString('es-ES', opcionesDia).slice(1);
            const dia: number = fechamod.getDate();
            const fechaEscrita: string = `${diaEscrito} ${dia} de ${mes} del ${anio}`;

            const imgLogoDideco = 'https://i.ibb.co/VHxg0z0/logo-Invisible-Munii.png';
            const timbreDideco = 'https://i.ibb.co/RpfzZfy/logo-Didecoo.png';
            let imgLogo: string | undefined;
            let imgTimbre: string | undefined;

            const fetchAndLoadImage = async (url: string): Promise<string> => {
                const response = await fetch(url);
                const blob = await response.blob();
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = () => {
                        resolve(reader.result as string);
                    };
                });
            };

            imgLogo = await fetchAndLoadImage(imgLogoDideco);
            imgTimbre = await fetchAndLoadImage(timbreDideco);

            doc.addImage(imgLogo, 'JPEG', 15, 15, 40, 10);
            doc.addImage(imgTimbre, 'JPEG', 110, 185, 40, 40);

            doc.line(70, 220, 130, 220);

            const PAGE_WIDTH = doc.internal.pageSize.width;
            const PAGE_HEIGHT = doc.internal.pageSize.height;

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(22);
            const texto = `Acta de Entrega N° ${idSolicitud}`;
            const textWidth = doc.getTextWidth(texto);
            const tamanioHorizontal = (PAGE_WIDTH - textWidth) / 2;
            doc.text(texto, tamanioHorizontal, 90);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            const textoCompleto = `Se efectua la entrega del Beneficio ${nombreBeneficio} al Beneficiario ${nombresBeneficiario} de RUT: ${rutBeneficiario} que reside en ${direccionBeneficiario}, cuya solicitud fue generada el dia ${fechacreacion} y fue entregada el dia de Hoy.`;

            const lineas = doc.splitTextToSize(textoCompleto, 168);
            doc.text(lineas, 20, 135);

            doc.text('Firma', 95, 225);
            doc.text('Beneficiario', 90, 230);

            doc.text(fechaEscrita, 137, 20);

            const margin = 10;

            const x = margin;
            const y = margin;

            const size = PAGE_HEIGHT - margin * 2;

            doc.line(x, y, x + 190, y);
            doc.line(x + 190, y, x + 190, y + 277);
            doc.line(x + 190, y + size, x, y + size);
            doc.line(x, y + size, x, y);

            doc.save(`${idSolicitud}.pdf`);
        } catch (error) {
            console.error('Error al generar el PDF:', error);
        }
    };


    const [estadoSeleccionado, setEstadoSeleccionado] = useState('');

    const manejarCambioSelect = (event: any) => {
        setEstadoSeleccionado(event.target.value);
    };


    let codigo = null;

    //LECTOR
    if (modoLector == 1) {//POSTULACION

        if (modoEstadoAnterior == 1) { //ESTADO POSTULACION
            codigo = (
                <div className="mt-[30px] modalColor bg-white w-[600px] h-[300px] relative p-2 rounded">

                    <div className="rounded px-3 pt-1">
                        <button className="absolute ml-[550px] mt-[-5px]" onClick={() => cambioEstadoModalSoliMod(false)}><FontAwesomeIcon className="text-3xl text-red-500 " icon={faTimes}></FontAwesomeIcon></button>


                        <h1 className="textColor text-center text-3xl underline mb-[25px] mt-[5px] px-3"><strong>Informacion de Postulacion</strong></h1>


                        <div className="mb-8 mt-[-20px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Rutbeneficiarioagr">
                                Rut Beneficiario
                            </label>
                            <input disabled value={rut} className="mb-[-10px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="RutBeneficiariomod" name="RutBeneficiariomod" type="text" placeholder="Rut"></input>
                        </div>

                        <div className="mb-6 mt-[-28px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Nombeneficiarioagr">
                                Beneficio
                            </label>
                            <input disabled value={beneficio} className="w-full mb-[-10px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor  leading-tight focus:outline-none focus:shadow-outline" id="NombresBeneficiariomod" name="NombresBeneficiariomod" type="text" placeholder="Nombres"></input>
                        </div>

                        <div className="mb-6 mt-[-20px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Fecha Inicio">
                                Fecha Creacion
                            </label>
                            <input disabled value={fechaInicio} className="inputColor shadow appearance-none border rounded  w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="EdadBeneficiariomod" name="EdadBeneficiariomod" type="text" placeholder="Fecha Inicio"></input>
                        </div>

                        <div className="flex items-center justify-between absolute">
                            <button onClick={() => cambioEstadoModalSoliMod(false)} className="navbarColor w-[300px] text-white bg-[#427DA2] font-bold  px-1 rounded focus:outline-none focus:shadow-outline text-lg mt-[-10px] ml-[125px] h-[30px]" type="button">Aceptar</button>
                        </div>

                    </div>

                </div>
            )
        }
        else if (modoEstadoAnterior == 2) { //ESTADO ENTREGA
            codigo = (
                <div className="mt-[30px] modalColor bg-white w-[600px] h-[460px] relative p-2 rounded">

                    <div className="rounded px-3 pt-1">
                        <button className="absolute ml-[550px] mt-[-5px]" onClick={() => cambioEstadoModalSoliMod(false)}><FontAwesomeIcon className="text-3xl text-red-500" icon={faTimes}></FontAwesomeIcon></button>


                        <h1 className="textColor text-center text-3xl underline mb-[25px] mt-[5px] px-3"><strong>Informacion de Entrega</strong></h1>


                        <div className="mb-8 mt-[-20px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Rutbeneficiarioagr">
                                Rut Beneficiario
                            </label>
                            <input disabled value={rut} className="mb-[-10px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="RutBeneficiariomod" name="RutBeneficiariomod" type="text" placeholder="Rut"></input>
                        </div>

                        <div className="mb-6 mt-[-28px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Nombeneficiarioagr">
                                Beneficio
                            </label>
                            <input disabled value={beneficio} className="w-full mb-[-10px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor  leading-tight focus:outline-none focus:shadow-outline" id="NombresBeneficiariomod" name="NombresBeneficiariomod" type="text" placeholder="Nombres"></input>
                        </div>

                        <div className="mb-6 mt-[-20px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Edadbeneficiarioagr">
                                Fecha Creacion
                            </label>
                            <input disabled value={fechaInicio} className="w-full inputColor shadow appearance-none border rounded  py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="EdadBeneficiariomod" name="EdadBeneficiariomod" type="text" placeholder="Fecha Creacion"></input>
                        </div>
                        <div className="mb-6 absolute mt-[-3px] ml-[5px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Edadbeneficiarioagr">
                                Fecha Final
                            </label>
                            <input disabled value={fechaFinal} className="w-[555px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="EdadBeneficiariomod" name="EdadBeneficiariomod" type="text" placeholder="Fecha Creacion"></input>
                        </div>



                        <div className="mb-8 mt-[95px]">
                            <Button onClick={() => crearPDFEntrega(idmod)} className="ml-[248px]"><FontAwesomeIcon className="colorX text-4xl" icon={faFilePdf} /></Button>
                        </div>


                        <div className="flex items-center justify-between absolute">
                            <button onClick={() => cambioEstadoModalSoliMod(false)} className="navbarColor w-[300px] text-white bg-[#427DA2] font-bold  px-1 rounded focus:outline-none focus:shadow-outline text-lg mt-[-10px] ml-[125px] h-[30px]" type="button">Aceptar</button>
                        </div>

                    </div>

                </div>
            )
        }
        else if (modoEstadoAnterior == 3) { //ESTADO RECHAZADO
            codigo = (
                <div className="mt-[30px] modalColor bg-white w-[600px] h-[460px] relative p-2 rounded">

                    <div className="rounded px-3 pt-1">
                        <button className="absolute ml-[550px] mt-[-5px]" onClick={() => cambioEstadoModalSoliMod(false)}><FontAwesomeIcon className="text-3xl text-red-500" icon={faTimes}></FontAwesomeIcon></button>


                        <h1 className="textColor text-center text-3xl underline mb-[25px] mt-[5px] px-3"><strong>Informacion de Rechazo</strong></h1>


                        <div className="mb-8 mt-[-20px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Rutbeneficiarioagr">
                                Rut Beneficiario
                            </label>
                            <input disabled value={rut} className="mb-[-10px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="RutBeneficiariomod" name="RutBeneficiariomod" type="text" placeholder="Rut"></input>
                        </div>

                        <div className="mb-6 mt-[-28px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Nombeneficiarioagr">
                                Beneficio
                            </label>
                            <input disabled value={beneficio} className="w-full mb-[-10px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor  leading-tight focus:outline-none focus:shadow-outline" id="NombresBeneficiariomod" name="NombresBeneficiariomod" type="text" placeholder="Nombres"></input>
                        </div>

                        <div className="mb-6 mt-[-20px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Edadbeneficiarioagr">
                                Fecha Creacion
                            </label>
                            <input disabled value={fechaInicio} className="w-full inputColor shadow appearance-none border rounded  py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="EdadBeneficiariomod" name="EdadBeneficiariomod" type="text" placeholder="Fecha Creacion"></input>
                        </div>
                        <div className="mb-6 absolute mt-[-3px] ml-[5px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Edadbeneficiarioagr">
                                Fecha Final
                            </label>
                            <input disabled value={fechaFinal} className="w-[555px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="EdadBeneficiariomod" name="EdadBeneficiariomod" type="text" placeholder="Fecha Creacion"></input>
                        </div>


                        <div className="mb-6 absolute mt-[70px] ml-[5px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Edadbeneficiarioagr">
                                Observacion
                            </label>
                            <textarea disabled value={observacion} className="w-[555px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="EdadBeneficiariomod" name="EdadBeneficiariomod" placeholder="Fecha Creacion"></textarea>
                        </div>


                        <div className="flex items-center justify-between absolute mt-[170px]">
                            <button onClick={() => cambioEstadoModalSoliMod(false)} className="navbarColor w-[300px] text-white bg-[#427DA2] font-bold  px-1 rounded focus:outline-none focus:shadow-outline text-lg mt-[-10px] ml-[125px] h-[30px]" type="button">Aceptar</button>
                        </div>

                    </div>

                </div>
            )
        }
        else if (modoEstadoAnterior == 4) { //ESTADO PENDIENTE ENTREGa
            codigo = (
                <div className="mt-[30px] modalColor bg-white w-[600px] h-[340px] relative p-2 rounded">

                    <div className="rounded px-3 pt-1">
                        <button className="absolute ml-[550px] mt-[-5px]" onClick={() => cambioEstadoModalSoliMod(false)}><FontAwesomeIcon className="text-3xl text-red-500 " icon={faTimes}></FontAwesomeIcon></button>


                        <h1 className="textColor text-center text-3xl underline mb-[25px] mt-[5px] px-3"><strong>Informacion de Pendiente a Entrega</strong></h1>


                        <div className="mb-8 mt-[-20px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Rutbeneficiarioagr">
                                Rut Beneficiario
                            </label>
                            <input disabled value={rut} className="mb-[-10px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="RutBeneficiariomod" name="RutBeneficiariomod" type="text" placeholder="Rut"></input>
                        </div>

                        <div className="mb-6 mt-[-28px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Nombeneficiarioagr">
                                Beneficio
                            </label>
                            <input disabled value={beneficio} className="w-full mb-[-10px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor  leading-tight focus:outline-none focus:shadow-outline" id="NombresBeneficiariomod" name="NombresBeneficiariomod" type="text" placeholder="Nombres"></input>
                        </div>

                        <div className="mb-6 mt-[-20px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Fecha Inicio">
                                Fecha Creacion
                            </label>
                            <input disabled value={fechaInicio} className="inputColor shadow appearance-none border rounded  w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="EdadBeneficiariomod" name="EdadBeneficiariomod" type="text" placeholder="Fecha Inicio"></input>
                        </div>

                        <div className="flex items-center justify-between absolute">
                            <button onClick={() => cambioEstadoModalSoliMod(false)} className="navbarColor w-[300px] text-white bg-[#427DA2] font-bold  px-1 rounded focus:outline-none focus:shadow-outline text-lg mt-[-10px] ml-[125px] h-[30px]" type="button">Aceptar</button>
                        </div>

                    </div>

                </div>
            )
        }
    }
    else if (modoLector == 2) {

        if (modoEstadoAnterior == 1) { //ESTADO POSTULACION
            codigo = (
                <div className="mt-[30px] modalColor bg-white w-[600px] h-[310px] relative p-2 rounded">

                    <div className="rounded px-3 pt-1">
                        <button className="absolute ml-[550px] mt-[-5px]" onClick={() => cambioEstadoModalSoliMod(false)}><FontAwesomeIcon className="text-3xl text-red-500 " icon={faTimes}></FontAwesomeIcon></button>


                        <h1 className="textColor text-center text-3xl underline mb-[25px] mt-[5px] px-3"><strong>Modificacion de Postulacion</strong></h1>


                        <div className="mb-8 mt-[-20px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Rutbeneficiarioagr">
                                Rut Beneficiario
                            </label>
                            <input disabled value={rut} className="mb-[-10px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="RutBeneficiariomod" name="RutBeneficiariomod" type="text" placeholder="Rut"></input>
                        </div>

                        <div className="mb-6 mt-[-28px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Nombeneficiarioagr">
                                Beneficio
                            </label>
                            <input disabled value={beneficio} className="w-full mb-[-10px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor  leading-tight focus:outline-none focus:shadow-outline" id="NombresBeneficiariomod" name="NombresBeneficiariomod" type="text" placeholder="Nombres"></input>
                        </div>

                        <div className="mb-6 mt-[-20px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Edadbeneficiarioagr">
                                Fecha Creacion
                            </label>
                            <input disabled value={fechaInicio} className="w-2/4 inputColor shadow appearance-none border rounded  py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="EdadBeneficiariomod" name="EdadBeneficiariomod" type="text" placeholder="Fecha Incio"></input>
                        </div>

                        <div className="mb-6 absolute mt-[-80px] ml-[300px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Dirbeneficiarioagr">
                                Estado Final
                            </label>
                            <select id="estadoSelect" className="w-[260px]" value={estadoSeleccionado} onChange={manejarCambioSelect}>
                                <option value="2">Entregar</option>
                                <option value="3">Rechazar</option>
                                <option value="4">Pendiente a Entrega</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between absolute">
                            <button onClick={() => modiciarDatosSoli()} className="navbarColor text-white bg-[#427DA2]  font-bold  px-1 rounded focus:outline-none focus:shadow-outline text-lg mt-[-10px] ml-[175px] h-[30px] w-[200px]" type="button">Modificar</button>
                        </div>


                    </div>
                </div>
            )
        }

        else if (modoEstadoAnterior == 4) { //ESTADO PENDIENTE ENTREGa
            codigo = (
                <div className="mt-[30px] modalColor bg-white w-[600px] h-[340px] relative p-2 rounded">

                    <div className="rounded px-3 pt-1">
                        <button className="absolute ml-[550px] mt-[-5px]" onClick={() => cambioEstadoModalSoliMod(false)}><FontAwesomeIcon className="text-3xl text-red-500 " icon={faTimes}></FontAwesomeIcon></button>


                        <h1 className="textColor text-center text-3xl underline mb-[25px] mt-[5px] px-3"><strong>Modificacion de Pendiente Entrega</strong></h1>


                        <div className="mb-8 mt-[-20px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Rutbeneficiarioagr">
                                Rut Beneficiario
                            </label>
                            <input disabled value={rut} className="mb-[-10px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="RutBeneficiariomod" name="RutBeneficiariomod" type="text" placeholder="Rut"></input>
                        </div>

                        <div className="mb-6 mt-[-28px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Nombeneficiarioagr">
                                Beneficio
                            </label>
                            <input disabled value={beneficio} className="w-full mb-[-10px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor  leading-tight focus:outline-none focus:shadow-outline" id="NombresBeneficiariomod" name="NombresBeneficiariomod" type="text" placeholder="Nombres"></input>
                        </div>

                        <div className="mb-6 mt-[-20px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Edadbeneficiarioagr">
                                Fecha Creacion
                            </label>
                            <input disabled value={fechaInicio} className="w-2/4 inputColor shadow appearance-none border rounded  py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="EdadBeneficiariomod" name="EdadBeneficiariomod" type="text" placeholder="Fecha Incio"></input>
                        </div>

                        <div className="mb-6 absolute mt-[-80px] ml-[300px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Dirbeneficiarioagr">
                                Estado Final
                            </label>
                            <select id="estadoSelect" className="w-[260px]" value={estadoSeleccionado} onChange={manejarCambioSelect}>
                                <option value="2">Entregar</option>
                                <option value="3">Rechazar</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between absolute">
                            <button onClick={() => modiciarDatosSoli()} className="navbarColor text-white bg-[#427DA2]  font-bold  px-1 rounded focus:outline-none focus:shadow-outline text-lg mt-[-10px] ml-[175px] h-[30px] w-[200px]" type="button">Modificar</button>
                        </div>


                    </div>
                </div>
            )
        }
    }







    //@ts-ignore
    const [cargando, setCargando] = useState(false);

    const obtenerDatosSoli = async () => {
        setCargando(true);
        axios({
            method: "post",
            data: {
                idsoli: idmod
            },
            url: "http://localhost:3001/dideco/solicitudes/listandoMod",
            withCredentials: true
        }).then((response) => {

            setCargando(false);
            console.log(response.data);

            console.log(response.data.rutB);

            setRut(response.data.rutB);
            setBenefcio(response.data.idBene);
            const fechaUno: string = response.data.fechaI;
            const fechaFormateada = fechaUno.toString().slice(0, 10);
            setFechaInicio(fechaFormateada);
            const fechaDos: string = response.data.fechaF;
            const fechaFormateadaDos = (fechaDos ?? "").toString().slice(0, 10);
            setFechaFinal(fechaFormateadaDos);
            setObservacion(response.data.observacion);
        })
    }


    useEffect(() => {
        if (estadoModalSoliMod === true) {
            obtenerDatosSoli();
        }
        if (estadoModalSoliMod === false) {
            setRut("");
            setBenefcio("");
            setFechaInicio("");
            setFechaFinal("");
            setObservacion("");
        }
    }, [estadoModalSoliMod])



    const [estadoIn, setEstadoIn] = useState(false);
    const [soliRec, setSoliRec] = useState(false);

    const [favorT1, setFavorT1] = useState(false);
    const [favorT2, setFavorT2] = useState(false);


    const [errorT1, setErrorT1] = useState(false);
    const [errorT2, setErrorT2] = useState(false);


    const modiciarDatosSoli = () => {
        console.log(estadoSeleccionado);
        axios({
            method: "put",
            data: {
                idsolicitud: idmod,
                estadoNuevo: estadoSeleccionado,
                observacion: observacion
            },
            url: "http://localhost:3001/dideco/solicitudes/modificandoSolicitud",
            withCredentials: true
        }).then((response) => {
            const mensaje = response.data.message;

            if (mensaje == "SROE") {
                setEstadoIn(true);
            }
            else if (mensaje == "SR" || mensaje == "SRS") {//RECHAZOS
                setSoliRec(true);
            }
            else if (mensaje == "T1EE4" || mensaje == "T1EE2" || mensaje == "T1EEENT") { //ERROR PENDIENTE ENTREGA O ENTREGA T1
                setErrorT1(true);
            }
            else if (mensaje == "ERENT" || mensaje == "ER" || mensaje == "ER4") { //ENTREGA O PENDIENTE ENTREGA REALIZADA CON EXITO T1
                setFavorT1(true);
            }
            else if (mensaje == "T2EE4" || mensaje == "T2ER2" || mensaje == "T2EEENT") { //ERROR PENDIENTE ENTREGA O ENTREGA T2
                setErrorT2(true);
            }
            else if (mensaje == "T2ERENT" || mensaje == "T2ER2" || mensaje == "T2ER4") { //ENTREGA O PENDIENTE ENTREGA REALZIADA CON EXITO T2
                setFavorT2(true);
            }

        })
    }






    return (
        <>
            {estadoModalSoliMod &&
                <div className="z-50 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 fixed items-center justify-center flex">

                    {codigo}

                    <RespuestaSolEnt estadoRespuestaSolEnt={estadoIn} cambioEstadoRespuestaSolEnt={setEstadoIn}></RespuestaSolEnt>
                    <RespuestaSolRec estadoRespuestaSolRec={soliRec} cambioEstadoRespuestaSolRec={setSoliRec}></RespuestaSolRec>


                    <RespuestaUno estadoRespuestaSolRec={errorT1} cambioEstadoRespuestaSolRec={setErrorT1}></RespuestaUno>
                    <RespuestaTres estadoRespuestaSolRec={errorT2} cambioEstadoRespuestaSolRec={setErrorT2}></RespuestaTres>

                    <RespuestaDos estadoRespuestaBloq={favorT1} cambioEstadoRespuestaBloq={setFavorT1}></RespuestaDos>
                    <RespuestaCuatro estadoRespuestaBloq={favorT2} cambioEstadoRespuestaBloq={setFavorT2}></RespuestaCuatro>

                </div>
            }
        </>
    )
}