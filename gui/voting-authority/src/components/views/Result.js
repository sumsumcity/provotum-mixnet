import Header from "../../helpers/Header"
import Footer from "../../helpers/Footer"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import StepsResult from "../../helpers/StepsResult"
import {FaCheck, FaRegTimesCircle } from "react-icons/fa"
import { useTranslation } from "react-i18next"


const Result = () => {

    const axios = require('axios')
    const type = useSelector(state => state.vote.type)
    const vote = useSelector(state => state.vote.name)
    const questions = useSelector(state => state.vote.questions)
    const election = useSelector(state => state.election)

    // Vote Results
    const [yesVotes, setYesVotes] = useState([])
    const [noVotes, setNoVotes] = useState([])

    // Election Results
    const [arrayVoteNumbers, setArrayVoteNumbers] = useState([1,3,4,7,8,10,11,12,16,17,19,21,23,25,26,27,28,29,30,33,36,37,40,41,44,47,48,49,51,53,57,61,62,63,64,65])
    const [electionResult, setElectionResult] = useState([])

    const {t, i18n} = useTranslation()

    const questionsInList = [];
    const electionResultHTML = [];
    let partyCandidateHTML = [];
    let partyVotes = 0;
    
    useEffect(() => {
        getAllResults()
      },[]);

      const getAllResults = async() => {
        if(type!=="election"){
            for(const [i, value] of questions.entries()){
                const response = await requestResult(value)
                let str=response.data.replace(/\[/g, '');
                str=str.replace(/\]/g, '');
                console.log(str)
                let posYes = str.search(" 1, Count:")
                let posNo = str.search(" 3, Count:")
                if(posYes!==-1 && posNo!==-1){
                    // For No Votes
                    if(isNumber(str.charAt(posNo+17))){ // If under 9'999'999 votes
                        setNoVotes(oldArray => [...oldArray, str.charAt(posNo+11)+str.charAt(posNo+12)+str.charAt(posNo+13)+str.charAt(posNo+14)+str.charAt(posNo+15)+str.charAt(posNo+16)+str.charAt(posNo+17)])

                    }
                    else if(isNumber(str.charAt(posNo+16))){
                        setNoVotes(oldArray => [...oldArray, str.charAt(posNo+11)+str.charAt(posNo+12)+str.charAt(posNo+13)+str.charAt(posNo+14)+str.charAt(posNo+15)+str.charAt(posNo+16)])

                    }
                    else if(isNumber(str.charAt(posNo+15))){
                        setNoVotes(oldArray => [...oldArray, str.charAt(posNo+11)+str.charAt(posNo+12)+str.charAt(posNo+13)+str.charAt(posNo+14)+str.charAt(posNo+15)])

                    }
                    else if(isNumber(str.charAt(posNo+14))){
                        setNoVotes(oldArray => [...oldArray, str.charAt(posNo+11)+str.charAt(posNo+12)+str.charAt(posNo+13)+str.charAt(posNo+14)])

                    }
                    else if(isNumber(str.charAt(posNo+13))){
                        setNoVotes(oldArray => [...oldArray, str.charAt(posNo+11)+str.charAt(posNo+12)+str.charAt(posNo+13)])

                    }
                    else if(isNumber(str.charAt(posNo+12))){
                        setNoVotes(oldArray => [...oldArray, str.charAt(posNo+11)+str.charAt(posNo+12)])

                    }
                    else{
                        setNoVotes(oldArray => [...oldArray, str.charAt(posNo+11)])
                    }

                    //Vor Yes votes
                    if(isNumber(str.charAt(posYes+17))){ // If under 9'999'999 votes
                        setYesVotes(oldArray => [...oldArray, str.charAt(posYes+11)+str.charAt(posYes+12)+str.charAt(posYes+13)+str.charAt(posYes+14)+str.charAt(posYes+15)+str.charAt(posYes+16)+str.charAt(posYes+17)])

                    }
                    else if(isNumber(str.charAt(posYes+16))){
                        setYesVotes(oldArray => [...oldArray, str.charAt(posYes+11)+str.charAt(posYes+12)+str.charAt(posYes+13)+str.charAt(posYes+14)+str.charAt(posYes+15)+str.charAt(posYes+16)])

                    }
                    else if(isNumber(str.charAt(posYes+15))){
                        setYesVotes(oldArray => [...oldArray, str.charAt(posYes+11)+str.charAt(posYes+12)+str.charAt(posYes+13)+str.charAt(posYes+14)+str.charAt(posYes+15)])

                    }
                    else if(isNumber(str.charAt(posYes+14))){
                        setYesVotes(oldArray => [...oldArray, str.charAt(posYes+11)+str.charAt(posYes+12)+str.charAt(posYes+13)+str.charAt(posYes+14)])

                    }
                    else if(isNumber(str.charAt(posYes+13))){
                        setYesVotes(oldArray => [...oldArray, str.charAt(posYes+11)+str.charAt(posYes+12)+str.charAt(posYes+13)])

                    }
                    else if(isNumber(str.charAt(posYes+12))){
                        setYesVotes(oldArray => [...oldArray, str.charAt(posYes+11)+str.charAt(posYes+12)])

                    }
                    else{
                        setYesVotes(oldArray => [...oldArray, str.charAt(posYes+11)])
                    }
                }
                else if(posYes===-1 && posNo!==-1){
                    if(isNumber(str.charAt(posNo+17))){ // If under 9'999'999 votes
                        setNoVotes(oldArray => [...oldArray, str.charAt(posNo+11)+str.charAt(posNo+12)+str.charAt(posNo+13)+str.charAt(posNo+14)+str.charAt(posNo+15)+str.charAt(posNo+16)+str.charAt(posNo+17)])

                    }
                    else if(isNumber(str.charAt(posNo+16))){
                        setNoVotes(oldArray => [...oldArray, str.charAt(posNo+11)+str.charAt(posNo+12)+str.charAt(posNo+13)+str.charAt(posNo+14)+str.charAt(posNo+15)+str.charAt(posNo+16)])

                    }
                    else if(isNumber(str.charAt(posNo+15))){
                        setNoVotes(oldArray => [...oldArray, str.charAt(posNo+11)+str.charAt(posNo+12)+str.charAt(posNo+13)+str.charAt(posNo+14)+str.charAt(posNo+15)])

                    }
                    else if(isNumber(str.charAt(posNo+14))){
                        setNoVotes(oldArray => [...oldArray, str.charAt(posNo+11)+str.charAt(posNo+12)+str.charAt(posNo+13)+str.charAt(posNo+14)])

                    }
                    else if(isNumber(str.charAt(posNo+13))){
                        setNoVotes(oldArray => [...oldArray, str.charAt(posNo+11)+str.charAt(posNo+12)+str.charAt(posNo+13)])

                    }
                    else if(isNumber(str.charAt(posNo+12))){
                        setNoVotes(oldArray => [...oldArray, str.charAt(posNo+11)+str.charAt(posNo+12)])

                    }
                    else{
                        setNoVotes(oldArray => [...oldArray, str.charAt(posNo+11)])
                    }
                    setYesVotes(oldArray => [...oldArray, "0"])
                }
                else if(posYes!==-1 && posNo===-1){
                    if(isNumber(str.charAt(posYes+17))){ // If under 9'999'999 votes
                        setYesVotes(oldArray => [...oldArray, str.charAt(posYes+11)+str.charAt(posYes+12)+str.charAt(posYes+13)+str.charAt(posYes+14)+str.charAt(posYes+15)+str.charAt(posYes+16)+str.charAt(posYes+17)])

                    }
                    else if(isNumber(str.charAt(posYes+16))){
                        setYesVotes(oldArray => [...oldArray, str.charAt(posYes+11)+str.charAt(posYes+12)+str.charAt(posYes+13)+str.charAt(posYes+14)+str.charAt(posYes+15)+str.charAt(posYes+16)])

                    }
                    else if(isNumber(str.charAt(posYes+15))){
                        setYesVotes(oldArray => [...oldArray, str.charAt(posYes+11)+str.charAt(posYes+12)+str.charAt(posYes+13)+str.charAt(posYes+14)+str.charAt(posYes+15)])

                    }
                    else if(isNumber(str.charAt(posYes+14))){
                        setYesVotes(oldArray => [...oldArray, str.charAt(posYes+11)+str.charAt(posYes+12)+str.charAt(posYes+13)+str.charAt(posYes+14)])

                    }
                    else if(isNumber(str.charAt(posYes+13))){
                        setYesVotes(oldArray => [...oldArray, str.charAt(posYes+11)+str.charAt(posYes+12)+str.charAt(posYes+13)])

                    }
                    else if(isNumber(str.charAt(posYes+12))){
                        setYesVotes(oldArray => [...oldArray, str.charAt(posYes+11)+str.charAt(posYes+12)])

                    }
                    else{
                        setYesVotes(oldArray => [...oldArray, str.charAt(posYes+11)])
                    }
                    setNoVotes(oldArray => [...oldArray, "0"])
                }
                else if(posYes===-1 && posNo===-1){ // Should never be the case
                    setNoVotes(oldArray => [...oldArray, "0"])
                    setYesVotes(oldArray => [...oldArray, "0"])
                }
            }
        }
        else{

            for (let i=0;i<questions.length;i++){
                
                const response = await requestResult(questions[i])
                let str=response.data.replace(/\[/g, '');
                str=str.replace(/\]/g, '');
                console.log(str)

                for (let j=0;j<election.listOfAllElectionListMembers[i].length+1;j++){
                    let posNumberOfVotes=-1
                    if(j===election.listOfAllElectionListMembers[i].length){
                        let posNumberOfVotes231 = str.search("231, Count:")
                        if (posNumberOfVotes231!==-1){
                            if(isNumber(str.charAt(posNumberOfVotes231+18))){ // if 1'000'000 vote for one person
                                setElectionResult(oldArray => [...oldArray, [questions[i],"Empty",str.charAt(posNumberOfVotes231+12)+str.charAt(posNumberOfVotes231+13)+str.charAt(posNumberOfVotes231+14)+str.charAt(posNumberOfVotes231+15)+str.charAt(posNumberOfVotes231+16)+str.charAt(posNumberOfVotes231+17)+str.charAt(posNumberOfVotes231+18)]])
                            }
                            else if(isNumber(str.charAt(posNumberOfVotes231+17))){ // if 100'000 vote for one person
                                setElectionResult(oldArray => [...oldArray, [questions[i],"Empty",str.charAt(posNumberOfVotes231+12)+str.charAt(posNumberOfVotes231+13)+str.charAt(posNumberOfVotes231+14)+str.charAt(posNumberOfVotes231+15)+str.charAt(posNumberOfVotes231+16)+str.charAt(posNumberOfVotes231+17)]])
                            }
                            else if(isNumber(str.charAt(posNumberOfVotes231+16))){
                                setElectionResult(oldArray => [...oldArray, [questions[i],"Empty",str.charAt(posNumberOfVotes231+12)+str.charAt(posNumberOfVotes231+13)+str.charAt(posNumberOfVotes231+14)+str.charAt(posNumberOfVotes231+15)+str.charAt(posNumberOfVotes231+16)]])
                            }
                            else if(isNumber(str.charAt(posNumberOfVotes231+15))){
                                setElectionResult(oldArray => [...oldArray, [questions[i],"Empty",str.charAt(posNumberOfVotes231+12)+str.charAt(posNumberOfVotes231+13)+str.charAt(posNumberOfVotes231+14)+str.charAt(posNumberOfVotes231+15)]])
                            }
                            else if(isNumber(str.charAt(posNumberOfVotes231+14))){
                                setElectionResult(oldArray => [...oldArray, [questions[i],"Empty",str.charAt(posNumberOfVotes231+12)+str.charAt(posNumberOfVotes231+13)+str.charAt(posNumberOfVotes231+14)]])
                            }
                            else if(isNumber(str.charAt(posNumberOfVotes231+13))){
                                setElectionResult(oldArray => [...oldArray, [questions[i],"Empty",str.charAt(posNumberOfVotes231+12)+str.charAt(posNumberOfVotes231+13)]])
                            }
                            else{
                                console.log(isNumber(str.charAt(posNumberOfVotes231+13)))
                                setElectionResult(oldArray => [...oldArray, [questions[i],"Empty",str.charAt(posNumberOfVotes231+12)]])
                            }
                        }
                    }
                    else {
                        posNumberOfVotes = str.search(" "+arrayVoteNumbers[j]+", Count:")
                    }
                    if (j<5 && posNumberOfVotes!==-1){
                        if(isNumber(str.charAt(posNumberOfVotes+17))){ // if 1'000'000 vote for one person
                            setElectionResult(oldArray => [...oldArray, [questions[i],election.listOfAllElectionListMembers[i][j],str.charAt(posNumberOfVotes+11)+str.charAt(posNumberOfVotes+12)+str.charAt(posNumberOfVotes+13)+str.charAt(posNumberOfVotes+14)+str.charAt(posNumberOfVotes+15)+str.charAt(posNumberOfVotes+16)+str.charAt(posNumberOfVotes+17)]])
                        }
                        else if(isNumber(str.charAt(posNumberOfVotes+16))){ // if 100'000 vote for one person
                            setElectionResult(oldArray => [...oldArray, [questions[i],election.listOfAllElectionListMembers[i][j],str.charAt(posNumberOfVotes+11)+str.charAt(posNumberOfVotes+12)+str.charAt(posNumberOfVotes+13)+str.charAt(posNumberOfVotes+14)+str.charAt(posNumberOfVotes+15)+str.charAt(posNumberOfVotes+16)]])
                        }
                        else if(isNumber(str.charAt(posNumberOfVotes+15))){
                            setElectionResult(oldArray => [...oldArray, [questions[i],election.listOfAllElectionListMembers[i][j],str.charAt(posNumberOfVotes+11)+str.charAt(posNumberOfVotes+12)+str.charAt(posNumberOfVotes+13)+str.charAt(posNumberOfVotes+14)+str.charAt(posNumberOfVotes+15)]])
                        }
                        else if(isNumber(str.charAt(posNumberOfVotes+14))){
                            setElectionResult(oldArray => [...oldArray, [questions[i],election.listOfAllElectionListMembers[i][j],str.charAt(posNumberOfVotes+11)+str.charAt(posNumberOfVotes+12)+str.charAt(posNumberOfVotes+13)+str.charAt(posNumberOfVotes+14)]])
                        }
                        else if(isNumber(str.charAt(posNumberOfVotes+13))){
                            setElectionResult(oldArray => [...oldArray, [questions[i],election.listOfAllElectionListMembers[i][j],str.charAt(posNumberOfVotes+11)+str.charAt(posNumberOfVotes+12)+str.charAt(posNumberOfVotes+13)]])
                        }
                        else if(isNumber(str.charAt(posNumberOfVotes+12))){
                            setElectionResult(oldArray => [...oldArray, [questions[i],election.listOfAllElectionListMembers[i][j],str.charAt(posNumberOfVotes+11)+str.charAt(posNumberOfVotes+12)]])
                        }
                        else{
                            setElectionResult(oldArray => [...oldArray, [questions[i],election.listOfAllElectionListMembers[i][j],str.charAt(posNumberOfVotes+11)]])
                        }
                    }
                    else if (j>=5 && posNumberOfVotes!==-1){
                        if(isNumber(str.charAt(posNumberOfVotes+18))){ // if 1'000'000 vote for one person
                            setElectionResult(oldArray => [...oldArray, [questions[i],election.listOfAllElectionListMembers[i][j],str.charAt(posNumberOfVotes+12)+str.charAt(posNumberOfVotes+13)+str.charAt(posNumberOfVotes+14)+str.charAt(posNumberOfVotes+15)+str.charAt(posNumberOfVotes+16)+str.charAt(posNumberOfVotes+17)+str.charAt(posNumberOfVotes+18)]])
                        }
                        else if(isNumber(str.charAt(posNumberOfVotes+17))){ // if 100'000 vote for one person
                            setElectionResult(oldArray => [...oldArray, [questions[i],election.listOfAllElectionListMembers[i][j],str.charAt(posNumberOfVotes+12)+str.charAt(posNumberOfVotes+13)+str.charAt(posNumberOfVotes+14)+str.charAt(posNumberOfVotes+15)+str.charAt(posNumberOfVotes+16)+str.charAt(posNumberOfVotes+17)]])
                        }
                        else if(isNumber(str.charAt(posNumberOfVotes+16))){
                            setElectionResult(oldArray => [...oldArray, [questions[i],election.listOfAllElectionListMembers[i][j],str.charAt(posNumberOfVotes+12)+str.charAt(posNumberOfVotes+13)+str.charAt(posNumberOfVotes+14)+str.charAt(posNumberOfVotes+15)+str.charAt(posNumberOfVotes+16)]])
                        }
                        else if(isNumber(str.charAt(posNumberOfVotes+15))){
                            setElectionResult(oldArray => [...oldArray, [questions[i],election.listOfAllElectionListMembers[i][j],str.charAt(posNumberOfVotes+12)+str.charAt(posNumberOfVotes+13)+str.charAt(posNumberOfVotes+14)+str.charAt(posNumberOfVotes+15)]])
                        }
                        else if(isNumber(str.charAt(posNumberOfVotes+14))){
                            setElectionResult(oldArray => [...oldArray, [questions[i],election.listOfAllElectionListMembers[i][j],str.charAt(posNumberOfVotes+12)+str.charAt(posNumberOfVotes+13)+str.charAt(posNumberOfVotes+14)]])
                        }
                        else if(isNumber(str.charAt(posNumberOfVotes+13))){
                            setElectionResult(oldArray => [...oldArray, [questions[i],election.listOfAllElectionListMembers[i][j],str.charAt(posNumberOfVotes+12)+str.charAt(posNumberOfVotes+13)]])
                        }
                        else{
                            setElectionResult(oldArray => [...oldArray, [questions[i],election.listOfAllElectionListMembers[i][j],str.charAt(posNumberOfVotes+12)]])
                        }
                    }
                }
            }
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

      function isNumber(char) {
        if (typeof char !== 'string') {
          return false;
        }
      
        if (char.trim() === '') {
          return false;
        }
      
        return !isNaN(char);
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
                    <p>{t("yesVotes")} {yesVotes[index]}</p>
                </div>
                <div className="flex justify-end">
                    <FaRegTimesCircle className="text-red-700 mr-3 w-5 h-5"/>
                    <p>{t("noVotes")} {noVotes[index]}</p>
                </div>
            </div>
        </li>)
    }

    // Make list of all Parties and Candidates 
    for (let i=0; i<questions.length; i++){
        partyCandidateHTML=[]
        partyVotes=0
        console.log(electionResult)
        for (let j=0; j<electionResult.length; j++){
            if(electionResult[j][0]===questions[i]){
                partyVotes = parseInt(partyVotes)+parseInt(electionResult[j][2])
            }
            if(electionResult[j][0]===questions[i] && electionResult[j][1]!=="Empty"){
                partyCandidateHTML.push(
                    <div>{electionResult[j][1]}: {electionResult[j][2]}</div>
                )
            }
        }

        electionResultHTML.push(
            <div>            
                <hr class="border-logored-500 border-1"/>
                <div className="flex justify-evenly">
                    <div className="flex items-center">
                        <h2 class="text-2xl align-middle p-2 font-medium text-logobrown-1000 tracking-wider">{questions[i]} ({partyVotes}):</h2>
                    </div>
                    <div className="float-right">
                        <p class="text-lg text-center p-2 font-medium text-logobrown-1000 tracking-wider">{partyCandidateHTML}</p>
                    </div>
                </div>
            </div>

        )
    }


    return (
        <section>

        {console.log(yesVotes)}
{        console.log(noVotes)
}
            <Header />

            <div class="container px-5 py-10 mx-auto flex">
                <div class="flex w-full">
                    <StepsResult />

                    {type==="election" ? 
                    (
                    <div class="w-7/10 p-10 py-6">
                        <h1 class="text-5xl font-medium title-font text-logobrown-1000 tracking-wider">{t("titleResult")}</h1>
                        <p class="text-base py-7 text-logobrown-1000">{t("textResultElection")}</p>
                        <div class="flex justify-center ">
                            <div class="w-2/3 bg-logobrown-300 rounded-lg p-8 flex flex-col">
                                <div class="pb-1 text-center">
                                    <p class="text-3xl font-bold text-logobrown-1000 tracking-wider">{vote}</p>                                    
                                </div>
                                <hr className="border-logored-500 border-2" />
                                {electionResultHTML}
                            </div>
                        </div>
                    </div>
                    ) 
                    : 
                    (
                    <div class="w-7/10 p-10 py-6">
                        <h1 class="text-5xl font-medium title-font text-logobrown-1000 tracking-wider">{t("titleResult")}</h1>
                        <p class="text-base py-7 text-logobrown-1000">{t("textResultVote")}</p>
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
                    )}
                </div>

            </div>


            <Footer />
            
            </section>

    );
}

export default Result;