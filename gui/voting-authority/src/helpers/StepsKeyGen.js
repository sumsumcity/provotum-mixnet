import {RiNumber2, RiNumber3, RiNumber4, RiNumber5} from "react-icons/ri"
import {FaCheck} from "react-icons/fa"
import { useTranslation } from "react-i18next"


const StepsKeyGen = () => {

    const {t, i18n} = useTranslation()
    
    return (
        <div class="flex md:block md:w-3/10 md:pr-10 md:py-6 md:border-r-2 md:border-logobrown-300">

        <div class="block w-1/5 md:flex relative md:pb-12">
            <div className="flex justify-center">
                <div class="h-8 md:h-full w-full md:w-10 absolute inset-0 flex items-center justify-end md:justify-center">
                    <div class="float-right h-1 md:h-full w-1/2 md:w-1 bg-logored-500"></div>
                </div>
                <div class="flex-shrink-0 w-8 md:w-10 h-8 md:h-10 rounded-full bg-white inline-flex items-center justify-center text-logored-500 relative z-10 border-2 border-logored-500">
                    <FaCheck size={20}/>
                </div>
            </div>
            <div class="hidden md:flex pl-4 items-center">
                <h3 class="font-medium text-lg text-logobrown-1000 tracking-wider">{t("creationStep")}</h3>
            </div>
        </div>

        <div class="block w-1/5 md:flex relative md:pb-12">
            <div className="flex justify-center">
                <div class="h-8 md:h-full w-full md:w-10 absolute inset-0 flex items-center justify-end md:justify-center">
                    <div class="md:hidden h-1 md:h-full w-full md:w-1 bg-logored-500"></div>
                    <div class="h-1 md:h-full w-full md:w-1 bg-logobrown-300"></div>
                </div>
                <div class="flex-shrink-0 w-8 md:w-10 h-8 md:h-10 rounded-full bg-logored-500 inline-flex items-center justify-center text-white relative z-10">
                    <RiNumber2 size={20}/>
                </div>
            </div>
            <div class="hidden md:flex pl-4 items-center">
                <h3 class="font-medium text-lg text-logobrown-1000 tracking-wider">{t("keygenStep")}</h3>
            </div>
        </div>

        <div class="block w-1/5 md:flex relative md:pb-12">
            <div className="flex justify-center">
                <div class="h-8 md:h-full w-full md:w-10 absolute inset-0 flex items-center justify-end md:justify-center">
                    <div class="h-1 md:h-full w-full md:w-1 bg-logobrown-300"></div>
                </div>
                <div class="flex-shrink-0 w-8 md:w-10 h-8 md:h-10 rounded-full bg-white inline-flex items-center justify-center text-logobrown-300 relative z-10 border-2 border-logobrown-300">
                    <RiNumber3 size={20}/>
                </div>
            </div>
            <div class="hidden md:flex pl-4 items-center">
                <h3 class="font-medium text-lg text-logobrown-300 tracking-wider">{t("votingStep")}</h3>
            </div>
        </div>

        <div class="block w-1/5 md:flex relative md:pb-12">
            <div className="flex justify-center">
                <div class="h-8 md:h-full w-full md:w-10 absolute inset-0 flex items-center justify-end md:justify-center">
                    <div class="h-1 md:h-full w-full md:w-1 bg-logobrown-300"></div>
                </div>
                <div class="flex-shrink-0 w-8 md:w-10 h-8 md:h-10 rounded-full bg-white inline-flex items-center justify-center text-logobrown-300 relative z-10 border-2 border-logobrown-300">
                    <RiNumber4 size={20}/>
                </div>
            </div>
            <div class="hidden md:flex pl-4 items-center">
                <h3 class="font-medium text-lg text-logobrown-300 tracking-wider">{t("tallyingStep")}</h3>
            </div>
        </div>

        <div class="block w-1/5 md:flex relative md:pb-12">
            <div className="flex justify-center">
                <div class="h-8 md:h-full w-1/2 md:w-10 absolute inset-0 items-center justify-start flex md:hidden">
                    <div class="h-1 md:h-full w-full md:w-1 bg-logobrown-300"></div>
                </div>
                <div class="flex-shrink-0 w-8 md:w-10 h-8 md:h-10 rounded-full bg-white inline-flex items-center justify-center text-logobrown-300 relative z-10 border-2 border-logobrown-300">
                    <RiNumber5 size={20}/>
                </div>
            </div>
            <div class="hidden md:flex pl-4 items-center">
                <h3 class="font-medium text-lg text-logobrown-300 tracking-wider">{t("resultStep")}</h3>
            </div>
        </div>

    </div>
    );
}


export default StepsKeyGen;