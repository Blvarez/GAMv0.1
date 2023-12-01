import React, { /* useEffect, */ useState } from "react";
/* import axios from "axios";
 */
interface Props {
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
}