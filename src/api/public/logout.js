import axios from "@/axios/api.request.js"

//退出登录
export const Logout = () =>{
    return axios.request({
        url:"user/logout",
        method:"post",
        data:null
    })
}