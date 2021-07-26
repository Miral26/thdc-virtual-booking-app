import axios from "axios";

export async function signIn(data) {
    return axios.post('auth/login/publicAPI/', data)
}

export async function signUp(data) {
    return axios.post('auth/register/publicAPI/', data)
}
