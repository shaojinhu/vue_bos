import axios from "@/axios/api.request.js"

//获得父档案列表并分页
export const getParentList = data =>{
    return axios.request({
        url:"archive/getParentList",
        method:"post",
        data:data
    })
}

//添加父档案
export const addParentArchive = data =>{
    return axios.request({
        url:"archive/addParentArchive",
        method:"post",
        data:data
    })
}

//修改父档案
export const updateParentArchive = data =>{
    return axios.request({
        url:"archive/updateParentArchive",
        method:"put",
        data:data
    })
}