import index from '../views/public/index.vue'  //首页
import login from '../views/public/login.vue'  //登录

export default [
    {
      path: '/index',
      name: 'index',
      component: index,
      meta:{
        hideInMenu:false,
      },
      children:[
        {
          path:"/home",
          name:"home",
          component:()=>import("@/views/public/home"),
          meta:{
            hideInMenu:false,
          }
        }
      ]
    },
    {
      path: '/',
      name: 'login',
      component: login,
      meta:{
        hideInMenu:false,
      }
    },
    // 基础数据
    {
      path: '/basicdata',
      name: 'basicdata',
      component: index,
      meta:{
          icon:"el-icon-s-data",
          title:'基础数据',
          hideInMenu:true,
      },
      children:[
        {
          path: '/basicdata/BasicFileSettings',
          name: 'BasicFileSettings',
          component: ()=>import("@/views/basicdata/BasicFileSettings"),
          meta:{
              title:'基础档案管理',
              hideInMenu:true,
          }
        },
        {
          path: '/basicdata/SendStandard',
          name: 'SendStandard',
          component: ()=>import("@/views/basicdata/SendStandard"),
          meta:{
              title:'取派标准',
              hideInMenu:true,
          }
        },
        {
          path: '/basicdata/ShuttleBusManagement',
          name: 'ShuttleBusManagement',
          component: ()=>import("@/views/basicdata/ShuttleBusManagement"),
          meta:{
              title:'班车管理',
              hideInMenu:true,
          }
        },
        {
          path: '/basicdata/CourierSettings',
          name: 'CourierSettings',
          component: ()=>import("@/views/basicdata/CourierSettings"),
          meta:{
              title:'快递员设置',
              hideInMenu:true,
          }
        },
        {
          path: '/basicdata/pageRange',
          name: 'pageRange',
          component: ()=>import("@/views/basicdata/pageRange"),
          meta:{
              title:'区域设置',
              hideInMenu:true,
          }
        },
        {
          path: '/basicdata/ManagementDivision',
          name: 'ManagementDivision',
          component: ()=>import("@/views/basicdata/ManagementDivision"),
          meta:{
              title:'管理分区',
              hideInMenu:true,
          }
        },
        {
          path: '/basicdata/ManagementOfFixedArea',
          name: 'ManagementOfFixedArea',
          component: ()=>import("@/views/basicdata/ManagementOfFixedArea"),
          meta:{
              title:'管理定区',
              hideInMenu:true,
          }
        },
        {
          path: '/basicdata/CollectTimeManagement',
          name: 'CollectTimeManagement',
          component: ()=>import("@/views/basicdata/CollectTimeManagement"),
          meta:{
              title:'收派时间管理',
              hideInMenu:true,
          }
        },
      ]
    },
    //受理
    {
      path: '/acceptHear',
      name: 'acceptHear',
      component: index,
      meta:{
          icon:"el-icon-s-goods",
          title:'受理',
          hideInMenu:true,
      },
      children:[
        {
          path: '/acceptHear/order',
          name: 'order',
          component: ()=>import("@/views/acceptHear/order.vue"),
          meta:{
              icon:"el-icon-location",
              title:'订单',
              hideInMenu:true,
          },
        }
      ]
    },
    //调度
    {
      path: '/dispatch',
      name: 'dispatch',
      component: index,
      meta:{
          icon:"el-icon-s-help",
          title:'调度',
          hideInMenu:true,
      },
      children:[
        {
          path: '/dispatch/propagandaTask',
          name: 'propagandaTask',
          component: ()=>import("@/views/dispatch/propagandaTask.vue"),
          meta:{
              icon:"el-icon-location",
              title:'宣传任务',
              hideInMenu:true,
          },
        }
      ]
    },
    //分拣管理
    {
      path: '/sortingManagement',
      name: 'sortingManagement',
      component: index,
      meta:{
          icon:"el-icon-share",
          title:'分拣管理',
          hideInMenu:true,
      },
      children:[
        {
          path: '/sortingManagement/propagandaTask',
          name: 'courierPick',
          component: ()=>import("@/views/sortingManagement/courierPick.vue"),
          meta:{
              icon:"el-icon-location",
              title:'快递挑选',
              hideInMenu:true,
          },
        }
      ]
    },
    //系统管理
    {
      path: '/systemManagement',
      name: 'systemManagement',
      component: index,
      meta:{
          icon:"el-icon-s-tools",
          title:'系统管理',
          hideInMenu:true,
      },
      children:[
        {
          path: '/systemManagement/userManagement',
          name: 'userManagement',
          component: ()=>import("@/views/systemManagement/userManagement.vue"),
          meta:{
              icon:"el-icon-location",
              title:'用户管理',
              hideInMenu:true,
          },
        }
      ]
    },
  ]