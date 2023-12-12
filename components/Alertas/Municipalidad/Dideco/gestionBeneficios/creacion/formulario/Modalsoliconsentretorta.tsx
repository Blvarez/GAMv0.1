import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";
import axios from "axios";
import RespuestaBsq from "../../graficos/nohayresul";
import RespuestaGramatica from "../../graficos/gramaticaerr";
import ModalSoliVerEntreATorta from "./Modalsoliverentreatorta";
import ModalSoliVerEntreMATorta from "./Modalsoliverentrematorta";


interface Props {
    estadoModalSoliConsEntre: boolean,
    cambioEstadoModalSoliConsEntre: (nuevoValor: boolean) => void,
}

export default function ModalSoliConsEntretorta({ estadoModalSoliConsEntre, cambioEstadoModalSoliConsEntre }: Props) {
    
    

    const [fechaMes, setFechaMes] = useState<string | undefined>();
    const [fechaAnio, setFechaAnio] = useState<string | undefined>();


    const [modalAnio, setModalAnio] = useState(false);
    const [modalMesAnio, setModalMesAnio] = useState(false);

    const [noexiste, setNoexiste] = useState(false);
    const [errorGramatica, setErrorGramatica] = useState(false);


    const verificacionSolicitudesEntre = () => {
        axios({
            method: "post",
            data: {
                mesFecha: fechaMes,
                anioFecha: fechaAnio,
            },
            url: "http://localhost:3001/dideco/solicitudes/verificacionEntretorta",
            withCredentials: true
        }).then((response) => {
            const mensaje = response.data.message;
            console.log(mensaje);
            if(mensaje === "SEA"){
                console.log("si existen entregas en ese anio")
                setModalAnio(true);
            }
            else if(mensaje === "SEAM"){
                console.log("Si existen entregas en ese anio y mes")
                setModalMesAnio(true);
            }
            else if(mensaje === "NEAM" || mensaje === "NEA"){
                console.log("No existen entregas en esas fechas")
                setNoexiste(true);
            }
            else if(mensaje === "IE"){
                console.log("Ingreso Errorneo")
                setErrorGramatica(true);
            }
        })
    }

   


    return (
        <>
            {estadoModalSoliConsEntre &&
                <div className="z-50 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 fixed items-center justify-center flex">
                    <div className="modalColor bg-white w-[550px] h-[300px] relative p-2 rounded">
                        <button onClick={() => cambioEstadoModalSoliConsEntre(false)} className="absolute text-red-500 ml-[500px] mt-[-8px] ">
                            <FontAwesomeIcon className="text-3xl colorX" icon={faTimes}></FontAwesomeIcon>
                        </button>
                        <h1 className="text-[#427DA2] text-center text-3xl underline px-3 mt-[25px] mb-[20px]">
                            <strong>Imprimir Tendencia Beneficios</strong>
                        </h1>
                        <div className="mb-8 mt-[5px] w-[230px] ml-[15px]">
                            <label className="absolute block text-[#427DA2] text-lg font-bold ml-[40px]" htmlFor="ClaveEli">
                                Mes:
                            </label>
                            <input
                                onChange={(e) => setFechaMes(e.target.value)}
                                className="absolute ml-[120px] w-[320px] mb-[-10px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline"
                                id="claveEli"
                                name="claveEli"
                                type="text"
                                placeholder="(Ej: 01, 1, 02, 2....)"
                            />
                        </div>
                        <div className="mb-8 mt-[5px] w-[230px] ml-[15px]">
                            <label className="absolute block text-[#427DA2] text-lg font-bold mt-[35px] ml-[40px]" htmlFor="ClaveEli">
                                Año:
                            </label>
                            <input
                                onChange={(e) => setFechaAnio(e.target.value)}
                                className="absolute mt-[35px] ml-[120px] w-[320px] mb-[-10px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline"
                                id="claveEli"
                                name="claveEli"
                                type="text"
                                placeholder="(Ej: 2022, 2023, 2024...)"
                            />
                        </div>

                     


                        <button
                            className="bg-[#003352] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-[140px] mt-[90px]"
                            onClick={verificacionSolicitudesEntre}
                            type="button"
                        >
                            Consultar Solicitudes
                        </button>
                    </div>
                    <ModalSoliVerEntreATorta estadoModalSoliVerEntreA={modalAnio} cambioEstadoModalSoliVerEntreA={setModalAnio} anio={fechaAnio} ></ModalSoliVerEntreATorta>
                    <ModalSoliVerEntreMATorta estadoModalSoliVerEntreMA={modalMesAnio} cambioestadoModalSoliVerEntreMA={setModalMesAnio} mes={fechaMes} anio={fechaAnio}></ModalSoliVerEntreMATorta>
                    <RespuestaBsq estadoRespuesta={noexiste} cambioEstadoRespuesta={setNoexiste}/>
                    <RespuestaGramatica estadoRespuesta={errorGramatica} cambioEstadoRespuesta={setErrorGramatica}/>
                </div>
            }
        </>
    )
}
