import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";


interface Props {
    estadoRespuesta: boolean,
    cambioEstadoRespuesta: (nuevoValor: boolean) => void,
}

export default function RespuestaGramatica({ estadoRespuesta, cambioEstadoRespuesta}: Props) {

 
    const cerrar = () => {
        cambioEstadoRespuesta(false);
    }



    return (

        <>
            {estadoRespuesta &&
                <div className="w-screen h-screen bg-black bg-opacity-40 top-0 left-0 fixed items-center justify-center flex">

                    <div className="modalColor bg-white w-[450px] h-[340px] relative p-2 rounded">

                        <h1 className="ml-[145px] mt-[15px] text-[]"><FontAwesomeIcon icon={faTimesCircle} className="colorX text-9xl" /></h1>
                        <button className="absolute ml-[405px] mt-[-150px] " onClick={cerrar}><FontAwesomeIcon className="text-3xl text-red-500" icon={faTimes}></FontAwesomeIcon></button>

                        <h1 className="mt-[10px] text-center text-xl"><strong>Error</strong></h1>
                        <h1 className="text-center"><strong>Ingreso de Datos</strong></h1>
                        <button className="bg-[#427DA2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-[165px] mt-[20px]" onClick={cerrar} type="button">Aceptar</button>
                    </div>
                </div>
            }
        </>

    )
}