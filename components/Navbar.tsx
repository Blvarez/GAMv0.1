import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Cookies from "universal-cookie";
import axios from "axios";



export default function Navbar() {


  const [usuario, setUsuario] = useState<string>();
  const [permisosNav, setPermisosNav] = useState<number>(0);

  useEffect(() => {
    const cookie = new Cookies();

    const valorCookie = cookie.get("muni");
    console.log(valorCookie, "Este es el valor de la cookie");


    const valoresCookies: any = jwt.decode(valorCookie);


    if (valoresCookies == null) {
      setPermisosNav(0);
    }
    else {
      setPermisosNav(1);
      const usu = valoresCookies["nombreG"];
      setUsuario(usu);

    }
  }, [])

  const cerrrarSesion = async () => {
    await axios({
      method: "get",
      url: "http://localhost:3001/cerrarSesionCompleto",
      withCredentials: true
    }).then((response) => {
      const llegando = response.data;
      if (llegando.mensaje == "EP") {
        console.log("Sesion Cerrada y Eliminada la cookie")
      }

    })
  }

  const eliminarCookie = () => {
    document.cookie = "muni=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  }

  const cerrarSesionFusion = () => {
    eliminarCookie();
    cerrrarSesion();
  }


  let imagen: string = "https://i.ibb.co/JkvcFTD/cropped-LOGO-10-ANOS2-1.png";

  //@ts-ignore
  const [nuevaImagen, setnuevaImagen] = useState<Blob | null>(null);

  let navBar = null;

  if (permisosNav == 0) {
    navBar = (
      <nav className="bg-[#003352] w-full flex items-center">
        <div className="flex items-center mx-auto">
          {nuevaImagen != null ? (
            <img src={URL.createObjectURL(nuevaImagen)}></img>
          ) : (
            <img className="h-20" src={imagen}></img>
          )}
        </div>
      </nav>
    )
  }
  else {
    navBar = (
      <nav className="bg-[#003352] w-full flex items-center">
        <div className="p-3">
          <h1 className="text-xl"><strong><u>Usuario: {usuario}</u> </strong> </h1>
        </div>
        <div className="flex items-center mx-auto">
          {nuevaImagen != null ? (
            <img src={URL.createObjectURL(nuevaImagen)}></img>
          ) : (
            <img className="h-20" src={imagen}></img>
          )}
        </div>
        <div className="p-3">
          <button onClick={() => cerrarSesionFusion()} className="bg-[#427DA2] rounded-lg text-xl "><strong>Cerrar Sesion</strong></button>

        </div>
      </nav>
    )
  }



  return navBar;
}

