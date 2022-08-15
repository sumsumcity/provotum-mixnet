import { RiNumber2, RiNumber3, RiNumber1 } from "react-icons/ri"
import { useTranslation } from "react-i18next"

const StepsVoting = () => {

    const {t, i18n} = useTranslation()

    return (
        <div class="flex md:block md:w-3/10 md:pr-10 md:py-6 md:border-r-2 md:border-logolblue-200">

        <div class="block w-1/3 md:flex relative md:pb-12">
            <div className="flex justify-center">
                <div class="h-8 md:h-full w-full md:w-10 absolute inset-0 flex items-center justify-end md:justify-center">
                    <div class="float-right h-1 md:h-full w-1/2 md:w-1 bg-logolblue-500"></div>
                </div>
                <div class="flex-shrink-0 w-8 md:w-10 h-8 md:h-10 rounded-full bg-logolblue-500 inline-flex items-center justify-center text-white relative z-10">
                    <RiNumber1 size={20}/>
                </div>
            </div>
            <div class="hidden md:flex pl-4 items-center">
                <h3 class="font-medium text-lg text-logobrown-1000 tracking-wider">{t("firstStep")}</h3>
            </div>
        </div>

        <div class="block w-1/3 md:flex relative md:pb-12">
            <div className="flex justify-center">
                <div class="h-8 md:h-full w-full md:w-10 absolute inset-0 flex items-center justify-end md:justify-center">
                    <div class="md:hidden h-1 md:h-full w-full md:w-1 bg-logolblue-500"></div>
                    <div class="h-1 md:h-full w-full md:w-1 bg-logolblue-200"></div>
                </div>
                <div class="flex-shrink-0 w-8 md:w-10 h-8 md:h-10 rounded-full bg-white inline-flex items-center justify-center text-logolblue-200 relative z-10 border-2 border-logolblue-200">
                    <RiNumber2 size={20}/>
                </div>
            </div>
            <div class="hidden md:flex pl-4 items-center">
                <h3 class="font-medium text-lg text-logolblue-200 tracking-wider">{t("secondStep")}</h3>
            </div>
        </div>

        <div class="block w-1/3 md:flex relative md:pb-12">
            <div className="flex justify-center">
                <div class="h-8 md:h-full w-1/2 md:w-10 absolute inset-0 items-center justify-start flex md:hidden">
                    <div class="h-1 md:h-full w-full md:w-1 bg-logolblue-200"></div>
                </div>
                <div class="flex-shrink-0 w-8 md:w-10 h-8 md:h-10 rounded-full bg-white inline-flex items-center justify-center text-logolblue-200 relative z-10 border-2 border-logolblue-200">
                    <RiNumber3 size={20}/>
                </div>
            </div>
            <div class="hidden md:flex pl-4 items-center">
                <h3 class="font-medium text-lg text-logolblue-200 tracking-wider">{t("thirdStep")}</h3>
            </div>
        </div>

    </div>
    );
}

export default StepsVoting;