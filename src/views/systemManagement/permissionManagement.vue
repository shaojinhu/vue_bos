<template>
    <div id="permission">
        <el-card style="margin:0 auto;">
        
        <el-row style="height:40px;line-height:40px;margin-bottom:5px;">
            <el-col :span="5"><span>权限名称:&nbsp;&nbsp;&nbsp;</span><el-input size="small" placeholder="请输入内容" v-model="param.jobName" clearable style="width:220px;"> </el-input></el-col>
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
            row-key="pid"
            max-height="500"
            :indent="20"
            :row-class-name="tableRowClassName"
            :tree-props="{children: 'childPerList', hasChildren: 'hasChildren'}"> -->
            <!-- 编号 -->
            <el-table-column
                type="index"
                width="50">
            </el-table-column>
            <!-- 权限名称 -->
            <el-table-column 
                prop="pname"
                label="权限名称" 
                width="180">
            </el-table-column>
            <!-- 权限编号-->
            <el-table-column
                prop="ppermiss"
                label="权限编号"
                width="200">
            </el-table-column>
            <!-- 权限类型 -->
            <el-table-column
                label="权限类型"
                width="180">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.ptype == '1' ? 'success' : (scope.row.ptype == '2' ? 'info' : (scope.row.ptype == '3' ? 'warning' : 'danger')) " effect="plain">
                        {{scope.row.ptype == '1' ? '顶级菜单' : (scope.row.ptype == '2' ? '子级菜单' : (scope.row.ptype == '3' ? '按钮权限' : 'API权限'))}}
                    </el-tag>
                </template>
            </el-table-column>
            <!-- 是否可见 -->
            <el-table-column
                prop="isShow"
                label="是否可见"
                width="180">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.isShow==0 ? 'success' : 'error'">
                        {{scope.row.isShow == 0 ? '可见' : '不可见'}}
                    </el-tag>
                </template>
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
        </el-card>
        <edit-permission ref="EditPermission"></edit-permission>
        <add-permission ref="AddPermission"></add-permission>
    </div>
</template>
<script>
import { getPermissionList,deletePermission } from "@/api/system/permission.js"
import EditPermission from "@/views/systemManagement/permissionManagement/EditPermission.vue"
import AddPermission from '@/views/systemManagement/permissionManagement/AddPermission.vue';
export default {
    name:"permission",
    data(){
        return{
            tableData:[],
            param:{}
        }
    },
    methods:{
        //模糊查询
        handleSearch(){

        },
        //添加权限
        handleAdd(){
            this.$refs.AddPermission.dialogFormVisible = true;
            this.$refs.AddPermission.permiss = {};
        },
        //修改权限
        handleUpdate(data){
            this.$refs.EditPermission.dialogFormVisible = true;
            this.$refs.EditPermission.permission = data;
        },
        //删除权限
        handleDelete(data){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               deletePermission(data).then(res=>{
                if(res.data.code == 10000){
                    this.$message({message:res.data.message,type:"success"})
                    this.getPermission();
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
        getPermission(){
            getPermissionList().then(res=>{
                // if(res.){
                    this.tableData = res.data.data;
                // }
            })
        },
        //渲染的行
        tableRowClassName({row,rowIndex}){
            if(row.ptype == 1){
                return 'one-row';
            }else if(row.ptype == 2){
                return 'two-row';
            }else if(row.ptype == 3){
                return 'three-row';
            }else{
                return 'four-row';
            }
            return '';
        }
    },
    created(){
        this.getPermission();
    },
    components:{
        EditPermission:EditPermission,
        AddPermission:AddPermission
    }
}
</script>
<style>
    
    .el-table .one-row {
        font-size:15px;
        color: #087274;
    }

    .el-table .two-row {
        font-size:15px;
        color: rgba(75, 119, 3, 0.938);
    }
    .el-table .three-row {
        font-size:15px;
        color: rgb(105, 9, 129);
    }
    .el-table .four-row {
         font-size:15px;
         color: rgb(129, 58, 25);
    }
    .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar {/*滚动条整体样式*/
        width:5px;     /*高宽分别对应横竖滚动条的尺寸*/
        height:100%;
    }
    .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #535353;
    }
    .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-track {/*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: #EDEDED;
    }

</style>