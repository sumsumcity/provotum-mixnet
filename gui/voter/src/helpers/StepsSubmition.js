import { RiNumber2, RiNumber3, RiNumber4, RiNumber5 } from "react-icons/ri"
import { FaCheck } from "react-icons/fa"
import { useTranslation } from "react-i18next"

const StepsSubmition = () => {

    const {t, i18n} = useTranslation()

    return (
        <div class="w-3/10 pr-10 py-6 border-r-2 border-logored-100">

            <div class="flex relative pb-12">
                <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div class="h-full w-1 bg-logored-500"></div>
                </div>
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-white inline-flex items-center justify-center text-logored-500 relative z-10 border-2 border-logored-500">
                    <FaCheck size={20} />
                </div>
                <div class="flex pl-4 items-center">
                    <h3 class="font-medium title-font text-lg text-logobrown-1000 tracking-wider">{t("firstStep")}</h3>
                </div>
            </div>

            <div class="flex relative pb-12">
                <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div class="h-full w-1 bg-logored-100"></div>
                </div>
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-logored-500 inline-flex items-center justify-center text-white relative z-10">
                    <RiNumber2 size={20} />
                </div>
                <div class="flex pl-4 items-center">
                    <h3 class="font-medium title-font text-lg text-logobrown-1000 tracking-wider">{t("secondStep")}</h3>
                </div>
            </div>

            <div class="flex relative pb-12">
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-white inline-flex items-center justify-center text-logored-100 relative z-10 border-2 border-logored-100">
                    <RiNumber3 size={20} />
                </div>
                <div class="flex pl-4 items-center">
                    <h3 class="font-medium title-font text-lg text-logored-100 tracking-wider">{t("thirdStep")}</h3>
                </div>
            </div>


        </div>
    );
}

export default StepsSubmition;