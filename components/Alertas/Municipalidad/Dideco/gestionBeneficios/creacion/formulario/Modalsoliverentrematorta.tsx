import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import PieChart from "../../graficos/graficoTorta";

interface Props {
    estadoModalSoliVerEntreMA: boolean,
    cambioestadoModalSoliVerEntreMA: (nuevoValor: boolean) => void,
    anio: any,
    mes: any
}


export default function ModalSoliVerEntreMATorta({ estadoModalSoliVerEntreMA, cambioestadoModalSoliVerEntreMA, anio, mes }: Props) {

    const anioo = anio;
    const mess = mes;

    //@ts-ignore
    const [solicitudesEntre, setSolicitudesEntre] = useState([]);

    const obtenerSolicitudesEntregadas = () => {
        axios({
            method: "post",
            data: {
                anioConsulta: anioo,
                mesConsulta: mess,
            },
            url: "http://localhost:3001/dideco/solicitudes/entregasMAtorta",
            withCredentials: true
        }).then((response) => {
            const data = response.data;
            setSolicitudesEntre(data);
            const distribucionBeneficios = obtenerDistribucion(data);
            setDistribucionBeneficios(distribucionBeneficios);
        })
    }

    const [distribucionBeneficios, setDistribucionBeneficios] = useState({});


    const obtenerDistribucion = (solicitudes :any) => {
        const distribucion = {};
        solicitudes.forEach((solicitud :any) => {
            const idBeneficio = solicitud.idbeneficiosol;
            //@ts-ignore
            distribucion[idBeneficio] = (distribucion[idBeneficio] || 0) + 1;
        });
        return distribucion;
    };


    useEffect(() => {
        if (estadoModalSoliVerEntreMA == true) {
            obtenerSolicitudesEntregadas();
            cambioMes();
        }
    }, [estadoModalSoliVerEntreMA])


   







    

    const [mesEscrito, setMesEscrito] = useState<string>();

    const cambioMes = () => {

        if (mess == "01" || mess == "1") {
            setMesEscrito("Enero")
        }
        if (mess == "02" || mess == "2") {
            setMesEscrito("Febrero")
        }
        if (mess == "03" || mess == "3") {
            setMesEscrito("Marzo")
        }
        if (mess == "04" || mess == "4") {
            setMesEscrito("Abril")
        }
        if (mess == "05" || mess == "5") {
            setMesEscrito("Mayo")
        }
        if (mess == "06" || mess == "6") {
            setMesEscrito("Junio")
        }
        if (mess == "07" || mess == "7") {
            setMesEscrito("Julio")
        }
        if (mess == "08" || mess == "8") {
            setMesEscrito("Agosto")
        }
        if (mess == "09" || mess == "9") {
            setMesEscrito("Septiembre")
        }
        if (mess == "10") {
            setMesEscrito("Octubre")
        }
        if (mess == "11") {
            setMesEscrito("Noviembre")
        }
        if (mess == "12") {
            setMesEscrito("Diciembre")
        }
    }




    return (
        <>
            {estadoModalSoliVerEntreMA &&

                <div className="z-10 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 fixed items-center justify-center flex">
                    <div className="mt-[18px] modalColor bg-white w-[1000px] h-[600px] relative p-2 rounded">

                        <button className="absolute ml-[950px] mt-[-10px]" onClick={() => cambioestadoModalSoliVerEntreMA(false)}><FontAwesomeIcon className="text-3xl colorX" icon={faTimes}></FontAwesomeIcon></button>

                        <h1 className="textColor text-4xl mt-[10px] text-center"><strong>Entregadas {mesEscrito}, {anio}</strong></h1>


                        <div className="mt-[40px] w-[400px] ml-[300px]">
                        <PieChart data={distribucionBeneficios}></PieChart>

                        </div>



                    </div>
                </div>
            }
        </>
    )
}