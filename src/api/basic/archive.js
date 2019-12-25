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

//删除父档案
export const deletePerentArchive = data =>{
    return axios.request({
        url:"archive/deleteParentArchive",
        method:"delete",
        data:data
    })
}

//根据父档案查看子档案
export const getSubArchiveByParentId = data =>{
    return axios.request({
        url:"archive/getSubArchiveByParentId",
        method:'post',
        data:data
    })
}

//添加子档案
export const addSubArchive = data =>{
    return axios.request({
        url:"archive/addSubArchive",
        method:"post",
        data:data
    })
}

//修改子档案
export const updateSubArchive = data =>{
    return axios.request({
        url:"archive/updateSubArchive",
        method:"put",
        data:data
    })
}

//删除子档案
export const deleteSubArchive = data =>{
    return axios.request({
        url:"archive/deleteSubArchive",
        method:"delete",
        data:data
    })
}