import Header from "../../helpers/Header"
import Footer from "../../helpers/Footer"
import {useNavigate} from "react-router-dom"
import { useSelector } from 'react-redux'
import StepsSubmition from "../../helpers/StepsSubmition"
import { useState } from "react"

const ControlSubmition = () => {
    const axios = require('axios')
    const navigate = useNavigate();
    const vote = useSelector(state => state.vote.obj)
    const ballot = useSelector(state => state.ballot.votes)
    const user = useSelector(state => state.user.obj)

    const [clickedSubmit, setClickedSubmit] = useState(false)

    const questionsInList = [];


    const back = () => {
        navigate("/vote")
    }

    const submit = async() => {
        setClickedSubmit(true)
        for (const [index, value] of vote.questions.entries()) {
            const response = await requestVote(value.questionName, ballot[index])
            if (response.status === 400){
                setClickedSubmit(false)
                alert("Something went wrong sending data. Please try again!")
                return
            }
            else {
                console.log("Vote was saved")
            }
            await new Promise(resolve => setTimeout(resolve, 6000));
        }
        navigate("/confirm")
    }

    const requestVote = (question, yesNo) => {
        console.log(user)
        return axios.post('http://localhost:4000/voting/vote', {
            vote: vote.vote,
            question: question,
            nr_of_votes:"1",
            votes: yesNo,
            username: user.data[0].name
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
    for (const [index, value] of vote.questions.entries()) {
        questionsInList.push(
            <li key={index} className="my-5 bg-logored-50 rounded-lg">
                <div className="flex justify-between">
                    <div className="m-auto w-2/3">
                        <p className="text-lg text-logobrown-1000 px-3 py-5">{value.questionName}</p>
                    </div>
                    <div className="w-1/3 m-auto justify-center flex">
                        {ballot[index]===1 
                        ? 
                        (
                            <p className="text-lg text-green-700">yes</p>
                        ) 
                        : 
                        ballot[index]===3 
                        ? 
                        (
                            <p className="text-lg text-red-700">no</p>
                        ) 
                        : 
                        (
                            <p className="text-lg text-logobrown-1000">empty</p>
                        )}
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
                    
                    <StepsSubmition />

                    <div class="w-7/10 p-10 py-6">
                        <h1 class="text-5xl font-medium title-font text-logobrown-1000 tracking-wider">Submition</h1>
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

                        {clickedSubmit ? 
                        (
                            <button disabled type="button" class="w-1/6 float-right mt-20 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-75 disabled:cursor-not-allowed">
                                <svg role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg>
                                Loading...
                            </button>
                        ) 
                        : 
                        (
                            <button onClick={() => submit()} class="w-1/6 mt-20 float-right text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">Submit</button>
                        )}

                    </div>
                </div>

            </div>


            <Footer />
            
            </section>

    );
}

export default ControlSubmition;