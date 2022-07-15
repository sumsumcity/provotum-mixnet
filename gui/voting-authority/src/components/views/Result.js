import Header from "../../helpers/Header"
import Footer from "../../helpers/Footer"
import { useState, useEffect } from "react"
import {useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { advance } from "../../redux/StepSlice"
import StepsResult from "../../helpers/StepsResult"
import {FaCheck, FaRegTimesCircle } from "react-icons/fa"


const Result = () => {

    const axios = require('axios')
    const navigate = useNavigate();
    const step = useSelector(state => state.step.value)
    const vote = useSelector(state => state.vote.name)
    const questions = useSelector(state => state.vote.questions)
    const dispatch = useDispatch()
    const [yesVotes, setYesVotes] = useState([])
    const [noVotes, setNoVotes] = useState([])


    const questionsInList = [];
    
    useEffect(() => {
        getAllResults()
      },[]);

      const getAllResults = async() => {
        console.log("HOW MANY")
        for(const [i, value] of questions.entries()){
            console.log(value)
            const response = await requestResult(value)
            console.log(response)
            let posYes = response.data.search("1], Count:")
            let posNo = response.data.search("3], Count:")
            setYesVotes(oldArray => [...oldArray, response.data.charAt(posYes+12)])
            setNoVotes(oldArray => [...oldArray, response.data.charAt(posNo+12)])
        }
      }

      const requestResult = (question) => {
        return axios.post('http://localhost:4000/postvoting/result', {
            question:question
          })
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          return error;
        });
      }

          // Make list in HTML and questions is from redux
          for (const [index, value] of questions.entries()) {
            questionsInList.push(
            <li key={index}>
                <hr class="border-logored-500 border-1"/>
                <p class="text-lg text-center p-2 font-medium text-logobrown-1000 tracking-wider">{value}</p>
                <div className="flex justify-between ">
                    <div className="flex justify-start">
                        <FaCheck className=" text-green-800 mr-3 w-5 h-5" />
                        <p>Yes-Votes: {yesVotes[index*2]}</p>
                    </div>
                    <div className="flex justify-end">
                        <FaRegTimesCircle className="text-red-700 mr-3 w-5 h-5"/>
                        {console.log({yesVotes})}
                        {console.log({noVotes})}
                        <p>No-Votes: {noVotes[index*2]}</p>
                    </div>
                </div>
            </li>)
        }


    return (
        <section>

            <Header />

            <div class="container px-5 py-10 mx-auto flex">
                <div class="flex w-full">
                    <StepsResult />

                    <div class="w-7/10 p-10 py-6">
                        <h1 class="text-5xl font-medium title-font text-logobrown-1000 tracking-wider">Tallying</h1>
                        <p class="text-base py-7 text-logobrown-1000">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                        <div class="flex justify-center ">
                            <div class="w-2/3 bg-logobrown-300 rounded-lg p-8 flex flex-col">
                                <div class="pb-1 text-center">
                                    <p class="text-3xl font-bold text-logobrown-1000 tracking-wider">{vote}</p>                                    
                                </div>
                                <hr className="border-logored-500 border-2" />

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

export default Result;