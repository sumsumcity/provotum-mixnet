import github_logo from "./github.svg"
import logo from "./logo.png"

const Header = () => {
    
    return (
        <header class="bg-logobrown-300">
        <div class="container mx-auto p-3 flex flex-wrap justify-between items-center">
            <div class="w-1/3">
                <a class="flex items-center text-logobrown-1000">
                <img src={logo} width="60" alt="logo" />
                <span class="ml-3 font-medium text-2xl">Provotum Mixnet</span>
                </a>
            </div>
            <div class="w-1/3 text-center">
                <h2 class="text-logobrown-1000 font-medium text-2xl">Voting Authority</h2>
            </div>
            <div class="w-1/3">
                <a href="https://github.com/provotum">
                    <img src={github_logo} width="35" alt="github logo" class="float-right hover:scale-150 duration-150" />
                </a>
            </div>
        </div>
        </header>
    );
}

export default Header;