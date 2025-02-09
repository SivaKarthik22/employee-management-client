import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeDbContext } from "./EmployeeDbContext";

function EmployeesTable(){
    const {db, dbLoading, dbErr, refreshDb} = useContext(EmployeeDbContext);
    const navigator = useNavigate();

    useEffect(()=>{
        refreshDb();
    },[]);

    return(
        <div className="container p-5 border-1 border-cyan-900 rounded-lg bg-cyan-950/20 h-auto">
            {dbLoading && (
                <h3 className="text-center opacity-75">
                    <i className="fa-solid fa-spinner text-2xl mr-3"></i>
                    <span className="text-xl">Loading Employees data</span>
                </h3>
            )}
            {dbErr && (
                <h3 className="text-center opacity-75">
                    <i className="fa-solid fa-triangle-exclamation text-xl mr-3"></i>
                    <span className="text-xl">Error loading Employees data</span>
                </h3>
            )}
            {db && (
                <table className="container rounded-md overflow-hidden">
                    <thead>
                        <tr className="border-b-2 border-cyan-900 bg-cyan-950/40">
                            <th className="py-4 px-3 text-center">
                                Emp. Id
                            </th>
                            <th className="py-4 px-3 text-left">
                                Employee Name
                            </th>
                            <th className="py-4 px-3 text-left">
                                E-mail
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {db.map(employeeObj => (
                            <tr 
                                key={employeeObj.id}
                                className="border-t-1 border-cyan-900/50 cursor-pointer hover:bg-cyan-700/25"
                                onClick={()=>{
                                    navigator(`/employees/${employeeObj.id}`);
                                }}
                            >
                                <td className="p-3 text-center">
                                    {employeeObj.id}
                                </td>
                                <td className="p-3">
                                    {`${employeeObj.firstName} ${employeeObj.lastName}`}
                                </td>
                                <td className="p-3 font-light">
                                    {employeeObj.email}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default EmployeesTable;