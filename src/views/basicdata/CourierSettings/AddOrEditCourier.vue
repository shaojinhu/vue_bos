<template>
    <div>
        <el-drawer
            :title="Courier.id ? '修改快递员信息' : '添加快递员信息'"
            :visible.sync="drawerValue"
            :close-on-press-escape="false"
            :destroy-on-close="true"
            :show-close="false"
            :wrapperClosable="false"
            >
            <el-form ref="form" style="padding:10px" :model="Courier" :rules="rules" label-width="95px" size="mini">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="Courier.name" placeholder="请输入快递员姓名"></el-input>
                </el-form-item>
                <el-form-item label="查台密码" prop="checkPwd">
                    <el-input v-model="Courier.checkPwd" placeholder="请输入查台密码"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="telephone">
                    <el-input v-model="Courier.telephone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="所属部门" prop="companyName">
                    <el-select size="small" v-model="Courier.companyName" placeholder="请选择所属部门">
                        <el-option label="快递一部" value="快递一部"></el-option>
                        <el-option label="快递二部" value="快递二部"></el-option>
                        <el-option label="快递三部" value="快递三部"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="快递员类型" prop="type">
                    <el-select size="small" v-model="Courier.type" placeholder="请选择快递员类型">
                        <el-option label="取派员" value="取派员"></el-option>
                        <el-option label="分拣员" value="分拣员"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车牌号码" prop="vehicleNum">
                    <el-input :disabled="isok" v-model="Courier.vehicleNum" placeholder="请输入车牌号"></el-input>
                </el-form-item>
                <el-form-item label="车型" prop="vehicleType">
                    <el-select :disabled="isok" size="small" v-model="Courier.vehicleType" placeholder="请选择车型">
                        <el-option label="小型车" value="小型车"></el-option>
                        <el-option label="中型车" value="中型车"></el-option>
                        <el-option label="三轮车" value="三轮车"></el-option>
                        <el-option label="无" value="无"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="PDA码" prop="pdaNum">
                    <el-input v-model="Courier.pdaNum" placeholder="请输入PDA码"></el-input>
                </el-form-item>
                <el-form-item label="收派标准" prop="standardId">
                    <el-select size="small" v-model="Courier.standardId" placeholder="请选择收派标准">
                        <el-option :key="standard.id" v-for="standard in StandardList" :label="standard.name" :value="standard.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收派时间" prop="takeTimeId">
                    <el-select size="small" v-model="Courier.takeTimeId" placeholder="请选择收派时间">
                        <el-option :key="take.id" v-for="take in takeTimeList" :label="take.name" :value="take.id"></el-option>
                    </el-select>
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
import { getStandard } from "@/api/basic/standard.js"
import { getStatusIsOk } from "@/api/basic/taketime.js"
import { addCourier,updateCourier } from "@/api/basic/courier.js"

export default {
    name:"AddOrEditCourier",
    data(){
        return{
            Courier:{},
            drawerValue:false,
            //是否禁用表单
            isok:false,
            //收派标准
            StandardList:[],
            //收派时间
            takeTimeList:[]
        }
    },
    methods:{
        //关闭
        cancel(){
            this.Courier = {};
            this.$refs.form.clearValidate();
            this.$refs.form.clearValidate();
            this.drawerValue = false;
        },
        //保存
        save(data){
            this.$refs.form.validate(vali=>{
                if(vali){
                    console.log(this.Courier);
                    if(this.Courier.id){//修改
                        updateCourier(this.Courier).then(res=>{
                            if(res.data.code == 10000){
                                this.$message({message:res.data.message,type:"success"});
                                this.$parent.getCourierList();
                            }else{
                                this.$message({message:res.data.message,type:"error"});
                            }
                            this.cancel();
                        })
                    }else{//添加
                        addCourier(this.Courier).then(res=>{
                            if(res.data.code == 10000){
                                this.$message({message:res.data.message,type:"success"});
                                this.$parent.getCourierList();
                            }else{
                                this.$message({message:res.data.message,type:"error"});
                            }
                            this.cancel();
                        })
                    }
                }
            })
        },
        
    },
    watch:{
        'Courier.type':function(val){
            if(val == '分拣员'){
                this.Courier.vehicleNum = "无";
                this.Courier.vehicleType = "无";
                //禁用
                this.isok = true;
            }else{
                if(!this.Courier.id){
                    this.$refs.form.clearValidate();
                }
                //禁用
                this.isok = false;
            }
        },
        drawerValue:function(val){
            if(val){
                //获取收派标准
                getStandard().then(res=>{this.StandardList = res.data.data});
                //获得收派时间
                getStatusIsOk().then(res=>{console.log(res);this.takeTimeList = res.data.data});
            }
        }
    },
    computed:{
        rules:function(){
            return{
                name:[{ required: true, message: '请输入快递员姓名', trigger: 'blur' }],
                checkPwd:[{ required: true, message: '请输入查台密码', trigger: 'blur' }],
                telephone:[{ required: true, message: '请输入手机号码', trigger: 'blur' }],
                companyName:[{ required: true, message: '请选择所属部门', trigger: 'change' }],
                type:[{ required: true, message: '请选择快递员类型', trigger: 'change' }],
                vehicleNum:[{ required: true, message: '请输入车牌号', trigger: 'blur' }],
                vehicleType:[{ required: true, message: '请选择车型', trigger: 'change' }],
                pdaNum:[{ required: true, message: '请输入PDA码', trigger: 'blur' }],
                standardId:[{ required: true, message: '请选择收派标准', trigger: 'change' }],
                takeTimeId:[{ required: true, message: '请选择收派时间', trigger: 'change' }],
            }
        }
    },
    updated(){
        this.$refs.form.clearValidate();
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