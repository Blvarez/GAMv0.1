import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import React from "react";
import InfoIcon from '@mui/icons-material/Info';
import { IconButton } from "@mui/material";
import VentanaModSoli from "../../modificacion/Modalsolicitudmod";

interface Props {
    estadoModalSoliVerEntreMA: boolean,
    cambioestadoModalSoliVerEntreMA: (nuevoValor: boolean) => void,
    anio: any,
    mes: any,
    id:any
}


export default function ModalSoliVerEntreMA({ estadoModalSoliVerEntreMA, cambioestadoModalSoliVerEntreMA, anio, mes, id }: Props) {

    const anioo = anio;
    const mess = mes;
    const idB = id;

    const [solicitudesEntre, setSolicitudesEntre] = useState([]);

    const obtenerSolicitudesEntregadas = () => {
        axios({
            method: "post",
            data: {
                anioConsulta: anioo,
                mesConsulta: mess,
                beneficio:idB
            },
            url: "http://localhost:3001/dideco/solicitudes/entregasMA",
            withCredentials: true
        }).then((response) => {
            const data = response.data;
            setSolicitudesEntre(data);
        })
    }


    useEffect(() => {
        if (estadoModalSoliVerEntreMA == true) {
            obtenerSolicitudesEntregadas();
            cambioMes();
        }
    }, [estadoModalSoliVerEntreMA])


    const columnaLector = [
        {
            name: "idsolicitud",
            label: "ID",
            options: {
                filter: false
            }
        },
        {
            name: "rutbeneficiariosol",
            label: "RUT BENEFICIARIO",
            options: {
                filter: true
            }
        },
        {
            name: "idbeneficiosol",
            label: "BENEFICIO",
            options: {
                filter: true,
            }
        },
        {
            name: "estadosol",
            label: "ESTADO",
            options: {
                filter: false,
                //@ts-ignore
                customBodyRender: (value, tableMeta) => {
                    const estado = parseInt(value, 10);

                    let buttonText = "";

                    let buttonColor = "";
                    if (estado === 1) {
                        buttonText = "Pendiente a Evaluacion";
                        buttonColor = "brown";
                    } else if (estado === 2) {
                        buttonText = "Entregado";
                        buttonColor = "green";
                    }
                    else if (estado === 3) {
                        buttonText = "Rechazado";
                        buttonColor = "red";
                    }
                    else if (estado === 4) {
                        buttonText = "Pendiente Entrega";
                        buttonColor = "yellow";
                    }

                    return (
                        <button className="rounded-t-xl rounded-b-xl p-2"
                            style={{ backgroundColor: buttonColor }}
                            disabled={true}
                        >
                            {buttonText}
                        </button>
                    );
                },
            },
        },
        {
            name: "mostrar",
            label: "",
            options: {
                filter: false,
                customHeadRender: (columnMeta: any) => {
                    return (
                        <th key={columnMeta.name}>
                            <InfoIcon className="text-blue-500"></InfoIcon>
                        </th>
                    )
                },
                //@ts-ignore
                customBodyRender: (value: any, tableMeta: any) => {
                    const id: number = tableMeta.rowData[0];
                    return (
                        <div className="text-center">
                            <IconButton onClick={() => mostrarSolicitud(id)}><InfoIcon className="text-blue-500" /></IconButton>
                        </div>
                    )
                }
            }

        }
    ]


    const [idPE, setIDPE] = useState<number>();
    const [lector, setLector] = useState<number>();
    const [estadoAnt, setEstadoAnt] = useState<number>();

    const [ventanaModSoli, setVentanaModSoli] = useState(false);

    const obtenerEstado = async (idNumero: number) => {
        try {
            await axios({
                method: "post",
                data: {
                    solicitud: idNumero
                },
                url: "http://localhost:3001/dideco/solicitudes/obtenerEstadoSoli",
                withCredentials: true
            }).then((response) => {
                const mensaje: string = response.data.message;
                if (mensaje == "POST") {
                    setEstadoAnt(1);
                }
                else if (mensaje == "ENT") {
                    setEstadoAnt(2);
                }
                else if (mensaje == "RE") {
                    setEstadoAnt(3);
                }
                else if (mensaje == "Pend") {
                    setEstadoAnt(4);
                }
            })
        } catch (error) {
            console.error("Error al obtener el estado:", error);
        }

    }

    function mostrarSolicitud(id: number) {
        setIDPE(id);
        setLector(1);
        obtenerEstado(id).then(() => {
            setVentanaModSoli(true);
            console.log("Esta será la función para mostrar información de Solicitud", id);
        });
    }



    const opciones: any = {
        selectableRows: "none",
        print: false,
        download: false,
        rowsPerPage: 4,
        rowsPerPageOptions: [4],
        viewColumns: false,
        filter: true, textLabels: {
            body: {
                noMatch: "No se encontraron registros",
                toolTip: "Ordenar",
            },
            pagination: {
                next: "Siguiente",
                previous: "Anterior",
                rowsPerPage: "Filas por página:",
                displayRows: "de",
            },
            toolbar: {
                search: "Buscar",
                downloadCsv: "Descargar CSV",
                print: "Imprimir",
                viewColumns: "Ver Columnas",
                filterTable: "Filtrar Tabla",
            },
            filter: {
                all: "Todos",
                title: "FILTROS",
                reset: "RESETEAR",
            },
            viewColumns: {
                title: "Mostrar Columnas",
                titleAria: "Mostrar/Ocultar Columnas de la Tabla",
            },
            selectedRows: {
                text: "fila(s) seleccionada(s)",
                delete: "Eliminar",
                deleteAria: "Eliminar filas seleccionadas",
            },
        },
    }

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

                        <MUIDataTable data={solicitudesEntre} columns={columnaLector} options={opciones} title="Solicitudes" />


                        <button className="navbarColor text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-[480px] ml-[420px] w-[100px] absolute" onClick={() => cambioestadoModalSoliVerEntreMA(false)} type="button">Aceptar</button>

                    </div>
                    <VentanaModSoli estadoAnterior={estadoAnt} estadoModalSoliMod={ventanaModSoli} cambioEstadoModalSoliMod={setVentanaModSoli} lector={lector} idsoli={idPE}></VentanaModSoli>
                </div>
            }
        </>
    )
}