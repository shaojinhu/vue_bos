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
                        <el-form-item label="车牌号码：">
                            <span>{{ props.row.vehicleNum }}</span>
                        </el-form-item>
                        <el-form-item label="车辆类型：">
                            <span>{{ props.row.vehicleType }}</span>
                        </el-form-item>
                        <el-form-item label="车辆吨控：">
                            <span>{{ props.row.ton }}吨</span>
                        </el-form-item>
                        <el-form-item label="备注信息：">
                            <span>{{ props.row.remark }}</span>
                        </el-form-item>
                        </el-form>
                </template>
            </el-table-column>
            <!-- 线路名称 -->
            <el-table-column 
                prop="routeName"
                label="线路名称" 
                width="180">
            </el-table-column>
            <!-- 线路类型-->
            <el-table-column
                label="线路类型"
                width="170">
                <template slot-scope="scope">
                    <el-tag
                        effect="dark"
                        :type="scope.row.status == 0 ? '' : (scope.row.status== 1 ?'warning':'info')"
                        disable-transitions>{{scope.row.status == 0  ? '终端取派' : (scope.row.status==1?'支线传输':'干线传输')}}</el-tag>
                </template>
            </el-table-column>
            <!-- 承运商 -->
            <el-table-column 
                prop="shipper"
                label="承运商" 
                width="190">
            </el-table-column>
            <!-- 司机 -->
            <el-table-column 
                prop="driver"
                label="司机" 
                width="180">
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

        <add-or-edit-vehicle ref="AddOrEditVehicle"></add-or-edit-vehicle>
        </el-card>
    </div>
</template>
<script>
import { getVehicleList,deleteVehicle } from "@/api/basic/vehicle.js"

export default {
    name:"ShuttleBusManagement",
    data(){
        return {
            //车辆管理
            tableData:[],
            //分页参数
            param:{page:1,size:5,total:1},
            value:false
        }
    },
    methods:{
        //添加
        handleAdd(){
            this.$refs.AddOrEditVehicle.Vehicle = {};
            this.$refs.AddOrEditVehicle.drawerValue = true;
        },
        //修改
        handleUpdate(data){
            this.$refs.AddOrEditVehicle.Vehicle = data;
            this.$refs.AddOrEditVehicle.drawerValue = true;
        },
        //删除
        handleDelete(data){
             this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               deleteVehicle(data).then(res=>{
                    if(res.data.code == 10000){
                        this.$message({message:res.data.message,type:"success"})
                        this.getVehicleList();
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
            this.getVehicleList();
        },
        //获取列表
        getVehicleList(){
            getVehicleList(this.param).then(res=>{
                this.tableData = res.data.data.rows;
                this.param.total = res.data.data.total;
            })
        }
    },
    watch:{
        tableData:function(val){
            if((this.param.total / this.param.size) <= 1){
                this.value = true;
            }
        }
    },
    created(){
        this.getVehicleList();
        if((this.param.total / this.param.size) <= 1){
            this.value = true;
        }
    },
    components:{
        AddOrEditVehicle:()=>import("@/views/basicdata/ShuttleBusManagement/AddOrEditVehicle.vue")
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