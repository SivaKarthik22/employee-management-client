import { createContext, useState } from "react";
import { fetchAllEmployeesFromDb, fetchEmployeeById, fetchEmployeeByFilter } from "../Services/EmployeeServices";

export const EmployeeDbContext = createContext(null);

export function EmployeeDbProvider({children}){
    const [db, setDb] = useState(null);
    const [dbLoading, setDbLoading] = useState(false);
    const [dbErr, setDbErr] = useState("");
    
    function refreshDb(){
        setDbLoading(true);
        setDbErr("");
        let responseObj;

        if((mode == "id" && inputValues.id !== "") || (mode == "filter" && (inputValues.filter != "" || inputValues.location != "" || inputValues.department != ""))){
            if(mode == "id")
                responseObj = fetchEmployeeById(inputValues.id);
            else if(mode == "filter")
                responseObj = fetchEmployeeByFilter(inputValues);
            
            responseObj
            .then(response => {
                if(Array.isArray(response.data))
                    setDb(response.data);
                else
                    setDb(new Array(response.data));
                setDbErr("");
            })
            .catch(err => {
                setDb(null);
                setDbErr("No Employee found");
                console.log(err);
            })
        }
        else{
            responseObj = fetchAllEmployeesFromDb()
            responseObj
            .then(response => {
                setDb(response.data);
                setDbErr("");
            })
            .catch(err => {
                setDb(null);
                setDbErr("Error loading Employees data");
                console.log(err);
            });
        }

        responseObj.finally(()=>{
            setDbLoading(false);
        });
    }

    const locations = ["Coimbatore","Chennai","Bangalore","Delhi","Hyderabad"];
    const departments = ["3D Studio","Tech Art","Platform","Digital Marketing","HR","Finance","Sales"];

    const[inputValues, setInputValues] = useState({id:"", filter:"", location:"", department:""});
    const[mode, setMode] = useState("id");

    function switchMode(){
        setMode(curMode => (curMode == "id" ? "filter" : "id"));
        //refreshDb();
    }
    function handleChange(event) {
        setInputValues({...inputValues, [event.target.id]: event.target.value});
        //refreshDb();
    }
    function clearInput(id){
        setInputValues({...inputValues, [id]: ""});
        //refreshDb();
    }
    
    return(
        <EmployeeDbContext.Provider value={{db, dbLoading, dbErr, refreshDb, locations, departments, inputValues, handleChange, clearInput, mode, setMode, switchMode}}>
            {children}
        </EmployeeDbContext.Provider>
    );
}