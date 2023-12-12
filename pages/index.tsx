//import { Password } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import Navbar from "../components/Navbar";
import RespuestaBloq from "../components/Alertas/bloq";
import RespuestaUsuario from "../components/Alertas/usuarioinco";

export default function index() {

    const [rut, setRut] = useState<string>("");
    const [contrasenia, setContrasenia] = useState<string>("");

    const [bloq, setBloq] = useState(false);
    const [errori, setErrori] = useState(false);


    const inicioSesion = async () => {
        console.log("Entrando a la funcion de inicio sesion");
        try {
            await axios({
                method: "post",
                data: {
                    rutUsuario: rut,
                    contraseniaUsuario: contrasenia
                },
                url: "http://localhost:3001/inicioSesionPrincipal",
                withCredentials: true
            }).then((response) => {
                const llegando = response.data;
                
                if (llegando.mensaje == "EP") {
                    console.log("Ha accedido con exito");
                    window.location.href = "/menuprincipal";
                }
                else if(llegando.mensaje == "EM"){
                    console.log("Ha accedido con exito");
                    window.location.href = "/Municipalidades/principalMunicipalidades";
                }
                else if(llegando.mensaje == "AB"){
                    setBloq(true);
                }
                else {
                    setErrori(true);
                }
            })
        } catch (error) {
            console.log("Error en el inicio de sesion", error);
        }
    };

    const [errorRut, setErrorRut] = useState<string | null>(null);

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
 
    return (
        <>
            <div className="bg-[#427DA2] fixed inset-0">

                <Navbar/>
                <div className="flex items-center justify-center w-screen h-screen">
                    <div className="w-[700px] h-[380px] bg-[#003352] rounded-tl-[50px] rounded-br-[50px] grid grid-cols-5 grid-rows-10 gap-4 mt-[-100px]">
                        <h1 className="text-white font-bold col-start-3 col-end-5 row-start-2 row-end-3 text-[35px] ml-[-50px]">Iniciar Sesion</h1>
                        <h2 className="text-white font-bold col-start-2 row-start-3 row-end-4 text-xl">Rut</h2>
                        <input onChange={(e) => validarRut(e.target.value)} className="bg-white col-start-2 col-end-5 row-start-4 row-end-5 rounded-t-xl rounded-b-xl"></input>
                        {errorRut && <p className="text-red-500 ml-[135px] mt-[70px] absolute">{errorRut}</p>}
                        <h2 className="text-white font-bold col-start-2 row-start-5 row-end-6 text-xl">Contraseña</h2>
                        <input onChange={(e) => setContrasenia(e.target.value)} className="bg-white col-start-2 col-end-5 row-start-6 row-end-7 rounded-t-xl rounded-b-xl mb-[20px]" type={"password"}></input>
                        <button onClick={inicioSesion} className="bg-[#427DA2] col-start-3 col-end-5 row-start-7 row-end-8 mb-[40px] rounded-tr-[50px] rounded-bl-[50px] text-white text-2xl w-[200px] ml-[-45px]">INICIAR</button>
                    </div>
                </div>
                <RespuestaUsuario estadoRespuestaBloq={errori} cambioEstadoRespuestaBloq={setErrori}></RespuestaUsuario>
                <RespuestaBloq estadoRespuestaBloq={bloq} cambioEstadoRespuestaBloq={setBloq} rutt={rut}/>
            </div>
        </>
    )
}