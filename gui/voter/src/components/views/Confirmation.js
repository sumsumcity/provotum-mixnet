import Header from "../../helpers/Header"
import Footer from "../../helpers/Footer"
import {useNavigate} from "react-router-dom"
import StepsConfirmation from "../../helpers/StepsConfirmation"
import { useSelector } from 'react-redux'
import { useTranslation } from "react-i18next"


const Confirmation = () => {

    const {t, i18n} = useTranslation()

    const axios = require('axios')
    const navigate = useNavigate();
    const user = useSelector(state => state.user.obj)



    const logout = async() => {
        const response = await requestLogout()
        console.log(response)
        if (response.data===user.data[0].name + " is logged out"){
            localStorage.clear();  
            window.location.reload(false); 
        }
        else {
            alert("Something went wrong while logging out")
        }
    }

    const home = async() => {
        navigate("/home")
    }

    const requestLogout = () => {
        return axios.post('http://localhost:4000/helpers/logout', {
            name: user.data[0].name
          })
          .then(function (response) {
            return response;
          })
          .catch(function (error) {
            console.log(error);
            return error.response;
          });
      }

    return (
        <section>

            <Header />

            <div class="container px-5 py-10 mx-auto flex">
                <div class="flex w-full">
                    
                    <StepsConfirmation />

                    <div class="w-7/10 p-10 py-6">
                        <h1 class="text-5xl font-medium title-font text-logobrown-1000 tracking-wider">{t("titleConfirmation")}</h1>
                        <p class="text-base py-7 text-logobrown-1000">{t("textConfirmation")}</p>

                        <div class="flex justify-center w-full">
                            <p className="text-lg py-7 text-green-700">{t("successfullConfirmation")}</p>     
                        </div>

                        <button onClick={() => logout()} class="w-1/6 mt-20 float-left text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">{t("logoutButton")}</button>
                        <button onClick={() => home()} class="w-1/6 mt-20 float-right text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">{t("buttonConfirmation")}</button>

                    </div>
                </div>

            </div>


            <Footer />
            
            </section>

    );
}

export default Confirmation;