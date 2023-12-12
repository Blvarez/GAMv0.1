import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ModalSoliVerEntreA from "./Modalsoliverentrea";
import RespuestaBsq from "../../graficos/nohayresul";
import RespuestaGramatica from "../../graficos/gramaticaerr";
import ModalSoliVerEntreMA from "./Modalsoliverentrema";

interface Props {
    estadoModalSoliConsEntre: boolean,
    cambioEstadoModalSoliConsEntre: (nuevoValor: boolean) => void,
}

export default function ModalSoliConsEntre({ estadoModalSoliConsEntre, cambioEstadoModalSoliConsEntre }: Props) {
    
    

    const [fechaMes, setFechaMes] = useState<string | undefined>();
    const [fechaAnio, setFechaAnio] = useState<string | undefined>();

    const [datosBene, setDatosBene] = useState();
    const [beneficioSelect, setBeneficioSelect] = useState(); //Este va al back

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
                idBeneficio: beneficioSelect
            },
            url: "http://localhost:3001/dideco/solicitudes/verificacionEntre",
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

    const obtencionDatosBeneficios = async () => {
        await axios.get("http://localhost:3001/dideco/solicitudes/obtencionBeneficiosUni").then((response) => {  //CAMBIAR LA DIRECCION DE LA CONSULTA
            const datosBeneficios = response.data;
            setDatosBene(datosBeneficios);
        })
    }

    const seleccionBeneficio = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const opcionesSeleccionadas: any = Array.from(event.target.selectedOptions).map((option) => option.value);
        if (opcionesSeleccionadas != null) {
            setBeneficioSelect(opcionesSeleccionadas);
        }
        else {
            console.log("El valor es null o  undefined");
        }
    }

    useEffect(() => {
        if (estadoModalSoliConsEntre == true) {
            obtencionDatosBeneficios();
        }
    }, [estadoModalSoliConsEntre])

    return (
        <>
            {estadoModalSoliConsEntre &&
                <div className="z-50 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 fixed items-center justify-center flex">
                    <div className="modalColor bg-white w-[550px] h-[390px] relative p-2 rounded">
                        <button onClick={() => cambioEstadoModalSoliConsEntre(false)} className="absolute text-red-500 ml-[500px] mt-[-8px] ">
                            <FontAwesomeIcon className="text-3xl colorX" icon={faTimes}></FontAwesomeIcon>
                        </button>
                        <h1 className="text-[#427DA2] text-center text-3xl underline px-3 mt-[25px] mb-[20px]">
                            <strong>Imprimir Solicitudes Personalizadas</strong>
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

                        <div className="row-start-3 row-end-3 col-start-1 col-end-2 mt-[110px]">
                            <h1 className=" text-lg font-bold ml-[10px] text-[#427DA2] mt-[100px]">Beneficio</h1>
                            <select className="ml-[140px] row-start-3 row-end-4 mx-auto rounded-t-xl rounded-b-xl h-10 w-[330px] mt-[-10px]" multiple onChange={seleccionBeneficio}>
                                {datosBene &&
                                    //@ts-ignore
                                    datosBene.map((beneficio: any) => (
                                        <option key={beneficio.idbeneficio} value={beneficio.idbeneficio}>{beneficio.idbeneficio}</option>
                                    ))
                                }
                            </select>
                        </div>


                        <button
                            className="bg-[#003352] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-[140px] mt-[20px]"
                            onClick={verificacionSolicitudesEntre}
                            type="button"
                        >
                            Consultar Solicitudes
                        </button>
                    </div>
                    <ModalSoliVerEntreA estadoModalSoliVerEntreA={modalAnio} cambioEstadoModalSoliVerEntreA={setModalAnio} anio={fechaAnio} id={beneficioSelect}></ModalSoliVerEntreA>
                    <ModalSoliVerEntreMA estadoModalSoliVerEntreMA={modalMesAnio} cambioestadoModalSoliVerEntreMA={setModalMesAnio} mes={fechaMes} anio={fechaAnio} id={beneficioSelect}></ModalSoliVerEntreMA>
                    <RespuestaBsq estadoRespuesta={noexiste} cambioEstadoRespuesta={setNoexiste}/>
                    <RespuestaGramatica estadoRespuesta={errorGramatica} cambioEstadoRespuesta={setErrorGramatica}/>
                </div>
            }
        </>
    )
}
