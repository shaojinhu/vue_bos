<template>
    <div>
        <el-card style="margin:0 auto;">
        
        <el-row style="height:40px;line-height:40px;margin-bottom:5px;">
            <el-col :span="7">
                    <el-button
                    size="small"
                    type="success"
                    icon="el-icon-circle-plus-outline"
                    @click="handleAdd">添加</el-button>
            </el-col>
        </el-row>
        
        <el-table
            :data="tableData"
            style="width: 100%" border> 
            <!-- 编号 -->
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="平时休息时间">
                            <span>{{ props.row.normalDutyTime }}</span>
                        </el-form-item>
                        <el-form-item label="平时上班时间">
                            <span>{{ props.row.normalWorkTime }}</span>
                        </el-form-item>
                        <el-form-item label="周六休息时间">
                            <span>{{ props.row.satDutyTime }}</span>
                        </el-form-item>
                        <el-form-item label="周六上班时间">
                            <span>{{ props.row.satWorkTime }}</span>
                        </el-form-item>
                        <el-form-item label="周日休息时间">
                            <span>{{ props.row.sunDutyTime }}</span>
                        </el-form-item>
                        <el-form-item label="周日上班时间">
                            <span>{{ props.row.sunWorkTime }}</span>
                        </el-form-item>
                        </el-form>
                </template>
            </el-table-column>
            <!-- 收派时间名称 -->
            <el-table-column 
                prop="name"
                label="收派时间名称" 
                width="180">
            </el-table-column>
            <!-- 状态-->
            <el-table-column
                label="状态"
                width="170">
                <template slot-scope="scope">
                    <el-tag
                        effect="dark"
                        :type="scope.row.status == 0 ? '' : 'danger'"
                        disable-transitions>{{scope.row.status == 0  ? '启用' : '禁用'}}</el-tag>
                </template>
            </el-table-column>
            <!-- 操作部门-->
            <el-table-column
                prop="operatingCompany"
                label="操作部门"
                width="170">
            </el-table-column>
            <!-- 操作人-->
            <el-table-column
                prop="operator"
                label="操作人"
                width="170">
            </el-table-column>
            <!-- 操作时间-->
            <el-table-column
                prop="operatingTime"
                label="操作时间"
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
                        @click="handleRev(scope.row)"
                        icon="el-icon-delete-solid">启禁</el-button>
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
        <add-or-edit-take-time ref="AddOrEditTakeTime"></add-or-edit-take-time>
    </div>
</template>
<script>
import { getTakeTimeList,revTakeTime } from "@/api/basic/taketime.js"

export default {
    name:"CollectTimeManagement",
    data(){
        return{
            tableData:[],
            param:{page:1,size:2,total:0},
            value:false
        }
    },
    methods:{
        //页码发生改变时
        currentChange(page){
            this.param.page = page;
            this.getTakeTime();
        },
        //获得列表
        getTakeTime(){
            getTakeTimeList(this.param).then(res=>{
                this.tableData = res.data.data.rows;
                this.param.total = res.data.data.total;
            })
        },
        //添加
        handleAdd(){
            this.$refs.AddOrEditTakeTime.takeTime = {};
            this.$refs.AddOrEditTakeTime.drawerValue = true;
        },
        //修改
        handleUpdate(data){
            if(data.status == "0"){
                this.$message({message:"启用状态不可以修改",type:"warning"});
                return false;
            }
            this.$refs.AddOrEditTakeTime.takeTime = data;
            console.log(this.$refs.AddOrEditTakeTime.takeTime);
            this.$refs.AddOrEditTakeTime.drawerValue = true;
        },
        //启禁
        handleRev(data){
            this.$confirm(`你确认要将“${data.status == 1 ? '禁用' : '启用'}”改为“${data.status == 1 ? '启用' : '禁用'}”么?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               revTakeTime(data).then(res=>{
                   if(res.data.code == 10000){
                        this.$message({message:res.data.message,type:"success"})
                        this.getTakeTime();
                    }else{
                        this.$message({message:res.data.message,type:"error"})
                    }
               })
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    },
    watch:{
        tableData:function(val){
            if(val!= null){
                if((this.param.total / this.param.size) <= 1){
                    this.value = true;
                }
            }
        }
    },
    created(){
        this.getTakeTime();
    },
    components:{
        AddOrEditTakeTime:()=>import("@/views/basicdata/CollectTimeManagement/AddOrEditTakeTime.vue")
    }
}
</script>
<style scoped>
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>