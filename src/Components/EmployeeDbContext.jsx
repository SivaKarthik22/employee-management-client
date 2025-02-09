import { createContext, useState } from "react";
import { fetchEmployeesDb } from "../Services/EmployeeServices";

export const EmployeeDbContext = createContext(null);

export function EmployeeDbProvider({children}){
    const [db, setDb] = useState(null);
    const [dbLoading, setDbLoading] = useState(false);
    const [dbErr, setDbErr] = useState(null);
    function refreshDb(){
        setDbLoading(true);
        setDbErr(false);
        fetchEmployeesDb()
        .then(response => {
            setDb(response.data);
            setDbErr(null);
        })
        .catch(err => {
            setDb(null);
            setDbErr(err);
            console.log(err);
        })
        .finally(()=>{
            setDbLoading(false);
        });
    }
    
    return(
        <EmployeeDbContext.Provider value={{db, dbLoading, dbErr, refreshDb}}>
            {children}
        </EmployeeDbContext.Provider>
    );
}