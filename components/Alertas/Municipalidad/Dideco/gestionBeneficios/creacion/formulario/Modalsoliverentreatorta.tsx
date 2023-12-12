import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import PieChart from "../../graficos/graficoTorta";



interface Props {
    estadoModalSoliVerEntreA: boolean,
    cambioEstadoModalSoliVerEntreA: (nuevoValor: boolean) => void,
    anio: any,
}   


export default function ModalSoliVerEntreATorta({ estadoModalSoliVerEntreA, cambioEstadoModalSoliVerEntreA, anio}: Props) {

    const anioo = anio;

    //@ts-ignore
    const [solicitudesEntre, setSolicitudesEntre] = useState([]);

    const obtenerSolicitudesEntregadas = () => {
        axios({
            method: "post",
            data: {
                anioConsulta: anioo,
            },
            url: "http://localhost:3001/dideco/solicitudes/entregasAtorta",
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
        if (estadoModalSoliVerEntreA == true) {
            obtenerSolicitudesEntregadas();
        }
    }, [estadoModalSoliVerEntreA])


   


  


    





    return (
        <>
            {estadoModalSoliVerEntreA &&

                <div className="z-10 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 fixed items-center justify-center flex">
                    <div className="mt-[18px] modalColor bg-white w-[1000px] h-[600px] relative p-2 rounded">

                        <button className="absolute ml-[950px] mt-[-10px]" onClick={() => cambioEstadoModalSoliVerEntreA(false)}><FontAwesomeIcon className="text-3xl colorX" icon={faTimes}></FontAwesomeIcon></button>

                        <h1 className="textColor text-4xl mt-[10px] text-center"><strong>Entregadas {anioo}</strong></h1>

                        <div className="mt-[40px] w-[400px] ml-[300px]">
                        <PieChart data={distribucionBeneficios}></PieChart>

                        </div>



                    </div>
                </div>
            }
        </>
    )
}