import Header from "../../helpers/Header"
import Footer from "../../helpers/Footer"
import { useState, useEffect } from "react"
import {useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import StepsTallying from "../../helpers/StepsTallying"
import { FaKey, FaCheck } from "react-icons/fa"
import { useTranslation } from "react-i18next"



const Tallying = () => {

    const {t, i18n} = useTranslation()

    const axios = require('axios')
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const vote = useSelector(state => state.vote.obj)

    const [clickedCreateKey, setClickedCreateKey] = useState(false)

    const questionsInList = [];

    const decryptKey = async(index) => {
        setClickedCreateKey(true)
        await new Promise(resolve => setTimeout(resolve, 8000));
        console.log("now it starts")
        const response = await requestCreateKey(index)
        if(response.status===0){
            setClickedCreateKey(false);
            alert("There is no connection to the API or Blockchain. Please start the docker containers")
            return
        }
        else if (response.status!==200){
            setClickedCreateKey(false);
            alert("Something went wrong while decrypting the key! Please try again!")
            return
        }
        else {
            setClickedCreateKey(false)
        }
    }

    const requestCreateKey = (index) => {
        console.log(vote.questions[index].questionName)
        return axios.post('http://localhost:4000/postvoting/decrypt', {
            vote: vote.vote,
            question: vote.questions[index].questionName,
            sk: (window._env_.SK),
            sealer: (window._env_.SEALER)
          })
          .then(function (response) {
            return response;
          })
          .catch(function (error) {
            console.log(error);
            return error.response;
          });
      }

      for (const [index, value] of vote.questions.entries()){
        questionsInList.push(
            <li key={index}>
                <div className="flex justify-center"><p className=" text-xl text-logobrown-1000 mx-2">{vote.questions[index].questionName}</p></div>
                {(vote.questions[index].decrypted_sealers.indexOf(window._env_.SEALER) > -1) ? 
                    (
                    <div className="flex justify-between">
                        <div className="flex justify-center items-center">
                            <FaKey className="text-logobrown-1000 mx-2"/>
                            <p className=" text-base text-logobrown-1000 mx-2">1/1 {t("keyDecryptionTallying")}</p>
                        </div>
                        <div className="flex justify-center items-center pt-4 pb-7 ">
                            <FaCheck class="inline w-4 h-4 text-green-700"/>
                            <p className=" text-base text-logobrown-1000 mx-2">{t("successfullTallying")}</p>
                        </div>
                    </div>
                    ) 
                    : 
                    (
                    <div className="flex justify-between my-2">
                        <div className="flex justify-start items-center">
                            <FaKey className="text-logobrown-1000 mx-2"/>
                            <p className=" text-base text-logobrown-1000 mx-2">0/1 {t("keyDecryptionTallying")}</p>
                        </div>
                        <div class="flex justify-end">
                        
                        {clickedCreateKey ? 
                        (
                        <button disabled type="button" class="w-full text-white bg-logodblue-300 py-2 px-8 enabled:hover:bg-logodblue-500 rounded-lg text-lg transition-all disabled:opacity-75 disabled:cursor-not-allowed">
                        <svg role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                        {t("loadingButton")}
                        </button>
                        ) 
                        : 
                        (
                        <button onClick={() => decryptKey(index)} disabled={!vote.questions[index].decrypted_sealers.indexOf(window._env_.SEALER)} class="w-full text-white bg-logodblue-300 py-2 px-8 enabled:hover:bg-logodblue-500 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">{t("buttonTallying")}</button>
                        )}
                        </div>
                    </div>
                    )}
                <span class="inline-block h-1 w-full rounded bg-logodblue-100 mb-6"></span>
            </li>
      )}

    return (
        <section>

            <Header />

            <div class="container px-5 py-10 mx-auto flex">
                <div class="flex w-full">
                    
                    <StepsTallying />

                    <div class="w-7/10 p-10 py-6">
                        <h1 class="text-5xl font-medium title-font text-logobrown-1000 tracking-wider">{t("titleTallying")}</h1>
                        <p class="text-base py-7 text-logobrown-1000">{t("textTallying")}</p>
                        
                        <div class="container px-5 py-7 mx-auto">
                            <div class="w-3/4 mx-auto text-center">
                                <ul className="text-center">
                                    {questionsInList}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
            
            </section>

    );
}

export default Tallying;