import { createContext, useState } from "react";
import { fetchAllEmployeesFromDb } from "../Services/EmployeeServices";

export const EmployeeDbContext = createContext(null);

export function EmployeeDbProvider({children}){
    const [db, setDb] = useState(null);
    const [dbLoading, setDbLoading] = useState(false);
    const [dbErr, setDbErr] = useState("");
    const [tableData, setTableData] = useState([]);

    const locations = ["Coimbatore","Chennai","Bangalore","Delhi","Hyderabad"];
    const departments = ["3D Studio","Tech Art","Platform","Digital Marketing","HR","Finance","Sales"];

    const[inputValues, setInputValues] = useState({id:"", filter:"", location:"", department:""});
    const[mode, setMode] = useState("id");
    
    function refreshDb(){
        setDbLoading(true);
        setDbErr("");
        let responseObj;
        responseObj = fetchAllEmployeesFromDb()
        responseObj
        .then(response => {
            setDb(response.data);
            setTableData(response.data);
            setDbErr("");
        })
        .catch(err => {
            setDb(null);
            setTableData([]);
            setDbErr("Error loading Employees data");
            console.log(err);
        });
        responseObj.finally(()=>{
            setDbLoading(false);
            setInputValues({id:"", filter:"", location:"", department:""});
        });
    }

    function refreshTableData(){
        if(!db){
            setTableData([]);
        }
        else if((mode == "id" && inputValues.id !== "") || (mode == "filter" && (inputValues.filter != "" || inputValues.location != "" || inputValues.department != ""))){
            if(mode == "id"){
                let singleEmployee = db.find(employee => employee.id == inputValues.id);
                if(!singleEmployee) setTableData([]);
                else setTableData([singleEmployee]);
            }   
            else if(mode == "filter"){
                let filteredData = [...db];
                if(inputValues.filter != ""){
                    filteredData = filteredData.filter(employee => `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(inputValues.filter.toLowerCase()));
                }
                if(inputValues.location != ""){
                    filteredData = filteredData.filter(employee => employee.location == inputValues.location);
                }
                if(inputValues.department != ""){
                    filteredData = filteredData.filter(employee => employee.department == inputValues.department);
                }
                setTableData(filteredData);
            }
        }
        else{
            setTableData([...db]);
        }
    }

    function switchMode(){
        setMode(curMode => (curMode == "id" ? "filter" : "id"));
    }
    function handleChange(event) {
        setInputValues({...inputValues, [event.target.id]: event.target.value});
    }
    function clearInput(id){
        setInputValues({...inputValues, [id]: ""});
    }
    
    return(
        <EmployeeDbContext.Provider value={{tableData, refreshTableData, dbLoading, dbErr, refreshDb, locations, departments, inputValues, handleChange, clearInput, mode, setMode, switchMode}}>
            {children}
        </EmployeeDbContext.Provider>
    );
}