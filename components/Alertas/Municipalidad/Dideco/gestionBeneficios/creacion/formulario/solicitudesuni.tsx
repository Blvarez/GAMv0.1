import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import VentanaModBeneficio from "../../modificacion/Modalbeneficiomod";
import VentanaModBeneficiario from "../../modificacion/Modalbeneficiariomod";
import RespuestaCreacionSolicitud from "../respuestaCreacionSolicitudes";
import RespuestaCreacionBeneficiario from "../respuestaCreacionBeneficiario";

interface Props {
    estadoModalSoliUniAgr: boolean,
    cambioEstadoModalSoliUniAgr: (nuevoEstado: boolean) => void
}


export default function SolicitudesUni({ estadoModalSoliUniAgr, cambioEstadoModalSoliUniAgr }: Props) {


    const [rut, setRut] = useState<string>();
    const [errorRut, setErrorRut] = useState<string | null>(null);


    const [tipoEntrega, setTipoEntrega] = useState<number>();
    const [tipoDato, setTipoDato] = useState<number>();
    const [erroro, setErroro] = useState<number>();
    const[estadoCreacion, setEstadoCreacion] = useState(false);



    const agregarUnitario = () => {

        axios({
            method: "post",
            data: {
                rut: rut,
                idbeneficio: beneficioSelect,
            },
            url: "http://localhost:3001/dideco/solicitudes/creacionSolicitud",
            withCredentials: true
        }).then((response) => {
            const mensaje = response.data.message;

            if(mensaje == "T1PE"){
                setErroro(2);
                setTipoDato(1);
                setTipoEntrega(1);
                setEstadoCreacion(true);
            }
            else if(mensaje == "T1EE"){
                setErroro(2);
                setTipoDato(1);
                setTipoEntrega(2);
                setEstadoCreacion(true);
            }
            else if(mensaje == "PR"){
                setErroro(1);
                setTipoDato(1);
                setTipoEntrega(1);
                setEstadoCreacion(true);
            }
            else if(mensaje == "ER"){
                setErroro(1);
                setTipoDato(1);
                setTipoEntrega(2);
                setEstadoCreacion(true);
            }



            else if(mensaje == "T2EP"){
                setErroro(2);
                setTipoDato(2);
                setTipoEntrega(1);
                setEstadoCreacion(true);
            }

            else if(mensaje == "T2EE"){
                setErroro(2);
                setTipoDato(2);
                setTipoEntrega(2);
                setEstadoCreacion(true);
            }
            else if(mensaje == "T2PR"){
                setErroro(1);
                setTipoDato(2);
                setTipoEntrega(1);
                setEstadoCreacion(true);
            }
            else if(mensaje == "T2ER"){
                setErroro(1);
                setTipoDato(2);
                setTipoEntrega(2);
                setEstadoCreacion(true);
            }

            else if(mensaje == "FECB"){
                    setTipoDatoo(2);
                    setError(3);
                    setVentanaCreacionBeneficiario(true);
            }


        })

    }

    const [tipoDatoo, setTipoDatoo] = useState<number>(0);
    const [error, setError] = useState<number>();
    const [ventanaCreacionBeneficiario, setVentanaCreacionBeneficiario] = useState(false);

    const verificacionBeneficiario = () => {

        axios({
            method: "post",
            data: {
                rut: rut
            },
            url: "http://localhost:3001/dideco/solicitudes/verificacionBeneficiario",
            withCredentials: true
        }).then((response) => {
            const mensaje = response.data.message;

            if (mensaje == "SEB") {
                setLector(1);
                setVentanaModBeneficiario(true);
            }
            else if(mensaje == "NEB"){
                console.log("Beneficiario no existe");
            }


        })

    }

    const validarRut = (inputRut: string) => {
        // Elimina puntos del RUT
        const rutSinFormato = inputRut.replace(/\./g, "");
    
        // Verifica que el RUT tenga el formato correcto
        const regexRut = /^(\d{1,9}-[\dkK])$/;
    
        if (regexRut.test(rutSinFormato)) {
          setRut(rutSinFormato);
          setErrorRut(null);
        } else {
          setRut("");
          setErrorRut("¡Por favor, ingrese un RUT chileno válido!");
        }
      };




    useEffect(() => {
        if (estadoModalSoliUniAgr == true) {
            obtencionDatosBeneficios();
        }
    }, [estadoModalSoliUniAgr])




    const [datosBeneficiosSelect, setDatosBeneficiosSelect] = useState();
    const [beneficioSelect, setBeneficioSelect] = useState(); //Este va al back


    const [ventanaMod, setVentanaMod] = useState(false);
    const [lector, setLector] = useState<number>();

    const [ventanaModBeneficiario, setVentanaModBeneficiario] = useState(false);


    const obtencionDatosBeneficios = async () => {
        await axios.get("http://localhost:3001/dideco/solicitudes/obtencionBeneficiosUni").then((response) => {  //CAMBIAR LA DIRECCION DE LA CONSULTA
            const datosBeneficios = response.data;
            setDatosBeneficiosSelect(datosBeneficios);
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
            {estadoModalSoliUniAgr &&

                <div className="z-10 w-screen h-screen bg-black bg-opacity-40 top-0 left-0 fixed items-center justify-center flex">
                    <div className="mt-[30px] modalColor bg-white w-[650px] h-[320px] relative p-2 rounded grid grid-rows-5 grid-cols-3">


                        <div className="row-start-1 row-end-1 col-start-1 col-end-5">
                            <h1 className="text-3xl underline mt-[5px] ml-[190px] mb-[-120px] text-[#427DA2]">Agregada Unitaria</h1>
                            <button className="absolute ml-[600px] mt-[48px] " onClick={() => cambioEstadoModalSoliUniAgr(false)}>asd<FontAwesomeIcon className="text-2xl text-red-500" icon={faTimes}></FontAwesomeIcon></button>
                        </div>

                        <div className="row-start-2 row-end-2 col-start-1 col-end-2">
                            <label className="block textColor text-lg font-bold ml-[10px] text-[#427DA2]" htmlFor="Nombeneficiarioagr">
                                Rut Beneficiario
                            </label>
                            <input className="w-[260px] mb-[-10px] inputColor shadow appearance-none border rounded  py-1 px-3 textColor  leading-tight focus:outline-none focus:shadow-outline" id="NombresBeneficiariomod" name="NombresBeneficiariomod" type="text" placeholder="Rut Beneficiario" onChange={(e) => validarRut(e.target.value)} />
                    {errorRut && <p className="text-red-500 ml-[25px] mt-[-120px]">{errorRut}</p>}
                        </div>


                        <div className="row-start-2 row-end-2 col-start-3 col-end-3">
                            <button onClick={verificacionBeneficiario} className="bg-[#427DA2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm mt-[23px] ml-[-30px] " type="button">
                                Ver Beneficiario
                            </button>
                        </div>
                        <div className="row-start-2 row-end-2 col-start-4 col-end-4">
                            <button onClick={verificarBeneficio} className="bg-[#427DA2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm mt-[14px]" type="button">
                                Ver Solicitudes  <br/> Beneficiario
                            </button>
                        </div>

                        <div className="row-start-3 row-end-3 col-start-1 col-end-2">
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



                        <div className="row-start-3 row-end-3 col-start-4 col-end-4">
                            <button onClick={verificarBeneficio} className="bg-[#427DA2] ml-[-120px] w-[200px] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm mt-[28px] " type="button">
                                Ver Beneficio
                            </button>
                        </div>



                        <div className="row-start-4 row-end-5 col-start-2 col-end-2">
                            <button onClick={agregarUnitario} className="bg-[#427DA2] text-white font-bold ml-[-5px] w-[300px] mt-[40px] py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg" type="button">
                                Ingresar Solicitudes Masivas
                            </button>
                        </div>



                    </div>
                    <VentanaModBeneficio estadoModalBeneficioMod={ventanaMod} cambioEstadoModalBeneficioMod={setVentanaMod} idmodbeneficio={beneficioSelect} lector={lector} />
                    <VentanaModBeneficiario estadoModalBeneficiarioMod={ventanaModBeneficiario} cambioEstadoModalBeneficiarioMod={setVentanaModBeneficiario} rutMod={rut} lector={lector}></VentanaModBeneficiario>
                    <RespuestaCreacionSolicitud postent={tipoEntrega} tipoDato={tipoDato} estadoCreacion={estadoCreacion} cambioEstadoCreacion={setEstadoCreacion} error={erroro}/>
                    <RespuestaCreacionBeneficiario estadoCreacion={ventanaCreacionBeneficiario} cambioEstadoCreacion={setVentanaCreacionBeneficiario} error={error} tipoDato={tipoDatoo} datoExtra={rut}/>
                    
                </div>
            }
        </>
    )
}

