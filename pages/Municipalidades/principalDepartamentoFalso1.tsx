import Navbar from "../../components/Navbar";

export default function menuFalso1() {



    const usuario = "";
    


    return (
        <>
            <div className="bg-[#427DA2] fixed inset-0">

                <Navbar usuario={usuario}></Navbar>

                <div className="p-5">
                    <h1 className="text-white text-center text-[30px] underline"><strong>Menu Departamento Falso 1</strong></h1>
                </div>


                
            </div>
        </>
    )
}