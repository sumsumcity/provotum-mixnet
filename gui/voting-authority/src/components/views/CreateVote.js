import Header from "../../helpers/Header"
import Footer from "../../helpers/Footer"
import {useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { advance } from "../../redux/StepSlice"
import { setVoteName, setVoteQuestion } from "../../redux/VoteSlice"
import StepsCreateVote from "../../helpers/StepsCreateVote"
import { useState } from "react"


const CreateVote = () => {

    const navigate = useNavigate();
    const step = useSelector(state => state.step.value)
    const vote = useSelector(state => state.vote.name)
    const questions = useSelector(state => state.vote.questions)
    const dispatch = useDispatch()
    const axios = require('axios')

    const [voteNameForm, setVoteNameForm] = useState("")
    const [voteQuestionForm, setVoteQuestionForm] = useState("")

    const nextStep = () => {
        dispatch(advance())
        navigate("/keyGen")
    }

    const submitVoteToRedux = () => {
        dispatch(setVoteName(voteNameForm))
        dispatch(setVoteQuestion(voteQuestionForm))
    }

    const getRequest = () => {
        try {
          return axios.get('http://localhost:4000/')
        } catch (error) {
          console.error(error)
        }
      }
      
      const makeRequest = async () => {
        const breeds = getRequest()
        console.log(breeds)
      }

    return (
        <section>

            <Header />

            <div class="container px-5 py-10 mx-auto flex">
                <div class="flex w-full">

                    <StepsCreateVote />

                    <div class="w-7/10 p-10 py-6">
                        <h1 class="text-5xl font-medium title-font text-logobrown-1000 tracking-wider">Vote Creation</h1>
                        <p class="text-base py-7 text-logobrown-1000">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                        <div class="flex justify-center ">
                            <div class="w-2/3 bg-logobrown-300 rounded-lg p-8 flex flex-col">
                                <div class="relative mb-4">
                                    <label for="vote" class="leading-7 text-md text-logobrown-1000">Vote</label>
                                    <input onChange={(e) => setVoteNameForm(e.target.value)} value = {voteNameForm} type="voteNameForm" id="vote" name="vote" class="w-full bg-white rounded border border-gray-300 focus:border-logored-500 focus:ring-2 focus:ring-logored-400 text-base outline-none text-logobrown-1000 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                                <div class="relative mb-4">
                                    <label for="question" class="leading-7 text-md text-logobrown-1000">Question</label>
                                    <input onChange={(e) => setVoteQuestionForm(e.target.value)} value = {voteQuestionForm} type="voteQuestionForm" id="question" name="question" class="w-full bg-white rounded border border-gray-300 focus:border-logored-500 focus:ring-2 focus:ring-logored-400 text-base outline-none text-logobrown-1000 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                                <div class="flex justify-center">
                                    <button onClick={() => submitVoteToRedux()} disabled={voteNameForm==="" || voteQuestionForm===""} class="w-1/3 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">Submit</button>
                                </div>
                            </div>
                        </div>


                        <div class="float-right py-20 w-1/8">
                            <button onClick={() => makeRequest() && nextStep()} disabled={true} class="w-full text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">Next Step</button>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
            
            </section>

    );
}

export default CreateVote;