import axios from "@/axios/api.request.js"

//获得定区列表，有分页
export const getAreaList = data =>{
    return axios.request({
        url:"area/getAreaList",
        method:"post",
        data:data
    })
}

//获得全部的定区，无分页
export const getArea = () =>{
    return axios.request({
        url:"area/getAreaAll",
        method:"get",
        data:null
    })
}

//添加area
export const addArea = data =>{
    return axios.request({
        url:"area/addArea",
        method:"post",
        data:data
    })
}

//修改area
export const updateArea = data =>{
    return axios.request({
        url:"area/updateArea",
        method:"put",
        data:data
    })
}

//删除area
export const deleteArea = data =>{
    return axios.request({
        url:"area/deleteArea",
        method:"delete",
        data:data
    })
}