import Header from "../../helpers/Header"
import Footer from "../../helpers/Footer"
import {RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5} from "react-icons/ri"
import {FaCheck} from "react-icons/fa"
import { useSelector, useDispatch } from 'react-redux'
import { advance } from "../../redux/StepSlice"


const Result = () => {

    const step = useSelector(state => state.step.value)
    const dispatch = useDispatch()


    return (
        <section>

            <Header />

            <div class="container px-5 py-10 mx-auto flex">
                <div class="flex w-full">
                    <div class="w-3/10 pr-10 py-6 border-r-2 border-logobrown-300">

                        <div class="flex relative pb-12">
                            <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                                <div class="h-full w-1 bg-logored-500"></div>
                            </div>
                            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-white inline-flex items-center justify-center text-logored-500 relative z-10 border-2 border-logored-500">
                                <FaCheck size={20}/>
                            </div>
                            <div class="flex pl-4 items-center">
                                <h3 class="font-medium title-font text-lg text-logobrown-1000 tracking-wider">VOTE CREATION</h3>
                            </div>
                        </div>

                        <div class="flex relative pb-12">
                            <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                                <div class="h-full w-1 bg-logobrown-300"></div>
                            </div>
                            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-logored-500 inline-flex items-center justify-center text-white relative z-10">
                                <RiNumber2 size={20}/>
                            </div>
                            <div class="flex pl-4 items-center">
                                <h3 class="font-medium title-font text-lg text-logobrown-1000 tracking-wider">KEY GENERATION</h3>
                            </div>
                        </div>

                        <div class="flex relative pb-12">
                            <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                                <div class="h-full w-1 bg-logobrown-300"></div>
                            </div>
                            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-white inline-flex items-center justify-center text-logobrown-300 relative z-10 border-2 border-logobrown-300">
                                <RiNumber3 size={20}/>
                            </div>
                            <div class="flex pl-4 items-center">
                                <h3 class="font-medium title-font text-lg text-logobrown-300 tracking-wider">VOTING</h3>
                            </div>
                        </div>

                        <div class="flex relative pb-12">
                            <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                                <div class="h-full w-1 bg-logobrown-300"></div>
                            </div>
                            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-white inline-flex items-center justify-center text-logobrown-300 relative z-10 border-2 border-logobrown-300">
                                <RiNumber4 size={20}/>
                            </div>
                            <div class="flex pl-4 items-center">
                                <h3 class="font-medium title-font text-lg text-logobrown-300 tracking-wider">TALLYING</h3>
                            </div>
                        </div>

                        <div class="flex relative">
                            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-white inline-flex items-center justify-center text-logobrown-300 relative z-10 border-2 border-logobrown-300">
                                <RiNumber5 size={20} />
                            </div>
                            <div class="flex pl-4 items-center">
                                <h3 class="font-medium title-font text-lg text-logobrown-300 tracking-wider">RESULT</h3>
                            </div>
                        </div>

                    </div>

                    <div class="w-7/10 p-10 py-6">
                        <h1 class="text-5xl font-medium title-font text-logobrown-1000 tracking-wider">Result</h1>
                        <p class="text-base py-7 text-logobrown-1000">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                        <div class="flex justify-center ">
                            <div class="w-2/3 bg-logobrown-300 rounded-lg p-8 flex flex-col">
                                <div class="relative mb-4">
                                    <label for="vote" class="leading-7 text-md text-logobrown-1000">Vote</label>
                                    <input type="text" id="vote" name="vote" class="w-full bg-white rounded border border-gray-300 focus:border-logored-500 focus:ring-2 focus:ring-logored-400 text-base outline-none text-logobrown-1000 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                                <div class="relative mb-4">
                                    <label for="question" class="leading-7 text-md text-logobrown-1000">Question</label>
                                    <input type="text" id="question" name="question" class="w-full bg-white rounded border border-gray-300 focus:border-logored-500 focus:ring-2 focus:ring-logored-400 text-base outline-none text-logobrown-1000 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                                <div class="flex justify-center">
                                    <button disabled={false} class="w-1/3 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">Submit</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <p>{step}</p>

            <Footer />
            
            </section>

    );
}

export default Result;