import { useEffect } from "react";
import Navbar from "../components/Navbar";

export default function menuPrincipal(){

    function cookiessss (){
        setTimeout(() => { 
            const cookieactual = document.cookie.split(";");
            console.log(cookieactual);
        },2000);
        }

    useEffect(() => {
        cookiessss();
    },[])

    const usuario = "";


    return (
        <>
            <div className="bg-[#427DA2] fixed inset-0">
                
                <Navbar usuario={usuario}></Navbar>

                <div className="p-5">
                    <h1 className="text-white text-center text-[30px] underline"><strong>MENU</strong></h1>
                </div>


                <div className="grid grid-rows-6 gap-2 w-[90%] h-[80%]  mx-auto bg-[#003352] bg-opacity-[53%] rounded-tl-[50px] rounded-br-[50px]">
                </div>
            </div>
        </>
    )
}