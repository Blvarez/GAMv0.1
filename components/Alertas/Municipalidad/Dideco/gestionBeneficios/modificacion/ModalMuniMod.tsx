import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";

interface Props {
    estadoModalMuniMod: boolean,
    cambioestadoModalMuniMod: (nuevoEstado: boolean) => void,
    vmuni: any,
    estadoAnterior: any,
    lector: any

}



export default function VentanaModMuni({ estadoModalMuniMod, cambioestadoModalMuniMod, vmuni, estadoAnterior, lector }: Props) {

    const valorMuni = vmuni;
    const modoLector = lector;
    const modoEstadoAnterior = estadoAnterior;

    const [estadoMunii, setEstadoMunii] = useState<number>();
    const [nombreMuni, setNombreMuni] = useState();


    const estadoBloque: string = "Bloqueada";
    const estadoDesbl: string = "Desbloqueada";






    let codigo = null;

    //LECTOR
    if (modoLector == 1) {//EDITAR

        if (modoEstadoAnterior == 1) { //DESBLOQUEADA
            codigo = (
                <div className="mt-[30px] modalColor bg-white w-[600px] h-[180px] relative p-2 rounded">

                    <div className="rounded px-3 pt-1">
                        <button className="absolute ml-[550px] mt-[-5px]" onClick={() => cambioestadoModalMuniMod(false)}><FontAwesomeIcon className="text-3xl text-red-500 " icon={faTimes}></FontAwesomeIcon></button>


                        <h1 className="textColor text-center text-3xl underline mb-[25px] mt-[5px] px-3"><strong>Modificacion Municipalidad</strong></h1>

                        <div className="mb-8 mt-[-20px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Rutbeneficiarioagr">
                                Nombre Municipalidad
                            </label>
                            <input disabled value={nombreMuni} className="mb-[-10px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="RutBeneficiariomod" name="RutBeneficiariomod" type="text" placeholder="Rut"></input>
                        </div>

                        <div className="flex items-center justify-between absolute">
                            <button onClick={() => modiciarDatosMuniBloquear()} className="navbarColor w-[300px] text-white bg-[#427DA2] font-bold  px-1 rounded focus:outline-none focus:shadow-outline text-lg mt-[-10px] ml-[125px] h-[30px]" type="button">Bloquear</button>
                        </div>

                        

                    </div>

                </div>
            )
        }
        else if (modoEstadoAnterior == 2) { //BLOQUEADA
            codigo = (
                <div className="mt-[30px] modalColor bg-white w-[600px] h-[180px] relative p-2 rounded">

                    <div className="rounded px-3 pt-1">
                        <button className="absolute ml-[550px] mt-[-5px]" onClick={() => cambioestadoModalMuniMod(false)}><FontAwesomeIcon className="text-3xl text-red-500" icon={faTimes}></FontAwesomeIcon></button>


                        <h1 className="textColor text-center text-3xl underline mb-[25px] mt-[5px] px-3"><strong>Modificacion Municipalidad</strong></h1>


                        <div className="mb-8 mt-[-20px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Rutbeneficiarioagr">
                                Nombre Municipalidad
                            </label>
                            <input disabled value={nombreMuni} className="mb-[-10px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="RutBeneficiariomod" name="RutBeneficiariomod" type="text" placeholder="Rut"></input>
                        </div>
                        <div className="flex items-center justify-between absolute">
                            <button onClick={() => modiciarDatosMuniDesbloquear()} className="navbarColor w-[300px] text-white bg-[#427DA2] font-bold  px-1 rounded focus:outline-none focus:shadow-outline text-lg mt-[-10px] ml-[125px] h-[30px]" type="button">Desbloquear</button>
                        </div>

                        

                    </div>

                </div>
            )
        }
    }

    else if (modoLector == 2) { //VISTA

        if (modoEstadoAnterior == 1) { //DESBLOQUEADA
            codigo = (
                <div className="mt-[30px] modalColor bg-white w-[600px] h-[300px] relative p-2 rounded">

                    <div className="rounded px-3 pt-1">
                        <button className="absolute ml-[550px] mt-[-5px]" onClick={() => cambioestadoModalMuniMod(false)}><FontAwesomeIcon className="text-3xl text-red-500 " icon={faTimes}></FontAwesomeIcon></button>


                        <h1 className="textColor text-center text-3xl underline mb-[25px] mt-[5px] px-3"><strong>Modificacion Municipalidad</strong></h1>

                        <div className="mb-8 mt-[-20px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Rutbeneficiarioagr">
                                Nombre Municipalidad
                            </label>
                            <input disabled value={nombreMuni} className="mb-[-10px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="RutBeneficiariomod" name="RutBeneficiariomod" type="text" placeholder="Rut"></input>
                        </div>

                        <div className="mb-8 mt-[-20px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Rutbeneficiarioagr">
                                Estado Municipalidad
                            </label>
                            <input disabled value={estadoDesbl} className="mb-[-10px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="RutBeneficiariomod" name="RutBeneficiariomod" type="text" placeholder="Rut"></input>
                        </div>

                        <div className="flex items-center justify-between absolute">
                            <button onClick={() => cambioestadoModalMuniMod(false)} className="navbarColor w-[300px] text-white bg-[#427DA2] font-bold  px-1 rounded focus:outline-none focus:shadow-outline text-lg mt-[-10px] ml-[125px] h-[30px]" type="button">Aceptar</button>
                        </div>

                    </div>

                </div>
            )
        }
        else if (modoEstadoAnterior == 2) { //BLOQUEADA
            codigo = (
                <div className="mt-[30px] modalColor bg-white w-[600px] h-[460px] relative p-2 rounded">

                    <div className="rounded px-3 pt-1">
                        <button className="absolute ml-[550px] mt-[-5px]" onClick={() => cambioestadoModalMuniMod(false)}><FontAwesomeIcon className="text-3xl text-red-500" icon={faTimes}></FontAwesomeIcon></button>


                        <h1 className="textColor text-center text-3xl underline mb-[25px] mt-[5px] px-3"><strong>Modificacion Municipalidad</strong></h1>


                        <div className="mb-8 mt-[-20px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Rutbeneficiarioagr">
                                Nombre Municipalidad
                            </label>
                            <input disabled value={nombreMuni} className="mb-[-10px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="RutBeneficiariomod" name="RutBeneficiariomod" type="text" placeholder="Rut"></input>
                        </div>
                        <div className="mb-8 mt-[-20px]">
                            <label className="block textColor text-lg font-bold" htmlFor="Rutbeneficiarioagr">
                                Estado Municipalidad
                            </label>
                            <input disabled value={estadoBloque} className="mb-[-10px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="RutBeneficiariomod" name="RutBeneficiariomod" type="text" placeholder="Rut"></input>
                        </div>


                        <div className="flex items-center justify-between absolute">
                            <button onClick={() => cambioestadoModalMuniMod(false)} className="navbarColor w-[300px] text-white bg-[#427DA2] font-bold  px-1 rounded focus:outline-none focus:shadow-outline text-lg mt-[-10px] ml-[125px] h-[30px]" type="button">Aceptar</button>
                        </div>

                    </div>

                </div>
            )
        }


    }







    //@ts-ignore
    const [cargando, setCargando] = useState(false);

    const obtenerDatosMuni = async () => {
        setCargando(true);
        axios({
            method: "post",
            data: {
                muni: valorMuni
            },
            url: "http://localhost:3001/obtencionDatosMunicipalesMod",
            withCredentials: true
        }).then((response) => {

            setCargando(false);

            setNombreMuni(response.data.nombree);

        })
    }


    useEffect(() => {
        if (estadoModalMuniMod === true) {
            obtenerDatosMuni();
        }
        if (estadoModalMuniMod === false) {

        }
    }, [estadoModalMuniMod])


    const modiciarDatosMuniBloquear = () => {
        console.log(valorMuni);
        const nuevoEstado : number = 2;
        setEstadoMunii(nuevoEstado);
        axios({
            method: "put",
            data: {
                munii: valorMuni,
                estadoN: nuevoEstado
            },
            url: "http://localhost:3001/modificandoMunicipalidad",
            withCredentials: true
        }).then((response) => {
            const mensaje = response.data.message;

            if(mensaje == "ME"){
                window.location.href = "/principalAdmin";
                console.log("Abrirventana de bloqueo")
            }


        })
    }

    const modiciarDatosMuniDesbloquear = () => {
        const nuevoEstado : number = 1;
        console.log(estadoMunii);
        setEstadoMunii(nuevoEstado);

        axios({
            method: "put",
            data: {
                munii: valorMuni,
                estadoN: nuevoEstado,
            },
            url: "http://localhost:3001/modificandoMunicipalidad",
            withCredentials: true
        }).then((response) => {
            const mensaje = response.data.message;

            if(mensaje == "ME"){
                window.location.href = "/principalAdmin";

                console.log("Abrirventana de desbloqueo")
            }



        })
    }






    return (
        <>
            {estadoModalMuniMod &&
                <div className="z-50 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 fixed items-center justify-center flex">

                    {codigo}

                </div>
            }
        </>
    )
}
