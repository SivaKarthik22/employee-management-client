import { useEffect, useState } from "react";
import { fetchEmployeesDb } from "../Services/EmployeeServices";

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
        <>
            {loading && <h3>Loading</h3>}
            {errorMsg && <h3>Error loading data</h3>}
            {db && (
                <table>
                    <thead>
                        <tr>
                            <th>
                                Employee Id
                            </th>
                            <th>
                                Employee Name
                            </th>
                            <th>
                                E-mail
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {db.map(employeeObj => (
                            <tr key={employeeObj.id}>
                                <td>
                                    {employeeObj.id}
                                </td>
                                <td>
                                    {`${employeeObj.firstName} ${employeeObj.lastName}`}
                                </td>
                                <td>
                                    {employeeObj.email}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default EmployeesTable;