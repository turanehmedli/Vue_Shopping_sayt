import { pinia } from "@/store/pinia";
import { useAuth } from "@/store/useAuthStore";
import axios from "axios";


const api = axios.create({
    baseURL:'https://dummyjson.com',
    timeout:1000,
})

api.interceptors.request.use((config)=>{
    const auth = useAuth(pinia)

    if(auth.token){
        config.headers.Authorization = `Bearer ${auth.token}`
    }

    return config
})

export default api