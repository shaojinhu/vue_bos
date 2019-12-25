<template>
    <div>
        <el-drawer
            :title="takeTime.id ? '修改收派时间' : '添加收派时间'"
            :visible.sync="drawerValue"
            :close-on-press-escape="false"
            :destroy-on-close="false"
            :show-close="false"
            :wrapperClosable="false"
            >
            <el-form ref="form" style="padding:10px" :model="takeTime" :rules="rules" label-width="110px" size="mini">
                <el-form-item label="收派时间名称" prop="name">
                    <el-input v-model="takeTime.name" placeholder="请输入收派时间名称"></el-input>
                </el-form-item>
                <el-form-item label="平时休息时间" prop="normalDutyTime">
                    <el-time-picker placeholder="选择时间" value-format="HH:mm:ss" v-model="takeTime.normalDutyTime" style="width: 100%;"></el-time-picker>
                </el-form-item>
                <el-form-item label="平时上班时间" prop="normalWorkTime">
                    <el-time-picker placeholder="选择时间" value-format="HH:mm:ss" v-model="takeTime.normalWorkTime" style="width: 100%;"></el-time-picker>
                </el-form-item>
                <el-form-item label="周六休息时间" prop="satDutyTime">
                    <el-time-picker placeholder="选择时间" value-format="HH:mm:ss" v-model="takeTime.satDutyTime" style="width: 100%;"></el-time-picker>
                </el-form-item>
                <el-form-item label="周六上班时间" prop="satWorkTime">
                    <el-time-picker placeholder="选择时间" value-format="HH:mm:ss" v-model="takeTime.satWorkTime" style="width: 100%;"></el-time-picker>
                </el-form-item>
                <el-form-item label="周日休息时间" prop="sunDutyTime">
                    <el-time-picker placeholder="选择时间" value-format="HH:mm:ss" v-model="takeTime.sunDutyTime" style="width: 100%;"></el-time-picker>
                </el-form-item>
                <el-form-item label="周日上班时间" prop="sunWorkTime">
                    <el-time-picker placeholder="选择时间" value-format="HH:mm:ss" v-model="takeTime.sunWorkTime" style="width: 100%;"></el-time-picker>
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
import { addTakeTime,updateTakeTime } from "@/api/basic/taketime.js"
import { timestampToTime } from "@/utils/format.js"
export default {
    name:"AddOrEditTakeTime",
    data(){
        return{
            takeTime:{},
            drawerValue:false
        }
    },
    methods:{
        cancel(){
            this.drawerValue = false;
            this.$refs.form.clearValidate();
        },
        save(data){
            this.$refs.form.validate(vali=>{
                if(vali){
                    if(this.takeTime.id){//修改
                        updateTakeTime(this.takeTime).then(res=>{
                            if(res.data.code == 10000){
                                this.$message({message:res.data.message,type:"success"});
                                this.$parent.getTakeTime();
                            }else{
                                this.$message({message:res.data.message,type:"error"});
                            }
                            this.drawerValue = false;
                        })
                    }else{//添加
                        addTakeTime(this.takeTime).then(res=>{
                            if(res.data.code == 10000){
                                this.$message({message:res.data.message,type:"success"});
                                this.$parent.getTakeTime();
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
                name:[{ required: true, message: '请输入收派时间管理名称', trigger: 'blur' }],
                normalDutyTime:[{ required: true, message: '请选择时间', trigger: 'change' }],
                normalWorkTime:[{ required: true, message: '请选择时间', trigger: 'change' }],
                satDutyTime:[{ required: true, message: '请选择时间', trigger: 'change' }],
                satWorkTime:[{ required: true, message: '请选择时间', trigger: 'change' }],
                sunDutyTime:[{ required: true, message: '请选择时间', trigger: 'change' }],
                sunWorkTime:[{ required: true, message: '请选择时间', trigger: 'change' }]
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