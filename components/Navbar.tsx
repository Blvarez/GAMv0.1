//import React, { /* useEffect, */ useState } from "react";
/* import axios from "axios";
 */
/* interface Props {
    usuario: string;
}


export default function ({ usuario }: Props) {

    let imagen: string = "https://i.ibb.co/JkvcFTD/cropped-LOGO-10-ANOS2-1.png";

    //@ts-ignore
    const [nuevaImagen, setnuevaImagen] = useState<Blob | null>(null);

    let boton = null;
    let dondeVaUsuario = null

    if(usuario != null || usuario != undefined || usuario != ""){
        dondeVaUsuario=(
            <h1 className="ml-2 text-white font-bold">Usuario: {usuario}</h1>
        )
        boton=(
            <button>Cierre Sesion</button>
        )
    }
    else{
        <h1 className="ml-2 text-white font-bold"></h1>

    }

    return (
        <nav className="bg-[#003352] w-full flex items-center">
            {dondeVaUsuario}
            <div className="flex items-center mx-auto">
                {nuevaImagen != null ? (
                    <img src={URL.createObjectURL(nuevaImagen)}></img>
                ) : (
                    <img className="h-20" src={imagen}></img>
                )}
            </div>
        </nav>
    )
}    */



import React, { useEffect, useState } from "react";

interface Props {
  usuario: string;
}

const NavBar: React.FC<Props> = ({ usuario }) => {
    //@ts-ignore
  const [nuevaImagen, setNuevaImagen] = useState<Blob | null>(null);
  const [mostrarContenido, setMostrarContenido] = useState(false);

  useEffect(() => {
    // Aquí puedes verificar la existencia de la cookie
    const cookieExistente = document.cookie.includes("muni");

    if (cookieExistente) {
      borrarCookie();
      redirigirAInicio();
      setMostrarContenido(false);
    } else {
      setMostrarContenido(true);
    }
  }, [usuario]);

  const borrarCookie = () => {
    document.cookie = "muni=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const redirigirAInicio = () => {
    window.location.href = "/";
  };

  const cerrarSesion = () => {
    // Puedes llamar a esta función cuando el usuario hace clic en "Cerrar Sesión"
    borrarCookie();
    redirigirAInicio();
    setMostrarContenido(false);
  };

  return (
    <nav className="bg-[#003352] w-full flex items-center">
      {mostrarContenido && (
        <>
          <button onClick={cerrarSesion}>Cerrar Sesión</button>
          <h1 className="ml-2 text-white font-bold">Usuario: {usuario}</h1>
        </>
      )}
      <div className="flex items-center mx-auto">
        {nuevaImagen != null ? (
          <img src={URL.createObjectURL(nuevaImagen)} alt="Imagen"></img>
        ) : (
          <img className="h-20" src="https://i.ibb.co/JkvcFTD/cropped-LOGO-10-ANOS2-1.png" alt="Logo"></img>
        )}
      </div>
    </nav>
  );
};

export default NavBar;