import github_logo from "./github.svg"
import logo from "./logo.png"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setStep } from "../redux/StepSlice"
import { setChainStatus } from "../redux/ChainSlice"
import { setVoteObj} from "../redux/VoteSlice"

// Makes Header and also checks if the step of redux is the same like the step in the db
const Header = () => {

    const axios = require('axios')
    const step = useSelector(state => state.step.value)
    const chainStatus = useSelector(state => state.chain.status)
    const dispatch = useDispatch()


        // Checks in db if it has a vote and if it has which step. It also recognize if the frontend is ON CHAIN or OFF CHAIN
        useEffect(() => {
            const interval = setInterval(() => {
              getVoteStatus() 
            }, 2000);
            return () => clearInterval(interval);
          }, []);
    
        // For useEffect 
        const getVoteStatus = async () => {
            const vote = await getAllVotesRequest()
            if (vote.code === "ERR_NETWORK"){
                dispatch(setChainStatus("OFF CHAIN"))
            }
            else if (vote.data.length !== 0){
                dispatch(setChainStatus("ON CHAIN"))
                dispatch(setVoteObj(vote.data[0]))
                if (vote.data[0].phase === "KeyGeneration" && step !== "KeyGeneration"){
                    dispatch(setStep("Key Generation"));
                }
                else if (vote.data[0].phase === "Voting" && step !== "Voting"){
                    dispatch(setStep("Voting"));
                }
                else if (vote.data[0].phase === "Tallying" && (step !== "Tallying")){
                    dispatch(setStep("Tallying"));
                }
            }
            else {
                dispatch(setChainStatus("ON CHAIN"))
                if (step !== "Vote Creation"){
                    localStorage.clear();  
                    window.location.reload(false);              
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
    
    return (
        <header class="bg-logored-100">
        <div class="container mx-auto p-3 flex flex-wrap justify-between items-center">
            <div class="w-1/3">
                <a class="flex items-center text-logobrown-1000">
                <img src={logo} width="60" alt="logo" />
                <span class="ml-3 font-medium text-2xl">Provotum Mixnet</span>
                </a>
            </div>
            <div class="w-1/3 text-center">
                <h2 class="text-logobrown-1000 font-medium text-2xl">Voter</h2>
            </div>
            <div class="w-1/3 flex justify-end">
                {chainStatus==="ON CHAIN" ? (
                    <h3 className=" text-green-800 font-medium text-xl pr-4">ON CHAIN</h3>
                ) : (
                    <h3 className="text-red-800 font-medium text-xl pr-4">OFF CHAIN</h3>
                )}
                <a href="https://github.com/provotum">
                    <img src={github_logo} width="35" alt="github logo" class="float-right hover:scale-150 duration-150" />
                </a>
            </div>
        </div>
        </header>
    );
}

export default Header;