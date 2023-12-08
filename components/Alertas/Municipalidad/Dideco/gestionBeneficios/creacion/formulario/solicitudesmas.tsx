import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import React from "react";



export default function ModalSoliMasAgr({ estadoModalSoliMasAgr, cambioEstadoModalSoliMasAgr }) {


    const [soliBeneficiarios, setSoliBeneficiarios] = useState();

    const [idBeneficio, setIdBeneficio] = useState();

    const [arrayRuts, setArrayRuts] = useState([]);

    const [selectedRows, setSelectedRows] = useState([]);

    const [ccantidad, setCcantidad] = useState();
    const [ccantidadBeneficio, setCcantidadBeneficio] = useState();

    const handleRowSelection = (currentRowsSelected, allRowsSelected) => {

        const rutsNuevos = allRowsSelected.map(rows => soliBeneficiarios[rows.index].rutbeneficiario);
        setArrayRuts(rutsNuevos);

    }

    useEffect(() => {
        console.log(selectedRows);
    }, [selectedRows]); 





    const agregarMasivo = () => {

        const cantidad = arrayRuts.length;
        console.log(cantidad)

        axios({
            method: "post",
            data: {
                arrayRutBene: arrayRuts,
                idbeneficio: idBeneficio,
                cantidadRut: cantidad
            },
            url: "http://localhost:3001/dideco/gestionbeneficios/crudsolicitud/agregarmas",
            withCredentials: true
        }).then((response) => {
            const mensaje = response.data.message;
            const cantidadd = response.data.cantida;
            const cantidadBeneficio = response.data.cantidadBene;

            //Creo * asignaciones/postulaciones para el beneficio * que tiene un stock de entrega de *

            setCcantidad(cantidadd);
            setCcantidadBeneficio(cantidadBeneficio);

            if (mensaje == "BNE") {
                cambioEstadomodalbeneficionoexiste(true);
            }
            if(mensaje == "CMA"){ //ASIGNACION
                cambioEstadomodalsoliasigagrmasace(true);
            }
            if(mensaje == "CMP"){ //POSTULACION
                cambioEstadomodalsolipostagrmasace(true);
            }
        })

    }



    const url = "http://localhost:3001/dideco/gestionbeneficios/crudbeneficiario/listarBeneficiarios";

    const verificarBeneficio = () => {
        console.log("entro aca al beneficio")
        axios({
            method: "post",
            data: {
                idbeneficio: idBeneficio
            },
            url: "http://localhost:3001/dideco/gestionbeneficios/crudsolicitud/verificacionBeneficio",
            withCredentials: true
        }).then((response) => {
            console.log(response)
            const mensaje = response.data.message;
            if (mensaje == "BNE") {
                cambioEstadomodalbeneficionoexiste(true);
            }
            if (mensaje == "IBIO") {
                cambioEstadomodalvbeneficiobloq(true);
            }
        })
    }



    const obtenerBeneficiarios = async () => {
        await axios.get(url).then((response) => {
            const data = response.data;
            setSoliBeneficiarios(data);
        })
    }

    useEffect(() => {
        if (estadoModalSoliMasAgr == true) {
            obtenerBeneficiarios();
        }
    }, [estadoModalSoliMasAgr])



    const columns = [
        {
            name: "rutbeneficiario",
            label: "RUT"
        },
        {
            name: "porcentajerh",
            label: "PORCENTAJE RH"

        }

    ]

    const options = {
        print: false,
        download: false,
        viewColumns: false,
        filter: true,
        responsive: "scroll",
        rowHeight: 100,
        rowsPerPage: 5,
        rowsPerPageOptions: [5],
        onRowsSelect: handleRowSelection,
        customToolbarSelect: () => (
            <React.Fragment>
            </React.Fragment>
        )
    }







    return (
        <>
            {estadoModalSoliMasAgr &&

                <div className="z-10 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 fixed items-center justify-center flex">
                    <div className="mt-[30px] modalColor bg-white w-[650px] h-[500px] relative p-2 rounded">

                        <button className="absolute ml-[600px] mt-[-10px]" onClick={() => cambioEstadoModalSoliMasAgr(false)}><FontAwesomeIcon className="text-3xl colorX" icon={faTimes}></FontAwesomeIcon></button>

                        <div className="mb-8 ml-[395px] mt-[30px] w-[200px] mb-[-10px]">
                            <label className="block textColor text-lg font-bold ml-[40px]" for="Idbenesoliagr">
                                Id Beneficio
                            </label>
                            <input onChange={(e) => setIdBeneficio(e.target.value)} className="mb-[-10px] inputColor shadow appearance-none border rounded w-full py-1 px-3 textColor leading-tight focus:outline-none focus:shadow-outline" id="idbenesoliagr" name="idbenesoliagr" type="number" placeholder="Id Beneficio"></input>
                        </div>



                        <div className="flex items-center justify-between absolute">
                            <button onClick={verificarBeneficio} className="mt-[20px] ml-[415px] w-[165px] navbarColor text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm " type="button">
                                Ver Beneficio
                            </button>
                        </div>

                        <div className="flex items-center justify-between absolute mt-[80px] ml-[380px]">
                            <button onClick={agregarMasivo} className="navbarColor w-[240px] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg" type="button">
                                Ingresar Solicitudes Masivas
                            </button>
                        </div>



                        <MUIDataTable
                            data={soliBeneficiarios}
                            columns={columns}
                            options={options}
                            id="tablaBeneficiarios"
                            className="absolute w-[370px] mt-[-70px]"
                        />




                    </div>
                </div>
            }
        </>
    )
}