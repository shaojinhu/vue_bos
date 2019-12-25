import axios from "@/axios/api.request.js"

//获取权限列表
export const getPermissionList = () =>{
    return axios.request({
        url:"permission/getPermissionList",
        method:"post",
        data:null
    })
}

//添加权限
export const addPermission = data =>{
    return axios.request({
        url:"permission/addPermission",
        method:"post",
        data:data
    })
}

//修改权限
export const updatePermission = data =>{
    return axios.request({
        url:"permission/updatePermission",
        method:"put",
        data:data
    })
}

//删除权限
export const deletePermission = data =>{
    return axios.request({
        url:"permission/deletePermission",
        method:"delete",
        data:data
    })
}