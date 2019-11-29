//用于处理coookies的js
import Cookies from "js-cookie"

//定义cookie的存活时间,为1天
const cookieExpires = 1;
//定义cookie中存放token的key
const tokenKey = "token";

//定义cookie中token的存与拿
export const getToken = () =>{   //获取cookie中的token
    let token =  Cookies.get(tokenKey);
    if(token == null){
        token = null;
    }
    return token;
}
//设置Token
export const setToken = (token) =>{  //设置cookie中的token
    Cookies.set(tokenKey,token,cookieExpires);
}
//清空Cookies
export const clearToken = () =>{
    Cookies.remove(tokenKey);
}