import axios from "@/axios/api.request.js"

//获得分区列表
export const getSubAreaList = data =>{
    return axios.request({
        url:"subArea/getSubAreaList",
        method:"post",
        data:data
    })
}

//添加分区
export const addSubArea = data =>{
    return axios.request({
        url:"subArea/addSubArea",
        method:"post",
        data:data
    })
}

//修改分区
export const updateSubArea = data =>{
    return axios.request({
        url:"subArea/updateSubArea",
        method:"put",
        data:data
    })
}

//删除分区
export const deleteSubArea = data =>{
    return axios.request({
        url:"subArea/deleteSubArea",
        method:"delete",
        data:data
    })
}

//关联快递员
export const releCourierAndSubArea = data =>{
    return axios.request({
        url:"subArea/releCourierAndSubArea",
        method:"put",
        data:data
    })
}

//导出分区表
export const exportSubArea = data =>{
    return axios.request({
        url:"subArea/exportSubArea",
        method:"post",
        data:{list:data.list,title:data.title},
        responseType:"blob"    
    })
}