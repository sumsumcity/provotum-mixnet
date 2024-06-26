import Header from "../../helpers/Header"
import Footer from "../../helpers/Footer"
import { useState, useEffect } from "react"
import {useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { advance } from "../../redux/StepSlice"
import StepsTallying from "../../helpers/StepsTallying"
import {FaCheck } from "react-icons/fa"
import { useTranslation } from "react-i18next"


const Tallying = () => {

    const axios = require('axios')
    const navigate = useNavigate();
    const vote = useSelector(state => state.vote.name)
    const questions = useSelector(state => state.vote.questions)
    const dispatch = useDispatch()

    const [maxNumberOfSealers, setmaxNumberOfSealers] = useState(2)
    const [apiQuestions, setApiQuestions] = useState([{decrypted_sealers: []},{decrypted_sealers: []},{decrypted_sealers:[]},{decrypted_sealers:[]},{decrypted_sealers:[]},{decrypted_sealers:[]},{decrypted_sealers:[]},{decrypted_sealers:[]},{decrypted_sealers:[]},{decrypted_sealers:[]},{decrypted_sealers:[]},{decrypted_sealers:[]},{decrypted_sealers:[]},{decrypted_sealers:[]},{decrypted_sealers:[]},{decrypted_sealers:[]},{decrypted_sealers:[]},{decrypted_sealers:[]},{decrypted_sealers:[]},{decrypted_sealers:[]}])
    const [clickedNextStep, setClickedNextStep] = useState(false)
    const [clickedCombineDecryptedKeys, setClickedCombineDecryptedKeys] = useState(false)
    const [keyIndex, setKeyIndex] = useState(1000)

    const {t, i18n} = useTranslation()


    const questionsInList = [];

    useEffect(() => {
        const interval = setInterval(() => {
          checkNumberOfSealers()
        }, 2000);
        return () => clearInterval(interval);
      }, [maxNumberOfSealers, apiQuestions]);

    // 
    const checkNumberOfSealers = async () => {
        const vote = await getAllVotesRequest()
        //console.log(vote.data[0].questions[0].decrypted_sealers.length)
        if (vote.status === 200){

             // If there are more sealers then two it will be changed here
            if (vote.data[0].number_of_sealers !== maxNumberOfSealers){
                setmaxNumberOfSealers(vote.data[0].number_of_sealers)
            }
            setApiQuestions(vote.data[0].questions)
        }
        else {
            console.log("Error: Problem to make request to database")
            console.log(vote)
        }
    }

    const combineDecryptedKeys = async(index) => {
        setClickedCombineDecryptedKeys(true)
        setKeyIndex(index)
        const response = await requestCombineDecryptedShares(index)
        if(response.status===0){
            setClickedCombineDecryptedKeys(false)
            setKeyIndex(1000)
            alert("There is no connection to the API or Blockchain. Please start the docker containers")
            return
        }
        else if (response.status!==200){
            setClickedCombineDecryptedKeys(false)
            setKeyIndex(1000)
            (false);
            alert("Something went wrong while combining decrypted shares! See the console for details.")
            return
        }
        else {
            await new Promise(resolve => setTimeout(resolve, 2100)); // give little time to update status from api
            setClickedCombineDecryptedKeys(false)
            setKeyIndex(1000)
        }
    }

    const nextStep = async() => {
        setClickedNextStep(true)
        dispatch(advance())
        navigate("/result")
    }

    const nextStepPossible = () => {
        for (const [i, product] of apiQuestions.entries()){
            if(!product.combined_decrypted_shares){
                return true
            }
            if(i===apiQuestions.length-1){
                return false
            }
        }
    }

      const getAllVotesRequest = () => {
        return axios.get('http://localhost:4000/helpers/allVote')
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          return error;
        });
    }

    const requestCombineDecryptedShares = (i) => {
        return axios.post('http://localhost:4000/postvoting/combine', {
            vote: vote,
            question: questions[i]
          })
          .then(function (response) {
            return response;
          })
          .catch(function (error) {
            console.log(error);
            return error.response;
          });
      }

          // Make list in HTML and questions is from redux
          for (const [index, value] of questions.entries()) {
            questionsInList.push(
            <li key={index} className="py-2 border-b-2">
                <p class="text-lg text-center p-2 font-medium text-logobrown-1000 tracking-wider">{index+1}: {value}</p>
                <div className="flex justify-between">
                    <div className="flex justify-center items-center">
                        {apiQuestions[index].decrypted_sealers.length===maxNumberOfSealers ? 
                        (
                            <FaCheck className=" text-green-800 mr-3 w-5 h-5" />
                        ) 
                        : 
                        (
                            <svg role="status" class="inline w-5 h-5 mr-3 text-logored-500 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                            </svg>
                        )}
                        <p className="text-sm lg:text-base text-left">{apiQuestions[index].decrypted_sealers.length}/{maxNumberOfSealers} {t("waitingForSealersTallying")}</p>
                    </div>
                    <div className="flex items-center">
                    {clickedCombineDecryptedKeys&&index===keyIndex ? 
                        (
                        <button disabled class="w-full h-3/4 text-white bg-logored-500 pb-4 pt-1 px-3 enabled:hover:bg-logored-700 rounded-lg text-sm lg:text-base transition-all disabled:opacity-75 disabled:cursor-not-allowed">
                        <svg role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                        {t("loadingButton")}
                        </button>
                        ) 
                        : 
                        !apiQuestions[index].combined_decrypted_shares ?
                        (
                        <button onClick={() => combineDecryptedKeys(index)} disabled={apiQuestions[index].decrypted_sealers.length!==maxNumberOfSealers || clickedCombineDecryptedKeys} class="w-full h-3/4 text-white bg-logored-500 pb-3 pt-1 px-1 lg:px-3 enabled:hover:bg-logored-700 rounded-lg text-sm lg:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed">{t("combineDecryptionButtonTallying")}</button>
                        )
                        :
                        (<div className="flex items-center"><FaCheck className=" text-green-800 mr-3 w-5 h-5" /><p className="text-sm lg:text-base text-left">{t("decryptionSuccessful")}</p></div>)
                    }
                    </div>
                </div>
            </li>)
        }


    return (
        <section>

            <Header />

            <div class="container px-5 py-10 mx-auto flex">
                <div class="md:flex w-full">
                    <StepsTallying />

                    <div class="w-7/10 sm:p-10 py-6">
                        <h1 class="text-2xl sm:text-5xl font-medium text-logobrown-1000 tracking-wider">{t("titleTallying")}</h1>
                        <p class="text-sm sm:text-base py-1 sm:py-7 text-logobrown-1000">{t("textTallying")}</p>
                        <div class="flex justify-center ">
                            <div class="w-full lg:w-2/3 bg-logobrown-300 rounded-lg p-3 lg:p-8 flex flex-col">
                                <div class="pb-1 text-center">
                                    <p class="text-xl lg:text-3xl font-bold text-logobrown-1000 tracking-wider">{vote}</p>                                    
                                </div>
                                <hr className="border-logored-500 border-1" />

                                <ul className="text-center">
                                    {questionsInList}
                                </ul>
                            </div>
                        </div>


                        <div class="float-right py-5 lg:py-20 w-1/8">
                            {clickedNextStep ? 
                                (
                                <button disabled type="button" class="w-full text-white bg-logored-500 py-2 px-2 md:px-8 enabled:hover:bg-logored-700 rounded-lg text-sm md:text-lg transition-all disabled:opacity-75 disabled:cursor-not-allowed">
                                <svg role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg>
                                {t("loadingButton")}
                                </button>
                                ) 
                                : 
                                (
                            <button onClick={() => nextStep()} disabled={nextStepPossible()} class="w-full text-white bg-logored-500 py-2 px-2 md:px-8 enabled:hover:bg-logored-700 rounded-lg text-sm md:text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">{t("resultButton")}</button>
                                )}
                        </div>
                    </div>
                </div>

            </div>


            <Footer />
            
            </section>

    );
}

export default Tallying;