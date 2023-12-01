import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";
import axios from "axios";
import RespuestaEliminacion from "./respuestaEliminacion";

interface Props {
    estadoModalBeneficioEli: boolean,
    cambioEstadoModalBeneficioEli: (nuevoDato: boolean) => void,
    idBeneficio: any
}


export default function EliminacionBeneficios({ estadoModalBeneficioEli, cambioEstadoModalBeneficioEli, idBeneficio }: Props) {


    const [error, setError] = useState<number>();
    const [estadoRespuesta, setEstadoRespuesta] = useState(false);

    const idEliminar = idBeneficio;

    console.log(idEliminar + "Aca estoy en modal eliminar")

    const eliminarBeneficio = () => {
        console.log("aca estamos eliminando")
        axios({
            method: "delete",
            data: {
                idbeneficio: idEliminar
            },
            url: "http://localhost:3001/dideco/beneficios/eliminacionBeneficios",
            withCredentials: true
        }).then((response) => {
            const mensaje = response.data.message;
            if (mensaje == "FBE") { //BENEFICIO TIENE UNA SOLICITUD
                setEstadoRespuesta(true);
                setError(2);
            }
            else if (mensaje == "BEE") { //BENEFICIO ELIMINADO EXITOSA
                setEstadoRespuesta(true);
                setError(1);
            }
            else if (mensaje == "NE") { //BENEFICIO NO EXISTE
                setEstadoRespuesta(true);
                setError(3);
            }
        })
    }




    return (
        <>
            {estadoModalBeneficioEli &&
                <div className="z-50 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 fixed items-center justify-center flex">
                    <div className="modalColor bg-white w-[550px] h-[240px] relative p-2 rounded">

                        <button onClick={() => cambioEstadoModalBeneficioEli(false)} className="absolute ml-[500px] mt-[-8px] "><FontAwesomeIcon className="text-3xl text-red-500" icon={faTimes}></FontAwesomeIcon></button>

                        <h1 className="text-[#003352] text-center text-3xl underline px-3 mt-[25px]"><strong>Eliminando Beneficio</strong></h1>
                        <h2 className="text-[#427DA2] text-center text-xl mt-[20px]">Esta de Seguro de Eliminar el Beneficio</h2>
                        <h2 className="text-[#427DA2] text-center text-xl mt-[5px]">ID: {idEliminar}</h2>
                        <div>
                            <button onClick={eliminarBeneficio} className="bg-[#427DA2] flex items-center justify-between absolute text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg mt-[20px] ml-[120px]" type="button">
                                SI
                            </button>

                            <button onClick={() => cambioEstadoModalBeneficioEli(false)} className="bg-[#427DA2]  flex items-center justify-between absolute text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg mt-[20px] ml-[360px]" type="button">
                                NO
                            </button>
                        </div>

                        <RespuestaEliminacion estadoRespuestaEliminacion={estadoRespuesta} cambioEstadoRespuestaEliminacion={setEstadoRespuesta} error={error} id={idEliminar}></RespuestaEliminacion>

                    </div>
                </div>
            }
        </>
    )
}