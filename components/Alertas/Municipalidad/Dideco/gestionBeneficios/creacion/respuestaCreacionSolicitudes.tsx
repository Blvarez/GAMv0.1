import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

interface Props {
    estadoCreacion: boolean,
    cambioEstadoCreacion: (nuevoEstado: boolean) => void,
    error: any,
    tipoDato: any,
    postent: any
}

export default function RespuestaCreacionSolicitud({ postent, tipoDato, estadoCreacion, cambioEstadoCreacion, error }: Props) {


    const tipoDat = tipoDato;
    const postulacionentrega = postent;
    const estadoCreacionn = estadoCreacion;
    const errorr = error;

    const cerrarActualizar = () => {
        location.reload();
    }

    let cambioTexto = null;



    function erroro(numero: number) {
        if (numero == 1) {
            cambioTexto = (
                <h1 className="text-center text-[#427DA2]"><strong>Creacion Exitosa..!</strong></h1>
            )
            return (
                <div>
                    <button className="absolute ml-[405px] mt-[-15px] text-red-500 w-[27px]" onClick={cerrarActualizar}>
                        <FontAwesomeIcon className="text-3xl colorX" icon={faTimes}></FontAwesomeIcon>
                        </button>
                    <h1 className="ml-[145px] mt-[15px] w-[180px] "><FontAwesomeIcon icon={faCheckCircle} className="text-[#003352] text-9xl" /></h1>
                    <h1 className="text-center text-2xl text-[#427DA2]"><strong>Creacion Exitosa....!</strong></h1>
                </div>
            )
        }
        else if (numero == 2) {
            cambioTexto = (
                <h1 className="text-center text-[#427DA2]"><strong>Ya Tiene Suficientes Entregas..!</strong></h1>
            )
            return (
                <div>
                    <button className="absolute ml-[405px] mt-[-70px] text-red-500 " onClick={() => { cambioEstadoCreacion(false) }}>
                        <FontAwesomeIcon className="text-9xl w-[30px]" icon={faTimes}></FontAwesomeIcon>
                    </button>
                    <h1 className="ml-[145px] mt-[15px]"><FontAwesomeIcon icon={faTimesCircle} className="text-[#003352] text-9xl" /></h1>
                    <h1 className="text-center text-2xl text-[#427DA2]"><strong>Ya Tiene Suficientes Entregas..!</strong></h1>
                </div>
            )
        }
        return null;
    }


    function tipoo(posen: number, tipo: any) {

        if (posen == 1 || tipo == 1) {
            return (
                <>
                    <h1 className="mt-[10px] text-center text-xl text-[#427DA2]"><strong>Solicitud de Postulacion Cuatrimestral</strong></h1>
                    <button className="navbarColor font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-[160px] mt-[20px] text-white bg-[#427DA2]" onClick={cerrarActualizar} type="button">Aceptar</button>
                </>
            )
        }
        else if (posen == 1 || tipo == 2) {
            return (
                <>
                    <h1 className="mt-[10px] text-center text-xl text-[#427DA2]"><strong>Solicitud de Postulacion Mensual</strong></h1>
                    <button className="navbarColor text-white bg-[#427DA2] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-[160px] mt-[3px]" onClick={() => { cambioEstadoCreacion(false) }} type="button">Aceptar</button>
                </>
            )
        }
        if (posen == 2 || tipo == 1) {
            return (
                <>
                    <h1 className="mt-[10px] text-center text-xl text-[#427DA2]"><strong>Solicitud de Entrega Cuatrimestral</strong></h1>
                    <button className="navbarColor font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-[160px] mt-[20px] text-white bg-[#427DA2]" onClick={cerrarActualizar} type="button">Aceptar</button>
                </>
            )
        }
        else if (posen == 2 || tipo == 2) {
            return (
                <>
                    <h1 className="mt-[10px] text-center text-xl text-[#427DA2]"><strong>Solicitud de Entrega Mensual</strong></h1>
                    <button className="navbarColor text-white bg-[#427DA2] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-[160px] mt-[3px]" onClick={() => { cambioEstadoCreacion(false) }} type="button">Aceptar</button>
                </>
            )
        }

        return null;
    }



    return (

        <>
            {estadoCreacionn &&
                <div className="z-50 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 fixed items-center justify-center flex">

                    <div className="modalColor bg-white w-[450px] h-[340px] relative p-2 rounded">

                        {erroro(errorr)}
                        {tipoo(postulacionentrega, tipoDat)}
                    </div>
                </div>
            }
        </>

    )
}