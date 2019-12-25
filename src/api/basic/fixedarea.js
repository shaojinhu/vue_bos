import axios from "@/axios/api.request.js"

//获取定区列表，有分页
export const getFixedAreaList = data =>{
    return axios.request({
        url:"fixedarea/getFixedAreaList",
        method:"post",
        data:data
    })
}

//添加定区
export const addFixedArea = data =>{
    return axios.request({
        url:"fixedarea/addFixedArea",
        method:"post",
        data:data
    })
}

//修改定区
export const updateFixedArea = data =>{
    return axios.request({
        url:"fixedarea/updateFixedArea",
        method:"put",
        data:data
    })
}

//删除定区
export const deleteFixedArea = data =>{
    return axios.request({
        url:"fixedarea/deleteFixedArea",
        method:"delete",
        data:data
    })
}

//根据区域ID获取定区
export const getFixedAreaByAreaId = data =>{
    return axios.request({
        url:`fixedarea/getFixedAreaByAreaId/${data}`,
        method:"get",
        data:null
    })
}