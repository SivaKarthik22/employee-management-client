import { useState } from "react";

function SearchComp(){
    const[mode, setMode] = useState("id");

    return(
        <div className='container max-w-screen-xl mx-auto px-5 mt-8 mb-4 flex gap-10 items-center'>
            {mode == "id" ? <SearchBar/> : <FilterSearch/>}
            <div className="flex gap-3 text-md font-light items-center">
                <p className="mr-2">Search by:</p> 
                <button className={mode == "id" ? "text-cyan-500 font-normal" : "opacity-90"}>
                    Emp. ID
                </button>
                <div className="w-10 h-6 border-2 border-cyan-800 rounded-full flex cursor-pointer p-0.5 bg-cyan-950/50">
                    <div className="w-4 h-4 bg-cyan-400/80 rounded-full"></div>
                </div>
                <button className={mode == "filter" ? "text-cyan-500 font-normal" : "opacity-90"}>
                    Filtering
                </button>
            </div>
        </div>
    );
}

export default SearchComp;

function SearchBar(){
    const [inputValue, setInputValue] = useState("");

    return(
        <div className="flex py-2 px-4 w-xs border-1 border-cyan-900 rounded-full bg-cyan-950/50 items-center justify-between gap-3">
            <input
                className="flex-grow font-light outline-none"
                placeholder="Seach by emp. ID"
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

function FilterSearch(){
    return(
        <></>
    );
}
