import axios from "@/axios/api.request.js"

//获取role列表
export const getRoleList = data =>{
    return axios.request({
        url:"role/getRoleList",
        method:"post",
        data:data
    })
}

//获得全部的角色
export const getRole = () =>{
    return axios.request({
        url:"role/getRole",
        method:"get",
        data:null
    })
}

//添加role
export const addRole = data =>{
    return axios.request({
        url:"role/addRole",
        method:"post",
        data:data
    })
}

//修改role
export const updateRole = data =>{
    return axios.request({
        url:"role/updateRole",
        method:"put",
        data:data
    })
}

//删除role
export const deleteRole = data =>{
    return axios.request({
        url:"role/deleteRole",
        method:"delete",
        data:data
    })
}