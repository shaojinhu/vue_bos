import axios from "@/axios/api.request.js"
import vueaxios from "axios"

//获取user列表
export const getUserList = data =>{
    return axios.request({
        url:"user/getUserList",
        method:"post",
        data:data
    })
}

//添加user
export const addUser = data=>{
    return axios.request({
        url:"user/addUser",
        method:"post",
        data:data
    })
}

//修改user
export const updateUser = data =>{
    return axios.request({
        url:"user/updateUser",
        method:"put",
        data:data
    })
}

//删除user
export const deleteUser =data =>{
    return axios.request({
        url:"user/deleteUser",
        method:"delete",
        data:data
    })    
}

//修改密码发送验证码
export const sendMailNumber = data =>{
    return axios.request({
        url:`user/sendMailNumber/${data.mail}/${data.username}`,
        method:"get",
        data:null
    })
}

//邮箱验证码重置密码
export const updatePasswrodByNumber = data =>{
    // return axios.request({
    //     url:"user/updatePasswrodByNumber",
    //     method:"post",
    //     data:data
    // })
    return vueaxios({
            url:" http://localhost:9001/user/updatePasswordByNumber",
            method:"post",
            data:data
        });
}

//登录后进行修改密码
export const updatePassword = data =>{
    return axios.request({
        url:"user/updatePassword",
        method:"post",
        data:data
    })
}