import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

function setAuthToken(token) {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
        delete api.defaults.headers.common["Authorization"]
    }
}

const savedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null
if (savedToken) {
    setAuthToken(savedToken)
}

export async function register({ username, email, password }) {

    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        if (response.data?.token) {
            localStorage.setItem("token", response.data.token)
            setAuthToken(response.data.token)
        }

        return response.data

    } catch (err) {

        console.log(err)

    }

}

export async function login({ email, password }) {

    try {

        const response = await api.post("/api/auth/login", {
            email, password
        })

        if (response.data?.token) {
            localStorage.setItem("token", response.data.token)
            setAuthToken(response.data.token)
        }

        return response.data

    } catch (err) {
        console.log(err)
    }

}

export async function logout() {
    try {

        const response = await api.get("/api/auth/logout")
        localStorage.removeItem("token")
        setAuthToken(null)
        return response.data

    } catch (err) {

    }
}

export async function getMe() {

    try {

        const response = await api.get("/api/auth/get-me")

        return response.data

    } catch (err) {
        if (err.response?.status === 401) {
            return null
        }
        console.log(err)
    }

}