import { useEffect, useState } from "react";
import { fetchEmployeesDb } from "../Services/EmployeeServices";

function EmployeesTable(){
    const[db, setDb] = useState([]);

    useEffect(()=>{
        fetchEmployeesDb()
        .then(response => {
            setDb(response.data);
        })
        .catch(console.log);
    },[]);

    return(
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
    );
}

export default EmployeesTable;