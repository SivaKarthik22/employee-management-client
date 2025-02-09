import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/employees";

export function fetchEmployeesDb(){
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