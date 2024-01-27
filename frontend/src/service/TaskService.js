import { postAPICall, getAPICall, putAPICall, deleteAPICall } from "./ApiService";

const baseURL = "http://localhost:8080";

export async function addTask(task, token) {
    return postAPICall("/tasks", task, baseURL, token)
}

export async function putTask(id, updatedTask, token) {
    console.log("ID2=",id)
    return putAPICall(`/tasks/${id}`, updatedTask, baseURL, token)
}

export async function getTasks(id, token) {
    return getAPICall(`/tasks/users/${id}`, baseURL, token)
}

export async function deleteTask(id, token){
    return deleteAPICall(`/tasks/${id}`,baseURL, token)
}
