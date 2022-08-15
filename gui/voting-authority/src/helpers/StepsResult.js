import {FaCheck, FaChartBar} from "react-icons/fa"
import { useTranslation } from "react-i18next"


const StepsResult = () => {


    const {t, i18n} = useTranslation()
    
    return (
        <div class="flex sm:block sm:w-3/10 sm:pr-10 sm:py-6 sm:border-r-2 sm:border-logobrown-300">

        <div class="block w-1/5 sm:flex relative sm:pb-12">
            <div className="flex justify-center">
                <div class="h-8 sm:h-full w-full sm:w-10 absolute inset-0 flex items-center justify-end sm:justify-center">
                    <div class="float-right h-1 sm:h-full w-1/2 sm:w-1 bg-logored-500"></div>
                </div>
                <div class="flex-shrink-0 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-white inline-flex items-center justify-center text-logored-500 relative z-10 border-2 border-logored-500">
                    <FaCheck size={20}/>
                </div>
            </div>
            <div class="hidden sm:flex pl-4 items-center">
                <h3 class="font-medium text-lg text-logobrown-1000 tracking-wider">{t("creationStep")}</h3>
            </div>
        </div>

        <div class="block w-1/5 sm:flex relative sm:pb-12">
            <div className="flex justify-center">
                <div class="h-8 sm:h-full w-full sm:w-10 absolute inset-0 flex items-center justify-end sm:justify-center">
                    <div class="sm:hidden h-1 sm:h-full w-full sm:w-1 bg-logored-500"></div>
                    <div class="h-1 sm:h-full w-full sm:w-1 bg-logored-500"></div>
                </div>
                <div class="flex-shrink-0 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-white inline-flex items-center justify-center text-logored-500 relative z-10 border-2 border-logored-500">
                    <FaCheck size={20}/>
                </div>
            </div>
            <div class="hidden sm:flex pl-4 items-center">
                <h3 class="font-medium text-lg text-logobrown-1000 tracking-wider">{t("keygenStep")}</h3>
            </div>
        </div>

        <div class="block w-1/5 sm:flex relative sm:pb-12">
            <div className="flex justify-center">
                <div class="h-8 sm:h-full w-full sm:w-10 absolute inset-0 flex items-center justify-end sm:justify-center">
                    <div class="sm:hidden h-1 sm:h-full w-full sm:w-1 bg-logored-500"></div>
                    <div class="h-1 sm:h-full w-full sm:w-1 bg-logored-500"></div>               
                </div>
                <div class="flex-shrink-0 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-white inline-flex items-center justify-center text-logored-500 relative z-10 border-2 border-logored-500">
                    <FaCheck size={20}/>
                </div>
            </div>
            <div class="hidden sm:flex pl-4 items-center">
                <h3 class="font-medium text-lg text-logobrown-1000 tracking-wider">{t("votingStep")}</h3>
            </div>
        </div>

        <div class="block w-1/5 sm:flex relative sm:pb-12">
            <div className="flex justify-center">
                <div class="h-8 sm:h-full w-full sm:w-10 absolute inset-0 flex items-center justify-end sm:justify-center">
                    <div class="sm:hidden h-1 sm:h-full w-full sm:w-1 bg-logored-500"></div>
                    <div class="h-1 sm:h-full w-full sm:w-1 bg-logored-500"></div>               
                </div>
                <div class="flex-shrink-0 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-white inline-flex items-center justify-center text-logored-500 relative z-10 border-2 border-logored-500">
                    <FaCheck size={20}/>
                </div>
            </div>
            <div class="hidden sm:flex pl-4 items-center">
                <h3 class="font-medium text-lg text-logobrown-1000 tracking-wider">{t("tallyingStep")}</h3>
            </div>
        </div>

        <div class="block w-1/5 sm:flex relative sm:pb-12">
            <div className="flex justify-center">
                <div class="h-8 sm:h-full w-1/2 sm:w-10 absolute inset-0 items-center justify-start flex sm:hidden">
                    <div class="h-1 sm:h-full w-full sm:w-1 bg-logored-500"></div>
                </div>
                <div class="flex-shrink-0 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-logored-500 inline-flex items-center justify-center text-white relative z-10">
                    <FaChartBar size={20}/>
                </div>
            </div>
            <div class="hidden sm:flex pl-4 items-center">
                <h3 class="font-medium text-lg text-logobrown-1000 tracking-wider">{t("resultStep")}</h3>
            </div>
        </div>

    </div>
    );
}

export default StepsResult;