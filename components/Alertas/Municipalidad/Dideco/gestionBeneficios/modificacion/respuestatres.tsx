import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";


interface Props {
    estadoRespuestaSolRec: boolean,
    cambioEstadoRespuestaSolRec: (nuevoValor: boolean) => void,
}
//@ts-ignore
export default function RespuestaTres({ estadoRespuestaSolRec, cambioEstadoRespuestaSolRec }: Props) {


 
    const cerrar = () => {
        window.location.href = "/Municipalidades/Dideco/solicitudes";
    }



    return (

        <>
            {estadoRespuestaSolRec &&
                <div className="w-screen h-screen bg-black bg-opacity-40 top-0 left-0 fixed items-center justify-center flex">

                    <div className="modalColor bg-white w-[450px] h-[340px] relative p-2 rounded">

                        <h1 className="ml-[145px] mt-[15px] text-[]"><FontAwesomeIcon icon={faTimesCircle} className="text-[#427DA2] text-9xl" /></h1>
                        <button className="absolute ml-[405px] mt-[-150px] " onClick={cerrar}><FontAwesomeIcon className="text-3xl text-red-500" icon={faTimes}></FontAwesomeIcon></button>

                        <h1 className="mt-[10px] text-center text-xl"><strong>Solicitud Denegada</strong></h1>
                        <h1 className="text-center text-xl"><strong>Cuenta con entregas al maximo Mensual...!</strong></h1>
                        <button className="bg-[#427DA2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-[165px] mt-[20px]" onClick={cerrar} type="button">Aceptar</button>
                    </div>
                </div>
            }
        </>

    )
}