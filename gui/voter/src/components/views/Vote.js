import Header from "../../helpers/Header"
import Footer from "../../helpers/Footer"
import {useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import StepsVoting from "../../helpers/StepsVoting"
import { setVotes } from "../../redux/BallotSlice"


const Vote = () => {

    const axios = require('axios')
    const navigate = useNavigate();
    const vote = useSelector(state => state.vote.obj)
    const ballot = useSelector(state => state.ballot.votes)
    const user = useSelector(state => state.user.obj)
    const dispatch = useDispatch()

    const questionsInList = [];


    const back = () => {
        navigate("/home")
    }

    const nextStep = () => {
        navigate("/controlSubmit")
    }

    const handleChange = (index, yesNo) => { 
        if(ballot[index]===yesNo){
            const newBallot = [...ballot]
            newBallot[index]=4
            dispatch(setVotes(newBallot))
        }
        else{
            const newBallot = [...ballot]
            newBallot[index]=yesNo
            dispatch(setVotes(newBallot))
        }
    }; 


    // Make list in HTML and questions is from redux
    for (const [index, value] of vote.questions.entries()) {
        questionsInList.push(
            <li key={index} className="my-5 bg-logored-50 rounded-lg">
                <div className="flex justify-between">
                    <div className="m-auto w-2/3">
                        <p className="text-lg text-logobrown-1000 px-3 py-5">{value.questionName}</p>
                    </div>
                    <div className="w-1/3">
                        <div class="flex justify-center py-1">
                            <input onChange={() => handleChange(index, 1)} disabled={ballot[index]===3} checked={ballot[index]===1} type="checkbox" className="w-4 h-4 accent-green-700 my-auto"/>
                            <label className="pl-1">Yes</label>
                        </div>
                        <div class="flex justify-center py-1">
                            <input onChange={() => handleChange(index, 3)} disabled={ballot[index]===1} checked={ballot[index]===3} type="checkbox" className="w-4 h-4 accent-red-700 my-auto"/>
                            <label className="pl-1">No</label>
                        </div>
                    </div>
                </div>
            </li>
        )
    }

    return (
        <section>

            <Header />

            <div class="container px-5 py-10 mx-auto flex">
                <div class="flex w-full">
                    
                    <StepsVoting />

                    <div class="w-7/10 p-10 py-6">
                        <h1 class="text-5xl font-medium title-font text-logobrown-1000 tracking-wider">Voting</h1>
                        <p class="text-base py-7 text-logobrown-1000">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>

                        <div class="flex justify-center w-full">
                            <div class="w-3/4 bg-logored-100 rounded-lg p-8 flex flex-col">
                                <div className="">
                                    <h2 className="text-3xl font-medium title-font text-logobrown-1000 text-center mb-10">{vote.vote}</h2>
                                    <ul className="">
                                    {questionsInList}
                                    </ul>
                                </div>
                            </div>        
                        </div>

                        <button onClick={() => back()} class="w-1/6 mt-20 float-left text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">Back</button>
                        <button onClick={() => nextStep()} class="w-1/6 mt-20 float-right text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">Next Step</button>


                    </div>
                </div>

            </div>


            <Footer />
            
            </section>

    );
}
export default Vote;