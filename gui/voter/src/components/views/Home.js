import Header from "../../helpers/Header"
import Footer from "../../helpers/Footer"
import {useNavigate} from "react-router-dom"
import { useSelector } from 'react-redux'
import { useTranslation } from "react-i18next"

const Home = () => {

    const {t, i18n} = useTranslation()

    const axios = require('axios')
    const navigate = useNavigate();
    const vote = useSelector(state => state.vote.obj)
    const user = useSelector(state => state.user.obj)

    const fillOutBallot = () => {
        navigate("/vote")
    }


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

    const requestLogout = async() => {
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

            <div class="container px-5 py-3 sm:py-10 mx-auto flex">
                <div class="flex w-full">

                    <div class="lg:p-10 py-1 lg:py-6 w-full">
                        <h1 class="text-3xl pb-3 lg:pb-20 sm:text-5xl text-center font-medium text-logobrown-1000 tracking-wider">{t("titleHome")}</h1>
                        <p class="text-sm sm:text-base py-1 sm:py-7 text-logobrown-1000">{t("textHome")}</p>
        
                        {vote!==null ? 
                        (
                            <div class="flex justify-center w-full">
                                <div class="w-full sm:w-3/4 bg-logolblue-100 rounded-lg p-2 lg:p-8 mt-2 sm:mt-20 flex flex-col">
                                    <div className="">
                                        <h2 className="text-xl sm:text-3xl font-medium title-font text-logobrown-1000 text-center mb-4 lg:mb-10">{vote.vote}</h2>
                                        <div className="flex justify-around ">
                                            {vote.questions[0].election_list_members.length!==0 ? (
                                                <div className="hidden lg:flex justify-center basis-1/3 m-auto">
                                                    <p className="text-lg text-logobrown-1000">{t("numberOfListsHome")} {vote.questions.length}</p>
                                                </div>
                                            ) 
                                            : 
                                            (
                                                <div className="hidden lg:flex justify-center basis-1/3 m-auto">
                                                    <p className="text-lg text-logobrown-1000">{t("numberOfQuestionsHome")} {vote.questions.length}</p>
                                                </div>
                                            )}
                                            <div className="flex justify-center lg:basis-1/3 ">
                                                <button onClick={() => fillOutBallot()} disabled={vote.phase!=="Voting" || user.data[0].votedQuestions.length!==0} class="w-full p-2 lg:w-3/4 text-sm lg:text-lg text-white bg-logolblue-500 py-2 mx-auto lg:px-8 enabled:hover:bg-logolblue-700 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">{t("buttonHome")}</button>
                                            </div>
                                                <div className="flex justify-center lg:basis-1/3">
                                                {vote.phase==="Voting" ? 
                                                (
                                                    <div className="flex m-auto">
                                                        <p className="lg:text-lg text-logobrown-1000">Status:</p>
                                                        <p className="lg:text-lg pl-1 text-green-800">{t("statusOpenHome")}</p>
                                                    </div>
                                                ) 
                                                : 
                                                (
                                                    <div className="flex m-auto">
                                                        <p className="lg:text-lg text-logobrown-1000">Status:</p>
                                                        <p className="lg:text-lg pl-1 text-red-800">{t("statusClosedHome")}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>        
                            </div>
                        ) 
                        : 
                        (
                            <div class="flex justify-center ">
                                <div class="w-2/3 flex flex-col">
                                    <div class="pt-5 sm:pt-20 text-center">
                                        <svg role="status" class="inline w-16 sm:w-20 h-16 sm:h-20 text-logolblue-500 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                        </svg>                                  
                                    </div>
                                    <p className="text-center text-logolblue-500 text-base mt-3">
                                        {t("statusHome")}
                                    </p>
                                </div>
                            </div>
                        )}

                        <button onClick={() => logout()} class="lg:w-1/6 mt-5 lg:mt-20 float-right text-white bg-logolblue-500 py-2 px-1 lg:px-8 enabled:hover:bg-logolblue-700 rounded-lg text-sm lg:text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">{t("logoutButtonHome")}</button>


                    </div>
                </div>

            </div>


            <Footer />
            
            </section>

    );
}

export default Home;