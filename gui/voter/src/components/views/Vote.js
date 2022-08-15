import Header from "../../helpers/Header"
import Footer from "../../helpers/Footer"
import {useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import StepsVoting from "../../helpers/StepsVoting"
import { useState } from "react"
import { setVotes } from "../../redux/BallotSlice"
import { setElectedPeopleRedux, setListNumberRedux } from "../../redux/ElectionSlice"
import { useTranslation } from "react-i18next"


const Vote = () => {

    const {t, i18n} = useTranslation()

    const navigate = useNavigate();
    const vote = useSelector(state => state.vote.obj)
    const ballot = useSelector(state => state.ballot.votes)
    const dispatch = useDispatch()

    // Maybe change this to REDUX 
    const [listNumber, setListNumber] = useState(231)
    const [electedPeople, setElectedPeople] = useState([])

    const questionsInList = [];
    const selectOptionsLists = [];
    const peopleInListHTML = [];
    const selectOptionsAllCandidates = [];


    const back = () => {
        navigate("/home")
    }

    const nextStep = () => {
        navigate("/controlSubmit")
    }

    const nextStepElection = () => {
        dispatch(setElectedPeopleRedux(electedPeople))
        dispatch(setListNumberRedux(listNumber))
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

    const makeElectedList = (pos, person) => {
        let newList = [...electedPeople]
        newList[pos] = person
        setElectedPeople(newList)
    }

    const candidateChecker  = () => {
        if (electedPeople.length>0){
            for (let i=0; i<electedPeople.length;i++){
                if(electedPeople[i]!=="Empty" && electedPeople[i]!==undefined){
                    return false
                }
            }
            return true
        }
        else{
            return true
        }
    }


    // Make list in HTML and questions is from redux
    for (const [index, value] of vote.questions.entries()) {
        questionsInList.push(
            <li key={index} className="my-5 bg-logolblue-50 rounded-lg">
                <div className="flex justify-between">
                    <div className="m-auto w-2/3">
                        <p className="text-sm sm:text-lg text-logobrown-1000 px-3 py-5">{value.questionName}</p>
                    </div>
                    <div className="m-auto w-1/3">
                        <div class="flex pl-10 py-1">
                            <input onChange={() => handleChange(index, 1)} checked={ballot[index]===1} type="checkbox" className="w-4 h-4 accent-green-700 my-auto"/>
                            <label className="pl-1">{t("yesVote")}</label>
                        </div>
                        <div class="flex pl-10 py-1">
                            <input onChange={() => handleChange(index, 3)} checked={ballot[index]===3} type="checkbox" className="w-4 h-4 accent-red-700 my-auto"/>
                            <label className="pl-1">{t("noVote")}</label>
                        </div>
                    </div>
                </div>
            </li>
        )
    }

    // Make selectOptions for Lists in HTML
    for (let i = 0; i < vote.questions.length; i++){
        selectOptionsLists.push(
            <>
            <option value={i}>{vote.questions[i].questionName}</option>
            </>
            )
    }

    // List all Options for a voter in the election in HTML
    for (let i = 0; i < vote.number_of_seats; i++) {
        peopleInListHTML.push(
            <div className="flex justify-center w-full">
                <div className="flex justify-around w-auto my-3 bg-logolblue-50 rounded-lg">
                    <label className="text-sm sm:text-lg text-logobrown-1000 px-3">Person {i+1}: </label>
                    <select onChange={(e) => makeElectedList(i, e.target.value)} class="h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-logolblue-400 focus:broder-logolblue-400 block">
                        <option>{t("emptyVote")}</option>
                        {selectOptionsAllCandidates}
                    </select>
                </div>
            </div>
        )
    }

    // Make selectOptions for each candidate in HTML
    for (let i = 0; i < vote.questions.length; i++) {
        for (let j=0; j < vote.questions[i].election_list_members.length; j++){
            let count = 0;
            electedPeople.forEach(element => {
                if (element===i+","+j){
                    count += 1
                }
            })
            if(count<2){
                if (vote.questions[i].election_list_members[j]!==null){ // Show no null as candidate
                    if (vote.questions[i].election_list_members[j].replace(/\s/g, '').length!==0){ // Show no space strings as candidate
                        selectOptionsAllCandidates.push(
                            <>
                            <option value={[i,j]}>{vote.questions[i].election_list_members[j]} ({vote.questions[i].questionName})</option>
                            </>
                        )
                    }
                }
            }
            else {
            selectOptionsAllCandidates.push(
                <>
                <option value={[i,j]} disabled>{vote.questions[i].election_list_members[j]} ({vote.questions[i].questionName})</option>
                </>
            )
        }
        }
    }


    return (
        <section>

            <Header />

            <div class="container px-5 py-3 sm:py-10 mx-auto flex">
                <div class="md:flex w-full">
                    
                    <StepsVoting />

                    {vote.questions[0].election_list_members.length!==0 ? 
                    ( //Election
                    <div class="w-7/10 sm:p-10 py-6">
                        <h1 class="text-2xl sm:text-5xl font-medium text-logobrown-1000 tracking-wider">{t("titleElectionVote")}</h1>
                        <p class="text-sm sm:text-base py-1 sm:py-7 text-logobrown-1000">{t("textElectionVote")}</p>

                        <div class="flex justify-center w-full">
                            <div class="w-full xl:w-3/4 bg-logolblue-100 rounded-lg p-2 md:p-8 flex flex-col">
                                <div className="">
                                    <h2 className="text-3xl font-medium title-font text-logobrown-1000 text-center mb-10">{vote.vote}</h2>
                                    <div className="flex justify-center">
                                        <div className="flex justify-center bg-logolblue-50 rounded-lg w-auto p-2">
                                            <label className="h-full text-lg text-logobrown-1000 px-3">{t("listVote")} </label>
                                            <select onChange={(e) => setListNumber(e.target.value)} class="h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-logolblue-400 focus:broder-logolblue-400 block">
                                                <option value={231}>{t("noneVote")}</option>
                                                {selectOptionsLists}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                    {peopleInListHTML}
                                    </div>
                                </div>
                            </div>        
                        </div>
                        <div className="flex justify-between pb-10 w-full">
                            <button onClick={() => back()} class="w-1/3 xl:w-1/6 mt-2 md:mt-20 float-left text-white bg-logolblue-500 py-2 lg:px-8 enabled:hover:bg-logolblue-700 rounded-lg text-md lg:text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">{t("backButton")}</button>
                            <button onClick={() => nextStepElection()} disabled={candidateChecker()} class="w-1/3 xl:w-1/6 mt-2 md:mt-20 float-right text-white bg-logolblue-500 py-2 lg:px-8 enabled:hover:bg-logolblue-700 rounded-lg text-md lg:text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">{t("nextStepButton")}</button>
                        </div>
                    </div>

                    )
                    :
                    ( //Vote
                    <div class="w-7/10 sm:p-10 py-6">
                        <h1 class="text-2xl sm:text-5xl text-center md:text-left font-medium text-logobrown-1000 tracking-wider">{t("titleVote")}</h1>
                        <p class="text-sm sm:text-base py-1 sm:py-7 text-logobrown-1000">{t("textVote")}</p>

                        <div class="flex justify-center w-full">
                            <div class="w-full xl:w-3/4 bg-logolblue-100 rounded-lg p-2 md:p-8 flex flex-col">
                                <div className="">
                                    <h2 className="text-3xl font-medium title-font text-logobrown-1000 text-center mb-10">{vote.vote}</h2>
                                    <ul className="">
                                    {questionsInList}
                                    </ul>
                                </div>
                            </div>        
                        </div>

                        <div className="flex justify-between pb-10 w-full">
                            <button onClick={() => back()} class="w-1/3 xl:w-1/6 mt-2 md:mt-20 float-left text-white bg-logolblue-500 py-2 lg:px-8 enabled:hover:bg-logolblue-700 rounded-lg text-md lg:text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">{t("backButton")}</button>
                            <button onClick={() => nextStep()} class="w-1/3 xl:w-1/6 mt-2 md:mt-20 float-right text-white bg-logolblue-500 py-2 lg:px-8 enabled:hover:bg-logolblue-700 rounded-lg text-md lg:text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">{t("nextStepButton")}</button>
                        </div>
                    </div>
                    )}

                </div>

            </div>


            <Footer />
            
            </section>

    );
}
export default Vote;