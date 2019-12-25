<template>
    <div>        
        <el-container style="height:100vh;">
            <el-header style="height:75px;background:#3A3B40;">
                <el-row>
                    <el-col :span="10">
                        <el-row>
                            <el-col :span="6">
                                <div class="logo"></div>
                                <span style="padding-left:10px;height:100%;line-height:75px;font-size:20px;font-family:'STCaiyun';color:#A98056;font-weight:bold;">BOS</span>
                            </el-col>
                            <el-col :span="12">
                                <el-tooltip content="展开或关闭菜单" placement="right">
                                    <!-- <el-button style="width:50px;backgroung:none;padding:0px;border:0px;" type="info"  plain  @click="isCloseOrOpen()"> -->
                                        <a href="javascript:;" style="color:white;text-decoration:none;height:30px;width:30px;" @click="isCloseOrOpen()">
                                            <i style="font-size:25px;" :class="isClass" ></i>
                                        </a>
                                    <!-- </el-button> -->
                                </el-tooltip>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="5" :push="9">
                        <el-row>
                            <el-col :span="4" :push="5">
                                <el-avatar style="margin-top:20px;margin-right:20px;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                            </el-col>
                            <el-col :span="5" :push="10">
                                <el-dropdown size="small" style="height:50px;margin:auto 0;">
                                    <span class="el-dropdown-link">
                                        个人设置<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item @click.native="updatePassword()">修改密码</el-dropdown-item>
                                        <el-dropdown-item @click.native="logout()">退出登录</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-header>
            <el-container style="height:92vh;">
                <el-aside :width="asideWidth" class="tram" style="overflow-x:hidden;overflow-y:hidden;background:#001529;height:92vh;">
                    <!-- 左侧导航栏  :style="{'width':widthNum}" -->
                    <el-menu 
                            style="border:0px;"
                            active-text-color="black"  
                            background-color="#001529"
                            text-color="white"
                            :collapse="isCollapse"
                            :default-active="menuDefault"
                            :unique-opened="true"
                            :collapse-transition="false">
                            <!-- 动态遍历左侧菜单 -->
                        <el-submenu :key="item.name" :index="item.name" v-for="item in newMenuBar">
                            <template slot="title" style="padding:0px;">
                                <i :class="item.meta.icon"></i>
                                <span slot="title">{{item.meta.title}}</span>
                            </template>
                            <el-menu-item :key="subitem.name" :index="subitem.name" @click="addTab(subitem)" v-for="subitem in item.children">{{subitem.meta.title}}</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main style="padding:0px;position:relative">
                        <!-- 选项卡 -->
                        <el-tabs style="height:5%;" v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="onTab">
                            <el-tab-pane key="home" label="首页" name="home" :closable="false"></el-tab-pane>
                            <el-tab-pane
                                v-for="item in editableTabs"
                                :key="item.name"
                                :label="item.title"
                                :name="item.name"
                            >
                            </el-tab-pane>
                        </el-tabs>
                        <div class="subject" style="padding:10px;height:92%;overflow-x:hidden;overflow-y:auto;">
                            <router-view style="height:100%;text-align:left;line-height:normal;"></router-view>
                        </div>
                    </el-main>
                    <el-footer height="60" style="background:#1D1E23;">
                        <span style="color:white;">Copyright © 2002-2019 石家庄BOS物流有限公司 版权所有　　技术支持：青鸟网络　　ICP备案编号：冀ICP备158301365号</span>
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
        <update-password ref="updatePassword"></update-password>
    </div>
</template>

<script>
import Bus from "@/utils/bus.js"
import localDB from "@/utils/localStorage.js"
import { clearToken } from "@/utils/cookies.js"
import { Logout } from "@/api/public/logout.js"
export default {
    name:"inde",
    data(){
        return{
            menuDefault:null,//当前激活的菜单
            menuBar:[],//则侧菜单的路由集合
            isCollapse:false,//决定菜单是否收缩
            asideWidth:"200px",//左侧布局的宽度
            widthNum:"200px",//左侧导航菜单的宽度
            editableTabsValue: "home",//默认选中的选项卡的name
            tapArr:["1"],//用于存储tab的name集合
            editableTabs: [ 
                //title 选项卡标题
                //name 选项卡的name，用于移除该选项卡的参数
                //content 选项卡的内容,这里作为path
                ],
            permissMenu:null,
            isClass:"iconfont icon-shousuo"
        }
    },
    methods:{
        //展开或者关闭菜单的方法
        isCloseOrOpen(){
            if(this.isCollapse==true){
                this.isCollapse = false;
                this.isClass = "iconfont icon-shousuo"
            }else{
                this.isCollapse = true;
                this.isClass = "iconfont icon-zhankai"
            }
        },
        //添加选项卡的方法,参数为该路由router的对象
        addTab(subitem){
            //首先判断是已经存在该选项卡
            let obj = {
                title: subitem.meta.title,
                name: subitem.name,
                content: subitem.name
            }
            if(this.tapArr.indexOf(subitem.name) == -1){//不存在则添加
                this.editableTabs.push(obj);
                this.tapArr.push(subitem.name);
                this.editableTabsValue = subitem.name;
            }else{//已经存在，则让其选中
                this.editableTabsValue = subitem.name;
            }
            //跳转页面
            this.$router.push({
                name:subitem.name
            })
        },
        //移除选项卡
        removeTab(targetName) {
            if(targetName === "home"){
                this.$notify({duration:"2000",title:'警告',message: '首页不可以关闭哦',type: 'warning'});
            }
            let tabs = this.editableTabs;//获得tab的对象集合
            let activeName = this.editableTabsValue;//获得当前选中的tab的name
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        }else{
                            activeName = "home";
                        }
                    }
                });
                //选中旁边的选项卡
                this.editableTabsValue = activeName;
                //选中旁边的选项卡后，也要进行跳转
                this.$router.push({name:this.editableTabsValue});
            }
            this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            //同时也要移除tab的name中的值
            this.tapArr = this.tapArr.filter(item => item != targetName);
        },
        //选中选项卡的时候
        onTab(obj){
            this.$router.push({
                name:obj.name
            })
            //同时选中左侧菜单
            this.menuDefault = obj.name
        },
        //退出登录
        logout(){
            this.$confirm('你确认要退出登录么？？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                Logout().then(res=>{})
                //清空Cookies
                clearToken();
                //清空权限
                localDB.clearPermission();
                //广播给登录页面的消息
                Bus.$emit("val",true);
                this.$router.push({name:"login"});
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: '已取消已取消退出登录'
                });
            });
        },
        //修改密码
        updatePassword(){
            this.$refs.updatePassword.dialogFormVisible = true;
        }
    },
    watch:{
        //监听左侧菜单的伸缩
        isCollapse:function(val){
            if(val==true){
                this.asideWidth="65px";
            }
            if(val == false){
                this.asideWidth="200px";
            }
        }
    },
    created(){
        //获得vuex中路由的权限
        this.permissMenu = this.$store.state.user.permission.map.menus;
        //进入页面首先获取全部的路由router
        this.menuBar = this.$router.options.routes
        //首次进入页面应该压栈进行跳转到首页
        this.$router.push({name:"home"});
    },
    computed:{
        //根据权限计算完整的左侧菜单集合
        newMenuBar(){
            let newArr = [];
            let childrenArr = [];
            if(this.menuBar.length > 0){
                this.menuBar.forEach(item=>{
                    if(item.meta.hideInMenu && item.children.length > 0){//是导航路由并且子路由不为空
                        if(this.permissMenu.indexOf(item.name)!=-1){//拥有该路由的权限
                            //遍历子路由集合
                            childrenArr = [];
                            item.children.forEach(chilItem=>{
                                if(chilItem.meta.hideInMenu && chilItem.name){
                                    if(this.permissMenu.indexOf(chilItem.name)!=-1){
                                        childrenArr.push(chilItem);
                                    }
                                }
                            })
                            item.children = childrenArr;
                            newArr.push(item);
                        }
                    }
                })
                return newArr;
            }
        },
    },
    components:{
        updatePassword:()=>import("@/views/public/sendNumber/updatePassword.vue")
    }
}
</script>
<style scoped>
    /* logo */
    .logo{
        background-image: url("../../assets/logo.png");
        background-repeat: no-repeat;
        height:55px;
        width: 55px;
        background-size:cover;
        background-position-x:-23px;
        background-position-y:0px;
        float: left;
        margin-top: 10px;
    }
    .el-header {
        line-height:80px;
        background-color: #1D1E23;
    } 
    .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    /* color: #333; */
    color: #001529;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
   /* 覆盖原样式 */
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        min-height: 400px;
  }
  /*左侧布局收缩展开的css动画过渡*/
  .tram{
      transition:all 0.5s ease;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: rgb(255, 255, 255);
    font-weight: bold;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  /* 滚动条样式 */
    .subject::-webkit-scrollbar {/*滚动条整体样式*/
        width:5px;     /*高宽分别对应横竖滚动条的尺寸*/
        height:100%;
    }
    .subject::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #535353;
    }
    .subject::-webkit-scrollbar-track {/*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: #EDEDED;
    }
</style>
<style>
    /* 修改布局中间区域的内容区的margin */
    .el-main .el-tabs__header{
      margin:0px;
    }
    /* 修改选项卡的高度 */
    .el-tabs__nav{
        line-height:5%;
    }
    /* 修改选项卡的内容区样式 */
    .el-main .el-tabs__content{
        display: none;
    }
    /* 修改选项卡选中之后的样式 */
    .el-tabs__item.is-active{
        border-bottom:2px solid #333!important;
        color:#333!important;
    }
    /* 修改左侧菜单选中的样式 */
    .el-menu--inline .is-active{
        color:#FFFFFF!important;
        background: #003264!important;
    }
    .el-main{
        line-height: normal!important;
    }
    /* 修改菜单悬浮之后的菜单选中样式 */
    .el-menu--popup-right-start .is-active{
        color:#FFFFFF!important;
        background: #003264!important;
    }
    /* 更改选项卡hover效果 */
    .el-tabs__item:hover{
        color:rgb(6, 63, 55)!important;
        font-weight:1000;
    }
    /* 一级导航的文字排版样式 */
    .el-submenu__title{
        padding-left: 20px!important;
        text-align: left;
    }
</style>