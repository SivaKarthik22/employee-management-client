import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/employees";

export function fetchEmployeesDb(){
    return axios.get(REST_API_BASE_URL);
}

export function createEmployeeInDb(employeeObj){
    return axios.post(REST_API_BASE_URL, employeeObj);
}