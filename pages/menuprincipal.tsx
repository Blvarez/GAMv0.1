import Navbar from "../components/Navbar";

export default function menuPrincipal(){

    
    /* const permisosAcceso = 0;
    const permisosDepartamentos = 0; */


    return (
        <>
            <div className="bg-[#427DA2] fixed inset-0">
                
                <Navbar></Navbar>

                <div className="p-5">
                    <h1 className="text-white text-center text-[30px] underline"><strong>MENU</strong></h1>
                </div>


                <div className="grid grid-rows-6 gap-2 w-[90%] h-[80%]  mx-auto bg-[#003352] bg-opacity-[53%] rounded-tl-[50px] rounded-br-[50px]">
                
                <div className="grid grid-cols-3 row-start-2 row-end-6">
                    <div className="col-start-2 col-end-2 bg-[#427DA2] rounded-tr-[50px] rounded-bl-[50px] flex flex-col items-center justify-center ">
                        <h1 className="text-center text-white underline text-[20px] mb-[60px]">PRINCIPAL</h1>
                        <button onClick={() => { window.location.href = "./principalAdmin" }} className="flex  items-center justify-center text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Gestion Municipalidades</button>
                        <button onClick={() => { window.location.href = "./Municipalidades/consultas" }} className="flex  items-center justify-center text-white bg-[#003352] w-3/4 rounded-tr-[50px] rounded-bl-[50px] mb-[40px]">Consultas</button>
                    </div>
                    
                </div>)
                
                
                
                
                </div>
            </div>
        </>
    )
}