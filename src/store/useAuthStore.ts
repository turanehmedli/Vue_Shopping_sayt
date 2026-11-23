import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuth = defineStore('auth', ()=> {
    const token = ref<string | null>(null)

    const isAuthenticated = computed(()=> !!token.value)

    const setToken = (newToken:string) =>{
        token.value = newToken
    }

    const logout = ()=>{
        token.value = null
    }

    return{
        token,
        isAuthenticated,
        setToken,
        logout,
    }
},
{
    persist:true
})
