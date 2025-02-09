import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createEmployeeInDb, fetchEmployeeById, updateEmployeeInDb } from "../Services/EmployeeServices";
import { useNavigate } from "react-router-dom";
import { EmployeeDbContext } from "./EmployeeDbContext";

function AddOrUpdateComp() {
    const [inputValues, setInputValues] = useState({firstName:"", lastName:"", email:""});
    const [formValidity, setFormValidity] = useState(true);
    const [status, setStatus] = useState(null);
    const {id} = useParams();
    const {refreshDb} = useContext(EmployeeDbContext);
    const navigator = useNavigate();

    useEffect(()=>{
        if(status == "success"){
            setTimeout(()=>{
                navigator('/');
                refreshDb();
            },500);
        }
        else if(status == "fail"){
            setTimeout(()=>{
                setStatus(null);
            },2000);
        }
    },[status]);

    useEffect(()=>{
        if(id){
            fetchEmployeeById(id)
            .then((response)=>{
                setInputValues(
                    {
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        email: response.data.email
                    }
                );
            })
            .catch(console.log);
        }
    },[]);

    function handleChange(event) {
        setInputValues({...inputValues, [event.target.id]: event.target.value});
    }

    function checkFormValidity(){
        if(inputValues.firstName == "" || inputValues.lastName == "" || inputValues.email == ""){
            setFormValidity(false);
            return false;
        }
        else{
            setFormValidity(true);
            return true;
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        if(!checkFormValidity())
            return;
        
        setStatus("loading");

        if(id){
            updateEmployeeInDb(id, inputValues)
            .then(response => {
                console.log(response.data);
                setStatus("success");
            })
            .catch(err =>{
                console.log(err);
                setStatus("fail");
            });
        }
        else{
            createEmployeeInDb(inputValues)
            .then(response => {
                console.log(response.data);
                setStatus("success");
            })
            .catch(err =>{
                console.log(err);
                setInputValues({firstName:"", lastName:"", email:""});
                setStatus("fail");
            });
        }
    }

    return(
        <div className="container p-5 border-1 border-cyan-900 rounded-lg bg-cyan-950/20 relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <p className="text-lg">
                    {id ? "Update Employee" : "New Employee"}
                </p>
                <Link to='/'>
                    <button>
                        <i className="fa-solid fa-xmark opacity-75 px-2 text-lg"></i>
                    </button>
                </Link>
            </div>
            <form className="flex flex-col p-2 ">
                {id && (
                    <>
                        <label htmlFor="empId" className="mb-3"><p>Employee Id:</p></label>
                        <input
                            className="py-2 px-3 border-1 border-cyan-900 rounded-md bg-cyan-950/50 mb-4 opacity-50"
                            id="empId"
                            value={id}
                            disabled
                        />
                    </>
                )}
                <label htmlFor="firstName" className="mb-3 block flex justify-between items-center">
                    <p>Employee first name*</p>
                    {!formValidity && inputValues.firstName=="" && <p className="text-sm text-cyan-500">This information is required</p>}
                </label>
                <input
                    className="py-2 px-3 border-1 border-cyan-900 rounded-md bg-cyan-950/50 mb-4"
                    id="firstName"
                    type="text"
                    required
                    value={inputValues.firstName}
                    onChange={handleChange}
                />
                <label htmlFor="lastName" className="mb-3 block flex justify-between items-center">
                    <p>Employee last name*</p>
                    {!formValidity && inputValues.lastName=="" && <p className="text-sm text-cyan-500">This information is required</p>}
                </label>
                <input 
                    className="py-2 px-3 border-1 border-cyan-900 rounded-md bg-cyan-950/50 mb-4"
                    id="lastName"
                    type="text"
                    required
                    value={inputValues.lastName}
                    onChange={handleChange}
                />
                <label htmlFor="email" className="mb-3 block flex justify-between items-center">
                    <p>Employee e-mail*</p>
                    {!formValidity && inputValues.email=="" && <p className="text-sm text-cyan-500">This information is required</p>}
                </label>
                <input 
                    className="py-2 px-3 border-1 border-cyan-900 rounded-md bg-cyan-950/50 mb-4"
                    id="email"
                    type="email"
                    required
                    value={inputValues.email}
                    onChange={handleChange}
                />
                <div className="flex justify-end gap-3 pt-3">
                    <Link to='/'>
                        <button className="py-2 px-5 rounded-lg border-2 border-cyan-700 text-cyan-500">
                            Cancel
                        </button>
                    </Link>
                    <button
                        className="py-2 px-5 rounded-lg bg-cyan-700"
                        onClick={handleSubmit}
                    >
                        {id ? "Update" : "Submit"}
                    </button>
                </div>
            </form>
            <p className="text-sm italic mt-2">
                fields with * are mandatory
            </p>

            {status == "loading" && <EmployeeLoading id={id} />}
            {status == "success" && <EmployeeSuccess id={id}/>}
            {status == "fail" && <EmployeeFailed id={id}/>}
        </div>
    );
}

export default AddOrUpdateComp;

function EmployeeSuccess({id}){
    return(
        <div className="w-full h-full absolute top-0 left-0 bg-cyan-800 flex justify-center items-center flex-col gap-5">
            <p className="text-6xl">
                <i className="fa-solid fa-check"></i>
            </p>
            <p className="text-xl">
                {id ? "Employee updated" : "New Employee added"}
            </p>
        </div>
    );
}
function EmployeeFailed({id}){
    return(
        <div className="w-full h-full absolute top-0 left-0 bg-cyan-800 flex justify-center items-center flex-col gap-5">
            <p className="text-xl">
            {id ? "Failed to update Employee" : "Failed to create new Employee"}
            </p>
            <p className="text-6xl">
                <i className="fa-solid fa-xmark"></i>
            </p>
            <p className="text-xl">Please try again later</p>
        </div>
    );
}
function EmployeeLoading({id}){
    return(
        <div className="w-full h-full absolute top-0 left-0 bg-cyan-800 flex justify-center items-center flex-col gap-5">
            <p className="text-6xl">
                <i className="fa-solid fa-spinner"></i>
            </p>
            <p className="text-xl">
            {id ? "Updating Employee..." : "Creating Employee..."}
            </p>
        </div>
    );
}