import Header from "../../helpers/Header"
import Footer from "../../helpers/Footer"
import {useNavigate} from "react-router-dom"
import StepsConfirmation from "../../helpers/StepsConfirmation"

const Confirmation = () => {
    const navigate = useNavigate();


    const logout = () => {
        localStorage.clear();  
        window.location.reload(false); 
    }

    const home = async() => {
        navigate("/home")
    }

    return (
        <section>

            <Header />

            <div class="container px-5 py-10 mx-auto flex">
                <div class="flex w-full">
                    
                    <StepsConfirmation />

                    <div class="w-7/10 p-10 py-6">
                        <h1 class="text-5xl font-medium title-font text-logobrown-1000 tracking-wider">Confirmation</h1>
                        <p class="text-base py-7 text-logobrown-1000">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>

                        <div class="flex justify-center w-full">
                            <p className="text-lg py-7 text-green-700">Your ballot was successfully submitted</p>     
                        </div>

                        <button onClick={() => logout()} class="w-1/6 mt-20 float-left text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">Logout</button>


                        <button onClick={() => home()} class="w-1/6 mt-20 float-right text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">Home</button>

                    </div>
                </div>

            </div>


            <Footer />
            
            </section>

    );
}

export default Confirmation;