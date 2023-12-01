import Navbar from "../../../components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import MUIDataTable from "mui-datatables";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import InfoIcon from '@mui/icons-material/Info';
/* import ModalCreacion from "../../../components/Alertas/Principal/creacion";
 */

export default function beneficiarios() {


    const usuario = "";
    const permisos = 13;

    const [datosBeneficios, setDatosBeneficios] = useState<any>();  //CAMBIAR A BENEFICIARIOS

    const [datosTiposBeneficiosSelect, setDatosTiposBeneficiosSelect] = useState();
    const [tipoBeneficioSeleccionado, setTipoBeneficioSeleccionado] = useState();

    const [estadoBeneficioSeleccionado, setEstadoBeneficioSeleccionado] = useState<number>();

    const [stock, setStock] = useState<number>();


    /*      const [modalCreacion, setModalCreacion] = useState(false);
         const [error, setError] = useState<number>();
     */

    const seleccionTipoBeneficio = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const opcionesSeleccionadas: any = Array.from(event.target.selectedOptions).map((option) => option.value);
        if (opcionesSeleccionadas != null) {
            setTipoBeneficioSeleccionado(opcionesSeleccionadas);
        }
        else {
            console.log("El valor es null o  undefined");
        }
    }




    //@ts-ignore
    const creacionBeneficio = async () => {
        console.log("Entrando a la funcion creacion de municipalidades");

        console.log(tipoBeneficioSeleccionado, "Este es el valor del tipo de benecio seleccionado");
        console.log(estadoBeneficioSeleccionado, "Este es el estado seleccionado");
        console.log(stock, "este es el stock");

        await axios({
            method: "post",
            data: {
                idtipobeneficio: tipoBeneficioSeleccionado,
                estadobeneficio: estadoBeneficioSeleccionado,
                stockbeneficio: stock
            },
            url: "http://localhost:3001/dideco/beneficios/creacionBeneficios",
            withCredentials: true
        }).then((response) => {
            const mensaje: string = response.data.message;
            if (mensaje == "CBE") {
                console.log("Creacion Exitosa del beneficio");
            }
            else if (mensaje == "CBYE") {
                console.log("Ya existe el beneficio");
            }
        })
    }


    const columnasLector = [
        {
            name: "idbeneficio",
            label: "ID BENEFICIO",
            options: {
                filter: false
            }
        },
        {
            name: "estadobeneficio",
            label: "ESTADO",
            options: {
                filter: false
            }
        },
        {
            name: "stockbeneficio",
            label: "STOCK",
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
                    const idbeneficio: string = tableMeta.rowData[0];
                    return (
                        <div className="text-center">
                            <IconButton onClick={() => mostrarBeneficio(idbeneficio)}><InfoIcon className="text-blue-500" /></IconButton>
                        </div>
                    )
                }
            }

        }
    ]

    const columnas = [
        {
            name: "idbeneficio",
            label: "ID BENEFICIO",
            options: {
                filter: false
            }
        },
        {
            name: "estadobeneficio",
            label: "ESTADO",
            options: {
                filter: false
            }
        },
        {
            name: "stockbeneficio",
            label: "STOCK",
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
                    const idbeneficio: string = tableMeta.rowData[0];
                    return (
                        <div className="text-center">
                            <IconButton onClick={() => mostrarBeneficio(idbeneficio)}><InfoIcon className="text-blue-500" /></IconButton>
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
                    const idbeneficio: string = tableMeta.rowData[0];
                    return (
                        <div className="text-center">
                            <IconButton onClick={() => modificarBeneficio(idbeneficio)}><Edit className="text-yellow-500" /></IconButton>
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
                    const idbeneficio: string = tableMeta.rowData[0];
                    return (
                        <div className="text-center">
                            <IconButton onClick={() => eliminarBeneficio(idbeneficio)} ><Delete className=" text-red-500" /></IconButton>
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
        filter: true
    }

    //Funcion Mostrar Beneficio
    function mostrarBeneficio(idBeneficio: string) {
        console.log("Esta sera la funcion paara mostrar informacion del Beneficio", idBeneficio);
    }

    //Funcion Eliminar Municipalidad
    function eliminarBeneficio(idbeneficio: string) {
        console.log("Esta sera la funcion eliminar", idbeneficio);
    }


    //Funcion Modificar Municipalidad
    function modificarBeneficio(idbeneficio: string) {
        console.log("Esta sera la funcion modificar", idbeneficio);
    }


    //OBTENCION DE LOS DATOS DE LA TABLA (DONDE SE ENCUENTRAN LOS DATOS DE LAS MUNICIPALIDADES REGISTRADAS CON LAS NOMBRES DE LOS ADMINISTRADORES DE LAS RESPECTIVAS MUNICIPALIDADES)
    const obtencionBeneficios = async () => {
        await axios.get("http://localhost:3001/dideco/beneficios/datosBeneficios").then((response) => { //CAMBIAR LA DIRECCION DE LA CONSULTA   
            const datosBeneficioss = response.data;
            setDatosBeneficios(datosBeneficioss);
        })
    }

    //OBTENCIO DE LAS MUNICIPALIDADES DISPONIBLES DE LA BASE DE DATOS PRINCIPAL
    const obtencionDatosTiposBeneficios = async () => {
        await axios.get("http://localhost:3001/dideco/beneficios/datosTiposBeneficios").then((response) => {  //CAMBIAR LA DIRECCION DE LA CONSULTA
            const datosTiposBeneficios = response.data;
            setDatosTiposBeneficiosSelect(datosTiposBeneficios);
        })
    }










    useEffect(() => {
        obtencionBeneficios();
        obtencionDatosTiposBeneficios();

    }, []);





    let varianteVistaTabka = null;
    let varianteVistaCuerpo = null;

    if (permisos == 30 || permisos > 3) {

        varianteVistaTabka = (
            <MUIDataTable data={datosBeneficios} columns={columnas} options={opciones} title="Beneficios" />
        );
        varianteVistaCuerpo = (
            <div className="row-span-2 grid grid-rows-2 grid-cols-4">

                <div className="row-start-1 row-end-1 grid grid-rows-4">
                    <h1 className="row-start-2 row-end-3 mx-auto text-white">Rut</h1>
                    <input className="row-start-3 row-end-4 w-1/2 mx-auto rounded-t-xl rounded-b-xl" onChange={(e) => setStock(Number(e.target.value))}></input>
                </div>

                <div className="row-start-1 row-end-1 col-start-2 col-end-2 grid grid-rows-4 w-full">
                    <h1 className="row-start-2 row-end-3 mx-auto text-white">Nombre Completo</h1>
                    <input className="row-start-3 row-end-4 w-1/2 mx-auto rounded-t-xl rounded-b-xl" onChange={(e) => setStock(Number(e.target.value))}></input>
                </div>

                <div className="row-start-1 row-end-1 col-start-3 col-end-3 grid grid-rows-4">
                    <h1 className="row-start-2 row-end-3 mx-auto text-white">Edad</h1>
                    <input className="row-start-3 row-end-4 w-1/2 mx-auto rounded-t-xl rounded-b-xl" onChange={(e) => setStock(Number(e.target.value))}></input>
                </div>

                <div className="row-start-1 row-end-1 col-start-4 col-end-4 grid grid-rows-4">
                    <h1 className="row-start-2 row-end-3 mx-auto text-white">Direccion</h1>
                    <input className="row-start-3 row-end-4 w-1/2 mx-auto rounded-t-xl rounded-b-xl" onChange={(e) => setStock(Number(e.target.value))}></input>
                </div>

                <div className="row-start-2 row-end-2 grid grid-rows-4">
                    <h1 className="row-start-2 row-end-3 mx-auto text-white">Telefono</h1>
                    <input className="row-start-3 row-end-4 w-1/2 mx-auto rounded-t-xl rounded-b-xl" onChange={(e) => setStock(Number(e.target.value))}></input>
                </div>

                <div className="row-start-2 row-end-2 col-start-2 col-end-2 grid grid-rows-4">
                    <h1 className="row-start-2 row-end-3 mx-auto text-white">Correo</h1>
                    <input className="row-start-3 row-end-4 w-1/2 mx-auto rounded-t-xl rounded-b-xl" onChange={(e) => setStock(Number(e.target.value))}></input>
                </div>

                <div className="row-start-2 row-end-2 col-start-3 col-end-3 grid grid-rows-4">
                    <h1 className="row-start-2 row-end-3 mx-auto text-white">Porcentaje RH</h1>
                    <input className="row-start-3 row-end-4 w-1/2 mx-auto rounded-t-xl rounded-b-xl" onChange={(e) => setStock(Number(e.target.value))}></input>
                </div>


                <div className="row-start-2 row-end-2 col-start-4 col-end-4 grid grid-rows-4">
                    <button className="row-start-2 row-end-4 mx-auto text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px]" onClick={() => creacionBeneficio()}>CREAR</button>
                </div>

            </div>
        )
    }

    else if (permisos == 3) { //LECTOR

        varianteVistaTabka = (
            <MUIDataTable data={datosBeneficios} columns={columnasLector} options={opciones} title="Beneficios" />
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

                {/*                 <ModalCreacion tipoDato={1} datoExtra={municipalidad} estadoCreacion={modalCreacion} error={error} /> AQUI HAY QUE DEVOLVER EL VALOR DEL ID DEL BENEFICIO
 */}
            </div>
        </>
    )

}