import axios from "@/axios/api.request.js"

//用户登录
export const login = data =>{
    return axios.request({
        url:"user/login",
        method:"post",
        data:data
    })
}

//获取用户的权限
export const getPermission = () =>{
    return axios.request({
        url:"user/getPermission",
        method:"post",
        data:null
    })
}