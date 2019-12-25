<template>
    <div>
        <el-dialog title="修改密码" width="30%" :visible.sync="dialogFormVisible" @close="()=>{this.isok = true;}" 
            :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <div class="mailFrom">
            <el-form ref="from" :model="target" :rules="rule" label-width="100px" >
                <el-form-item  label="账号名称" prop="username">
                    <el-input size="small" v-model="target.username" style="width:90%;"></el-input>
                </el-form-item>

                <el-form-item v-if="isok" label="邮箱" prop="mail">
                    <el-input size="small" v-model="target.mail" style="width:90%;">
                        <el-button :disabled="mailCart" slot="append" @click="sendMailNumber">{{text}}</el-button>
                    </el-input>
                </el-form-item>

                <el-form-item v-if="!isok" label="手机号码" prop="phone">
                    <el-input size="small" v-model="target.phone" style="width:90%;">
                        <el-button slot="append" @click="sendNumber">{{发送验证码}}</el-button>
                    </el-input>
                </el-form-item>

                <el-form-item label="验证码" prop="number">
                    <el-input size="small" v-model="target.number" style="width:90%;"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input size="small" v-model="target.password" style="width:90%;" show-password></el-input>
                </el-form-item>

                <el-form-item label="再次输入密码">
                    <el-input size="small" v-model="target.targetPassword" style="width:90%;" show-password></el-input>
                </el-form-item>

            </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false;">取消</el-button>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {sendMailNumber,updatePasswrodByNumber } from "@/api/system/user.js"

export default {
    name:"mailSendLogin",
    data(){
        return{
            dialogFormVisible:false,
            isok:true,
            target:{},
            mailCart:false,
            text:"发送验证码"
        }
    },
    methods:{
        //发送验证码
        sendNumber(){

        },
        //发送邮箱验证码
        sendMailNumber(){
            if(this.target.username==null || this.target.mail==null){
                this.$message({message:"用户账号和邮箱不能为空",type:"warning"});
                return false;
            }
            //发送验证码
            sendMailNumber({mail:this.target.mail,username:this.target.username}).then(res=>{
                if(res.data.code == 10000){
                    this.$message({message:"发送成功",type:"success"});
                    this.mailCart = true;
                }else{
                   this.$message({message:res.data.message,type:"error"});
                }
            })
        },
        //提交修改密码申请
        handleSubmit(){
            this.$refs.from.validate(vali=>{
                if(vali){
                    //校验密码是否一致
                    if(this.target.password != this.target.targetPassword){
                        this.$message({message:"两次密码输入不一致",type:"warning"});
                        return false;
                    }
                    updatePasswrodByNumber(this.target).then(res=>{
                        if(res.data.code == 10000){
                            this.$message({message:res.data.message,type:"success"});
                            this.dialogFormVisible = false;
                        }else{
                            this.$message({message:res.data.message,type:"error"})
                        }
                    })
                }
            })
        }
    },
    computed:{
        rule:function(){
            return{
                username:[{required: true, message: '请输入用户账号', trigger: 'blur' }],
                password:[{required: true, message: '请输入密码', trigger: 'blur' }],
                number:[{required: true, message: '请输入验证码', trigger: 'blur' }]
            }
        }
    },
    watch:{
        mailCart:function(val){
            let that = this;
            if(val == true){
                let time = 60;
                //开始按钮动画
                var interval = setInterval(function(){
                    time = time - 1;
                    that.text = `输入验证码(${time})`
                    if(time == -1){
                        // return false;
                        //重置按钮
                        that.text = "发送验证码";
                        that.mailCart = false;
                        clearInterval(interval)
                    }
                }, 1000);
            }
        }
    }
}
</script>

<style>
.mailFrom .el-form-item{
        margin-bottom: 13px;
}
</style>