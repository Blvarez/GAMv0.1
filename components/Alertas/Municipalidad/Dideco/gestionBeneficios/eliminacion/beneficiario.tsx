import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";
import axios from "axios";
import RespuestaEliminacionBeneficiario from "./respuestraEliminacionBeneficiario";

interface Props {
    estadoModalBeneficiarioEli: boolean,
    cambioestadoModalBeneficiarioEli: (nuevoDato: boolean) => void,
    rutBeneficiario: any
}


export default function EliminacionBeneficiarios({ estadoModalBeneficiarioEli, cambioestadoModalBeneficiarioEli, rutBeneficiario }: Props) {


    const [error, setError] = useState<number>();
    const [estadoRespuesta, setEstadoRespuesta] = useState(false);

    const rutEliminar = rutBeneficiario;

    console.log(rutEliminar + "Aca estoy en modal eliminar")

    const eliminarBeneficiario = () => {
        console.log("aca estamos eliminando")
        axios({
            method: "delete",
            data: {
                rutBeneficiario: rutEliminar
            },
            url: "http://localhost:3001/dideco/beneficiarios/eliminarbeneficiario",
            withCredentials: true
        }).then((response) => {
            const mensaje = response.data.message;
            if (mensaje == "NES") { //NO ELIMINAR TIENE SOLICITUDES
                setEstadoRespuesta(true);
                setError(2);
            }
            else if (mensaje == "ECE") { //ELIMINADO CON EXITO
                setEstadoRespuesta(true);
                setError(1);
            }
            
        })
    }




    return (
        <>
            {estadoModalBeneficiarioEli &&
                <div className="z-50 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 fixed items-center justify-center flex">
                    <div className="modalColor bg-white w-[550px] h-[240px] relative p-2 rounded">

                        <button onClick={() => cambioestadoModalBeneficiarioEli(false)} className="absolute ml-[500px] mt-[-8px] "><FontAwesomeIcon className="text-3xl text-red-500" icon={faTimes}></FontAwesomeIcon></button>

                        <h1 className="text-[#003352] text-center text-3xl underline px-3 mt-[25px]"><strong>Eliminando Beneficiario</strong></h1>
                        <h2 className="text-[#427DA2] text-center text-xl mt-[20px]">Esta de Seguro de Eliminar el Beneficiario</h2>
                        <h2 className="text-[#427DA2] text-center text-xl mt-[5px]">RUT: {rutEliminar}</h2>
                        <div>
                            <button onClick={eliminarBeneficiario} className="bg-[#427DA2] flex items-center justify-between absolute text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg mt-[20px] ml-[120px]" type="button">
                                SI
                            </button>

                            <button onClick={() => cambioestadoModalBeneficiarioEli(false)} className="bg-[#427DA2]  flex items-center justify-between absolute text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg mt-[20px] ml-[360px]" type="button">
                                NO
                            </button>
                        </div>

                    <RespuestaEliminacionBeneficiario estadoRespuestaEliminacion={estadoRespuesta} cambioEstadoRespuestaEliminacion={setEstadoRespuesta} rut={rutEliminar} error={error}/>

                    </div>
                </div>
            }
        </>
    )
}