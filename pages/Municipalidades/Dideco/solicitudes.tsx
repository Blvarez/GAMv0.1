import Navbar from "../../../components/Navbar";
import SolicitudesMas from "../../../components/Alertas/Municipalidad/Dideco/gestionBeneficios/creacion/formulario/solicitudesmas";
import SolicitudesUni from "../../../components/Alertas/Municipalidad/Dideco/gestionBeneficios/creacion/formulario/solicitudesuni";
import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import InfoIcon from '@mui/icons-material/Info';
import axios from "axios";
import VentanaModSoli from "../../../components/Alertas/Municipalidad/Dideco/gestionBeneficios/modificacion/Modalsolicitudmod";
import RespuestaSolEnt from "../../../components/Alertas/Municipalidad/Dideco/gestionBeneficios/modificacion/respuestaSolEnt";
import ModalSoliConsEntre from "../../../components/Alertas/Municipalidad/Dideco/gestionBeneficios/creacion/formulario/Modalsoliconsentre";
import ModalSoliConsEntretorta from "../../../components/Alertas/Municipalidad/Dideco/gestionBeneficios/creacion/formulario/Modalsoliconsentretorta";

export default function solicitudes() {


    const permisos = 13;



    const [ModalSoliMasAgr, setModalSoliMasAgr] = useState(false);
    const [ModalSoliUniAgr, setModalSoliUniAgr] = useState(false);

    const [ventanaTorta, setVentanaTorta] = useState(false);

    const [datosSolicitudes, setDatosSolicitudes] = useState<any>();

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

    const columnas = [
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

        },
        {
            name: "modificar",
            label: "",
            options: {
                filter: false,
                customHeadRender: (columnMeta: any) => {
                    return (
                        <th key={columnMeta.name}>
                            <Edit className="text-yellow-500" />
                        </th>
                    )
                },
                //@ts-ignore
                customBodyRender: (value: any, tableMeta: any) => {
                    const id: number = tableMeta.rowData[0];
                    return (
                        <div className="text-center">
                            <IconButton onClick={() => modificarSolicitud(id)}><Edit className="text-yellow-500" /></IconButton>
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

    const [estadoIn, setEstadoIn] = useState(false);


    const obtenerEstadoMod = async (idNumero: number) => {
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
                    setVentanaModSoli(true);
                }
                else if (mensaje == "ENT") {
                    setEstadoAnt(2);
                    setEstadoIn(true);

                }
                else if (mensaje == "RE") {
                    setEstadoAnt(3);
                    setEstadoIn(true);

                }
                else if (mensaje == "Pend") {
                    setEstadoAnt(4);
                    setVentanaModSoli(true);
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


    function modificarSolicitud(id: number) {
        setIDPE(id);
        setLector(2);
        obtenerEstadoMod(id).then(() => {
            console.log("Esta será la función para modificacion de Solicitud", id);
        });
    }

    const obtencionSolicitudes = async () => {
        await axios.get("http://localhost:3001/dideco/solicitudes/obtencionSolicitudesC").then((response) => { //CAMBIAR LA DIRECCION DE LA CONSULTA   
            const datosSoli = response.data;
            setDatosSolicitudes(datosSoli);
        })
    }

    useEffect(() => {
        obtencionSolicitudes();
    }, []);


    //@ts-ignore
    let varianteVistaTabka = null;
    //@ts-ignore
    let varianteVistaCuerpo = null;

    const [verEntregasT, setVerEntregasT] = useState(false);




    if (permisos >= 30 || permisos > 3) {

        varianteVistaTabka = (
            <MUIDataTable data={datosSolicitudes} columns={columnas} options={opciones} title="Beneficiarios" />
        );
        varianteVistaCuerpo = (
            <div className="row-span-2 grid grid-rows-2 grid-cols-5 mt-[-15px]">

                <div className="row-start-1 row-end-1 grid grid-rows-4 col-start-2 col-end-2">
                    <button className="row-start-2 row-end-4 mx-auto text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px]" onClick={() => setModalSoliMasAgr(true)}>CREAR SOLICITUDES MASIVAS</button>
                </div>

                <div className="row-start-1 row-end-1 col-start-4 col-end-4 grid grid-rows-4 ">
                    <button className="row-start-2 row-end-4 mx-auto text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px]" onClick={() => setModalSoliUniAgr(true)}>CREAR SOLICITUDES UNITARIAS</button>
                </div>

                <div className="row-start-2 row-end-2 col-start-1 col-end-1 grid grid-rows-4">
                    <button className="row-start-2 row-end-4 mx-auto text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px]" onClick={() => setVerEntregasT(true)}>VER SOLICITUDES ENTREGADAS</button>
                </div>

                <div className="row-start-2 row-end-2 col-start-3 col-end-3 grid grid-rows-4">
                    <button className="row-start-2 row-end-4 mx-auto text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px]" onClick={() => setVentanaTorta(true)}>VER TENDENCIA BENEFICIOS</button>
                </div>

                <div className="row-start-2 row-end-2 col-start-5 col-end-5 grid grid-rows-4">
                    <button className="row-start-2 row-end-4 mx-auto text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px]" onClick={() => setModalSoliUniAgr(true)}>VER MAPEO SOLICITUDES</button>
                </div>


            </div>
        )
    }

    else if (permisos <= 3) { //LECTOR

        varianteVistaTabka = (
            <MUIDataTable data={datosSolicitudes} columns={columnaLector} options={opciones} title="Solicitudes" />
        );
        varianteVistaCuerpo = (
            <div className="row-span-2 grid grid-rows-2 grid-cols-5">

                <div className="row-start-1 row-end-1 col-start-1 col-end-5 grid grid-rows-4">
                    <h1 className="row-start-2 row-end-3 mx-auto text-white mt-[65px] text-3xl">SOLO LECTURA</h1>"

                </div>



                <div className="row-start-2 row-end-2 col-start-1 col-end-1 grid grid-rows-4">
                    <button className="row-start-2 row-end-4 mx-auto text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px]" onClick={() => setVerEntregasT(true)}>VER SOLICITUDES ENTREGADAS</button>
                </div>

                <div className="row-start-2 row-end-2 col-start-3 col-end-3 grid grid-rows-4">
                    <button className="row-start-2 row-end-4 mx-auto text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px]" onClick={() => setVentanaTorta(true)}>VER TENDENCIA BENEFICIOS</button>
                </div>

                <div className="row-start-2 row-end-2 col-start-5 col-end-5 grid grid-rows-4">
                    <button className="row-start-2 row-end-4 mx-auto text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px]" onClick={() => setModalSoliUniAgr(true)}>VER MAPEO SOLICITUDES</button>
                </div>


            </div>

        )
    }





    return (
        <>
            <div className="bg-[#427DA2] fixed inset-0">

                <Navbar ></Navbar>

                <div className="p-5">
                    <h1 className="text-white text-center text-[30px] underline"><strong>GESTION SOLICITUDES</strong></h1>
                </div>


                <div className="grid grid-rows-6 gap-2 w-[90%] h-[80%]  mx-auto bg-[#003352] bg-opacity-[53%] rounded-tl-[50px] rounded-br-[50px] ">

                    {varianteVistaCuerpo}
                    <div className="row-span-4 w-[90%] mx-auto mt-[-5px]">
                        {varianteVistaTabka}
                    </div>
                </div>
                <SolicitudesUni estadoModalSoliUniAgr={ModalSoliUniAgr} cambioEstadoModalSoliUniAgr={setModalSoliUniAgr}></SolicitudesUni>
                <SolicitudesMas estadoModalSoliMasAgr={ModalSoliMasAgr} cambioEstadoModalSoliMasAgr={setModalSoliMasAgr}></SolicitudesMas>

                <VentanaModSoli estadoAnterior={estadoAnt} estadoModalSoliMod={ventanaModSoli} cambioEstadoModalSoliMod={setVentanaModSoli} lector={lector} idsoli={idPE}></VentanaModSoli>

                <RespuestaSolEnt estadoRespuestaSolEnt={estadoIn} cambioEstadoRespuestaSolEnt={setEstadoIn}></RespuestaSolEnt>

                <ModalSoliConsEntre estadoModalSoliConsEntre={verEntregasT} cambioEstadoModalSoliConsEntre={setVerEntregasT}></ModalSoliConsEntre>

                <ModalSoliConsEntretorta estadoModalSoliConsEntre={ventanaTorta} cambioEstadoModalSoliConsEntre={setVentanaTorta}></ModalSoliConsEntretorta>
            </div>
        </>
    )
}