<template>
    <div>
        <el-dialog title="修改密码" width="30%" :visible.sync="dialogFormVisible" @close="()=>{this.target = {}}" 
            :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <div class="passFrom">
                <el-form ref="from" :model="target" :rules="rule" label-width="100px" >

                    <el-form-item label="原密码" prop="password">
                        <el-input size="small" v-model="target.password" style="width:90%;" show-password></el-input>
                    </el-form-item>

                    <el-form-item label="新密码" prop="newPassword">
                        <el-input size="small" v-model="target.newPassword" style="width:90%;" show-password></el-input>
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
import { updatePassword } from "@/api/system/user.js"

export default {
    name:"updatePassword",
    data(){
        return{
            dialogFormVisible:false,
            target:{},
        }
    },
    methods:{
        //提交
        handleSubmit(){
            this.$refs.from.validate(vali=>{
                if(vali){
                    updatePassword(this.target).then(res=>{
                        if(res.data.code == 10000){
                            this.$message({message:res.data.message,type:"success"});
                            this.dialogFormVisible = false;
                        }else{
                            this.$message({message:res.data.message,type:"error"})
                        }
                    })
                }
            })
        },
    },
    computed:{
        rule:function(){
            return{
                password:[{required: true, message: '请输入原密码', trigger: 'blur' }],
                newPassword:[{required: true, message: '请输入新密码', trigger: 'blur' }],
            }
        }
    }
}
</script>

<style>
.passFrom .el-form-item{
     margin-bottom: 13px;
}
</style>