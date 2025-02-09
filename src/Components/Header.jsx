import { useState } from "react";

function Header() {
    return(
        <header className="border-b-1 border-cyan-900">
            <div className="container p-5 max-w-screen-xl mx-auto flex justify-between items-center">
                <p className="text-lg">Employee Management System (EMS)</p>
                <SearchBar/>
            </div>
        </header>
    );
}

export default Header;

function SearchBar(){
    const [inputValue, setInputValue] = useState("");

    return(
        <div className="flex py-2 px-4 w-sm border-1 border-cyan-900 rounded-full bg-cyan-950/50 items-center justify-between gap-3">
            <input
                className="flex-grow font-light outline-none"
                placeholder="Seach by employee ID or name"
                onChange={event => {
                    setInputValue(event.target.value);
                }}
                value={inputValue}
            />
            {inputValue != "" && (
                <button onClick={()=>{setInputValue("")}}>
                    <i className="fa-solid fa-xmark opacity-75 px-2 text-lg"></i>
                </button>
            )}
            <i className="fa-solid fa-magnifying-glass opacity-75"></i>
        </div>
        
    );
}