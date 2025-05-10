import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createEmployeeInDb, fetchEmployeeById, updateEmployeeInDb } from "../Services/EmployeeServices";
import { useNavigate } from "react-router-dom";
import { EmployeeDbContext } from "./EmployeeDbContext";

function AddOrUpdateComp() {
    const requiredFields = ["firstName","lastName","email","phone"];
    const fields = ["firstName","lastName","email","phone","jobTitle","department","startDate","location","salary"];
    function createInputValuesObj(existingValuesObj){
        const obj = {};
        for(let field of fields){
            obj[field] = (existingValuesObj ? existingValuesObj[field] : "");
        }
        return obj;
        //return {firstName:"",lastName:"",email:"",phone:"",jobTitle:"",department:"",startDate:"",location:"",salary:""};
    }

    const [inputValues, setInputValues] = useState(createInputValuesObj());
    const [formValidity, setFormValidity] = useState(true);
    const [status, setStatus] = useState(null);
    const {id} = useParams();
    const {refreshDb, locations, departments} = useContext(EmployeeDbContext);
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
                //console.log(response.data);
                setInputValues( createInputValuesObj(response.data) );
            })
            .catch(console.log);
        }
    },[id]);

    function handleChange(event) {
        setInputValues({...inputValues, [event.target.id]: event.target.value});
    }

    function checkFormValidity(){
        for(let field of requiredFields){
            if(inputValues[field] == ""){
                setFormValidity(false);
                return false;
            }
        }
        setFormValidity(true);
        return true;
    }

    function handleSubmit(event){
        event.preventDefault();
        if(!checkFormValidity())
            return;
        
        setStatus("loading");

        if(id){
            updateEmployeeInDb(id, inputValues)
            .then(response => {
                //console.log(response.data);
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
                //console.log(response.data);
                setStatus("success");
            })
            .catch(err =>{
                console.log(err);
                setInputValues(createInputValuesObj());
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
                        <label htmlFor="id" className="mb-3"><p>Employee Id:</p></label>
                        <input
                            className="py-2 px-3 border-1 border-cyan-900 rounded-md bg-cyan-950/50 mb-4 opacity-50"
                            id="id"
                            value={id}
                            disabled
                        />
                    </>
                )}

                <FormField id="firstName" type="text" label="Employee First Name*" valueState={inputValues}
                    handleChange={handleChange} formValidity={formValidity} requiredFields={requiredFields}>    
                </FormField>
                <FormField id="lastName" type="text" label="Employee Last Name*" valueState={inputValues}
                    handleChange={handleChange} formValidity={formValidity} requiredFields={requiredFields}>    
                </FormField>
                <FormField id="email" type="email" label="Official e-mail*" valueState={inputValues}
                    handleChange={handleChange} formValidity={formValidity} requiredFields={requiredFields}>    
                </FormField>
                <FormField id="phone" type="number" label="Phone No.*" valueState={inputValues}
                    handleChange={handleChange} formValidity={formValidity} requiredFields={requiredFields}>    
                </FormField>
                <FormField id="jobTitle" type="text" label="Job Title" valueState={inputValues}
                    handleChange={handleChange} formValidity={formValidity} requiredFields={requiredFields}>    
                </FormField>
                <DropDown id="department" options={departments}
                    label="Department" valueState={inputValues}
                    handleChange={handleChange} formValidity={formValidity} requiredFields={requiredFields}>
                </DropDown>
                <DropDown id="location" options={locations}
                    label="Work Location" valueState={inputValues}
                    handleChange={handleChange} formValidity={formValidity} requiredFields={requiredFields}>
                </DropDown>
                <FormField id="startDate" type="date" label="Start Date" valueState={inputValues}
                    handleChange={handleChange} formValidity={formValidity} requiredFields={requiredFields}>    
                </FormField>
                <FormField id="salary" type="number" label="Annual Salary" valueState={inputValues}
                    handleChange={handleChange} formValidity={formValidity} requiredFields={requiredFields}>    
                </FormField>

                <div className="flex justify-end gap-3 pt-3">
                    <Link to='/'>
                        <button className="py-2 px-5 rounded-lg border-2 border-cyan-700 text-cyan-500 hover:bg-cyan-700/25 hover:text-cyan-400">
                            Cancel
                        </button>
                    </Link>
                    <button
                        className="py-2 px-5 rounded-lg bg-cyan-700 hover:bg-cyan-600"
                        onClick={handleSubmit}
                    >
                        {id ? "Update" : "Submit"}
                    </button>
                </div>
            </form>

            <p className="text-sm italic mt-2">
                fields with * are mandatory
            </p>

            {status && <StatusDisplay id={id} status={status}/>}
        </div>
    );
}

export default AddOrUpdateComp;

function StatusDisplay({id, status}){
    return(
        <div className="w-full h-full absolute top-0 left-0 bg-cyan-800 flex justify-center items-center flex-col gap-5">
            {status == "loading" && (<>
                <p className="text-6xl">
                    <i className="fa-solid fa-spinner"></i>
                </p>
                <p className="text-lg">
                    {id ? "Updating Employee..." : "Creating Employee..."}
                </p>
            </>)}
            {status == "success" && (<>
                <p className="text-6xl">
                    <i className="fa-solid fa-check"></i>
                </p>
                <p className="text-lg">
                    {id ? "Employee updated" : "New Employee added"}
                </p>
            </>)}
            {status == "fail" && (<>
                <p className="text-lg">
                    {id ? "Failed to update Employee" : "Failed to create new Employee"}
                </p>
                <p className="text-6xl">
                    <i className="fa-solid fa-xmark"></i>
                </p>
                <p className="text-lg">Please try again later</p>
            </>)}
        </div>
    );
}

function FormField({id, type, label, valueState, handleChange, formValidity, requiredFields}){
    return(
        <>
            <label htmlFor={id} className="mb-3 block flex justify-between items-end">
                <p>{label}</p>
                {requiredFields.includes(id) && !formValidity && valueState[id]=="" && <p className="text-sm text-cyan-500">This information is required!</p>}
            </label>
            <input 
                className="py-2 px-3 border-1 border-cyan-900 rounded-md bg-cyan-950/50 mb-4"
                id={id}
                type={type}
                value={valueState[id]}
                onChange={handleChange}
            />
        </>
    );
}
function DropDown({id, options, label, valueState, handleChange, formValidity, requiredFields}){
    return(
        <>
            <label htmlFor={id} className="mb-3 block flex justify-between items-end">
                <p>{label}</p>
                {requiredFields.includes(id) && !formValidity && valueState[id]=="" && <p className="text-sm text-cyan-500">This information is required!</p>}
            </label>
            <select
                className="py-2 px-3 border-1 border-cyan-900 rounded-md bg-cyan-950/50 mb-4"
                id={id}
                onChange={handleChange}
                defaultValue={valueState[id]}
            >
                <option value="" disabled hidden>
                    Select {label}
                </option>
                {options.map((option,index) => {
                    if(option == valueState[id]){
                        return (
                            <option key={index} value={option} selected>
                                {option}
                            </option>
                        );
                    } 
                    return (
                        <option key={index} value={option} >
                            {option}
                        </option>
                    );
                })}
            </select>
        </>
    );
}