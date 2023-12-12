import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";


interface Props {
    estadoModalConsultaMod: boolean,
    cambioestadoModalConsultaMod: (nuevoEstado: boolean) => void,
    idconsultamod: any,
    lector: any

}



export default function VentanaModConsulta({ estadoModalConsultaMod, cambioestadoModalConsultaMod, idconsultamod, lector }: Props) {

    const idModificar = idconsultamod;
    const modoLector = lector;

    const [rutConsulta, setRutConsulta] = useState<string>();
    const [municipalidad, setMunicipalidad] = useState<string>();
    //@ts-ignore
    const [estadoConsulta, setEstadConsulta] = useState<number>();
    //@ts-ignore
    const [fechai, setFechai] =useState<string>();
    //@ts-ignore
    const [fechaf, setFechaf] = useState<string>();
    const [consulta, setConsulta] = useState<string>();

    const [respuestaC, setRespuestaC] = useState<string>();








    //@ts-ignore
    const [cargando, setCargando] = useState(false);

    const obtenerDatosConsulta = async () => {
        setCargando(true);
        axios({
            method: "post",
            data: {
                idconsulta: idModificar
            },
            url: "http://localhost:3001/listaConsultaGen",
            withCredentials: true
        }).then((response) => {

            setCargando(false);


            setRutConsulta(response.data.rutc);
            setMunicipalidad(response.data.munic);
            setEstadConsulta(response.data.estado);
            setFechai(response.data.fechai);
            setFechaf(response.data.fechaf);
            setConsulta(response.data.cons);
            setRespuestaC(response.data.resp);
        })
    }


    useEffect(() => {
        if (estadoModalConsultaMod === true) {
            obtenerDatosConsulta();
            
        }
        if (estadoModalConsultaMod === false) {
            setRutConsulta("");
            setMunicipalidad("");
            setEstadConsulta(0);
            setFechaf("");
            setFechai("");
            setConsulta("");
            setRespuestaC("");
        }
    }, [estadoModalConsultaMod])

 

    const modiciarDatosConsulta = () => {
        const estadoNuevo : number = 2;

        axios({
            method: "put",
            data: {
                id: idModificar,
                estado: estadoNuevo,
                respu: respuestaC
            },
            url: "http://localhost:3001/modificacionConsulta",
            withCredentials: true
        }).then((response) => {
            const mensaje = response.data.message;

            if (mensaje == "ME") { //MODIFICACION EXITOSA
                window.location.href = "./Municipalidades/consultas";
            }
            else if(mensaje == "IDR"){
                window.location.href = "./Municipalidades/consultas";

                console.log("Sin Modificacion")
            }
        })
    }

    let stockCambiante = null;
    let botonModificar = null;
    let tituloModificar = null;

    if (modoLector == 1) {
        stockCambiante = (
            <div className="mb-6 mt-[-20px]">
                <label className="block textColor text-lg font-bold" htmlFor="EstadoBeneficio">
                    Respuesta
                </label>
                <textarea defaultValue={respuestaC} onChange={(e) => setRespuestaC(e.target.value)} className="mb-n10 inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor mb-3 leading-tight focus:outline-none focus:shadow-outline" id="nomtumod" name="nomtumod" placeholder="Esperando Respuesta"></textarea>
            </div>
        )
        botonModificar = (
            <div className="flex items-center justify-between absolute">
                <button onClick={modiciarDatosConsulta} className="navbarColor text-white bg-[#427DA2] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg mt-[-10px] ml-[210px]" type="button">
                    Modificar
                </button>
            </div>
        )
        tituloModificar = (
            <>
                <h1 className="textColor text-center text-3xl underline mb-[25px] mt-[15px] px-3"><strong>Modificacion de Consulta</strong></h1>
            </>
        )

    }
    else if (modoLector == 2) {
        stockCambiante = (
            <div className="mb-6 mt-[-20px]">
                <label className="block textColor text-lg font-bold" htmlFor="EstadoBeneficio">
                    Respuesta
                </label>
                <textarea disabled defaultValue={respuestaC} onChange={(e) => setRespuestaC(e.target.value)} className="mb-n10 inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor mb-3 leading-tight focus:outline-none focus:shadow-outline" id="nomtumod" name="nomtumod" placeholder="Esperando Respuesta"></textarea>
            </div>
        )
        botonModificar = (
            <div className="flex items-center justify-between absolute">
                <button onClick={() => cambioestadoModalConsultaMod(false)} className="navbarColor text-white bg-[#427DA2] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg mt-[-10px] ml-[210px]" type="button">
                    Aceptar
                </button>
            </div>
        )
        tituloModificar = (
            <>
                <h1 className="textColor text-center text-3xl underline mb-[25px] mt-[15px] px-3"><strong>Informacion de Consulta</strong></h1>
            </>
        )

    }



    return (
        <>
            {estadoModalConsultaMod &&
                <div className="z-50 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 fixed items-center justify-center flex">
                    <div className="mt-[30px] modalColor bg-white w-[600px] h-[480px] relative p-2 rounded">

                        {tituloModificar}

                        <button className="absolute ml-[550px] mt-[-85px]" onClick={() => cambioestadoModalConsultaMod(false)}><FontAwesomeIcon className="text-3xl colorX" icon={faTimes}></FontAwesomeIcon></button>

                        <form className="rounded px-3 pt-1">

                            <div className="mb-8 mt-[-20px]">
                                <label className="block textColor text-lg font-bold" htmlFor="IdBeneficio">
                                    Rut
                                </label>
                                <input disabled value={rutConsulta} className="mb-[-10px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="idtumod" name="idtumod" type="text" placeholder="Id Tipo Usuario"></input>
                            </div>

                            <div className="mb-6 mt-[-20px]">
                                <label className="block textColor text-lg font-bold" htmlFor="NomBeneficio">
                                    Municipalidad
                                </label>
                                <input disabled defaultValue={municipalidad} onChange={(e) => setMunicipalidad(e.target.value)} className="mb-n10 inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor mb-3 leading-tight focus:outline-none focus:shadow-outline" id="nomtumod" name="nomtumod" type="text" placeholder="Municipalidad"></input>
                            </div>

                            <div className="mb-8 mt-[-20px]">
                                <label className="block textColor text-lg font-bold" htmlFor="DescBeneficio">
                                    Consulta
                                </label>
                                <textarea disabled defaultValue={consulta} onChange={(e) => setConsulta(e.target.value)} className="inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="desctumod" name="desctumod" placeholder="Consulta"></textarea>
                            </div>

                            {stockCambiante}

                           

                        </form>
                        {botonModificar}
                    </div>
                </div>
            }
        </>
    )
}