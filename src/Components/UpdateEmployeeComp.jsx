import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function UpdateEmployeeComp() {
    const {id} = useParams();
    const [inputValues, setInputValues] = useState({firstName:"", lastName:"", email:""});

    function handleChange(event) {
        setInputValues({...inputValues, [event.target.id]: event.target.value});
    }

    return(
        <div className="container p-5 border-1 border-cyan-900 rounded-lg bg-cyan-950/20">
            <div className="flex justify-between items-center mb-8">
                <p className="text-lg">Update Employee</p>
                <Link to='/'>
                    <button>
                        <i className="fa-solid fa-xmark opacity-75 px-2 text-lg"></i>
                    </button>
                </Link>
            </div>
            <form className="flex flex-col p-2 ">
                <label htmlFor="empId" className="mb-3"><p>Employee Id:</p></label>
                <input
                    className="py-2 px-3 border-1 border-cyan-900 rounded-md bg-cyan-950/50 mb-4 opacity-50"
                    id="empId"
                    value={id}
                    disabled
                />
                <label htmlFor="firstName" className="mb-3"><p>Employee first name:</p></label>
                <input
                    className="py-2 px-3 border-1 border-cyan-900 rounded-md bg-cyan-950/50 mb-4"
                    id="firstName"
                    type="text"
                    required
                    value={inputValues.firstName}
                    onChange={handleChange}
                />
                <label htmlFor="lastName" className="mb-3"><p>Employee last name:</p></label>
                <input 
                    className="py-2 px-3 border-1 border-cyan-900 rounded-md bg-cyan-950/50 mb-4"
                    id="lastName"
                    type="text"
                    required
                    value={inputValues.lastName}
                    onChange={handleChange}
                />
                <label htmlFor="email" className="mb-3"><p>Employee e-mail:</p></label>
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
                    <input
                        type="submit"
                        className="cursor-pointer py-2 px-5 rounded-lg bg-cyan-700"
                    />
                </div>
            </form>
        </div>
    );
}

export default UpdateEmployeeComp;