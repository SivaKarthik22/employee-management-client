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
                <table className="container w-full rounded-md overflow-hidden">
                    <thead>
                        <tr className="border-b-2 border-cyan-900 bg-cyan-950/40">
                            <th className="p-4 text-center">
                                Emp. Id
                            </th>
                            <th className="p-4 text-left">
                                Employee Name
                            </th>
                            <th className="p-4 text-left">
                                E-mail
                            </th>
                            <th className="p-4 text-center">
                                Update
                            </th>
                            <th className="p-4 text-center">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {db.map(employeeObj => (
                            <tr key={employeeObj.id} className="border-t-1 border-cyan-900/50">
                                <td className="p-3 text-center w-[12%]">
                                    {employeeObj.id}
                                </td>
                                <td className="p-3 w-[30%]">
                                    {`${employeeObj.firstName} ${employeeObj.lastName}`}
                                </td>
                                <td className="p-3 w-[33%] font-light">
                                    {employeeObj.email}
                                </td>
                                <td className="p-3 text-center w-[12%]">
                                    <Link to={`/update-employee/${employeeObj.id}`}>
                                        <button className="fa-solid fa-pen-to-square opacity-75"></button>
                                    </Link>
                                </td>
                                <td className="p-3 text-center w-[12%]">
                                    <button className="fa-solid fa-trash opacity-75"></button>
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