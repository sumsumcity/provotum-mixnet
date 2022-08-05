import i18next from "../i18next";

const Footer = () => {

    const changeLanguage = (lng) => {
        i18next.changeLanguage(lng)
        localStorage.setItem("lng", lng)
        window.location.reload();

    }
    
    return (
        <footer class="bg-logolblue-100 fixed bottom-0 w-full h-14">
            <div className="flex h-full items-center justify-center">
                <div class="flex px-4">
                    <p class="text-base text-logobrown-1000">© 2022 Copyright: Raphael Wäspi</p>
                </div>
                <div class="flex px-4">
                    {i18next.language==="en" ? 
                    (
                        <div>
                            <button onClick={() => changeLanguage("en")} className="px-2 text-base text-logobrown-1000 font-semibold">EN</button>
                            <button onClick={() => changeLanguage("de")} className="px-2 text-base text-logobrown-1000 font-normal">DE</button>
                        </div>

                    ) 
                    : 
                    (
                        <div>
                            <button onClick={() => changeLanguage("en")} className="px-2 text-base text-logobrown-1000 font-normal">EN</button>
                            <button onClick={() => changeLanguage("de")} className="px-2 text-base text-logobrown-1000 font-semibold">DE</button>
                        </div>

                    )}
                </div>
            </div>
        </footer>
    );
}

export default Footer;