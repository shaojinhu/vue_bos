// import axios from "axios"
import axios from "@/axios/api.request.js"

//退出登录
export const Logout = () =>{
    //axios.get("/logout")
    return axios.request({
        url:"/logout",
        method:"get",
        data:null
    })
}