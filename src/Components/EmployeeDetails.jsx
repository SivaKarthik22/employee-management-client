import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchEmployeeById } from "../Services/EmployeeServices";
import { deleteEmployeeFromDb } from "../Services/EmployeeServices";
import { EmployeeDbContext } from "./EmployeeDbContext";

function EmployeeDetails(){
    const {id} = useParams();
    const [employeeData, setEmployeeData] = useState(undefined);
    const navigator = useNavigate();
    const {refreshDb} = useContext(EmployeeDbContext);

    useEffect(()=>{
        setEmployeeData(undefined);
        fetchEmployeeById(id)
        .then(response => {
            setEmployeeData(response.data);
        })
        .catch(err=>{
            console.log(err);
            setEmployeeData(null);
        });
    }, [id]);

    function handleDelete(id){
        deleteEmployeeFromDb(id)
        .then(()=>{
            refreshDb();
            navigator('/');
        })
        .catch(console.log);
    }

    return( employeeData && (
        <div className="container p-5 border-1 border-cyan-900 rounded-lg bg-cyan-950/20 relative overflow-hidden">
            <div className="flex justify-between items-center mb-8">
                <p className="text-lg">
                    Employee Details
                </p>
                <button>
                    <Link to='/'>
                        <i className="fa-solid fa-xmark opacity-75 px-2 text-lg"></i>
                    </Link>
                </button>
            </div>
            
            <table className="w-full">
                <tr>
                    <td className="p-2">Employee Id: </td>
                    <td className="p-2">{employeeData.id}</td>
                </tr>
                <tr>
                    <td className="p-2">First name: </td>
                    <td className="p-2">{employeeData.firstName}</td>
                </tr>
                <tr>
                    <td className="p-2">Last name: </td>
                    <td className="p-2">{employeeData.lastName}</td>
                </tr>
                <tr>
                    <td className="p-2">Email: </td>
                    <td className="p-2">{employeeData.email}</td>
                </tr>
                <tr>
                    <td className="p-2">Phone no.: </td>
                    <td className="p-2">{employeeData.phone}</td>
                </tr>
                <tr>
                    <td className="p-2">Title</td>
                    <td className="p-2">{employeeData.jobTitle}</td>
                </tr>
                <tr>
                    <td className="p-2">Department: </td>
                    <td className="p-2">{employeeData.department}</td>
                </tr>
                <tr>
                    <td className="p-2">Location: </td>
                    <td className="p-2">{employeeData.location}</td>
                </tr>
                <tr>
                    <td className="p-2">Start Date: </td>
                    <td className="p-2">{employeeData.startDate}</td>
                </tr>
                <tr>
                    <td className="p-2">Salary: </td>
                    <td className="p-2">{employeeData.salary}</td>
                </tr>
            </table>
                
            <div className="flex gap-3 mt-10">
                <button
                    className="py-2 px-5 rounded-lg border-2 border-cyan-700 text-cyan-500 w-1/2 hover:bg-cyan-700/25 hover:text-cyan-400"
                    onClick={()=>{handleDelete(id)}}
                >
                    Delete
                </button>
                <button
                    className="py-2 px-5 rounded-lg border-2 border-cyan-700 text-cyan-500 w-1/2 hover:bg-cyan-700/25 hover:text-cyan-400"
                    onClick={()=>{
                        navigator(`/update-employee/${id}`);
                    }}
                >
                    Edit
                </button>
            </div>
        </div>
    ));
}

export default EmployeeDetails;

