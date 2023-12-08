/* import Navbar from "../../components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import MUIDataTable from "mui-datatables";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import ModalCreacion from "../../components/Alertas/Principal/creacion";
import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";

export default function principal() {

    const [datosUsuarios, setDatosUsuarios] = useState<any>();


    const [usua, setUsua] =useState<string>();
    const [permi, setPermi] = useState<number>();
    const [mun, setMun] = useState<string>();

//@ts-ignore
    const [datosPermisosSelect, setDatosPermisosSelect] = useState();
    const [permisosSeleccionados, setPermisosSeleccionados] = useState([]);
    const [estadoTodosPermisos, setEstadosTodosPermisos] = useState(false);


    const [datosDepartamentosSelect, setDatosDepartamentosSelect] = useState();
    const [departamentosSeleccionados, setDepartamentosSeleccionados] = useState([]); //SE INICIALIZAN POR TYPESCRIPT BUSCA UNO PARECIDO SI ES UNDEFINED
    const [estadoTodosDepartamentos, setEstadoTodosDepartamentos] = useState(false);

    const [modalCreacion, setModalCreacion] = useState(false);
    const [error, setError] = useState<number>();

    const [rut, setRut] = useState<string>();
    const [nombre, setNombre] = useState<string>();
    const [direccion, setDireccion] = useState<string>();
    const [telefono, setTelefono] = useState<number>();
    const [correo, setCorreo] = useState<string>();

    const [contrasenia, setContrasenia] = useState<string>();



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

            if (permisos != 1000) {
                window.location.href = "/";
            }
            else {
                console.log(valoresCookies["departamentoG"], "acaaaaaa 1");
                const usu = valoresCookies["nombreG"];
                const muni = valoresCookies["nombreMunicipalidadG"];
                const permisoss = valoresCookies["permisosG"];
                console.log(usu, muni, permisos);
                setUsua(usu);
                setPermi(permisoss);
                setMun(muni);

            }
        }
        obtencionUsuarios();
        obtencionDatosDepartamentos();
        obtencionDatosPermisos();
    }, []);





    const usuario: string = usua || "";
    const munii : string = mun || "";
    const per :number= permi || 0; 






    //@ts-ignore
    const creacionUsuario = async () => {
        console.log("Entrando a la funcion de creacion de municipalidades");

        console.log(departamentosSeleccionados, "departamentos seleccionados");
        console.log(permisosSeleccionados, "permisos sleeccionados");

        await axios({
            method: "post",
            data: {
                rutusuario: rut,
                nombrecompleto: nombre,
                permisos: permisosSeleccionados,
                departamentos: departamentosSeleccionados,
                direccion: direccion,
                telefono: telefono,
                correo: correo,
                municipalidad: munii,
                contrasenia: contrasenia
            },
            url: "http://localhost:3001/municipalidad/gestionusuarios/creacionusuarios",
            withCredentials: true
        }).then((response) => {
            const mensaje: string = response.data.message;
            if (mensaje == "URE") {
                setModalCreacion(true);
                const valoruno: number = 1;
                setError(valoruno);
            }
            else if (mensaje == "UYA") {
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
            name: "rutusuario",
            label: "RUT",
            options: {
                filter: false
            }
        },
        {
            name: "nombrecompletousuario",
            label: "NOMBRE",
            options: {
                filter: false
            }
        },
        {
            name: "permisosusuario",
            label: "PERMISOS",
            options: {
                filter: false,
                //@ts-ignore
                customBodyRender: (value: number, tableMeta: any) => {
                    let color: string = "";
                    let palabra: string = "";

                    switch (value) {
                        case 3:
                            palabra = "Lector";
                            color = "blue";
                            break;
                        case 10:
                            palabra = "Editor";
                            color = "yellow";
                            break;
                        case 17:
                            palabra = "Admin"
                            color = "red";
                            break;
                        default:
                            palabra = "default"
                            color = "black";
                            break;
                    }

                    return <span style={{ color }}>{palabra}</span>;
                },
            }
        }, {
            name: "departamentousuario",
            label: "DEPARTAMENTOS",
            options: {
                filter: false,
                //@ts-ignore
                customBodyRender: (value: number, tableMeta) => {
                    let palabra: string = "";

                    switch (value) {
                        case 3:
                            palabra = "Dideco";
                            break;
                        case 10:
                            palabra = "Departamento Falso 1";
                            break;
                        case 17:
                            palabra = "Departamento Falso 2";
                            break;
                        case 13:
                            palabra = "Dideco y Departamento Falso 1";
                            break;
                        case 20:
                            palabra = "Dideco y Departamento Falso 2";
                            break;
                        case 27:
                            palabra = "Departamento Falso 1 y Departamento Falso 2";
                            break;
                        case 100:
                            palabra = "Todos los Departamentos";
                            break;
                        default:
                            palabra = "default"
                            break;
                    }

                    return <span>{palabra}</span>;
                },
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


    const obtencionUsuarios = async () => {
        await axios.get("http://localhost:3001/municipalidad/gestionusuarios/listarusuarios").then((response) => {
            const datosUsu = response.data;
            setDatosUsuarios(datosUsu);
            console.log("funcion obtener usuarios")
        })
    }

    //OBTENCIO DE LAS MUNICIPALIDADES DISPONIBLES DE LA BASE DE DATOS PRINCIPAL
    const obtencionDatosPermisos = async () => {
        await axios.get("http://localhost:3001/municipalidad/gestionusuarios/listarpermisos").then((response) => {
            const datosPermisos = response.data;
            setPermisosSeleccionados(datosPermisos);
            console.log("funcion obtener permisos")
        })
    }


    /*  const obtencionDatosDepartamentos = async () => {
         await axios.get("http://localhost:3001/obtencionDatosDepartamentosSelect").then((response) => {
             const datosDepartamentos = response.data;
             setDatosDepartamentosSelect(datosDepartamentos);
         })
     } */

   /*  const obtencionDatosDepartamentos = async () => {
        await axios({
            method: "post",
            data: {
                municipalidad: munii
            },
            url: "http://localhost:3001/municipalidad/gestionusuarios/listardepartamentos",
            withCredentials: true
        }).then((response) => {
            const data = response.data;
            setDatosDepartamentosSelect(data);
        })
    }




    //SUMATORIA DE TODOS LOS DEPARTAMENTOS SELECCIONADOS
    const seleccionPermisos = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const opcionesSeleccionadas: any = Array.from(event.target.selectedOptions).map((option) => option.value);
        if (opcionesSeleccionadas.includes('17')) {
            //@ts-ignore
            setPermisosSeleccionados(['17']);
            setEstadosTodosPermisos(true);

        }
        else {
            setPermisosSeleccionados(opcionesSeleccionadas);
            setEstadosTodosPermisos(false);

        }
    }

    const seleccionDepartamentos = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const opcionesSeleccionadas: any = Array.from(event.target.selectedOptions).map((option) => option.value);
        if (opcionesSeleccionadas.includes('17')) {
            //@ts-ignore
            setDepartamentosSeleccionados(['17']);
            setEstadoTodosDepartamentos(true);

        }
        else {
            setDepartamentosSeleccionados(opcionesSeleccionadas);
            setEstadoTodosDepartamentos(false);

        }
    }






    let permisosLectura = null;

    if (per != 3) {
        permisosLectura = (
            <div className="row-span-2 grid grid-rows-2 grid-cols-5">

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

                <div className="row-start-1 row-end-1 col-start-4 col-end-4 grid grid-rows-4">
                    <h1 className="row-start-2 row-end-3 mx-auto text-white">Direccion</h1>
                    <input className="row-start-3 row-end-4 w-3/4 mx-auto rounded-t-xl rounded-b-xl" onChange={(e) => setDireccion(e.target.value)}></input>
                </div>

                <div className="row-start-1 row-end-1 col-start-5 col-end-5 grid grid-rows-4">
                    <h1 className="row-start-2 row-end-3 mx-auto text-white">Telefono</h1>
                    <input className="row-start-3 row-end-4 w-3/4 mx-auto rounded-t-xl rounded-b-xl" onChange={(e) => setTelefono(Number(e.target.value))}></input>
                </div>

                <div className="row-start-2 row-end-2 col-start-1 col-end-1 grid grid-rows-4">
                    <h1 className="row-start-2 row-end-3 mx-auto text-white">Correo</h1>
                    <input className="row-start-3 row-end-4 w-3/4 mx-auto rounded-t-xl rounded-b-xl" onChange={(e) => setCorreo(e.target.value)}></input>
                </div>

                <div className="row-start-2 row-end-2 col-start-2 col-end-2 grid grid-rows-4">
                    <h1 className="row-start-2 row-end-3 mx-auto text-white">Permisos</h1>"
                    <select className="row-start-3 row-end-4 w-3/4 mx-auto rounded-t-xl rounded-b-xl h-10" multiple onChange={seleccionPermisos}>
                        {datosPermisosSelect &&
                            //@ts-ignore
                            datosPermisosSelect.map((permiso: any) => (
                                <option className={`${estadoTodosPermisos ? 'deseleccionar-select' : ''}`} key={permiso.puntuacionpermiso} value={permiso.puntuacionpermiso}>{permiso.nombrepermiso}</option>
                            ))
                        }
                    </select>
                </div>


                 <div className="row-start-2 row-end-2 col-start-3 col-end-3 grid grid-rows-4 mb-[15px]">
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

                <div className="row-start-2 row-end-2 col-start-4 col-end-5 grid grid-rows-4 ">
                    <button className="row-start-2 row-end-4 mx-auto text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px]" onClick={() => creacionUsuario()}>CREAR</button>
                </div>

            </div>
        )
    }
    else{
        <div className="grid grid-rows-6 gap-2 w-[90%] h-[80%]  mx-auto bg-[#003352] bg-opacity-[53%] rounded-tl-[50px] rounded-br-[50px]">
            <h1>SOLO LECTURA</h1>
        </div>
    }







    return (
        <>
            <div className="bg-[#427DA2] fixed inset-0">

                <Navbar usuario={usuario}></Navbar>

                <div className="p-5">
                    <h1 className="text-white text-center text-[30px] underline"><strong>GESTION DE USUARIOS</strong></h1>
                </div>


                <div className="grid grid-rows-6 gap-2 w-[90%] h-[80%]  mx-auto bg-[#003352] bg-opacity-[53%] rounded-tl-[50px] rounded-br-[50px]">

                    {permisosLectura}

                    <div className="row-span-4 w-[90%] mx-auto">
                        <MUIDataTable data={datosUsuarios} columns={columnas} options={opciones} title="Municipalidades" />
                    </div>
                </div>

                <ModalCreacion tipoDato={5} datoExtra={rut} estadoCreacion={modalCreacion} cambioEstadoCreacion={setModalCreacion} error={error} />

            </div>
        </>
    )
} */ 