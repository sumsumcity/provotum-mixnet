import {RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5} from "react-icons/ri"
import { useTranslation } from "react-i18next"


const StepsCreateVote = () => {

    const {t, i18n} = useTranslation()
    
    return (
        <div class="flex md:block md:w-3/10 md:pr-10 md:py-6 md:border-r-2 md:border-logodblue-100">

        <div class="block w-1/4 md:flex relative md:pb-12">
            <div className="flex justify-center">
                <div class="h-8 md:h-full w-full md:w-10 absolute inset-0 flex items-center justify-end md:justify-center">
                    <div class="float-right h-1 md:h-full w-1/2 md:w-1 bg-logodblue-100"></div>
                </div>
                <div class="flex-shrink-0 w-8 md:w-10 h-8 md:h-10 rounded-full bg-logodblue-300 inline-flex items-center justify-center text-white relative z-10">
                    <RiNumber1 size={20}/>
                </div>
            </div>
            <div class="hidden md:flex pl-4 items-center">
                <h3 class="font-medium text-lg text-logobrown-1000 tracking-wider">{t("creationStep")}</h3>
            </div>
        </div>

        <div class="block w-1/4 md:flex relative md:pb-12">
            <div className="flex justify-center">
                <div class="h-8 md:h-full w-full md:w-10 absolute inset-0 flex items-center justify-end md:justify-center">
                    <div class="md:hidden h-1 md:h-full w-full md:w-1 bg-logodblue-100"></div>
                    <div class="h-1 md:h-full w-full md:w-1 bg-logodblue-100"></div>
                </div>
                <div class="flex-shrink-0 w-8 md:w-10 h-8 md:h-10 rounded-full bg-white inline-flex items-center justify-center text-logodblue-100 relative z-10 border-2 border-logodblue-100">
                    <RiNumber2 size={20}/>
                </div>
            </div>
            <div class="hidden md:flex pl-4 items-center">
                <h3 class="font-medium text-lg text-logodblue-100 tracking-wider">{t("keygenStep")}</h3>
            </div>
        </div>

        <div class="block w-1/4 md:flex relative md:pb-12">
            <div className="flex justify-center">
                <div class="h-8 md:h-full w-full md:w-10 absolute inset-0 flex items-center justify-end md:justify-center">
                    <div class="md:hidden h-1 md:h-full w-full md:w-1 bg-logodblue-100"></div>
                    <div class="h-1 md:h-full w-full md:w-1 bg-logodblue-100"></div>               
                </div>
                <div class="flex-shrink-0 w-8 md:w-10 h-8 md:h-10 rounded-full bg-white inline-flex items-center justify-center text-logodblue-100 relative z-10 border-2 border-logodblue-100">
                    <RiNumber3 size={20}/>
                </div>
            </div>
            <div class="hidden md:flex pl-4 items-center">
                <h3 class="font-medium text-lg text-logodblue-100 tracking-wider">{t("votingStep")}</h3>
            </div>
        </div>

        <div class="block w-1/4 md:flex relative md:pb-12">
            <div className="flex justify-center">
                <div class="h-8 md:h-full w-1/2 md:w-10 absolute inset-0 items-center justify-start flex md:hidden">
                    <div class="h-1 md:h-full w-full md:w-1 bg-logodblue-100"></div>
                </div>
                <div class="flex-shrink-0 w-8 md:w-10 h-8 md:h-10 rounded-full bg-white inline-flex items-center justify-center text-logodblue-100 relative z-10 border-2 border-logodblue-100">
                    <RiNumber4 size={20}/>
                </div>
            </div>
            <div class="hidden md:flex pl-4 items-center">
                <h3 class="font-medium text-lg text-logodblue-100 tracking-wider">{t("tallyingStep")}</h3>
            </div>
        </div>

    </div>
    );
}


export default StepsCreateVote;