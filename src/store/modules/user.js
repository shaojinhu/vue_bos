//导入cookies.js中设置token的方法
import {getToken,setToken} from '@/utils/cookies.js'
//导入登录、获取用户权限方法
import {login,getPermission} from "@/api/public/login.js"
//导入localStorage
import localDB from "@/utils/localStorage.js"

//定义vuex中的state
const state = {
    token : getToken(),
    permission:localDB.takePermission()  //权限
}

//定义vuex中的actions，相当于方法区，提供给外部使用
const actions = {
    //定义登录的方法
    actionsLogin({commit},{username,password}){
        return new Promise((resolve,reject)=>{
            login({username,password}).then(res=>{
                if(res.data.code == 10000){
                    let token = res.data.data;
                    commit("SET_TOKEN",token);
                    resolve(res);
                }else{
                    resolve(res);
                }
            }).catch(res=>{
                reject(res)
                //ElementUI.Message.error(res.data.msg);
            })
        })
    },
    //定义获取用户权限的方法
    actionsPermission({commit}){
        return new Promise((resolve,reject)=>{
            getPermission().then(res=>{
                if(res.data.code == 10000){
                    let permission = res.data.data;
                    commit("SET_PERMISSION",permission);
                    resolve(res);
                }
            }).catch(res=>{
                //ElementUI.Message.error(res.data.msg);
                reject(res)}
            )
        })
    }
}

//定义vuex中的mutations，用于修改state中的值，提供给actions中进行使用
const mutations = {
    SET_TOKEN(state,token){
        state.token = token;
        setToken(token);
    },
    SET_PERMISSION(state,permission){
        state.permission = permission;
        localDB.savePermission(permission);
    }
}

//定义vuex中的getters，可以获取state中的值，相当于计算属性
const getters = {

}

export default {
    state,
    actions,
    mutations,
    getters
}