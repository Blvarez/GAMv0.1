import Navbar from "../components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import MUIDataTable from "mui-datatables";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import ModalCreacion from "../components/Alertas/Municipalidad/Dideco/gestionBeneficios/creacion/creacion";

export default function principal() {

    const usuario = "";

    const [datosPrincipalMunicipalidades, setDatosPrincipalMunicipalidades] = useState<any>();
    const [datosMunicipalidadesSelect, setDatosMunicipalidadesSelect] = useState();
    const [datosDepartamentosSelect, setDatosDepartamentosSelect] = useState();
    const [departamentosSeleccionados, setDepartamentosSeleccionados] = useState([]); //SE INICIALIZAN POR TYPESCRIPT BUSCA UNO PARECIDO SI ES UNDEFINED
    const [estadoTodosDepartamentos, setEstadoTodosDepartamentos] = useState(false);

    const [modalCreacion, setModalCreacion] = useState(false);
    const [error, setError] = useState<number>();

    const [rut, setRut] = useState<string>();
    const [nombre, setNombre] = useState<string>();
    const [contrasenia, setContrasenia] = useState<string>();
    const [municipalidad, setMunicipalidad] = useState<string>();


    //@ts-ignore
    const creacionMunicipalidad = async () => {
        console.log("Entrando a la funcion de creacion de municipalidades");

        console.log(departamentosSeleccionados);

        await axios({
            method: "post",
            data: {
                rutusuarioprincipal: rut,
                contraseniaprincipal: contrasenia,
                nombreusuarioprincipal: nombre,
                municipalidad: municipalidad,
                departamentos: departamentosSeleccionados
            },
            url: "http://localhost:3001/inicioSesionPrincipal/operacionInicioSesion",
            withCredentials: true
        }).then((response) => {
            const mensaje: string = response.data.message;
            if (mensaje == "CBDM") {
                setModalCreacion(true);
                const valoruno: number = 1;
                setError(valoruno);
            }
            else if (mensaje == "CBDE") {
                setModalCreacion(true);
                const valordos: number = 2;
                setError(valordos);
            }
        })
    }

    //@ts-ignore
    const calculoDepartamentos = async (arregloDepartamentos: any[]) => {
        const arregloNumeros = arregloDepartamentos.map((numero) => {
            return parseInt(numero, 10);
        })

        const resultadoSuma: number = arregloNumeros.reduce((acumulador, numero) => acumulador + numero, 0);

        const resultadoResta: number = arregloNumeros.reduce((acumulador, numero) => acumulador - numero, 0);
        const arregloResultado: number[] = [resultadoSuma, resultadoResta];

        console.log(arregloResultado);



        return arregloResultado;
    }


    const columnas = [
        {
            name: "rutprincipal",
            label: "RUT",
            options: {
                filter: false
            }
        },
        {
            name: "nombrePrincipal",
            label: "NOMBRE",
            options: {
                filter: false
            }
        },
        {
            name: "valormunicipalidadprincipal",
            label: "MUNICIPALIDAD",
            options: {
                filter: false
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
                            <IconButton onClick={() => modificarAdministradorMunicipalYMunicipalidad(rut)}><Edit className="text-yellow-500" /></IconButton>
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
                            <IconButton onClick={() => eliminarAdministradorMunicipalYMunicipalidad(rut)} ><Delete className=" text-red-500" /></IconButton>
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


    //Funcion Eliminar Municipalidad
    function eliminarAdministradorMunicipalYMunicipalidad(rut: string) {
        console.log("Esta sera la funcion eliminar", rut);
    }


    //Funcion Modificar Municipalidad
    function modificarAdministradorMunicipalYMunicipalidad(rut: string) {
        console.log("Esta sera la funcion modificar", rut);
    }


    //OBTENCION DE LOS DATOS DE LA TABLA (DONDE SE ENCUENTRAN LOS DATOS DE LAS MUNICIPALIDADES REGISTRADAS CON LAS NOMBRES DE LOS ADMINISTRADORES DE LAS RESPECTIVAS MUNICIPALIDADES)
    const obtencionPersonasMunicipalidades = async () => {
        await axios.get("http://localhost:3001/obtencionPersonasMunicipalidades").then((response) => {
            const datosMunicipalidadesPrincipales = response.data;
            setDatosPrincipalMunicipalidades(datosMunicipalidadesPrincipales);
            console.log(datosMunicipalidadesPrincipales);
        })
    }

    //OBTENCIO DE LAS MUNICIPALIDADES DISPONIBLES DE LA BASE DE DATOS PRINCIPAL
    const obtencionDatosMunicipalidades = async () => {
        await axios.get("http://localhost:3001/obtencionDatosMunicipalidadesSelect").then((response) => {
            const datosMunicipalidades = response.data;
            setDatosMunicipalidadesSelect(datosMunicipalidades);
        })
    }

    //OBTENCION DE LOS DATOS DE LOS DEPARTAMENTOS DE LA BASE DE DATOS PRINCIPAL 
    const obtencionDatosDepartamentos = async () => {
        await axios.get("http://localhost:3001/obtencionDatosDepartamentosSelect").then((response) => {
            const datosDepartamentos = response.data;
            setDatosDepartamentosSelect(datosDepartamentos);
        })




        //SUMATORIA DE TODOS LOS DEPARTAMENTOS SELECCIONADOS
        const seleccionDepartamentos = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const opcionesSeleccionadas: any = Array.from(event.target.selectedOptions).map((option) => option.value);
            if (opcionesSeleccionadas.includes('100')) {
                //@ts-ignore
                setDepartamentosSeleccionados(['100']);
                setEstadoTodosDepartamentos(true);

            }
            else {
                setDepartamentosSeleccionados(opcionesSeleccionadas);
                setEstadoTodosDepartamentos(false);

            }
        }







        useEffect(() => {
            obtencionPersonasMunicipalidades();
            obtencionDatosDepartamentos();
            obtencionDatosMunicipalidades();
            console.log(datosDepartamentosSelect, "Datos de los departamentos")

        }, []);






        return (
            <>
                <div className="bg-[#427DA2] fixed inset-0">

                    <Navbar usuario={usuario}></Navbar>

                    <div className="p-5">
                        <h1 className="text-white text-center text-[30px] underline"><strong>REGISTRO PRINCIPAL MUNICIPALIDADES</strong></h1>
                    </div>


                    <div className="grid grid-rows-6 gap-2 w-[90%] h-[80%]  mx-auto bg-[#003352] bg-opacity-[53%] rounded-tl-[50px] rounded-br-[50px]">

                        <div className="row-span-2 grid grid-rows-2 grid-cols-3">

                            <div className="row-start-1 row-end-1 grid grid-rows-4">
                                <h1 className="row-start-2 row-end-3 mx-auto text-white">Rut</h1>
                                <input className="row-start-3 row-end-4 w-1/2 mx-auto rounded-t-xl rounded-b-xl" onChange={(e) => setRut(e.target.value)}></input>
                            </div>

                            <div className="row-start-1 row-end-1 col-start-2 col-end-2 grid grid-rows-4">
                                <h1 className="row-start-2 row-end-3 mx-auto text-white">Nombre</h1>
                                <input className="row-start-3 row-end-4 w-3/4 mx-auto rounded-t-xl rounded-b-xl" onChange={(e) => setNombre(e.target.value)}></input>
                            </div>

                            <div className="row-start-1 row-end-1 col-start-3 col-end-3 grid grid-rows-4">
                                <h1 className="row-start-2 row-end-3 mx-auto text-white">Contraseña</h1>
                                <input className="row-start-3 row-end-4 w-1/2 mx-auto rounded-t-xl rounded-b-xl" onChange={(e) => setContrasenia(e.target.value)} type="password"></input>
                            </div>

                            <div className="row-start-2 row-end-2 col-start-1 col-end-2 grid grid-rows-4">
                                <h1 className="row-start-2 row-end-2 mx-auto text-white">Municipalidades</h1>
                                <select className="row-start-3 row-end-4 w-3/4 mx-auto rounded-t-xl rounded-b-xl" onChange={(e) => setMunicipalidad(e.target.value)}>
                                    <option value="">Seleccione una Municipalidad</option>
                                    {datosMunicipalidadesSelect &&
                                        //@ts-ignore
                                        datosMunicipalidadesSelect.map((municipalidades: any) => (
                                            <option key={municipalidades.valordepartamentos} value={municipalidades.valormunicipalidad}>{municipalidades.nombremunicipalidad}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="row-start-2 row-end-2 col-start-2 col-end-3 grid grid-rows-4 mb-[15px]">
                                <h1 className="row-start-2 row-end-3 mx-auto text-white">Departamentos</h1>"
                                <select className="row-start-3 row-end-4 w-3/4 mx-auto rounded-t-xl rounded-b-xl h-10" multiple onChange={seleccionDepartamentos}>
                                    {datosDepartamentosSelect &&
                                        //@ts-ignore
                                        datosDepartamentosSelect.map((departamentos: any) => (
                                            <option className={`${estadoTodosDepartamentos ? 'deseleccionar-select' : ''}`} key={departamentos.valordepartamentos} value={departamentos.valordepartamentos}>{departamentos.nombredepartamento}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="row-start-2 row-end-2 col-start-3 col-end-4 grid grid-rows-4">
                                <button className="row-start-2 row-end-4 mx-auto text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px]" onClick={() => creacionMunicipalidad()}>CREAR</button>
                            </div>

                        </div>
                        <div className="row-span-4 w-[90%] mx-auto">
                            <MUIDataTable data={datosPrincipalMunicipalidades} columns={columnas} options={opciones} title="Municipalidades" />
                        </div>
                    </div>

                    <ModalCreacion tipoDato={1} datoExtra={municipalidad} estadoCreacion={modalCreacion} cambioEstadoCreacion={setModalCreacion} error={error} />

                </div>
            </>
        )
    }
}