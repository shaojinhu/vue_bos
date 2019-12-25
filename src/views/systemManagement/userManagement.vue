<template>
    <div id="user">
        <el-row style="height:100%;" :gutter="15">
            <el-col :span="5" style="height:100%;">
                <el-card class="card" style="margin:0 auto;height:100%;">
                    <div style="height:40px;width:100%;padding:0px 20px 0px 20px;">
                        <span style="font-size:16px;font-weight:bold;">选择部门</span>
                        <el-link @click="addDepa()" icon="el-icon-plus" style="display:block;float:right;margin-right:50px;">添加</el-link>
                    </div>  
                    <el-timeline style="padding-left:20px;">
                        <el-timeline-item v-for="depa in depaList" :key="depa.did">
                            <span class="cla">
                                <el-link  style="margin-right:10px;" @click="getUser(depa)">{{depa.dname}}</el-link>
                            </span>
                            <span class="cal">
                                <el-link @click="editDepa(depa)" icon="el-icon-edit" style="margin-right:10px;">编辑</el-link>
                                <el-link @click="deleteDepa(depa)">删除<i class="el-icon-delete-solid"></i> </el-link>
                            </span>
                        </el-timeline-item>
                    </el-timeline>
                </el-card>
            </el-col>
            <el-col :span="19">
                <el-card style="margin:0 auto;">
                <span style="font-size:16px;font-weight:bold;">所属部门:{{tableName}}&nbsp;&nbsp;&nbsp;</span>
                <el-row style="margin-top:5px;height:40px;line-height:40px;margin-bottom:5px;">
                    <el-col :span="4"><span>用户名称:&nbsp;&nbsp;&nbsp;</span>
                        <el-input size="small" placeholder="请输入内容" v-model="param.jobName" clearable style="width:130px;"></el-input>
                    </el-col>
                    <el-col :span="7">
                        <el-button
                            size="small"
                            type="primary"
                            icon="el-icon-search"
                            @click="handleSearch">搜索</el-button>
                            <el-button
                            size="small"
                            type="success"
                            icon="el-icon-circle-plus-outline"
                            @click="handleAdd">添加</el-button>
                    </el-col>
                </el-row>
                
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    max-height="500"
                    :indent="20"> 
                    <!-- 编号 -->
                    <el-table-column type="index" width="50"></el-table-column>
                    <!-- 详情（用户拥有的角色） -->
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-tag
                                style="margin:5px;"
                                v-for="item in props.row.roles"
                                :key="item.rid"
                                effect="dark">
                                {{ item.rname }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <!-- 用户姓名 -->
                    <el-table-column 
                        prop="nikename"
                        label="用户姓名" 
                        width="180">
                    </el-table-column>
                    <!-- 用户账号-->
                    <el-table-column
                        prop="username"
                        label="用户账号"
                        width="200">
                    </el-table-column>
                    <!-- 操作 -->
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="success"
                                icon="el-icon-edit"
                                @click="handleUpdate(scope.row)">修改</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row)"
                                icon="el-icon-delete-solid">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="margin: 10px;text-align: center;">
                    <el-pagination
                        background
                        layout="prev,pager,next"
                        :hide-on-single-page="value"
                        :total="param.total"
                        @current-change="currentChange">
                    </el-pagination>
                </div>
                </el-card>
            </el-col>
        </el-row>
        
        <add-or-edit-depa ref="AddOrEditDepa"></add-or-edit-depa>
        <add-user ref="AddUser"></add-user>
        <edit-user ref="EditUser"></edit-user>
    </div>
</template>
<script>
import { getUserList,deleteUser } from "@/api/system/user.js"
import { getDepa,deleteDepa } from "@/api/system/depa.js"

export default {
    name:"userManagement",
    data(){
        return{
            depaList:[],
            tableData:[],
            param:{page:1,size:2,total:5},
            tableName:"",
            value:true
        }
    },
    methods:{
        handleSearch(){

        },
        //添加用户
        handleAdd(){
            this.$refs.AddUser.user = {};
            this.$refs.AddUser.depaId = this.param.depaId;
            this.$refs.AddUser.dname  = this.tableName;
            this.$refs.AddUser.dialogFormVisible = true;
        },
        //修改用户
        handleUpdate(data){
            this.$refs.EditUser.depaId = this.param.depaId;
            this.$refs.EditUser.dname  = this.tableName;
            this.$refs.EditUser.dialogFormVisible = true;
            this.$refs.EditUser.user = data;
        },
        //删除用户
        handleDelete(data){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               deleteUser(data).then(res=>{
                if(res.data.code == 10000){
                    this.$message({message:res.data.message,type:"success"})
                    this.param={page:1,size:3,total:5};
                    this.getUser({dname:this.tableName,did:this.param.depaId});
                }else{
                    this.$message({message:res.data.message,type:"error"})
                }
            })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //获取部门列表
        getDepa(){
            getDepa().then(res=>{
                this.depaList = res.data.data;
            })
        },
        //获得用户
        getUser(data){
            this.tableName = data.dname;
            this.param.depaId = data.did;
            getUserList(this.param).then(res=>{
                if(res.data.code == 10000){
                    this.tableData = res.data.data.rows;
                    this.param.total = res.data.data.total;
                }else{
                    this.$message({message:res.data.message,type:"error"});
                    this.tableData = [];
                }
            })
        },
        //编辑部门
        editDepa(data){
            this.$refs.AddOrEditDepa.depa = data;
            this.$refs.AddOrEditDepa.dialogFormVisible = true;
        },
        //添加部门
        addDepa(){
            this.$refs.AddOrEditDepa.depa = {};
            this.$refs.AddOrEditDepa.dialogFormVisible = true;
        },
        //删除部门
        deleteDepa(data){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               deleteDepa(data).then(res=>{
                if(res.data.code == 10000){
                    this.$message({message:res.data.message,type:"success"})
                    this.getDepa();
                }else{
                    this.$message({message:res.data.message,type:"error"})
                }
            })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //页码发生改变时
        currentChange(page){
            this.param.page = page;
            this.getRole();
        },
    },
    created(){
       this.getDepa();
    },
    components:{
        AddOrEditDepa:()=>import("@/views/systemManagement/userManagement/AddOrEditDepa.vue"),
        AddUser:()=>import("@/views/systemManagement/userManagement/AddUser.vue"),
        EditUser:()=>import("@/views/systemManagement/userManagement/EditUser.vue")
    },
    watch:{
        tableData:function(val){
            if(val){
                //来判断是否隐藏分页
                if((this.param.total / this.param.size) <= 1){
                    this.value = true;
                }
            }else{
                this.value = false;
            }
        }
    }
}
</script>
<style scoped>
.cla{
    display:block;
    float: left;
    width:150px;
    line-height: 30px;
}
.cal3{
    display:block;
    float: right;
    width:100px;
    height: 20px;
    line-height: 20px;
}
</style>
<style>
    .el-timeline-item__content{
        line-height: 20px
    }
    .el-timeline-item{
        height: 25px;
    }
    .card .el-card__body{
        padding:10px;
        padding-top:20px;
    }
</style>