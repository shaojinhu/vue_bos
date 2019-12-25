import axios from "@/axios/api.request.js"

//获得快递员列表，启用的
export const getCourierList = data =>{
    return axios.request({
        url:"courier/getCourierList",
        method:"post",
        data:data
    })
}

//添加快递员
export const addCourier = data =>{
    return axios.request({
        url:"courier/addCourier",
        method:"post",
        data:data
    })
} 

//修改快递员
export const updateCourier = data =>{
    return axios.request({
        url:"courier/updateCourier",
        method:"put",
        data:data
    })
}

//禁用快递员
export const revCourier = data =>{
    return axios.request({
        url:"courier/revCourier",
        method:"put",
        data:data
    })
}

//批量修改快递员信息
export const batchCourier = data =>{
    return axios.request({
        url:"courier/batchCourier",
        method:"put",
        data:data
    })
}

//获取全部快递员id
export const getCourierID = () =>{
    return axios.request({
        url:"courier/getCourierID",
        method:"post",
        data:null
    })
}
