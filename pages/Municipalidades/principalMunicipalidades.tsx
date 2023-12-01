import Navbar from "../../components/Navbar";
import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";

export default function menuPrincipal() {

    const [departamentosDes, setDepartamentosDes] = useState<number>();
    const [usuarioo, setUsuarioo] = useState<string>();
    const [municipalidad, setMunicipalidad] = useState<string>();
    const [permisos, setPermisos] = useState<number>();


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
                const departa = valoresCookies["departamentoG"];
                const usu = valoresCookies["nombreG"];
                const muni = valoresCookies["nombreMuniG"];
                const permisos = valoresCookies["permisosG"];
                setDepartamentosDes(departa);
                setPermisos(permisos);
                setUsuarioo(usu);
                setMunicipalidad(muni);
            }
        }
    }, [])


    const usuario: string = usuarioo || "";
    /* const permisosAcceso = 0;*/
    const permisosDepartamentos: number = departamentosDes || 0;
    console.log(permisosDepartamentos)


    let departamentosDesbloqueados = null;

    if (permisos == 1000) {
        if (permisosDepartamentos >= 100) {
            departamentosDesbloqueados = (
                <div className="grid grid-cols-5 row-start-2 row-end-6">
                    <div className="col-start-2 col-end-2 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px] flex flex-col items-center justify-center ">
                        <h1 className="text-center text-white underline text-[20px] mb-[60px]">PRINCIPAL</h1>
                        <button onClick={() => { window.location.href = "./principalUsuarios" }} className="flex  items-center justify-center text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Gestor de Usuarios</button>
                        <button className="flex  items-center justify-center text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Consultas</button>
                    </div>
                    <div className="col-start-4 col-end-4 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px] flex flex-col items-center justify-center  ">
                        <h1 className="text-center text-white underline text-[20px] mb-[60px]">DEPARTAMENTOS</h1>
                        <button onClick={() => { window.location.href = "./principalDideco" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]" >Dideco</button>
                        <button onClick={() => { window.location.href = "./principalDepartamentoFalso1" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Departamento Falso 1</button>
                        <button onClick={() => { window.location.href = "./principalDepartamentoFalso2" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Departamento Falso 2</button>
                    </div>
                </div>)
        }

        else if (permisosDepartamentos == 3) {
            departamentosDesbloqueados = (
                <div className="grid grid-cols-5 row-start-2 row-end-6">
                    <div className="col-start-2 col-end-2 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px] flex flex-col items-center justify-center ">
                        <h1 className="text-center text-white underline text-[20px] mb-[60px]">PRINCIPAL</h1>
                        <button onClick={() => { window.location.href = "./principalUsuarios" }} className="flex  items-center justify-center text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Gestor de Usuarios</button>
                        <button className="flex  items-center justify-center text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Consultas</button>
                    </div>
                    <div className="col-start-4 col-end-4 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px]  flex flex-col items-center justify-center ">
                        <h1 className="text-center text-white underline text-[20px] mb-[60px] ">DEPARTAMENTOS</h1>
                        <button onClick={() => { window.location.href = "./principalDideco" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]" >Dideco</button>
                    </div>
                </div>)
        }

        else if (permisosDepartamentos == 10) {
            departamentosDesbloqueados = (
                <div className="grid grid-cols-5 row-start-2 row-end-6">
                    <div className="col-start-2 col-end-2 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px] flex flex-col items-center justify-center ">
                        <h1 className="text-center text-white underline text-[20px] mb-[60px]">PRINCIPAL</h1>
                        <button onClick={() => { window.location.href = "./principalUsuarios" }} className="flex  items-center justify-center text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Gestor de Usuarios</button>
                        <button className="flex  items-center justify-center text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Consultas</button>
                    </div>
                    <div className="col-start-4 col-end-4 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px] flex flex-col items-center justify-center   ">
                        <h1 className="text-center text-white underline text-[20px] mb-[60px] ">DEPARTAMENTOS</h1>
                        <button onClick={() => { window.location.href = "./principalDepartamentoFalso1" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Departamento Falso 1</button>
                    </div>
                </div>)
        }

        else if (permisosDepartamentos == 17) {
            departamentosDesbloqueados = (
                <div className="grid grid-cols-5 row-start-2 row-end-6">
                    <div className="col-start-2 col-end-2 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px] flex flex-col items-center justify-center ">
                        <h1 className="text-center text-white underline text-[20px] mb-[60px]">PRINCIPAL</h1>
                        <button onClick={() => { window.location.href = "./principalUsuarios" }} className="flex  items-center justify-center text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Gestor de Usuarios</button>
                        <button className="flex  items-center justify-center text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Consultas</button>
                    </div>
                    <div className="col-start-4 col-end-4 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px] flex flex-col items-center justify-center  ">
                        <h1 className="text-center text-white underline text-[20px] mb-[60px] ">DEPARTAMENTOS</h1>
                        <button onClick={() => { window.location.href = "./principalDepartamentoFalso2" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Departamento Falso 2</button>
                    </div>
                </div>)
        }

        else if (permisosDepartamentos == 13) {
            departamentosDesbloqueados = (
                <div className="grid grid-cols-5 row-start-2 row-end-6">
                    <div className="col-start-2 col-end-2 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px] flex flex-col items-center justify-center ">
                        <h1 className="text-center text-white underline text-[20px] mb-[60px]">PRINCIPAL</h1>
                        <button onClick={() => { window.location.href = "./principalUsuarios" }} className="flex  items-center justify-center text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Gestor de Usuarios</button>
                        <button className="flex  items-center justify-center text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Consultas</button>
                    </div>
                    <div className="col-start-4 col-end-4 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px]  flex flex-col items-center justify-center ">
                        <h1 className="text-center text-white underline text-[20px] mb-[60px] ">DEPARTAMENTOS</h1>
                        <button onClick={() => { window.location.href = "./principalDideco" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]" >Dideco</button>
                        <button onClick={() => { window.location.href = "./principalDepartamentoFalso1" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Departamento Falso 1</button>
                    </div>
                </div>)
        }

        else if (permisosDepartamentos == 20) {
            departamentosDesbloqueados = (
                <div className="grid grid-cols-5 row-start-2 row-end-6">
                    <div className="col-start-2 col-end-2 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px] flex flex-col items-center justify-center ">
                        <h1 className="text-center text-white underline text-[20px] mb-[60px]">PRINCIPAL</h1>
                        <button onClick={() => { window.location.href = "./principalUsuarios" }} className="flex  items-center justify-center text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Gestor de Usuarios</button>
                        <button className="flex  items-center justify-center text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Consultas</button>
                    </div>
                    <div className="col-start-4 col-end-4 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px] flex flex-col items-center justify-center  ">
                        <h1 className="text-center text-white underline text-[20px] mb-[60px] ">DEPARTAMENTOS</h1>
                        <button onClick={() => { window.location.href = "./principalDideco" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]" >Dideco</button>
                        <button onClick={() => { window.location.href = "./principalDepartamentoFalso2" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Departamento Falso 2</button>
                    </div>
                </div>)
        }

        else if (permisosDepartamentos == 27) {
            departamentosDesbloqueados = (
                <div className="grid grid-cols-5 row-start-2 row-end-6">
                    <div className="col-start-2 col-end-2 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px] flex flex-col items-center justify-center ">
                        <h1 className="text-center text-white underline text-[20px] mb-[60px]">PRINCIPAL</h1>
                        <button onClick={() => { window.location.href = "./principalUsuarios" }} className="flex  items-center justify-center text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Gestor de Usuarios</button>
                        <button className="flex  items-center justify-center text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Consultas</button>
                    </div>
                    <div className="col-start-4 col-end-4 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px] flex flex-col items-center justify-center  ">
                        <h1 className="text-center text-white underline text-[20px] mb-[60px] ">DEPARTAMENTOS</h1>
                        <button onClick={() => { window.location.href = "./principalDepartamentoFalso1" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Departamento Falso 1</button>
                        <button onClick={() => { window.location.href = "./principalDepartamentoFalso2" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Departamento Falso 2</button>
                    </div>
                </div>)
        }
    }
    else {
        if (permisosDepartamentos >= 100) {
            departamentosDesbloqueados = (
                <div className="grid grid-cols-5 row-start-2 row-end-6">

                    <div className="col-start-4 col-end-4 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px] flex flex-col items-center justify-center  ">
                        <h1 className="text-center text-white underline text-[20px] mb-[60px]">DEPARTAMENTOS</h1>
                        <button onClick={() => { window.location.href = "./principalDideco" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]" >Dideco</button>
                        <button onClick={() => { window.location.href = "./principalDepartamentoFalso1" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Departamento Falso 1</button>
                        <button onClick={() => { window.location.href = "./principalDepartamentoFalso2" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Departamento Falso 2</button>
                    </div>
                </div>)
        }

        else if (permisosDepartamentos == 3) {
            departamentosDesbloqueados = (
                <div className="grid grid-cols-5 row-start-2 row-end-6">

                    <div className="col-start-4 col-end-4 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px]  flex flex-col items-center justify-center ">
                        <h1 className="text-center text-white underline text-[20px] mb-[60px] ">DEPARTAMENTOS</h1>
                        <button onClick={() => { window.location.href = "./principalDideco" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]" >Dideco</button>
                    </div>
                </div>)
        }

        else if (permisosDepartamentos == 10) {
            departamentosDesbloqueados = (
                <div className="grid grid-cols-5 row-start-2 row-end-6">

                    <div className="col-start-4 col-end-4 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px] flex flex-col items-center justify-center   ">
                        <h1 className="text-center text-white underline text-[20px] mb-[60px] ">DEPARTAMENTOS</h1>
                        <button onClick={() => { window.location.href = "./principalDepartamentoFalso1" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Departamento Falso 1</button>
                    </div>
                </div>)
        }

        else if (permisosDepartamentos == 17) {
            departamentosDesbloqueados = (
                <div className="grid grid-cols-5 row-start-2 row-end-6">

                    <div className="col-start-4 col-end-4 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px] flex flex-col items-center justify-center  ">
                        <h1 className="text-center text-white underline text-[20px] mb-[60px] ">DEPARTAMENTOS</h1>
                        <button onClick={() => { window.location.href = "./principalDepartamentoFalso2" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Departamento Falso 2</button>
                    </div>
                </div>)
        }

        else if (permisosDepartamentos == 13) {
            departamentosDesbloqueados = (
                <div className="grid grid-cols-5 row-start-2 row-end-6">

                    <div className="col-start-4 col-end-4 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px]  flex flex-col items-center justify-center ">
                        <h1 className="text-center text-white underline text-[20px] mb-[60px] ">DEPARTAMENTOS</h1>
                        <button onClick={() => { window.location.href = "./principalDideco" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]" >Dideco</button>
                        <button onClick={() => { window.location.href = "./principalDepartamentoFalso1" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Departamento Falso 1</button>
                    </div>
                </div>)
        }

        else if (permisosDepartamentos == 20) {
            departamentosDesbloqueados = (
                <div className="grid grid-cols-5 row-start-2 row-end-6">

                    <div className="col-start-4 col-end-4 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px] flex flex-col items-center justify-center  ">
                        <h1 className="text-center text-white underline text-[20px] mb-[60px] ">DEPARTAMENTOS</h1>
                        <button onClick={() => { window.location.href = "./principalDideco" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]" >Dideco</button>
                        <button onClick={() => { window.location.href = "./principalDepartamentoFalso2" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Departamento Falso 2</button>
                    </div>
                </div>)
        }

        else if (permisosDepartamentos == 27) {
            departamentosDesbloqueados = (
                <div className="grid grid-cols-5 row-start-2 row-end-6">

                    <div className="col-start-4 col-end-4 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px] flex flex-col items-center justify-center  ">
                        <h1 className="text-center text-white underline text-[20px] mb-[60px] ">DEPARTAMENTOS</h1>
                        <button onClick={() => { window.location.href = "./principalDepartamentoFalso1" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Departamento Falso 1</button>
                        <button onClick={() => { window.location.href = "./principalDepartamentoFalso2" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Departamento Falso 2</button>
                    </div>
                </div>)
        }
    }














    return (
        <>
            <div className="bg-[#427DA2] fixed inset-0">

                <Navbar usuario={usuario}></Navbar>

                <div className="p-5">
                    <h1 className="text-white text-center text-[30px] underline"><strong>MENU {municipalidad}</strong></h1>
                </div>


                <div className="grid grid-rows-6 gap-2 w-[90%] h-[80%]  mx-auto bg-[#003352] bg-opacity-[53%] rounded-tl-[50px] rounded-br-[50px]">




                    {departamentosDesbloqueados}







                </div>
            </div>
        </>
    )
}