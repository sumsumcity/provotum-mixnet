import {RiNumber4, RiNumber5} from "react-icons/ri"
import {FaCheck} from "react-icons/fa"

const StepsTallying = () => {
    
    return (
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
                <div class="h-full w-1 bg-logored-500"></div>
            </div>
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-white inline-flex items-center justify-center text-logored-500 relative z-10 border-2 border-logored-500">
                <FaCheck size={20}/>
            </div>
            <div class="flex pl-4 items-center">
                <h3 class="font-medium title-font text-lg text-logobrown-1000 tracking-wider">KEY GENERATION</h3>
            </div>
        </div>

        <div class="flex relative pb-12">
            <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                <div class="h-full w-1 bg-logored-500"></div>
            </div>
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-white inline-flex items-center justify-center text-logored-500 relative z-10 border-2 border-logored-500">
                <FaCheck size={20}/>
            </div>
            <div class="flex pl-4 items-center">
                <h3 class="font-medium title-font text-lg text-logobrown-1000 tracking-wider">VOTING</h3>
            </div>
        </div>

        <div class="flex relative pb-12">
            <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                <div class="h-full w-1 bg-logobrown-300"></div>
            </div>
            <div class="x-shrink-0 w-10 h-10 rounded-full bg-logored-500 inline-flex items-center justify-center text-white relative z-10">
                <RiNumber4 size={20}/>
            </div>
            <div class="flex pl-4 items-center">
                <h3 class="font-medium title-font text-lg text-logobrown-1000 tracking-wider">TALLYING</h3>
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
    );
}

export default StepsTallying;