import Navbar from "../../components/Navbar";
import jwt from "jsonwebtoken";
import Cookies from "universal-cookie";

export default function menuDideco() {

    const cookie = new Cookies();

    const datosCookie = cookie.get("muni");
    const decodificacionCookie = jwt.decode(datosCookie);

    console.log(decodificacionCookie);




    const usuario = "";
    /* const permisosAcceso = 0;*/
    const permisos: number = 20;

    let vistaDideco = null;

    if (permisos >= 30) {
        vistaDideco = (
            <div className="grid grid-cols-5 row-start-2 row-end-6">

                <div className="col-start-2 col-end-2 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px] flex flex-col items-center justify-center ">
                    <h1 className="text-center text-white underline text-[20px] mb-[60px]">PRINCIPAL</h1>
                    <button className="flex  items-center justify-center text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Gestor de Usuarios</button>
                </div>
                <div className="col-start-4 col-end-4 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px] flex flex-col items-center justify-center  ">
                    <h1 className="text-center text-white underline text-[20px] mb-[60px]">GESTOR DE</h1>
                    <button onClick={() => { window.location.href = "./Dideco/beneficios" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Beneficios</button>
                    <button onClick={() => { window.location.href = "./Dideco/beneficiarios" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Beneficiarios</button>
                    <button onClick={() => { window.location.href = "./Dideco/solicitudes" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Solicitud</button>
                </div>
            </div>
        )
    }

    if (permisos < 30) {
        vistaDideco = (
            <div className="grid grid-cols-5 row-start-2 row-end-6">
                <div className="col-start-3 col-end-4 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px] flex flex-col items-center justify-center  ">
                    <h1 className="text-center text-white underline text-[20px] mb-[60px]">GESTOR DE</h1>
                    <button onClick={() => { window.location.href = "./Dideco/beneficios" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Beneficios</button>
                    <button onClick={() => { window.location.href = "./Dideco/beneficiarios" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Beneficiarios</button>
                    <button onClick={() => { window.location.href = "./Dideco/solicitudes" }} className=" text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Solicitud</button>
                </div>
            </div>
        )
    }






    return (
        <>
            <div className="bg-[#427DA2] fixed inset-0">

                <Navbar usuario={usuario}></Navbar>

                <div className="p-5">
                    <h1 className="text-white text-center text-[30px] underline"><strong>Menu Dideco</strong></h1>
                </div>


                <div className="grid grid-rows-6 gap-2 w-[90%] h-[80%]  mx-auto bg-[#003352] bg-opacity-[53%] rounded-tl-[50px] rounded-br-[50px]">

                    {vistaDideco}




                </div>
            </div>
        </>
    )
}