import axios from "axios";

const REST_API_BASE_URL = "http://employee-management-server-production.up.railway.app/api/employees";

export function fetchAllEmployeesFromDb(){
    return axios.get(REST_API_BASE_URL);
}

export function createEmployeeInDb(employeeObj){
    return axios.post(REST_API_BASE_URL, employeeObj);
}

export function deleteEmployeeFromDb(id){
    return axios.delete(REST_API_BASE_URL + '/' + id);
}

export function fetchEmployeeById(id){
    return axios.get(REST_API_BASE_URL + '/' + id);
}

export function updateEmployeeInDb(id, employeeObj){
    return axios.put(REST_API_BASE_URL + '/' + id, employeeObj);
}

export function fetchEmployeeByFilter(filterObj){
    let queryUrl = REST_API_BASE_URL + '/search?';
    
    queryUrl += `name=${filterObj.filter.trim()}&`;
    
    if(filterObj.location != "")
        queryUrl += `location=${filterObj.location}&`;
    else
        queryUrl += `location=Coimbatore,Chennai,Bangalore,Delhi,Hyderabad&`;
    
    if(filterObj.department != "")
        queryUrl += `department=${filterObj.department}`;
    else
        queryUrl += `department=3D%20Studio,Tech%20Art,Platform,Digital%20Marketing,HR,Finance,Sales`;

    return axios.get(queryUrl);
}