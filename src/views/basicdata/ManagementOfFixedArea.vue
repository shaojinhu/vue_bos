<template>
    <div>
       <el-card style="margin:0 auto;">
        <el-row style="height:40px;line-height:40px;margin-bottom:5px;">
            <el-col :span="24">
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
            max-height="640"
            border> 
            <!-- 编号 -->
            <el-table-column type="index" width="50"></el-table-column>
            <!-- 定区名称 -->
            <el-table-column 
                prop="fixedAreaName"
                label="定区名称" 
                width="180">
            </el-table-column>
            <!-- 操作部门 -->
            <el-table-column 
                prop="operatingCompany"
                label="操作部门" 
                width="180">
            </el-table-column>
            <!-- 操作时间 -->
            <el-table-column 
                prop="operatingTime"
                label="操作时间" 
                width="180">
            </el-table-column>
            <!-- 操作人 -->
            <el-table-column 
                prop="operator"
                label="操作人" 
                width="180">
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

        <add-or-edit-fixed-area ref="AddOrEditFixedArea"></add-or-edit-fixed-area>
    </div>
</template>
<script>
import { getFixedAreaList,deleteFixedArea } from "@/api/basic/fixedarea.js"

export default {
    name:"ManagementOfFixedArea",
    data(){
        return{
            param:{page:1,size:5,total:1},
            value:false,
            tableData:[]
        }
    },
    methods:{
        //添加
        handleAdd(){
            this.$refs.AddOrEditFixedArea.FixedArea = {};
            this.$refs.AddOrEditFixedArea.drawerValue = true;
        },
        //修改
        handleUpdate(data){
            this.$refs.AddOrEditFixedArea.FixedArea = data;
            this.$refs.AddOrEditFixedArea.drawerValue = true;
        },
        //删除
        handleDelete(data){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteFixedArea(data).then(res=>{
                    console.log(res);
                    if(res.data.code == 10000){
                        this.$message({message:res.data.message,type:"success"})
                        this.getFixedAreaList();
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
        getFixedAreaList(){
            getFixedAreaList(this.param).then(res=>{
                this.tableData = res.data.data.rows;
                this.param.total = res.data.data.total;
            })
        },
        //页码发生改变时
        currentChange(page){
            this.param.page = page;
            this.getFixedAreaList();
        },
    },
    watch:{
        tableData:function(){
            if((this.param.total / this.param.size) <= 1){
                    this.value = true;
            }
        }
    },
    created(){
        this.getFixedAreaList();
    },
    components:{
        AddOrEditFixedArea:()=>import("@/views/basicdata/ManagementOfFixedArea/AddOrEditFixedArea.vue")
    }
}
</script>
<style scoped>

</style>