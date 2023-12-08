import Navbar from "../../../components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import MUIDataTable from "mui-datatables";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import InfoIcon from '@mui/icons-material/Info';
import ModalCreacion from "../../../components/Alertas/Municipalidad/Dideco/gestionBeneficios/creacion/creacion";
import VentanaModBeneficiario from "../../../components/Alertas/Municipalidad/Dideco/gestionBeneficios/modificacion/Modalbeneficiariomod";

export default function beneficiarios() {


    const usuario = "";
    const permisos = 13;

    const [rut, setRut] = useState<string>();
    const [nombre, setNombre] = useState<string>();
    const [edad, setEdad] = useState<number>();
    const [direccion, setDireccion] = useState<string>();
    const [telefono, setTelefono] = useState<number>();
    const [correo, setCorreo] = useState<string>();

    const [porcentaje, setPorcentaje] = useState<number>();


    const [archivoPdf, setArchivoPdf] = useState();
    const [nombrePdf, setNombrePdf] = useState();
    const [tipoPdf, setTipoPdf] = useState();

    const [datosBeneficiarios, setDatosBeneficiarios] = useState<any>() || null;


    const [ventanaCreacion, setVentanaCreacion] = useState(false);
    const [error, setError] = useState<any>();


    const [ventanaModificacion, setVentanaModificacion] = useState(false);

    const [rutSelect, setRutSelect] = useState<string>();
    const [lector, setLector] = useState<any>();



    //@ts-ignore
    const cambioArchivo = event => {
        setArchivoPdf(event.target.files[0]);
        setNombrePdf(event.target.files[0].name);
        setTipoPdf(event.target.files[0].type);
    };


    const agregarBeneficiario = async () => {

        console.log(nombrePdf);
        console.log(tipoPdf);
        console.log(archivoPdf);


        if (archivoPdf != null) {
            const reader = new FileReader();
            //@ts-ignore
            reader.readAsArrayBuffer(archivoPdf);
            reader.onload = async () => {

                let arrayBuffer = reader.result;
                //@ts-ignore
                let bytes = new Uint8Array(arrayBuffer);

                const arregloPdf = [];

                for (const key in bytes) {
                    const valor = bytes[key];
                    arregloPdf.push(valor);
                }

                axios({
                    method: "post",
                    data: {
                        rutpdf: rut,
                        nombrepdf: nombrePdf,
                        tipopdf: tipoPdf,
                        archivopdf: arregloPdf,
                        porcentajepdf: porcentaje,

                        rut: rut,
                        nombreper: nombre,
                        edadper: edad,
                        direccionper: direccion,
                        telefonoper: telefono,
                        correoper: correo
                    },
                    url: "http://localhost:3001/dideco/beneficiarios/agregarbeneficiario",
                    withCredentials: true
                }).then((response) => {
                    const mensaje = response.data.message;
                    if (mensaje == "BC") { //BENEFICIARIO BC
                        setError(1);
                        setVentanaCreacion(true);
                    }
                    else if (mensaje == "DI") { //DATOS INCORRECTOS ///CREAR ALERTAAAAA

                    }
                    else if (mensaje == "BYE") { //BENEFICIARIO YA EXISTE
                        setError(2)
                        setVentanaCreacion(true);
                    }
                })
            }
        }
        else {
            console.log("Archivo pdf nulo");
        }

    }



    const columnaLector = [
        {
            name: "rutbeneficiario",
            label: "RUT",
            options: {
                filter: false
            }
        },
        {
            name: "nombrecompleto",
            label: "NOMBRE",
            options: {
                filter: false
            }
        },
        {
            name: "edadpersona",
            label: "EDAD",
            options: {
                filter: false,
            }
        },
        {
            name: "porcentajerhbeneficiario",
            label: "PORCENTAJE RH",
            options: {
                filter: false,
            }
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
                    const rut: string = tableMeta.rowData[0];
                    return (
                        <div className="text-center">
                            <IconButton onClick={() => mostrarBeneficiario(rut)}><InfoIcon className="text-blue-500" /></IconButton>
                        </div>
                    )
                }
            }

        }
    ]

    const columnas = [
        {
            name: "rutbeneficiario",
            label: "RUT",
            options: {
                filter: false
            }
        },
        {
            name: "nombrecompleto",
            label: "NOMBRE",
            options: {
                filter: false
            }
        },
        {
            name: "edadpersona",
            label: "EDAD",
            options: {
                filter: false,
            }
        },
        {
            name: "porcentajerhbeneficiario",
            label: "PORCENTAJE RH",
            options: {
                filter: false,
            }
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
                    const rut: string = tableMeta.rowData[0];
                    return (
                        <div className="text-center">
                            <IconButton onClick={() => mostrarBeneficiario(rut)}><InfoIcon className="text-blue-500" /></IconButton>
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
                    const rut: string = tableMeta.rowData[0];
                    return (
                        <div className="text-center">
                            <IconButton onClick={() => modificarBeneficiario(rut)}><Edit className="text-yellow-500" /></IconButton>
                        </div>
                    )
                }
            }

        },
        {
            name: "eliminar",
            label: "",
            options: {
                filter: false,
                customHeadRender: (columnMeta: any) => {
                    return (
                        <th key={columnMeta.name}>
                            <Delete className="text-red-500" />
                        </th>
                    )
                },
                //@ts-ignore
                customBodyRender: (value, tableMeta: any) => {
                    const rut: string = tableMeta.rowData[0];
                    return (
                        <div className="text-center">
                            <IconButton onClick={() => eliminarBeneficiario(rut)} ><Delete className=" text-red-500" /></IconButton>
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
        rowsPerPage: 10,
        rowsPerPageOptions: [10],
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

    //Funcion Mostrar Beneficio
    function mostrarBeneficiario(rutPersona: string) {
        setRutSelect(rutPersona);
        setLector(2);
        setVentanaModificacion(true);
        console.log("Esta sera la funcion paara mostrar informacion del Beneficiario", rutPersona);
    }

    //Funcion Eliminar Municipalidad
    function eliminarBeneficiario(rutPersona: string) {
        console.log("Esta sera la funcion eliminar", rutPersona);
    }


    //Funcion Modificar Municipalidad
    function modificarBeneficiario(rutPersona: string) {
        setRutSelect(rutPersona);
        setLector(1);
        setVentanaModificacion(true);
        console.log("Esta sera la funcion modificar", rutPersona);
    }


    const obtencionBeneficiarios = async () => {
        await axios.get("http://localhost:3001/dideco/beneficiarios/listarbeneficiariospersona").then((response) => { //CAMBIAR LA DIRECCION DE LA CONSULTA   
            const datosBeneficiarios = response.data;
            setDatosBeneficiarios(datosBeneficiarios);
        })
    }

    useEffect(() => {
        obtencionBeneficiarios();
    }, []);




    let varianteVistaTabka = null;
    let varianteVistaCuerpo = null;

    if (permisos >= 30 || permisos > 3) {

        varianteVistaTabka = (
            <MUIDataTable data={datosBeneficiarios} columns={columnas} options={opciones} title="Beneficiarios" />
        );
        varianteVistaCuerpo = (
            <div className="row-span-2 grid grid-rows-2 grid-cols-5">

                <div className="row-start-1 row-end-1 grid grid-rows-4">
                    <h1 className="row-start-2 row-end-3 mx-auto text-white">Rut</h1>
                    <input className="row-start-3 row-end-4 w-1/2 mx-auto rounded-t-xl rounded-b-xl" onChange={(e) => setRut(e.target.value)}></input>
                </div>

                <div className="row-start-1 row-end-1 col-start-2 col-end-2 grid grid-rows-4 w-full">
                    <h1 className="row-start-2 row-end-3 mx-auto text-white">Nombre Completo</h1>
                    <input className="row-start-3 row-end-4 mx-auto rounded-t-xl rounded-b-xl w-[300px]" onChange={(e) => setNombre(e.target.value)}></input>
                </div>

                <div className="row-start-1 row-end-1 col-start-3 col-end-3 grid grid-rows-4">
                    <h1 className="row-start-2 row-end-3 mx-auto text-white">Edad</h1>
                    <input className="row-start-3 row-end-4 w-1/2 mx-auto rounded-t-xl rounded-b-xl" onChange={(e) => setEdad(Number(e.target.value))}></input>
                </div>

                <div className="row-start-1 row-end-1 col-start-4 col-end-5 grid grid-rows-4 mt-[30px]">
                    <h1 className="row-start-1 row-end-2 mx-auto text-white">Cartola RSH</h1>
                    <input id="cartolabeneficiario" name="cartolabeneficiario" type="file" onChange={cambioArchivo} className="w-[420px] p-1 px-2 appearance-none outline-none row-start-2 row-end-4 "></input>
                </div>


                <div className="row-start-2 row-end-2 grid grid-rows-4">
                    <h1 className="row-start-2 row-end-3 mx-auto text-white">Telefono</h1>
                    <input className="row-start-3 row-end-4 w-1/2 mx-auto rounded-t-xl rounded-b-xl" onChange={(e) => setTelefono(Number(e.target.value))}></input>
                </div>

                <div className="row-start-2 row-end-2 col-start-2 col-end-2 grid grid-rows-4">
                    <h1 className="row-start-2 row-end-3 mx-auto text-white">Correo</h1>
                    <input className="row-start-3 row-end-4 w-[300px] mx-auto rounded-t-xl rounded-b-xl" onChange={(e) => setCorreo(e.target.value)}></input>
                </div>

                <div className="row-start-2 row-end-2 col-start-3 col-end-3 grid grid-rows-4">
                    <h1 className="row-start-2 row-end-3 mx-auto text-white">Porcentaje RH</h1>
                    <input className="row-start-3 row-end-4 w-1/2 mx-auto rounded-t-xl rounded-b-xl" onChange={(e) => setPorcentaje(Number(e.target.value))}></input>
                </div>

                <div className="row-start-2 row-end-2 col-start-4 col-end-4 grid grid-rows-4">
                    <h1 className="row-start-2 row-end-3 mx-auto text-white">Direccion</h1>
                    <input className="row-start-3 row-end-4 mx-auto rounded-t-xl rounded-b-xl w-[300px]" onChange={(e) => setDireccion(e.target.value)}></input>
                </div>







                <div className="row-start-2 row-end-2 col-start-5 col-end-5 grid grid-rows-4">
                    <button className="row-start-2 row-end-4 mx-auto text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px]" onClick={() => agregarBeneficiario()}>CREAR</button>
                </div>

            </div>
        )
    }

    else if (permisos <= 3) { //LECTOR

        varianteVistaTabka = (
            <MUIDataTable data={datosBeneficiarios} columns={columnaLector} options={opciones} title="Beneficiarios" />
        );
        varianteVistaCuerpo = (
            <div className="row-span-2 grid grid-rows-2 grid-cols-3">

                <div className="row-start-1 row-end-1 col-start-2 col-end-2 grid grid-rows-4">
                    <h1 className="row-start-2 row-end-3 mx-auto text-white mt-[65px] text-3xl">SOLO LECTURA</h1>"

                </div>

            </div>
        )
    }





    return (
        <>
            <div className="bg-[#427DA2] fixed inset-0">

                <Navbar usuario={usuario}></Navbar>

                <div className="p-5">
                    <h1 className="text-white text-center text-[30px] underline"><strong>GESTION DE BENEFICIARIOS</strong></h1>
                </div>


                <div className="grid grid-rows-6 gap-2 w-[90%] h-[80%]  mx-auto bg-[#003352] bg-opacity-[53%] rounded-tl-[50px] rounded-br-[50px]">

                    {varianteVistaCuerpo}
                    <div className="row-span-4 w-[90%] mx-auto">
                        {varianteVistaTabka}
                    </div>
                </div>

                <ModalCreacion datoExtra={rut} tipoDato={2} estadoCreacion={ventanaCreacion} cambioEstadoCreacion={setVentanaCreacion} error={error} />
                <VentanaModBeneficiario estadoModalBeneficiarioMod={ventanaModificacion} cambioEstadoModalBeneficiarioMod={setVentanaModificacion} rutMod={rutSelect} lector={lector} />
            </div>
        </>
    )

}