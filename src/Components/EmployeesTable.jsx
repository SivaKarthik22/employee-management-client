import { useEffect, useState } from "react";
import { fetchEmployeesDb } from "../Services/EmployeeServices";
import { Link } from "react-router-dom";

function EmployeesTable(){
    const [db, setDb] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(()=>{
        fetchEmployeesDb()
        .then(response => {
            setDb(response.data);
            setLoading(false);
        })
        .catch(err => {
            setErrorMsg(err.message);
            setLoading(false);
        });
    },[]);

    return(
        <div className=" inline-block container p-5 border-1 border-cyan-900 rounded-lg bg-cyan-950/20 h-auto">
            {loading && <h3>Loading</h3>}
            {errorMsg && <h3>Error loading data</h3>}
            {db && (
                <div className="container flex flex-col">
                    <div className="border-b-1 border-cyan-900 bg-cyan-950/30 flex justify-between w-full font-bold mb-3 rounded-t-lg py-1">
                        <div className="p-3 text-center w-[12%]">
                            Emp. Id
                        </div>
                        <div className="p-3 text-left w-[30%]">
                            Employee Name
                        </div>
                        <div className="p-3 text-left w-[33%]">
                            E-mail
                        </div>
                        <div className="p-3 text-center w-[12%]">
                            Update
                        </div>
                        <div className="p-3 text-center w-[12%]">
                            Delete
                        </div>
                    </div>
                    {db.map(employeeObj => (
                        <div key={employeeObj.id} className="flex w-full justify-between">
                            <div className="p-3 text-center w-[12%]">
                                {employeeObj.id}
                            </div>
                            <div className="p-3 text-left w-[30%]">
                                {`${employeeObj.firstName} ${employeeObj.lastName}`}
                            </div>
                            <div className="p-3 text-left w-[33%] font-light">
                                {employeeObj.email}
                            </div>
                            <Link to={`/update-employee/${employeeObj.id}`}>
                                <div className="p-3 text-center w-[12%]">
                                    <button className="fa-solid fa-pen-to-square opacity-75"></button>
                                </div>
                            </Link>
                            <div className="p-3 text-center w-[12%]">
                                <button className="fa-solid fa-trash opacity-75"></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default EmployeesTable;