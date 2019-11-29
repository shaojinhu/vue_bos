let db = {
    //设置权限
    savePermission(permission){
        localStorage.setItem("permission",JSON.stringify(permission));
    },
    //获取权限
    takePermission(){
        return JSON.parse(localStorage.getItem("permission"));
    },
    //清空权限(只会在退出登录的时候使用)
    clearPermission(){
        localStorage.clear();
    }
}
export default db;