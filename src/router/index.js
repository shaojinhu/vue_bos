import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import { getToken } from "@/utils/cookies.js"
import localDB from "@/utils/localStorage.js"

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})


//全局守卫
router.beforeEach((to,from,next)=>{
  //进行验证权限

  const permission = localDB.takePermission();
  const token = getToken();
  //console.log(to.name,!token);
  console.log(!permission);
  if(to.name == "login" && !token){
    console.log("2")
      next(true);
  }else if(to.name == "login" && token!=null){
    console.log("3")
      next({name:"home"});
  }else if(to.name != "login" && !token){
      console.log("4")
      next({name:"login"})
  }else if(permission == null || !token){
      console.log("5")
      next({name:"login"})
  }else{
    next(true);
  }
})

export default router
