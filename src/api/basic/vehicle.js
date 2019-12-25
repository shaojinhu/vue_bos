import axios from "@/axios/api.request.js"

//获取车辆管理列表，有分页
export const getVehicleList = data =>{
    return axios.request({
        url:"vehicle/getVehicleList",
        method:"post",
        data:data
    })
}

//添加车辆管理
export const addVehicle = data =>{
    return axios.request({
        url:"vehicle/addVehicle",
        method:"post",
        data:data
    })
}

//修改车辆管理
export const updateVehicle = data =>{
    return axios.request({
        url:"vehicle/updateVehicle",
        method:"put",
        data:data
    })
}

//删除车辆管理
export const deleteVehicle = data =>{
    return axios.request({
        url:"vehicle/deleteVehicle",
        method:"delete",
        data:data
    })
}

