function Header() {
    return(
        <header className="border-b-1 border-cyan-900">
            <div className="container px-5 max-w-screen-xl mx-auto flex justify-between items-center">
                <p className="py-5">
                    <span className="text-lg text-cyan-500">
                        ArtTech Studio
                    </span>
                    <span className="text-lg pl-2">
                        Employee Mangement
                    </span>
                </p>
                <div className="flex gap-10 text-md">
                    <div className="py-5 cursor-pointer relative text-cyan-400">
                        Current Employees
                        <div className="absolute bottom-0 w-full h-1 bg-cyan-600"></div>
                    </div>
                    <div className="py-5 cursor-pointer relative opacity-90">
                        Past Employees
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

