import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import React from "react";
import VentanaModBeneficio from "../../modificacion/Modalbeneficiomod";
import RespuestaMasivas from "../respuestaMasivas";

interface Props {
    estadoModalSoliMasAgr: boolean,
    cambioEstadoModalSoliMasAgr: (nuevoEstado: boolean) => void
}


export default function SolicitudesMas({ estadoModalSoliMasAgr, cambioEstadoModalSoliMasAgr }: Props) {




    const [arrayRuts, setArrayRuts] = useState([]);

    const [respuestaMas, setRespuestaMas] = useState(false);

    /*     const [selectedRows, setSelectedRows] = useState([]);
     */

    //@ts-ignore
    const handleRowSelection = (currentRowsSelected, allRowsSelected: any) => {
        //@ts-ignore
        const rutsNuevos = allRowsSelected.map(rows => datosBeneficiarios[rows.index].rutbeneficiario);
        setArrayRuts(rutsNuevos);

    }

    /*     useEffect(() => {
            console.log(selectedRows);
        }, [selectedRows]); */





    const agregarMasivo = () => {

        const cantidad = arrayRuts.length;
        console.log(cantidad)

        axios({
            method: "post",
            data: {
                arrayRutBene: arrayRuts,
                idbeneficio: beneficioSelect,
                cantidadRut: cantidad
            },
            url: "http://localhost:3001/dideco/solicitudes/creacionSolicitudesMas",
            withCredentials: true
        }).then((response) => {
            const mensaje = response.data.message;

            if (mensaje == "CPSM") {
                setRespuestaMas(true);
                console.log("Creacion exitosa de las solicitudes Masivas");  //CREAR ALERTA QUE INDIQUE LA CANTIDAD IGUAL
                
            }


        })

    }






    useEffect(() => {
        if (estadoModalSoliMasAgr == true) {
            obtencionDatosBeneficiarios();
            obtencionDatosBeneficios();
        }
    }, [estadoModalSoliMasAgr])



    const columnas = [
        {
            name: "rutbeneficiario",
            label: "RUT",
            options:{
                filter: false
            }
        },
        {
            name: "porcentajerhbeneficiario",
            label: "PORCENTAJE RH"

        }

    ]

    const opciones: any = {
        selectableRows: "multiple",
        print: false,
        download: false,
        rowsPerPage: 5,
        rowsPerPageOptions: [5],
        viewColumns: false,
        onRowsSelect: handleRowSelection,
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

    const [datosBeneficiosSelect, setDatosBeneficiosSelect] = useState();
    const [beneficioSelect, setBeneficioSelect] = useState(); //Este va al back

    const [datosBeneficiarios, setDatosBeneficiarios] = useState([]);

    const [ventanaMod, setVentanaMod] = useState(false);
    const [lector, setLector] = useState<number>();


    const obtencionDatosBeneficios = async () => {
        await axios.get("http://localhost:3001/dideco/solicitudes/listarBeneficiosMas").then((response) => {  //CAMBIAR LA DIRECCION DE LA CONSULTA
            const datosBeneficios = response.data;
            setDatosBeneficiosSelect(datosBeneficios);
        })
    }

    const obtencionDatosBeneficiarios = async () => {
        await axios.get("http://localhost:3001/dideco/solicitudes/listarBeneficiariosMas").then((response) => {  //CAMBIAR LA DIRECCION DE LA CONSULTA
            const datosBeneficiarios = response.data;
            setDatosBeneficiarios(datosBeneficiarios);
        })
    }

    const seleccionBeneficio = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const opcionesSeleccionadas: any = Array.from(event.target.selectedOptions).map((option) => option.value);
        if (opcionesSeleccionadas != null) {
            setBeneficioSelect(opcionesSeleccionadas);
        }
        else {
            console.log("El valor es null o  undefined");
        }
    }

    const verificarBeneficio = async () => {
        setLector(2);
        setVentanaMod(true);
    }


    return (
        <>
            {estadoModalSoliMasAgr &&

                <div className="z-10 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 fixed items-center justify-center flex">
                    <div className="mt-[30px] modalColor bg-white w-[550px] h-[680px] relative p-2 rounded grid grid-rows-8 grid-cols-3">

                        <button className="absolute ml-[510px] mt-[5px] text-red-500" onClick={() => cambioEstadoModalSoliMasAgr(false)}><FontAwesomeIcon className="text-3xl colorX" icon={faTimes}></FontAwesomeIcon></button>

                        <div className="row-start-1 row-end-1 col-start-1 col-end-4">
                            <h1 className="text-3xl underline mt-[25px] ml-[140px] mb-[-120px text-[#427DA2]">Agregada Masiva</h1>
                        </div>

                        <div className="row-start-2 row-end-2 col-start-1 col-end-2">
                            <h1 className="block textColor text-lg font-bold ml-[10px] text-[#427DA2]">Beneficio</h1>
                            <select className="row-start-3 row-end-4 mx-auto rounded-t-xl rounded-b-xl h-10 w-[300px]" multiple onChange={seleccionBeneficio}>
                                {datosBeneficiosSelect &&
                                    //@ts-ignore
                                    datosBeneficiosSelect.map((beneficio: any) => (
                                        <option key={beneficio.idbeneficio} value={beneficio.idbeneficio}>{beneficio.idbeneficio}</option>
                                    ))
                                }
                            </select>
                        </div>



                        <div className="row-start-2 row-end-2 col-start-3 col-end-3">
                            <button onClick={verificarBeneficio} className="bg-[#427DA2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm mt-[28px] " type="button">
                                Ver Beneficio
                            </button>
                        </div>

                        




                        <div className="row-start-3 row-end-7 col-start-1 col-end-4">
                            <MUIDataTable data={datosBeneficiarios} columns={columnas} options={opciones} title="Beneficiarios" />
                        </div>

                        <div className="row-start-7 row-end-8 col-start-2 col-end-2">
                            <button onClick={agregarMasivo} className="bg-[#427DA2] text-white font-bold ml-[-50px] w-[300px] py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg" type="button">
                                Ingresar Solicitudes Masivas
                            </button>
                        </div>



                    </div>
                    <RespuestaMasivas estadoRespuestaBloq={respuestaMas} cambioEstadoRespuestaBloq={setRespuestaMas}></RespuestaMasivas>
                    <VentanaModBeneficio estadoModalBeneficioMod={ventanaMod} cambioEstadoModalBeneficioMod={setVentanaMod} idmodbeneficio={beneficioSelect} lector={lector} />
                </div>
            }
        </>
    )
}