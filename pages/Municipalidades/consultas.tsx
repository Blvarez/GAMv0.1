import Navbar from "../../components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import MUIDataTable from "mui-datatables";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import InfoIcon from '@mui/icons-material/Info';
import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";
import VentanaModConsulta from "../../components/Alertas/Municipalidad/Dideco/gestionBeneficios/modificacion/Modalconsmod";


export default function consultas() {

    const [municipalidad, setMunicipalidad] = useState<string>("");
    const [permisos, setPermisos] = useState<number>(0);
    const [rut, setRut] = useState<string>("");

    const [consulta, setConsulta] = useState<string>();

    const [ventanaMod, setVentanaMod] = useState(false);
    const [lector, setLector] = useState<number>();
    const [idc, setIdc] = useState<number>();


    useEffect(() => {
        const cookie = new Cookies();

        const valorCookie = cookie.get("muni");
        console.log(valorCookie, "Este es el valor de la cookie");


        const valoresCookies: any = jwt.decode(valorCookie);


        if (valoresCookies == null) {
            window.location.href = "/";
        }
        else {
            const permisos = valoresCookies["permisosG"];

            console.log(permisos, "valorpermisos")

            if (permisos == 1000 || permisos == 0) {
                const rt = valoresCookies["rutG"];
                const muni = valoresCookies["nombreMunicipalidadG"];
                const permisos = valoresCookies["permisosG"];
                setRut(rt);
                setPermisos(permisos);
                setMunicipalidad(muni);
                consultaConsultas(muni);
            }
            else {
                window.location.href = "/";

                
            }
        }
    }, [])



    




  

    const consultaConsultas = async (mun : string) => {

        console.log(municipalidad, "Estado muni")

        axios({
            method: "post",
            data: {
                muni: mun
            },
            url: "http://localhost:3001/obtenerConsultas",
            withCredentials: true
        }).then((response) => {
            const datosConsultaa = response.data;
            setDatosConsultas(datosConsultaa);


        })
    }

    const agregarConsulta = async () => {

        axios({
            method: "post",
            data: {
                rut: rut,
                muni: municipalidad,
                consulta: consulta
            },
            url: "http://localhost:3001/crearConsulta",
            withCredentials: true
        }).then((response) => {
            const mensaje = response.data.message;
            if (mensaje == "CE") { //BENEFICIARIO BC
                window.location.href = "/Municipalidades/consultas"
            }
        })
    }

    const [datosConsulta, setDatosConsultas] = useState([]);


    const columnaLector = [
        {
            name: "idconsulta",
            label: "ID",
            options: {
                filter: false
            }
        },
        {
            name: "rutconsulta",
            label: "RUT CONSULTANTE",
            options: {
                filter: false
            }
        },
        {
            name: "nombremunicipalidad",
            label: "MUNICIPALIDAD",
            options: {
                filter: false,
            }
        },
        {
            name: "estadoconsulta",
            label: "ESTADO",
            options: {
                filter: false,
                //@ts-ignore
                customBodyRender: (value, tableMeta) => {
                    const estado = parseInt(value, 10);

                    // Define el texto y el color según el estado
                    let buttonText = "";
                    let buttonColor = "";
                    if (estado === 1) {
                        buttonText = "Pendiente a Respuesta";
                        buttonColor = "red";
                    } else if (estado === 2) {
                        buttonText = "Respondida";
                        buttonColor = "green";
                    }

                    return (
                        <button className="rounded-t-xl rounded-b-xl p-2"
                            style={{ backgroundColor: buttonColor }}
                            disabled={true} // Puedes cambiar esto según tus condiciones
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
                            <IconButton onClick={() => mostrarConsulta(id)}><InfoIcon className="text-blue-500" /></IconButton>
                        </div>
                    )
                }
            }

        }
    ]

    const columnas = [
        {
            name: "idconsulta",
            label: "ID",
            options: {
                filter: false
            }
        },
        {
            name: "rutconsulta",
            label: "RUT CONSULTANTE",
            options: {
                filter: false
            }
        },
        {
            name: "nombremunicipalidad",
            label: "MUNICIPALIDAD",
            options: {
                filter: false,
            }
        },
        {
            name: "estadoconsulta",
            label: "ESTADO",
            options: {
                filter: false,
                //@ts-ignore
                customBodyRender: (value, tableMeta) => {
                    const estado = parseInt(value, 10);

                    // Define el texto y el color según el estado
                    let buttonText = "";
                    let buttonColor = "";
                    if (estado === 1) {
                        buttonText = "Pendiente a Respuesta";
                        buttonColor = "red";
                    } else if (estado === 2) {
                        buttonText = "Respondida";
                        buttonColor = "green";
                    }

                    return (
                        <button className="rounded-t-xl rounded-b-xl p-2"
                            style={{ backgroundColor: buttonColor }}
                            disabled={true} // Puedes cambiar esto según tus condiciones
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
                            <IconButton onClick={() => mostrarConsulta(id)}><InfoIcon className="text-blue-500" /></IconButton>
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
                            <IconButton onClick={() => modificarConsulta(id)}><Edit className="text-yellow-500" /></IconButton>
                        </div>
                    )
                }
            }

        }
    ]

    const opciones: any = {
        selectableRows: "none",
        print: false,
        download: false,
        rowsPerPage: 5,
        rowsPerPageOptions: [5],
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

    function mostrarConsulta(idConsulta: number) {
        setIdc(idConsulta);
        setLector(2);
        setVentanaMod(true);
        console.log("Esta sera la funcion paara mostrar informacion del Beneficiario", idConsulta);
    }

    function modificarConsulta(idConsulta: number) {
        setIdc(idConsulta);
        setLector(1);
        setVentanaMod(true);
        console.log("Esta sera la funcion modificar", idConsulta);
    }





    let varianteVistaTabka = null;
    let varianteVistaCuerpo = null;

    if (permisos == 1000) {

        varianteVistaTabka = (
            <MUIDataTable data={datosConsulta} columns={columnaLector} options={opciones} title="Beneficiarios" />
        );
        varianteVistaCuerpo = (
            <div className="row-span-2 grid grid-rows-2 grid-cols-5">



                <div className="row-start-1 row-end-1 col-start-1 col-end-6 grid grid-rows-4 w-full">
                    <h1 className="row-start-2 row-end-3 mx-auto text-white text-2xl ">Consulta</h1>
                    <textarea className="row-start-3 row-end-4 mx-auto rounded-t-xl rounded-b-xl w-3/4 "  onChange={(e) => setConsulta(e.target.value)}></textarea>
                </div>








                <div className="row-start-2 row-end-2 col-start-3 col-end-3 grid grid-rows-4">
                    <button className="row-start-2 row-end-4 mx-auto text-white bg-[#003352] w-[400px] rounded-tr-[50px] rounded-bl-[50px] mt-[-30px] ml-[-30px]" onClick={() => agregarConsulta()}>CREAR</button>
                </div>

            </div>
        )
    }

    else if (permisos == 0) { //LECTOR

        varianteVistaTabka = (
            <MUIDataTable data={datosConsulta} columns={columnas} options={opciones} title="Beneficiarios" />
        );
        varianteVistaCuerpo = (
            <div className="row-span-2 grid grid-rows-2 grid-cols-3">

                <div className="row-start-1 row-end-1 col-start-2 col-end-2 grid grid-rows-4">
                    <h1 className="row-start-2 row-end-3 mx-auto text-white mt-[65px] text-3xl">SOLO RESPUESTAS</h1>"

                </div>

            </div>
        )
    }





    return (
        <>
            <div className="bg-[#427DA2] fixed inset-0">

                <Navbar></Navbar>

                <div className="p-5">
                    <h1 className="text-white text-center text-[30px] underline"><strong>GESTION DE CONSULTAS</strong></h1>
                </div>


                <div className="grid grid-rows-6 gap-2 w-[90%] h-[80%]  mx-auto bg-[#003352] bg-opacity-[53%] rounded-tl-[50px] rounded-br-[50px]">

                    {varianteVistaCuerpo}
                    <div className="row-span-4 w-[90%] mx-auto">
                        {varianteVistaTabka}
                    </div>
                </div>



            <VentanaModConsulta estadoModalConsultaMod={ventanaMod} cambioestadoModalConsultaMod={setVentanaMod} idconsultamod={idc} lector={lector}/>
            </div>
        </>
    )

}