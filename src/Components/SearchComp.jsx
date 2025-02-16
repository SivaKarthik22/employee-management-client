import { useContext } from "react";
import { EmployeeDbContext } from "./EmployeeDbContext";

function SearchComp(){
    const{locations, departments, inputValues, handleChange, clearInput, mode, setMode, switchMode} = useContext(EmployeeDbContext);

    return(
        <div className='container max-w-screen-xl mx-auto px-5 mt-8 mb-4 flex gap-6 items-center'>
            <div className="flex gap-3 text-md font-light items-center">
                <p className="mr-2">Search by:</p> 
                <button className={mode == "id" ? "text-cyan-500 font-normal" : "opacity-90"} onClick={()=>{setMode("id")}}>
                    Emp. ID
                </button>
                <div
                    className={`w-9 h-6 border-2 border-cyan-800 rounded-full flex cursor-pointer p-0.5 bg-cyan-950/50 ${mode=="id" ? "justify-start":"justify-end"}`}
                    onClick={switchMode}
                >
                    <div className="w-4 h-4 bg-cyan-400/75 rounded-full"></div>
                </div>
                <button className={mode == "filter" ? "text-cyan-500 font-normal" : "opacity-90"} onClick={()=>{setMode("filter")}}>
                    Filtering
                </button>
            </div>

            <div className="flex gap-3">
                <SearchBar mode={mode} valueState={inputValues} handleChange={handleChange} clearInput={clearInput}/>
                {mode == "filter" && <>
                    <DropDown id="department" label="Department" options={departments} handleChange={handleChange} valueState={inputValues} clearInput={clearInput}/>
                    <DropDown id="location" label="Location" options={locations} handleChange={handleChange} valueState={inputValues} clearInput={clearInput}/>
                </>}
            </div>
        </div>
    );
}

export default SearchComp;

function SearchBar({mode, valueState, handleChange, clearInput}){
    return(
        <div className="flex py-2 px-4 w-xs border-1 border-cyan-900 rounded-full bg-cyan-950/50 items-center justify-between gap-3">
            <input
                className="flex-grow font-light outline-none"
                placeholder={`Seach by ${mode == "id" ? "Emp. ID" : "employee name"}`}
                onChange={handleChange}
                value={valueState[mode]}
                type={mode=="id" ? "number" : "text"}
                id={mode}
            />
            {valueState[mode] != "" && (
                <button onClick={()=>{ clearInput(mode) }}>
                    <i className="fa-solid fa-xmark opacity-75 px-2 text-lg"></i>
                </button>
            )}
            <i className="fa-solid fa-magnifying-glass opacity-75"></i>
        </div>
        
    );
}

function DropDown({id, label, options, handleChange, valueState, clearInput}){
    return(
        <div className="flex py-2 px-4 border-1 border-cyan-900 rounded-full bg-cyan-950 items-center justify-between gap-3">
            <select
                className="flex-grow font-light outline-none cursor-pointer bg-cyan-950"
                id={id}
                onChange={handleChange}
                value={valueState[id]}
            >
                <option className="m-2" value="" disabled hidden>Select {label}</option>
                {options.map((option,index) => { 
                    return (
                        <option className="m-2" key={index} value={option} >
                            {option}
                        </option>
                    );
                })}
            </select>
            {valueState[id] != "" && (
                <button onClick={()=>{ clearInput(id) }}>
                    <i className="fa-solid fa-xmark opacity-75 px-2 text-lg"></i>
                </button>
            )}
        </div>
    );
}
