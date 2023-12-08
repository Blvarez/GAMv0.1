import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import RespuestaModificacionBeneficio from "./respuestaModificacionBeneficio";


interface Props {
    estadoModalBeneficioMod: boolean,
    cambioEstadoModalBeneficioMod: (nuevoEstado: boolean) => void,
    idmodbeneficio: any,
    lector: any

}



export default function VentanaModBeneficio({ estadoModalBeneficioMod, cambioEstadoModalBeneficioMod, idmodbeneficio, lector }: Props) {

    const idModificar = idmodbeneficio;
    const modoLector = lector;



    const [idBeneficioMod, setIdBeneficioMod] = useState("");
    const [nombreTipoBeneMod, setNombreTipoBeneMod] = useState<any>("");
    const [descripcionTipoBeneMod, setDescripcionTipoBeneMod] = useState<any>("");
    const [stockBeneMod, setStockBeneMod] = useState<any>("");
    const [nombreCantMod, setNombreCantMod] = useState<any>("");
    const [estadoBeneficio, setEstadoBeneficio] = useState<any>("");

    const [respuestaMod, setRespuestaMod] = useState(false);
    const [error, setError] = useState<number>();



    //@ts-ignore
    const [cargando, setCargando] = useState(false);

    const obtenerDatosBeneficio = async () => {
        setCargando(true);
        axios({
            method: "post",
            data: {
                idbene: idModificar
            },
            url: "http://localhost:3001/dideco/beneficios/obtenerTipoBeneficio",
            withCredentials: true
        }).then((response) => {

            setCargando(false);
            console.log(response.data);
            setIdBeneficioMod(idmodbeneficio);
            setNombreTipoBeneMod(response.data.nombreTipoBeneficio);
            setDescripcionTipoBeneMod(response.data.descripcionTipoBeneficio);

            setStockBeneMod(response.data.stockBeneficio || "");
            setNombreCantMod(response.data.cantidadA);
            setEstadoBeneficio(response.data.estadoBeneObtencion);
            console.log(estadoBeneficio)

        })
    }


    useEffect(() => {
        if (estadoModalBeneficioMod === true) {
            obtenerDatosBeneficio();
        }
        if (estadoModalBeneficioMod === false) {
            setIdBeneficioMod("");
            setNombreTipoBeneMod("");
            setDescripcionTipoBeneMod("");
            setStockBeneMod("");
            setNombreCantMod("");
            setEstadoBeneficio("");
        }
    }, [estadoModalBeneficioMod])

    const modiciarDatosBeneficio = () => {
        axios({
            method: "put",
            data: {
                stockbeneficio: stockBeneMod,
                idbene: idModificar
            },
            url: "http://localhost:3001/dideco/beneficios/modificarBeneificio",
            withCredentials: true
        }).then((response) => {
            const mensaje = response.data.message;
            if (mensaje == "BAE") {
                setError(1);
                setRespuestaMod(true);
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
                    Stock
                </label>
                <input value={stockBeneMod} onChange={(e) => setStockBeneMod(e.target.value)} className="mb-n10 inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor mb-3 leading-tight focus:outline-none focus:shadow-outline" id="nomtumod" name="nomtumod" type="number" min="1" max="9999999999" placeholder="Stock"></input>
            </div>
        )
        botonModificar = (
            <div className="flex items-center justify-between absolute">
                <button onClick={modiciarDatosBeneficio} className="navbarColor text-white bg-[#427DA2] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg mt-[-10px] ml-[210px]" type="button">
                    Modificar
                </button>
            </div>
        )
        tituloModificar = (
            <>
                <h1 className="textColor text-center text-3xl underline mb-[25px] mt-[15px] px-3"><strong>Modificacion de Beneficio</strong></h1>
            </>
        )

    }
    else if (modoLector == 2) {
        stockCambiante = (
            <div className="mb-6 mt-[-20px]">
                <label className="block textColor text-lg font-bold" htmlFor="EstadoBeneficio">
                    Stock
                </label>
                <input disabled value={stockBeneMod} onChange={(e) => setStockBeneMod(e.target.value)} className="mb-n10 inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor mb-3 leading-tight focus:outline-none focus:shadow-outline" id="nomtumod" name="nomtumod" type="number" min="1" max="9999999999" placeholder="Nombre Tipo Usuario"></input>
            </div>
        )
        tituloModificar = (
            <>
                <h1 className="textColor text-center text-3xl underline mb-[25px] mt-[15px] px-3"><strong>Informacion de Beneficio</strong></h1>
            </>
        )

    }



    return (
        <>
            {estadoModalBeneficioMod &&
                <div className="z-50 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 fixed items-center justify-center flex">
                    <div className="mt-[30px] modalColor bg-white w-[600px] h-[580px] relative p-2 rounded">

                        {tituloModificar}

                        <button className="absolute ml-[550px] mt-[-85px]" onClick={() => cambioEstadoModalBeneficioMod(false)}><FontAwesomeIcon className="text-3xl colorX" icon={faTimes}></FontAwesomeIcon></button>

                        <form className="rounded px-3 pt-1">

                            <div className="mb-8 mt-[-20px]">
                                <label className="block textColor text-lg font-bold" htmlFor="IdBeneficio">
                                    Id
                                </label>
                                <input disabled value={idBeneficioMod} className="mb-[-10px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="idtumod" name="idtumod" type="text" placeholder="Id Tipo Usuario"></input>
                            </div>

                            <div className="mb-6 mt-[-20px]">
                                <label className="block textColor text-lg font-bold" htmlFor="NomBeneficio">
                                    Nombre
                                </label>
                                <input disabled defaultValue={nombreTipoBeneMod} onChange={(e) => setNombreTipoBeneMod(e.target.value)} className="mb-n10 inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor mb-3 leading-tight focus:outline-none focus:shadow-outline" id="nomtumod" name="nomtumod" type="text" placeholder="Nombre Tipo Usuario"></input>
                            </div>

                            <div className="mb-8 mt-[-20px]">
                                <label className="block textColor text-lg font-bold" htmlFor="DescBeneficio">
                                    Descripcion
                                </label>
                                <input disabled defaultValue={descripcionTipoBeneMod} onChange={(e) => setDescripcionTipoBeneMod(e.target.value)} className="inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="desctumod" name="desctumod" type="text" placeholder="Descripcion Tipo Usuario"></input>
                            </div>

                            {stockCambiante}

                            <div className="mb-8 mt-[-20px]">
                                <label className="block textColor text-lg font-bold" htmlFor="StockBeneficio">
                                    Tipo Entrega
                                </label>
                                <input disabled value={nombreCantMod} className="inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="desctumod" name="desctumod" type="text" placeholder="Descripcion Tipo Usuario"></input>
                            </div>

                            <div className="mb-6 mt-[-20px]">
                                <label className="block textColor text-lg font-bold" htmlFor="CantidadPAnual">
                                    Tipo de Estado Solicitud
                                </label>
                                <input disabled value={estadoBeneficio} className="mb-n10 inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor mb-3 leading-tight focus:outline-none focus:shadow-outline" id="nomtumod" name="nomtumod" type="text" placeholder="Nombre Tipo Usuario"></input>
                            </div>

                        </form>
                        {botonModificar}
                    </div>
                <RespuestaModificacionBeneficio estadoRespuestaEliminacion={respuestaMod} cambioEstadoRespuestaEliminacion={setRespuestaMod} id={idBeneficioMod} error={error}/>
                </div>
            }
        </>
    )
}