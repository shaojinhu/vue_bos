<template>
    <div>
        <el-card style="margin:0 auto;">
        <el-row style="height:40px;line-height:40px;margin-bottom:5px;">
            
            <el-col :span="24">
                <span>快递员名称:&nbsp;&nbsp;&nbsp;</span><el-input size="small" placeholder="请输入名称" v-model="param.name" clearable style="padding:5px;width:200px;margin-right:10px;"></el-input>
                <span>快递员类型:&nbsp;&nbsp;&nbsp;</span>
                <el-select style="width:200px;margin-right:10px;" size="small" v-model="param.type" placeholder="请选择快递员类型">
                    <el-option label="取派员" value="取派员"></el-option>
                    <el-option label="分拣员" value="分拣员"></el-option>
                </el-select>
                <span>是否作废:&nbsp;&nbsp;&nbsp;</span>
                <el-select style="width:200px;margin-right:10px;" size="small" v-model="param.deltag" placeholder="请选择是否作废">
                    <el-option label="启用" value="0"></el-option>
                    <el-option label="禁用" value="1"></el-option>
                    <el-option label="全部" value="2"></el-option>
                </el-select>
                <el-button
                size="small"
                type="success"
                icon="el-icon-search"
                @click="selectLikeCourier">查询</el-button>
                <el-button
                size="small"
                type="info"
                icon="el-icon-refresh"
                @click="resetCourier">重置</el-button>
                <el-button
                size="small"
                type="success"
                icon="el-icon-circle-plus-outline"
                @click="handleAdd">添加</el-button>
                <el-button
                size="small"
                type="success"
                icon="el-icon-circle-plus-outline"
                @click="handleUpdate(false)">批量修改</el-button>
            </el-col>
        </el-row>
        
        
        <el-table
            :data="tableData"
            style="width: 100%" 
            max-height="640"
             @selection-change="handleSelectionChange"
            border> 
            <!-- 多选框 -->
            <el-table-column type="selection" width="40"></el-table-column>
            <!-- 编号 -->
            <el-table-column type="index" width="40"></el-table-column>
            <el-table-column type="expand" width="40">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <!-- 手机号 -->
                        <el-form-item label="手机号">
                            <span>{{ props.row.telephone }}</span>
                        </el-form-item>
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
                        <el-form-item label="取派标准最小重量">
                            <span>{{ props.row.minWeight }}</span>
                        </el-form-item>
                        <el-form-item label="取派标准最大重量">
                            <span>{{ props.row.maxWeight }}</span>
                        </el-form-item>
                        <el-form-item label="取派标准最小长度">
                            <span>{{ props.row.minLength }}</span>
                        </el-form-item>
                        <el-form-item label="取派标准最大长度">
                            <span>{{ props.row.maxLength }}</span>
                        </el-form-item>
                        <el-form-item label="车牌号">
                            <span>{{ props.row.vehicleNum }}</span>
                        </el-form-item>
                        <el-form-item label="车型">
                            <span>{{ props.row.vehicleType }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <!-- 快递员编号 -->
            <el-table-column 
                prop="courierNum"
                label="编号" 
                width="180">
            </el-table-column>
            <!-- 快递员名称 -->
            <el-table-column 
                prop="name"
                label="姓名" 
                width="180">
            </el-table-column>
            <!-- 查台密码 -->
            <el-table-column 
                prop="checkPwd"
                label="查台密码" 
                width="180">
            </el-table-column>
            <!-- 所属部门 -->
            <el-table-column 
                prop="companyName"
                label="所属部门" 
                width="180">
            </el-table-column>
            <!-- 是否作废 -->
            <el-table-column 
                label="是否作废" 
                width="180">
                <template slot-scope="scope">
                    <el-tag
                        effect="dark"
                        :type="scope.row.deltag == 0 ? '' : 'danger'"
                        disable-transitions>{{scope.row.deltag == 0  ? '启用' : '禁用'}}</el-tag>
                </template>
            </el-table-column>
            <!-- 快递员类型 -->
            <el-table-column 
                prop="type"
                label="快递员类型" 
                width="180">
            </el-table-column>
            <!-- PDA码 -->
            <el-table-column 
                prop="pdaNum"
                label="PDA码" 
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

        <add-or-edit-courier ref="AddOrEditCourier"></add-or-edit-courier>
        <batch-edit-courier ref="BatchEditCourier"></batch-edit-courier>
    </div>
</template>
<script>
import { getCourierList,revCourier } from "@/api/basic/courier.js"

export default {
    name:"CourierSettings",
    data(){
        return{
            tableData:[],
            param:{
                page:1,
                size:5,
                total:0,
                deltag:"0",//为0则默认为启用的快递员
                type:null,
                name:"",
            },
            value:false,
            //多选的数据
            selectCourierList:[],
        }
    },
    methods:{
        //添加
        handleAdd(){
            this.$refs.AddOrEditCourier.drawerValue = true;
        },
        //页码发生改变时
        currentChange(page){
            this.param.page = page;
            this.getCourierList();
        },
        //获得列表
        getCourierList(){
            getCourierList(this.param).then(res=>{
                this.tableData = res.data.data.rows;
                this.param.total = res.data.data.total;
            })
        },
        //模糊查询
        selectLikeCourier(){
            getCourierList(this.param).then(res=>{
                if(res.data.code == 10000){
                    if(res.data.data.total == 0){
                        this.$message({message:"没有找到符合条件的",type:"warning"});
                    }else{
                        this.$message({message:"查询成功",type:"success"});
                    }
                    this.tableData = res.data.data.rows;
                    this.param.total = res.data.data.total;
                }else{
                    this.$message({message:res.data.message,type:"error"});
                }
            })
        },
        //修改
        handleUpdate(data){
            if(data){//单项修改
                this.$refs.AddOrEditCourier.Courier = data;
                this.$refs.AddOrEditCourier.drawerValue = true;
            }else{//批量修改
                //获得多选框选中的
                console.log(this.selectCourierList);
                if(this.selectCourierList.length == 0 || this.selectCourierList == null){
                    this.$message({message:"没有选择快递员",type:"warning"});
                    return false;
                }
                this.$refs.BatchEditCourier.Couriers = this.selectCourierList;
                this.$refs.BatchEditCourier.dialogFormVisible = true;
            }
        },
        //启禁
        handleRev(data){
            this.$confirm(`你确认要将“${data.deltag == 1 ? '禁用' : '启用'}”改为“${data.deltag == 1 ? '启用' : '禁用'}”么?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               revCourier(data).then(res=>{
                   if(res.data.code == 10000){
                        this.$message({message:res.data.message,type:"success"})
                        this.getCourierList();
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
        },
        //多选时
        handleSelectionChange(val){
            this.selectCourierList = val;
        },
        //重置
        resetCourier(){
            this.param.deltag = "0";//为0则默认为启用的快递员
            this.param.type = null;
            this.param.name = "";
            this.selectLikeCourier();
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
        this.getCourierList();
    },
    components:{
        AddOrEditCourier:()=>import("@/views/basicdata/CourierSettings/AddOrEditCourier.vue"),
        BatchEditCourier:()=>import("@/views/basicdata/CourierSettings/BatchEditCourier.vue")
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
<style>
    
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