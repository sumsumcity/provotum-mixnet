import Header from "../../helpers/Header"
import Footer from "../../helpers/Footer"
import { useState, useEffect } from "react"
import {useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { advance } from "../../redux/StepSlice"
import StepsKeyGen from "../../helpers/StepsKeyGen"
import { FaKey, FaCheck } from "react-icons/fa"


const KeyGeneration = () => {

    const axios = require('axios')
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const vote = useSelector(state => state.vote.name)

    const [currentNumberOfSealers, setCurrentNumberOfSealers] = useState(0)
    const [maxNumberOfSealers, setmaxNumberOfSealers] = useState(2) //number of sealers
    const [currentKeyShareStatus, setCurrentKeyShareStatus] = useState(false)
    const [clickedCombineKeys, setClickedCombineKeys] = useState(false)
    const [clickedNextStep, setClickedNextStep] = useState(false)




    useEffect(() => {
        const interval = setInterval(() => {
          checkNumberOfSealers()
        }, 2000);
        return () => clearInterval(interval);
      }, [currentNumberOfSealers, maxNumberOfSealers, currentKeyShareStatus]);

    // 
    const checkNumberOfSealers = async () => {
        const vote = await getAllVotesRequest()
        if (vote.status === 200){

            // If there are more sealers then two it will be changed here
            if (vote.data[0].number_of_sealers !== maxNumberOfSealers){
                setmaxNumberOfSealers(vote.data[0].number_of_sealers)
            }

            // If a sealer create a key then in increases the number
            if (vote.data[0].sealers.length !== currentNumberOfSealers){
                setCurrentNumberOfSealers(vote.data[0].sealers.length)
            }
            
            // If voting authority combined key share
            if (vote.data[0].combined_key_shares !== currentKeyShareStatus){
                setCurrentKeyShareStatus(vote.data[0].combined_key_shares)
            }
        }
        else {
            console.log("Error: Problem to make request to database")
            console.log(vote)
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

    const combineKeys = async() => {
        setClickedCombineKeys(true)
        const response = await requestCombineKeyShares()
        if(response.status===0){
            setClickedCombineKeys(false);
            alert("There is no connection to the API or Blockchain. Please start the docker containers")
            return
        }
        else if (response.status!==200){
            setClickedCombineKeys(false);
            alert("Something went wrong while creating key share! See the console for details.")
            return
        }
        else {
            setClickedCombineKeys(false)
        }
    }

    const nextStep = async() => {
        setClickedNextStep(true)
        const response = await requestChangePhase()
        if(response.status===0){
            setClickedNextStep(false);
            alert("There is no connection to the API or Blockchain. Please start the docker containers")
            return
        }
        else if (response.status!==200){
            setClickedNextStep(false);
            alert("Something went wrong while changing Phase! See the console for details.")
            return
        }
        else {
            dispatch(advance())
            navigate("/voting")
        }
    }

    const requestCombineKeyShares = () => {
        return axios.post('http://localhost:4000/prevoting/combineKeyShares', {
            vote: vote,
          })
          .then(function (response) {
            return response;
          })
          .catch(function (error) {
            console.log(error);
            return error.response;
          });
      }

      const requestChangePhase = () => {
        return axios.put('http://localhost:4000/phase', {
            vote: vote,
            phase: "Voting"
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
                    
                    <StepsKeyGen />

                    <div class="w-7/10 p-10 py-6">
                        <h1 class="text-5xl font-medium title-font text-logobrown-1000 tracking-wider">Key Generation</h1>
                        <p class="text-base py-7 text-logobrown-1000">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                        
                        <div class="container px-5 py-7 mx-auto">
                            <div class="w-1/2 mx-auto text-center">
                                <div className="flex justify-center items-center">
                                    <FaKey className="text-logobrown-1000 mx-2"/>
                                    <p className=" text-xl text-logobrown-1000 mx-2">{currentNumberOfSealers}/{maxNumberOfSealers} public keys have been created</p>
                                </div>
                                {currentNumberOfSealers===maxNumberOfSealers ? 
                                (
                                <div className="flex justify-center items-center pt-4 pb-7 ">
                                    <FaCheck class="inline w-4 h-4 mr-3 text-logobrown-1000"/>
                                    <p className=" text-base text-logobrown-1000 mx-2">ready to combine key shares</p>
                                </div>
                                ) 
                                : 
                                (
                                <div className="flex justify-center items-center pt-4 pb-7">
                                    <svg role="status" class="inline w-4 h-4 mr-3 text-logobrown-1000/50 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                    </svg>
                                    <p className=" text-base text-logobrown-1000/50 mx-2">waiting for sealers</p>
                                </div>
                                )}
                                <span class="inline-block h-1 w-1/2 rounded bg-logobrown-300 mb-6"></span>
                                <div class="flex justify-center">
                                    {clickedCombineKeys ? 
                                    (
                                    <button disabled type="button" class="w-1/3 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-75 disabled:cursor-not-allowed">
                                    <svg role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                    </svg>
                                    Loading...
                                    </button>
                                    ) 
                                    : 
                                    (
                                    <button onClick={() => combineKeys()} disabled={maxNumberOfSealers!==currentNumberOfSealers || currentKeyShareStatus} class="w-1/3 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">Combine Keys</button>
                                    )}
                                </div>
                            </div>
                        </div>
                        

                        <div class="float-right py-20 w-1/8">
                            {clickedNextStep ? 
                            (
                                <button disabled type="button" class="w-full text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-75 disabled:cursor-not-allowed">
                                <svg role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg>
                                Loading...
                                </button>
                            )
                            :
                            (
                                <button onClick={() => nextStep()} disabled={!currentKeyShareStatus} class="w-full text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">Next Step</button>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
            
            </section>

    );
}

export default KeyGeneration;