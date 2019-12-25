import axios from "@/axios/api.request.js"

//获得取派标准列表有分页
export const getStandardList = data =>{
    return axios.request({
        url:"standard/getStandardList",
        method:"post",
        data:data
    })
}

//获得全部的取派标准
export const getStandard = () =>{
    return axios.request({
        url:"standard/getStandard",
        method:"get",
        data:null
    })
}

//添加取派标准
export const addStandard = data =>{
    return axios.request({
        url:"standard/addStandard",
        method:"post",
        data:data
    })
}

//修改取派标准
export const updateStandard = data =>{
    return axios.request({
        url:"standard/updateStandard",
        method:"put",
        data:data
    })
}

//删除取派标准
export const deleteStandard = data =>{
    return axios.request({
        url:"standard/deleteStandard",
        method:"delete",
        data:data
    })
}