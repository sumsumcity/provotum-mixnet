import Header from "../../helpers/Header"
import Footer from "../../helpers/Footer"
import {useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { advance } from "../../redux/StepSlice"
import { setVoteName, setVoteQuestion, setType } from "../../redux/VoteSlice"
import { setNumberOfSeats, setListOfAllElectionListMembers } from "../../redux/ElectionSlice"
import StepsCreateVote from "../../helpers/StepsCreateVote"
import { useState } from "react"
import { FaPlus, FaMinus, FaListAlt, FaEdit, FaTrash} from "react-icons/fa"
import { useTranslation } from "react-i18next"

const CreateVote = () => {

    const navigate = useNavigate();
    const step = useSelector(state => state.step.value)
    const vote = useSelector(state => state.vote.name)
    const questions = useSelector(state => state.vote.questions)
    const dispatch = useDispatch()
    const axios = require('axios')
    const type = useSelector(state => state.vote.type)
    const numberOfSeats = useSelector(state => state.election.numberOfSeats)
    const globalList = useSelector(state => state.election.listOfAllElectionListMembers)

    const [voteNameForm, setVoteNameForm] = useState("")
    const [voteQuestionForm, setVoteQuestionForm] = useState([])
    const [numberOfQuestions, setNumberOfQuestions] = useState(1)
    const [clickedNextStep, setClickedNextStep] = useState(false)
    const [openModal, setOpenModal] = useState(false) // Next Step for vote
    const [openModal2, setOpenModal2] = useState(false) // Modal for list election
    const [openModal3, setOpenModal3] = useState(false) // Modal are you sure election
    const [openModal4, setOpenModal4] = useState(false) // Next stept for election
    const [openModalDelete, setOpenModalDelete] = useState(false) // Modal are you sure delete
    const [electionMemberInList, setElectionMemberInList] = useState([]) // List of all Party Lists
    const [currentListPos, setCurrentListPos] = useState(1000) // position of list in redux after submiting list

    // states for edit
    const [clickedEdit, setClickedEdit] = useState(false)  // to true if something must be edited
    const [editQuestions, setEditQuestions] = useState([]) // all questsions in redux which will be edited

    const {t, i18n} = useTranslation()

    // For List in HTML
    const questionsInList = [];
    const questionsInForm = [];
    const questionsInFormEdit = [];
    const selectOptions = [];
    const electionMemberInListHtml = [];


    const nextStep = () => {
        dispatch(advance())
        navigate("/keyGen")
    }

    const addToQuestionList = (value, index) => {
        let arr = [...voteQuestionForm]
        arr[index] = value
        setVoteQuestionForm(arr)

    }

    const addToElectionMemberInList = (value, index) => {
        let arr = [...electionMemberInList]
        if (arr[currentListPos]===undefined){
            arr[currentListPos] = []
        }
        let partyArr = arr[currentListPos]
        partyArr[index] = value;
        setElectionMemberInList(arr)
    }

    const submitVoteToRedux = () => {
        dispatch(setVoteName(voteNameForm))
        let finalArr = []
        for (let i = 0; i<voteQuestionForm.length;i++){
            if (voteQuestionForm[i]!=="" && voteQuestionForm[i]!==undefined){
                finalArr.push(voteQuestionForm[i])
            }
        }
        dispatch(setVoteQuestion(finalArr)) 
    }

    const submitListToRedux = () => {
        let newList = [...globalList]
        newList[currentListPos]=electionMemberInList
        console.log(electionMemberInList)
        console.log(newList)
        dispatch(setListOfAllElectionListMembers(newList))
        setElectionMemberInList([])
    }

    const deleteVoteFromRedux = () => {
        localStorage.clear()
        window.location.reload(false)

    }

    const editNumberOfQuestions = (newNumber) => {
        if (newNumber>=1){
            setNumberOfQuestions(newNumber)
        }
    }
      
    const makeRequest = async () => {
        setOpenModal(false)
        setClickedNextStep(true)
        const requestVot = await requestVoteCreation()
        // Error handling
        if(requestVot.status===0){
            setClickedNextStep(false);
            alert("There is no connection to the API or Blockchain. Please start the docker containers")
            return
        }
        else if (requestVot.status!==200){
            setClickedNextStep(false);
            alert("Something went wrong while creating the vote! See the console for details.")
            return
        }
        for (let i=1;i<questions.length;i++){
            if (questions[i]==="" || questions[i]===undefined || !questions[i].replace(/\s/g, '').length) {
                console.log("This question is not valid")
            }
            else {
                const requestQue = await requestQuestionAddition(i)
                if (requestQue.status!==200){
                    setClickedNextStep(false)
                    alert("Something went wrong while adding a question! See the console for details. Please restart all docker-containers to start over.")
                    return
                }
            }
        }
        nextStep();
      }

    const makeRequestElection = async () => {
    setOpenModal4(false)
    setClickedNextStep(true)
    const requestVot = await requestVoteCreation()
    // Error handling
    if(requestVot.status===0){
        setClickedNextStep(false);
        alert("There is no connection to the API or Blockchain. Please start the docker containers")
        return
    }
    else if (requestVot.status!==200){
        setClickedNextStep(false);
        alert("Something went wrong while creating the vote! See the console for details.")
        return
    }
    const requestList = await requestAddElectionListToParty(0)
    if (requestList.status!==200){
        alert("Something went wrong while adding the list to Party! Please restart all docker-containers to start over.")
        return
    }
    for (let i=1;i<questions.length;i++){
        if (questions[i]==="" || questions[i]===undefined || !questions[i].replace(/\s/g, '').length) {
            console.log("This question is not valid")
        }
        else {
            const requestQue = await requestQuestionAddition(i)
            if (requestQue.status!==200){
                setClickedNextStep(false)
                alert("Something went wrong while adding a question! See the console for details. Please restart all docker-containers to start over.")
                return
            }
            const requestList = await requestAddElectionListToParty(i)
            if (requestList.status!==200){
                alert("Something went wrong while adding the list to Party! Please restart all docker-containers to start over.")
                return
            }
        }
    }
    nextStep();
    }

    const deleteQuestion = (index) => {
        voteQuestionForm.splice(index,1)
        editNumberOfQuestions(numberOfQuestions-1)
    }

    const deleteParty = (index) => {
        if (electionMemberInList[index]!== undefined){
            electionMemberInList.splice(index,1)
        }
        voteQuestionForm.splice(index,1)
        editNumberOfQuestions(numberOfQuestions-1)
    }

    const checkIfEmptyList = () => {
        if (electionMemberInList.length>0){
            for (let i=0;i<electionMemberInList[0].length;i++){
                if (electionMemberInList[0][i]!==""){
                    return false
                }
            } 
            return true
        }
        else {
            return true
        }
    }
    
    const prepareEdit = () => {
        setEditQuestions(questions)
        setNumberOfQuestions(questions.length)
        setClickedEdit(true)
    }

    const editQuestionValue = (newValue, index) => {
        let arr = [...editQuestions]
        arr[index] = newValue
        setEditQuestions(arr)
    }

    const submitEditQuestions = () => {
        let finalArr = []
        for (let i = 0; i<editQuestions.length;i++){
            if (editQuestions[i]!=="" && editQuestions[i]!==undefined){
                finalArr.push(editQuestions[i])
            }
        }
        dispatch(setVoteQuestion(finalArr)) 
        setClickedEdit(false)
    }

    const deleteQuestionEdit = (index) => {
        console.log(editQuestions)
        let arr = []
        arr = [...editQuestions]
        arr.splice(index,1)
        setEditQuestions(arr)
        editNumberOfQuestions(numberOfQuestions-1)
    }

    const requestVoteCreation = () => {
        return axios.post('http://localhost:4000/prevoting/setup', {
            vote: vote,
            question: questions[0]
          })
          .then(function (response) {
            console.log(response);
            return response;
          })
          .catch(function (error) {
            console.log(error);
            return error.response;
          });
    }

    const requestQuestionAddition = (i) => {
        return axios.post('http://localhost:4000/prevoting/storequestion', {
            vote: vote,
            question: questions[i]
          })
          .then(function (response) {
            console.log(response);
            return response;
          })
          .catch(function (error) {
            console.log(error);
            return error.response;
          });
    }

    const requestAddElectionListToParty = (i) => {
        console.log(globalList)
        console.log(i)
        return axios.post("http://localhost:4000/helpers/addListToParty", {
            vote:vote,
            question:questions[i],
            election_list_members:globalList[i],
            number_of_seats: numberOfSeats
        })
        .then(function (response) {
            console.log(response);
            return response;
          })
          .catch(function (error) {
            console.log(error);
            return error.response;
          });
    }

      // Make list in HTML and questions is from redux for control page
      for (const [index, value] of questions.entries()) {
        if (type==="election"){
            questionsInList.push(
                <li key={index} className="flex justify-center">
                    <p class="text-lg p-2 font-medium text-logobrown-1000 tracking-wider">{index+1}: {value}</p>
                </li>)
        }
        else {
            questionsInList.push(
                <li key={index} className="flex justify-center">
                    <p class="text-lg p-2 font-medium text-logobrown-1000 tracking-wider">{index+1}: {value}</p>
                </li>)
        }
    }

    // Make list in HTML CreateVoteList/CreateElectionList
    for (let i = 0; i < numberOfQuestions; i++){
        if (type==="election" && i===0){
            questionsInForm.push(
                <div className="flex justify-between">
                    <div className="bg-logobrown-300 w-11/12 border-solid border-2 border-logobrown-500 p-2 rounded-md mb-3">
                        <label class="leading-7 text-md text-logobrown-1000">{t("partyFormCreate")} {i+1}</label> 
                        <input value={voteQuestionForm[i]} onChange={(e) => addToQuestionList(e.target.value, i)} class="w-full bg-white rounded border border-gray-300 focus:border-logored-500 focus:ring-2 focus:ring-logored-400 text-base outline-none text-logobrown-1000 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        <button onClick={() => {setOpenModal2(true); setCurrentListPos(i)}} disabled={globalList[i]!==undefined} className="w-auto mt-2 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"><div className="flex items-center"><FaListAlt /><p>&nbsp;</p>{t("createListButonCreate")}</div></button>
                    </div>
                    <div className="flex items-center">
                        <button onClick={() => editNumberOfQuestions(numberOfQuestions+1)} class="px-4 h-12 text-white bg-logored-500 enabled:hover:bg-logored-700 rounded-full text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"><FaPlus /></button>
                    </div>
                </div>
                )
        }
        else if (type==="election" && i>0){
            questionsInForm.push(
                <div className="flex justify-between">
                    <div className="w-11/12 border-solid border-2 border-logobrown-500 p-2 rounded-md mb-3">
                        <label class="leading-7 text-md text-logobrown-1000">{t("partyFormCreate")} {i+1}</label> 
                        <input value={voteQuestionForm[i]} onChange={(e) => addToQuestionList(e.target.value, i)} class="w-full bg-white rounded border border-gray-300 focus:border-logored-500 focus:ring-2 focus:ring-logored-400 text-base outline-none text-logobrown-1000 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        <button onClick={() => {setOpenModal2(true); setCurrentListPos(i)}} disabled={globalList[i]!==undefined} className="w-auto mt-2 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"><div className="flex items-center"><FaListAlt /><p>&nbsp;</p>{t("createListButonCreate")}</div></button>
                    </div>
                    <div className="flex items-center">
                        <button onClick={() => deleteParty(i)} class="px-4 h-12 text-white bg-logored-500 enabled:hover:bg-logored-700 rounded-full text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"><FaMinus /></button>
                    </div>
                </div>
                )
        }
        else if (type==="vote" && i===0) {
            questionsInForm.push(
                <>
                <label class="leading-7 text-md text-logobrown-1000">{t("questionFormCreate")} {i+1}</label>  
                <div className="flex justify-between">                               
                    <input onChange={(e) => addToQuestionList(e.target.value, i)} class="w-11/12 bg-white rounded border border-gray-300 focus:border-logored-500 focus:ring-2 focus:ring-logored-400 text-base outline-none text-logobrown-1000 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    <button onClick={() => editNumberOfQuestions(numberOfQuestions+1)} class="px-4 text-white bg-logored-500 enabled:hover:bg-logored-700 rounded-full text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"><FaPlus /></button>
                </div>   
                </>
                )
        }
        else if (type==="vote" && i>0) {
            questionsInForm.push(
                <>
                <label class="leading-7 text-md text-logobrown-1000">{t("questionFormCreate")} {i+1}</label>                                    
                <div className="flex justify-between">
                    <input value={voteQuestionForm[i]} onChange={(e) => addToQuestionList(e.target.value, i)} class="w-11/12 bg-white rounded border border-gray-300 focus:border-logored-500 focus:ring-2 focus:ring-logored-400 text-base outline-none text-logobrown-1000 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    <button onClick={() => deleteQuestion(i)} class="px-4 text-white bg-logored-500 enabled:hover:bg-logored-700 rounded-full text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"><FaMinus /></button>
                </div>   
                </>
                )
        }
    }

    // Make list in HTML EditVoteList
    for (let i = 0; i < numberOfQuestions; i++){
        if (type==="election"){
            questionsInFormEdit.push(
                <>
                <label class="leading-7 text-md text-logobrown-1000">{t("partyFormCreate")} {i+1}</label> 
                <div className="flex justify-between">                               
                    <input onChange={(e) => addToQuestionList(e.target.value, i)} class="w-2/3 bg-white rounded border border-gray-300 focus:border-logored-500 focus:ring-2 focus:ring-logored-400 text-base outline-none text-logobrown-1000 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    <button onClick={() => {setOpenModal2(true); setCurrentListPos(i)}} disabled={globalList[i]!==undefined} className="w-1/4 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">{t("createListButoonCreate")}</button>
                </div>
                </>
                )
        }
        else if (type==="vote" && i===0) {
            questionsInFormEdit.push(
                <>
                <label class="leading-7 text-md text-logobrown-1000">{t("questionFormCreate")} {i+1}</label>  
                <div className="flex justify-between">                               
                    <input value={editQuestions[i]} onChange={(e) => addToQuestionList(e.target.value, i)} class="w-11/12 bg-white rounded border border-gray-300 focus:border-logored-500 focus:ring-2 focus:ring-logored-400 text-base outline-none text-logobrown-1000 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    <button onClick={() => editNumberOfQuestions(numberOfQuestions+1)} class="px-4 text-white bg-logored-500 enabled:hover:bg-logored-700 rounded-full text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"><FaPlus /></button>
                </div>   
                </>
                )
        }
        else if (type==="vote" && i>0) {
            questionsInFormEdit.push(
                <>
                <label class="leading-7 text-md text-logobrown-1000">{t("questionFormCreate")} {i+1}</label>                                    
                <div className="flex justify-between">
                    <input value={editQuestions[i]} onChange={(e) => editQuestionValue(e.target.value, i)} class="w-11/12 bg-white rounded border border-gray-300 focus:border-logored-500 focus:ring-2 focus:ring-logored-400 text-base outline-none text-logobrown-1000 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    <button onClick={() => deleteQuestionEdit(i)} class="px-4 text-white bg-logored-500 enabled:hover:bg-logored-700 rounded-full text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"><FaMinus /></button>
                </div>   
                </>
                )
        }
    }


    // Make selectOptions in HTML
    for (let i = 1; i < 37; i++){
        let number = i.toString()
        if(number===numberOfSeats){
            selectOptions.push(
                <>
                <option value={i} selected="selected">{i}</option>
                </>
                )
        }
        else {
            selectOptions.push(
                <>
                <option value={i}>{i}</option>
                </>
                )
        }
    }

    // Make participant list in HTML for election
    for (let i = 0; i < numberOfSeats; i++){
        if (electionMemberInList.length>0){
            if (electionMemberInList[currentListPos]===undefined){
                electionMemberInListHtml.push(
                    <div className="py-2">
                    <label class="leading-7 text-md text-logobrown-1000">Person {i+1}</label>                                    
                    <input onChange={(e) => addToElectionMemberInList(e.target.value, i)} class="w-full bg-white rounded border border-gray-300 focus:border-logored-500 focus:ring-1 focus:ring-logored-400 text-base outline-none text-logobrown-1000 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    )
            }
            else if (electionMemberInList[currentListPos].length>0){
                electionMemberInListHtml.push(
                    <div className="py-2">
                    <label class="leading-7 text-md text-logobrown-1000">Person {i+1}</label>                                    
                    <input value={electionMemberInList[currentListPos][i]} onChange={(e) => addToElectionMemberInList(e.target.value, i)} class="w-full bg-white rounded border border-gray-300 focus:border-logored-500 focus:ring-1 focus:ring-logored-400 text-base outline-none text-logobrown-1000 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    )
            }
            else {
                electionMemberInListHtml.push(
                    <div className="py-2">
                    <label class="leading-7 text-md text-logobrown-1000">Person {i+1}</label>                                    
                    <input onChange={(e) => addToElectionMemberInList(e.target.value, i)} class="w-full bg-white rounded border border-gray-300 focus:border-logored-500 focus:ring-1 focus:ring-logored-400 text-base outline-none text-logobrown-1000 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    )
            }
        }
        else {
            electionMemberInListHtml.push(
                <div className="py-2">
                <label class="leading-7 text-md text-logobrown-1000">Person {i+1}</label>                                    
                <input onChange={(e) => addToElectionMemberInList(e.target.value, i)} class="w-full bg-white rounded border border-gray-300 focus:border-logored-500 focus:ring-1 focus:ring-logored-400 text-base outline-none text-logobrown-1000 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                )
        }
    }

    return (
        <section>
            <div className="flex flex-col h-screen">
            <Header />

            <div class="container px-5 py-10 mx-auto flex overflow-y-auto">
                <div class="flex w-full">

                    <StepsCreateVote />

                    {type===""? (
                        <div class="w-7/10 p-10 py-6">
                            <h1 class="text-5xl font-medium text-logobrown-1000 tracking-wider">{t("creationStep")}</h1>
                            <p class="text-base py-7 text-logobrown-1000">{t("creationText")}</p>
                            <div class="flex justify-around py-32">
                                <button onClick={() => dispatch(setType("vote"))} class="w-1/4 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">{t("voteButtonCreate")}</button>
                                <button onClick={() => dispatch(setType("election"))} class="w-1/4 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">{t("electionButtonCreate")}</button>
                            </div>
                        </div>

                    ) : 
                    type==="election" ? // Election
                    (
                        <div class="w-7/10 p-10 py-6">
                            <h1 class="text-5xl font-medium text-logobrown-1000 tracking-wider">{t("electionCreationTitleCreate")}</h1>
                            <p class="text-base py-7 text-logobrown-1000">{t("electionCreationTextCreate")}</p>
                            <div class="flex justify-center ">
                                {vote!=="" && !clickedEdit ? ( // Control Page
                                <div class="w-2/3 bg-logobrown-300 rounded-lg p-8 flex flex-col">
                                    <div class="pb-1 text-center">
                                        <p class="text-3xl font-bold text-logobrown-1000 tracking-wider">{vote}</p>                                    
                                    </div>
                                    <hr className="border-logored-500 border-1" />

                                    <ul className="text-center">
                                        {questionsInList}
                                    </ul>
                                    <div class="flex justify-between pt-5">
                                        <button onClick={() => setOpenModalDelete(true)} disabled={clickedNextStep} class="w-auto text-white bg-logored-500 py-1 px-3 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"><div className="flex items-center justify-between"><FaTrash /><p>&nbsp;</p>{t("deleteVote")}</div></button>
                                        <button onClick={() => setClickedEdit(true)} disabled={clickedNextStep} class="w-auto text-white bg-logored-500 py-1 px-3 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"><div className="flex items-center justify-between"><FaEdit /><p>&nbsp;</p>{t("editVote")}</div></button>
                                    </div>
                                </div>
                                ) : 
                                !clickedEdit ?
                                ( //Create Election Page
                                <div class="w-2/3 bg-logobrown-300 rounded-lg p-8 flex flex-col">
                                    <div class="relative mb-4">
                                        <label class="leading-7 text-md text-logobrown-1000">{t("electionFormCreate")}</label>
                                        <input onChange={(e) => setVoteNameForm(e.target.value)} placeholder={t("placeholderElection")} class="w-full bg-white rounded border border-gray-300 focus:border-logored-500 focus:ring-2 focus:ring-logored-400 text-base outline-none text-logobrown-1000 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                    <div class="flex justify-left relative mb-4">
                                        <div class="">
                                            <label class="leading-7 w-1/2 text-md text-logobrown-1000">{t("numberOfSeatsSelect")}</label>
                                            <select onChange={(e) => dispatch(setNumberOfSeats(e.target.value))} disabled={globalList.length!==0} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-logored-400 focus:broder-logored-400 block w-full p-2.5">
                                                {selectOptions}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="relative mb-4">
                                        {questionsInForm}
                                    </div>
                                    <div class="flex justify-center pt-5">
                                        <button onClick={() => setOpenModal3(true)} disabled={voteNameForm==="" || !voteNameForm[0].replace(/\s/g, '').length || electionMemberInList.length!==numberOfQuestions || checkIfEmptyList()} class="w-1/3 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">{t("submitButton")}</button>
                                    </div>
                                </div>
                                ) :
                                ( // Edit Election Page
                                    <div class="w-2/3 bg-logobrown-300 rounded-lg p-8 flex flex-col">
                                    <div class="relative mb-4">
                                        <label class="leading-7 text-md text-logobrown-1000">{t("electionFormCreate")}</label>
                                        <input value={vote} onChange={(e) => setVoteNameForm(e.target.value)} placeholder={t("placeholderElection")} class="w-full bg-white rounded border border-gray-300 focus:border-logored-500 focus:ring-2 focus:ring-logored-400 text-base outline-none text-logobrown-1000 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                    <div class="flex justify-left relative mb-4">
                                        <div class="">
                                            <label class="leading-7 w-1/2 text-md text-logobrown-1000">{t("numberOfSeatsSelect")}</label>
                                            <select onChange={(e) => dispatch(setNumberOfSeats(e.target.value))} disabled={globalList.length!==0} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-logored-400 focus:broder-logored-400 block w-full p-2.5">
                                                {selectOptions}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="relative mb-4">
                                        {questionsInForm}
                                    </div>
                                    <div class="flex justify-center pt-5">
                                        <button onClick={() => setOpenModal3(true)} disabled={voteNameForm==="" || !voteNameForm[0].replace(/\s/g, '').length || electionMemberInList.length!==numberOfQuestions || checkIfEmptyList()} class="w-1/3 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">{t("submitButton")}</button>
                                    </div>
                                </div>
                                )
                            }
                            </div>

                            <div class="py-20 w-full">
                                {clickedNextStep ? (
                                    <div className="flex justify-between">
                                        <button onClick={() => setOpenModalDelete(true)} disabled={true} class="w-1/6 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">{t("backButton")}</button>
                                        <button disabled type="button" class="w-1/6 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-75 disabled:cursor-not-allowed">
                                            <svg role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                            </svg>
                                            {t("loadingButton")}
                                        </button>
                                    </div>
                                ) : 
                                (
                                    <div className="flex justify-between">
                                        <button onClick={() => setOpenModalDelete(true)} disabled={vote!==""} class="w-1/6 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-0">{t("backButton")}</button>
                                        <button onClick={() => setOpenModal4(true)} disabled={vote==="" || questions.length===0 || questions[0]==="" || questions[0]===undefined || !questions[0].replace(/\s/g, '').length} class="w-1/6 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">{t("createElectionButton")}</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) :
                    ( // Vote 
                        <div class="w-7/10 p-10 py-6">
                            <h1 class="text-5xl font-medium text-logobrown-1000 tracking-wider">{t("voteCreationTitleCreate")}</h1>
                            <p class="text-base py-7 text-logobrown-1000">{t("voteCreationTextCreate")}</p>
                            <div class="flex justify-center ">
                                {vote!=="" && clickedEdit===false ? ( // ControlPage
                                <div class="w-2/3 bg-logobrown-300 rounded-lg p-8 flex flex-col">
                                    <div class="pb-1 text-center">
                                        <p class="text-3xl font-bold text-logobrown-1000 tracking-wider">{vote}</p>                                    
                                    </div>
                                    <hr className="border-logored-500 border-1" />

                                    <ul className="text-center">
                                        {questionsInList}
                                    </ul>
                                    <div class="flex justify-between pt-5">
                                        <button onClick={() => setOpenModalDelete(true)} disabled={clickedNextStep} class="w-auto text-white bg-logored-500 py-1 px-3 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"><div className="flex items-center justify-between"><FaTrash /><p>&nbsp;</p>{t("deleteVote")}</div></button>
                                        <button onClick={() => prepareEdit()} disabled={clickedNextStep} class="w-auto text-white bg-logored-500 py-1 px-3 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"><div className="flex items-center justify-between"><FaEdit /><p>&nbsp;</p>{t("editVote")}</div></button>
                                    </div>
                                </div>
                                ) 
                                :
                                clickedEdit===false ? ( // Create Vote Page
                                <div class="w-2/3 bg-logobrown-300 rounded-lg p-8 flex flex-col">
                                    <div class="relative mb-4">
                                        <label for="vote" class="leading-7 text-md text-logobrown-1000">{t("voteFormCreate")}</label>
                                        <input onChange={(e) => setVoteNameForm(e.target.value)} placeholder={t("placeholderVote")} class="w-full bg-white rounded border border-gray-300 focus:border-logored-500 focus:ring-2 focus:ring-logored-400 text-base outline-none text-logobrown-1000 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                    <div class="relative mb-4">
                                        {questionsInForm}
                                    </div>
                                    <div class="flex justify-center">
                                        <button onClick={() => submitVoteToRedux()} disabled={voteNameForm==="" || !voteNameForm[0].replace(/\s/g, '').length || voteQuestionForm.length===0 || !voteQuestionForm[0].replace(/\s/g, '').length} class="w-1/3 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">{t("submitButton")}</button>
                                    </div>
                                </div>
                                )
                                :
                                ( // EditVote
                                <div class="w-2/3 bg-logobrown-300 rounded-lg p-8 flex flex-col">
                                    <div class="relative mb-4">
                                        <label class="leading-7 text-md text-logobrown-1000">{t("voteFormCreate")}</label>
                                        <input value={vote} onChange={(e) => dispatch(setVoteName(e.target.value))} class="w-full bg-white rounded border border-gray-300 focus:border-logored-500 focus:ring-2 focus:ring-logored-400 text-base outline-none text-logobrown-1000 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                    <div class="relative mb-4">
                                        {questionsInFormEdit}
                                    </div>
                                    <div class="flex justify-center">
                                        <button onClick={() => submitEditQuestions()} disabled={vote==="" || !voteNameForm[0].replace(/\s/g, '').length || editQuestions.length===0 || !editQuestions[0].replace(/\s/g, '').length} class="w-1/3 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">{t("submitButton")}</button>
                                    </div>
                                </div>
                                )}
                            </div>

                            <div class="py-20 w-full">
                                {clickedNextStep ? (
                                    <div className="flex justify-between">
                                        <button onClick={() => dispatch(setType(""))} disabled={true} class="w-1/6 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">{t("backButton")}</button>
                                        <button disabled type="button" class="w-1/6 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-75 disabled:cursor-not-allowed">
                                            <svg role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                            </svg>
                                            {t("loadingButton")}
                                        </button>
                                    </div>
                                ) : 
                                (
                                    <div className="flex justify-between">
                                        <button onClick={() => setOpenModalDelete(true)} disabled={vote!=="" || clickedEdit} class="w-1/6 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-0 ">{t("backButton")}</button>
                                        <button onClick={() => {setOpenModal(true)}} disabled={vote==="" || questions.length===0 || questions[0]==="" || questions[0]===undefined || !questions[0].replace(/\s/g, '').length || clickedEdit} class="w-1/6 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">{t("createVoteButton")}</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {openModal ? (
            <div class="fixed top-0 right-0 left-0 bottom-0 z-50 bg-gray-600 bg-opacity-50">
                <div class="flex items-center justify-center p-4 w-full h-full ">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={() => setOpenModal(false)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                        </button>
                        <div class="p-6 text-center">
                            <svg class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{t("modal1Title")}</h3>
                            <p class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{t("modal1Subtitle")}</p>
                            <button onClick={() => setOpenModal(false)}  type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">{t("modalNo")}</button>
                            <button onClick={() => makeRequest()} data-modal-toggle="popup-modal" type="button" class="text-white bg-logored-500 hover:bg-logored-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                {t("modalYesSure")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>) 
            : null}

            {openModal2 ? (
            <div class="fixed h-screen right-0 left-0 z-50 bg-gray-600 bg-opacity-50">
                <div className="flex justify-center w-full h-full p-36">
                    <div className="bg-white rounded-lg p-6 text-center">
                        <div className="flex justify-center">
                            <FaListAlt size={70} className="text-gray-400" />
                        </div>
                        <div className="h-3/4 overflow-y-auto">
                            {electionMemberInListHtml}
                        </div>
                        <div className="pt-8">
                            <button onClick={() => setOpenModal2(false)} class="text-white bg-logored-500 hover:bg-logored-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                {t("modalCloseList")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>) 
            : null}

            {openModal3 ? (
            <div class="fixed top-0 right-0 left-0 bottom-0 z-50 bg-gray-600 bg-opacity-50">
                <div class="flex items-center justify-center p-4 w-full h-full ">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={() => setOpenModal3(false)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                        </button>
                        <div class="p-6 text-center">
                            <svg class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{t("modal3Title")}</h3>
                            <p class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{t("modal3Subtitle")}</p>
                            <button onClick={() => setOpenModal3(false)}  type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">{t("modalNo")}</button>
                            <button onClick={() => {submitVoteToRedux();submitListToRedux();setOpenModal3(false)}} data-modal-toggle="popup-modal" type="button" class="text-white bg-logored-500 hover:bg-logored-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                {t("modalYesSure")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>) 
            : null}

            {openModal4 ? (
            <div class="fixed top-0 right-0 left-0 bottom-0 z-50 bg-gray-600 bg-opacity-50">
                <div class="flex items-center justify-center p-4 w-full h-full ">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={() => setOpenModal4(false)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                        </button>
                        <div class="p-6 text-center">
                            <svg class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{t("modal4Title")}</h3>
                            <p class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{t("modal4Subtitle")}</p>
                            <button onClick={() => setOpenModal4(false)}  type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">{t("modalNo")}</button>
                            <button onClick={() => makeRequestElection()} data-modal-toggle="popup-modal" type="button" class="text-white bg-logored-500 hover:bg-logored-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                {t("modalYesSure")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>) 
            : null}

            {openModalDelete ? (
            <div class="fixed top-0 right-0 left-0 bottom-0 z-50 bg-gray-600 bg-opacity-50">
                <div class="flex items-center justify-center p-4 w-full h-full ">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={() => setOpenModalDelete(false)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                        </button>
                        <div class="p-6 text-center">
                            <svg class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{t("modalDeleteTitle")}</h3>
                            <p class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{t("modalDeleteSubtitle")}</p>
                            <button onClick={() => setOpenModalDelete(false)}  type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">{t("modalNo")}</button>
                            <button onClick={() => deleteVoteFromRedux()} data-modal-toggle="popup-modal" type="button" class="text-white bg-logored-500 hover:bg-logored-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                {t("modalYesSure")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>) 
            : null}

            <Footer />
            </div>
            </section>

    );
}

export default CreateVote;