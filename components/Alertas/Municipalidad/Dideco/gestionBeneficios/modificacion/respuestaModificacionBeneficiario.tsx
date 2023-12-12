import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";


interface Props {
    estadoRespuestaEliminacion: boolean,
    cambioEstadoRespuestaEliminacion: (nuevoValor: boolean) => void,
    rut: any,
    error: any
}

export default function RespuestaModificacionBeneficiario({ estadoRespuestaEliminacion, cambioEstadoRespuestaEliminacion, rut, error }: Props) {


    const rutt = rut;
    const errorr = error;

    const cierreEliminacion = () => {
        location.reload();
    }

    const cerrar = () => {
        cambioEstadoRespuestaEliminacion(false); 
    }

    let textoAbajo = null;
    if (errorr == 1) { 
        textoAbajo = (
            <div className="modalColor bg-white w-[450px] h-[310px] relative p-2 rounded">

                <h1 className="ml-[145px] mt-[15px]"><FontAwesomeIcon icon={faCheckCircle} className="text-[#003352] text-9xl" /></h1>
                <button className="absolute ml-[405px] mt-[-150px] " onClick={cierreEliminacion}><FontAwesomeIcon className="text-3xl text-red-500" icon={faTimes}></FontAwesomeIcon></button>

                <h1 className="mt-[10px] text-center text-xl text-[#427DA2]"><strong>Beneficiario de Rut: {rutt}</strong></h1>
                <h1 className="text-center text-[#427DA2]"><strong>Modfificado con Exito!!...</strong></h1>
                <button className="bg-[#003352] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-[165px] mt-[20px]" onClick={cierreEliminacion} type="button">Aceptar</button>
            </div>
        )
    }
    else if(errorr == 2){
        textoAbajo = ( //No se puede eliminar
            <div className="modalColor bg-white w-[450px] h-[340px] relative p-2 rounded">

                <h1 className="ml-[145px] mt-[15px]"><FontAwesomeIcon icon={faTimesCircle} className="colorX text-9xl" /></h1>
                <button className="absolute ml-[405px] mt-[-150px] " onClick={cerrar}><FontAwesomeIcon className="text-3xl colorX" icon={faTimes}></FontAwesomeIcon></button>

                <h1 className="mt-[10px] text-center text-xl"><strong>Beneficiario de Rut: {rutt}</strong></h1>
                <h1 className="text-center text-xl"><strong>No se puede Eliminar</strong></h1>
                <h1 className="text-center"><strong>Tiene Solicitudes este Beneficiario</strong></h1>
                <button className="navbarColor text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-[165px] mt-[20px]" onClick={cerrar} type="button">Aceptar</button>
            </div>
        )
    }


    return (

        <>
            {estadoRespuestaEliminacion&&
                <div className="w-screen h-screen bg-black bg-opacity-40 top-0 left-0 fixed items-center justify-center flex">

                    {textoAbajo}

                </div>
            }
        </>

    )
}