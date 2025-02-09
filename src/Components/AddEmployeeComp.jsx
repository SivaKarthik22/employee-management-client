import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { createEmployeeInDb } from "../Services/EmployeeServices";
import { useNavigate } from "react-router-dom";
import { EmployeeDbContext } from "./EmployeeDbContext";

function AddEmployeeComp() {
    const [inputValues, setInputValues] = useState({firstName:"", lastName:"", email:""});
    const [formValidity, setFormValidity] = useState(true);
    const {refreshDb} = useContext(EmployeeDbContext);
    const navigator = useNavigate();

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
        else{
            createEmployeeInDb(inputValues)
            .then(response => {
                console.log(response.data);
                refreshDb();
                navigator("/");
            })
            .catch(err =>{
                console.log(err);
                setInputValues({firstName:"", lastName:"", email:""});
            });
        }
    }

    return(
        <div className="container p-5 border-1 border-cyan-900 rounded-lg bg-cyan-950/20">
            <div className="flex justify-between items-center mb-6">
                <p className="text-lg">New Employee</p>
                <Link to='/'>
                    <button>
                        <i className="fa-solid fa-xmark opacity-75 px-2 text-lg"></i>
                    </button>
                </Link>
            </div>
            <form className="flex flex-col p-2 ">
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
                    >Submit
                    </button>
                </div>
            </form>
            <p className="text-sm italic mt-2">
                fields with * are mandatory
            </p>
        </div>
    );
}

export default AddEmployeeComp;