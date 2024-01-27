import { postAPICall } from "./ApiService";

const baseURL = "http://localhost:5002";

export async function loginUser(loginData) {
    return postAPICall("/login", loginData, baseURL)
}

export async function registerUser(userData) {
    return postAPICall("/register", userData, baseURL);
}