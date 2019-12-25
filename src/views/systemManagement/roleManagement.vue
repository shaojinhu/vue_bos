<template>
    <div id="user">
        <el-card style="margin:0 auto;">
        
        <el-row style="height:40px;line-height:40px;margin-bottom:5px;">
            <el-col :span="5"><span>角色名称:&nbsp;&nbsp;&nbsp;</span><el-input size="small" placeholder="请输入内容" v-model="param.jobName" clearable style="width:220px;"> </el-input></el-col>
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
            <!-- 详情 -->
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-tag
                        style="margin:5px;"
                        v-for="item in props.row.permissions"
                        :key="item.pid"
                        effect="dark">
                        {{ item.pname }}
                    </el-tag>
                </template>
            </el-table-column>
            <!-- 角色名称 -->
            <el-table-column 
                prop="rname"
                label="角色名称" 
                width="180">
            </el-table-column>
            <!-- 角色描述-->
            <el-table-column
                prop="rdesc"
                label="角色描述"
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
                layout="prev, pager, next"
                :total="param.total"
                :hide-on-single-page="value"
                :page-size="param.size"
                @current-change="currentChange">
            </el-pagination>
        </div>
        </el-card>

        <add-role ref="AddRole"></add-role>
        <edit-role ref="EditRole"></edit-role>
    </div>
</template>
<script>
import { getRoleList,deleteRole } from "@/api/system/role.js"

export default {
    name:"roleManagement",
    data(){
        return{
            tableData:[],
            param:{page:1,size:3,total:5},
            //控制分页是否隐藏
            value:false,
        }
    },
    methods:{
        handleSearch(){

        },
        //添加
        handleAdd(){
            this.$refs.AddRole.dialogFormVisible = true;
            this.$refs.AddRole.role = {};
        },
        //修改
        handleUpdate(data){
            this.$refs.EditRole.dialogFormVisible = true;
            this.$refs.EditRole.role = {};
            this.$refs.EditRole.role = data;
        },
        //删除
        handleDelete(data){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               deleteRole(data).then(res=>{
                if(res.data.code == 10000){
                    this.$message({message:res.data.message,type:"success"})
                    this.param={page:1,size:3,total:5};
                    this.getRole();
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
        //获取列表
        getRole(){
            console.log("分页参数为",this.param);
            getRoleList(this.param).then(res=>{
                this.tableData = res.data.data.rows;
                this.param.total = res.data.data.total;
            })
        },
        //页码发生改变时
        currentChange(page){
            this.param.page = page;
            this.getRole();
        },
    },
    created(){
       this.getRole();
    },
    components:{
        AddRole:()=>import("@/views/systemManagement/roleManagement/AddRole.vue"),
        EditRole:()=>import("@/views/systemManagement/roleManagement/EditRole.vue")
    },
    watch:{
        tableData:function(val){
            if(val){
                //来判断是否隐藏分页
                if((this.param.total / this.param.size) <= 1){
                    this.value = true;
                }
            }
        }
    }
}
</script>
<style scoped>

</style>