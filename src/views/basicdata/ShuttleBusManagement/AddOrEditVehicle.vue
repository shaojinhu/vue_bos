<template>
  <div>
      <el-drawer
            :title="Vehicle.id ? '修改班车信息' : '添加班车信息'"
            :visible.sync="drawerValue"
            :close-on-press-escape="false"
            :destroy-on-close="true"
            :show-close="false"
            :wrapperClosable="false"
            >
            <el-form ref="form" style="padding:10px" :model="Vehicle" :rules="rules" label-width="90px" size="mini">
                <el-form-item label="线路名称" prop="routeName">
                    <el-input v-model="Vehicle.routeName" placeholder="请输入线路名称"></el-input>
                </el-form-item>
                <el-form-item label="线路类型" prop="routeType">
                    <el-select v-model="Vehicle.routeType" placeholder="请选择线路类型">
                        <el-option label="终端取派" value="0"></el-option>
                        <el-option label="支线传输" value="1"></el-option>
                        <el-option label="干线传输" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="承运商" prop="shipper">
                    <el-select v-model="Vehicle.shipper" placeholder="请选择承运商">
                        <el-option label="石家庄圆通物流有限公司" value="石家庄圆通物流有限公司"></el-option>
                        <el-option label="石家庄顺丰物流有限公司" value="石家庄圆通物流有限公司"></el-option>
                        <el-option label="石家庄韵达物流有限公司" value="石家庄圆通物流有限公司"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择司机" prop="driver">
                    <el-select v-model="Vehicle.driver" placeholder="请选择司机">
                        <el-option label="张三" value="张三"></el-option>
                        <el-option label="王峰" value="王峰"></el-option>
                        <el-option label="刘强" value="刘强"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车牌号" prop="vehicleNum">
                    <el-input v-model="Vehicle.vehicleNum" placeholder="请输入车牌号"></el-input>
                </el-form-item>
                <el-form-item label="选择车型" prop="vehicleType">
                    <el-select v-model="Vehicle.vehicleType" placeholder="请选择车型">
                        <el-option label="小型车" value="小型车"></el-option>
                        <el-option label="中型车" value="中型车"></el-option>
                        <el-option label="大型车" value="大型车"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="吨控(吨)" prop="ton">
                    <el-input v-model="Vehicle.ton" placeholder="请输入吨控数值"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="Vehicle.remark" placeholder="请输入备注"></el-input>
                </el-form-item>
            </el-form>

            <div class="demo-drawer_footer">
                <el-button @click="cancel()">取 消</el-button>
                <el-button type="primary" @click="save('form')">提交</el-button>
            </div>
        </el-drawer>
  </div>
</template>

<script>
import { addVehicle,updateVehicle } from "@/api/basic/vehicle.js"
export default {
    name:"AddOrEditVehicle",
    data(){
        return{
            drawerValue:false,
            Vehicle:{}
        }
    },
    methods:{
        cancel(){
            this.drawerValue = false;
        },
        save(data){
            this.$refs[data].validate(vali=>{
                if(vali){
                    console.log(this.Vehicle);
                    if(this.Vehicle.id){//修改
                         updateVehicle(this.Vehicle).then(res=>{
                            if(res.data.code == 10000){
                                this.$message({message:res.data.message,type:"success"});
                                this.$parent.$parent.getVehicleList();
                            }else{
                                this.$message({message:res.data.message,type:"error"});
                            }
                            this.drawerValue = false;
                        })
                    }else{//添加
                         addVehicle(this.Vehicle).then(res=>{
                            if(res.data.code == 10000){
                                this.$message({message:res.data.message,type:"success"});
                                this.$parent.$parent.getVehicleList();
                            }else{
                                this.$message({message:res.data.message,type:"error"});
                            }
                            this.drawerValue = false;
                        })
                    }
                }
            })
        }
    },
    computed:{
        rules:function(){
            return{
                routeName:[{ required: true, message: '请输入线路名称', trigger: 'blur'}],
                routeType:[{ required: true, message: '请选择线路类型', trigger: 'change'}],
                shipper:[{ required: true, message: '请选择承运商', trigger: 'change'}],
                driver:[{ required: true, message: '请选择司机', trigger: 'change'}],
                vehicleNum:[{ required: true, message: '请输入车牌号', trigger: 'blur'}],
                vehicleType:[{ required: true, message: '请选择车辆类型', trigger: 'change'}],
                ton:[{ required: true, message: '请输入吨控数值', trigger: 'blur'}],
            }
        }
    }
}
</script>

<style scoped>
.demo-drawer_footer{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
}
</style>