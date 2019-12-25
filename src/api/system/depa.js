import axios from "@/axios/api.request.js"

//获取全部部门
export const getDepa = () =>{
    return axios.request({
        url:"depa/getDepa",
        method:"get",
        data:null
    })
}

//添加部门
export const addDepa = data =>{
    return axios.request({
        url:"depa/addDepa",
        method:"post",
        data:data
    })
}

//修改部门
export const updateDepa = data =>{
    return axios.request({
        url:"depa/updateDepa",
        method:"put",
        data:data
    })
}

//删除部门
export const deleteDepa = data =>{
    return axios.request({
        url:"depa/deleteDepa",
        method:"delete",
        data:data
    })
}