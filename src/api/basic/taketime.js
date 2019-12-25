import axios from "@/axios/api.request.js"

//获得收派时间管理列表有分页
export const getTakeTimeList = data =>{
    return axios.request({
        url:"taketime/getTakeTimeList",
        method:"post",
        data:data
    })
}

//添加收派时间管理
export const addTakeTime = data =>{
    return axios.request({
        url:"taketime/addTakeTime",
        method:"post",
        data:data
    })
}

//修改收派时间管理
export const updateTakeTime = data =>{
    return axios.request({
        url:"taketime/updateTakeTime",
        method:"put",
        data:data
    })
}

//启禁收派时间管理
export const revTakeTime = data =>{
    return axios.request({
        url:"taketime/revTakeTime",
        method:"put",
        data:data
    })
}

//获得全部的启用的收派时间
export const getStatusIsOk = () =>{
    return axios.request({
        url:"taketime/getStatusIsOk",
        method:"get",
        data:null
    })
}