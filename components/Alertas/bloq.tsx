import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";


interface Props {
    estadoRespuestaBloq: boolean,
    cambioEstadoRespuestaBloq: (nuevoValor: boolean) => void,
    rutt: any,
}

export default function RespuestaBloq({ estadoRespuestaBloq, cambioEstadoRespuestaBloq, rutt }: Props) {


    const rut = rutt;

 
    const cerrar = () => {
        cambioEstadoRespuestaBloq(false);
    }



    return (

        <>
            {estadoRespuestaBloq &&
                <div className="w-screen h-screen bg-black bg-opacity-40 top-0 left-0 fixed items-center justify-center flex">

                    <div className="modalColor bg-white w-[450px] h-[340px] relative p-2 rounded">

                        <h1 className="ml-[145px] mt-[15px] text-[]"><FontAwesomeIcon icon={faTimesCircle} className="colorX text-9xl" /></h1>
                        <button className="absolute ml-[405px] mt-[-150px] " onClick={cerrar}><FontAwesomeIcon className="text-3xl text-red-500" icon={faTimes}></FontAwesomeIcon></button>

                        <h1 className="mt-[10px] text-center text-xl"><strong>Usuario Rut: {rut}</strong></h1>
                        <h1 className="text-center text-xl"><strong>No puede inciar Sesion</strong></h1>
                        <h1 className="text-center"><strong>Municipaldiad Bloqueada</strong></h1>
                        <button className="bg-[#427DA2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-[165px] mt-[20px]" onClick={cerrar} type="button">Aceptar</button>
                    </div>
                </div>
            }
        </>

    )
}