import Header from "../../helpers/Header";
import Footer from "../../helpers/Footer";
import { useState, useEffect } from "react"
import { BsEye, BsEyeSlash } from "react-icons/bs"




const Login = () => {
    
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
      };

    return (
        <section>

            <Header />

            <div class="container px-5 py-10 mx-auto flex overflow-y-auto">
                <div class="flex w-full">

                    <div class="p-10 py-6 w-full">
                        <h1 class="text-5xl pb-20 text-center font-medium text-logobrown-1000 tracking-wider">Login for voting</h1>
                        <div class="flex justify-center w-full">
                            {false ? (
                            <div class="w-1/2 bg-logored-100 rounded-lg p-8 flex flex-col">
                                <div class="pb-1 text-center">
                                    <p class="text-3xl font-bold text-logobrown-1000 tracking-wider">test1</p>                                    
                                </div>
                                <hr className="border-logored-500 border-2" />

                                <ul className="text-center">
                                    <p>test</p>
                                </ul>
                                <div class="flex justify-center pt-2">
                                    <button class="w-1/4 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">Delete Vote</button>
                                </div>
                            </div>
                            ) : 
                            (<div class="w-1/2 bg-logored-100 rounded-lg p-8 flex flex-col">
                                <div class="relative mb-4">
                                    <label for="vote" class="leading-7 text-md text-logobrown-1000">Username</label>
                                    <input type="voteNameForm" id="vote" name="vote" class="w-full bg-white rounded border border-gray-300 focus:border-logored-500 focus:ring-2 focus:ring-logored-400 text-base outline-none text-logobrown-1000 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                                <div class="relative mb-4">
                                    <label for="vote" class="leading-7 text-md text-logobrown-1000">Password</label>
                                    <div className="relative">
                                        <input type={passwordShown ? "text" : "password"} id="vote" name="vote" class="w-full bg-white rounded border border-gray-300 focus:border-logored-500 focus:ring-2 focus:ring-logored-400 text-base outline-none text-logobrown-1000 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        {passwordShown ? 
                                        (
                                            <button className="absolute right-0 h-full p-2" onClick={togglePassword}><BsEyeSlash class="h-7 w-7" /></button>

                                        )
                                        :
                                        (
                                            <button className="absolute right-0 h-full p-2" onClick={togglePassword}><BsEye class="h-7 w-7" /></button>
                                        )}
                                    </div>
                                </div>
                                <div class="flex justify-center py-5">
                                    {false ? (
                                        <button disabled type="button" class="w-full text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-75 disabled:cursor-not-allowed">
                                            <svg role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                            </svg>
                                            Loading...
                                        </button>
                                    ) : 
                                    (<button class="w-1/3 text-white bg-logored-500 py-2 px-8 enabled:hover:bg-logored-700 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">Login</button>
                                    )}
                                </div>
                            </div>
                            )}
                            
                        </div>


                    </div>
                </div>

            </div>


            <Footer />
            
            </section>
    );
}

export default Login;