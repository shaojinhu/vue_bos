<template>
    <div>
        <el-dialog :title="depa.did ? '编辑部门' : '添加部门'" :visible.sync="dialogFormVisible" @close="()=>{this.isok = true;
        this.isoktwo = false}" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <el-form ref="from" :model="depa" :rules="rule" label-width="100px" >
                <el-form-item label="部门名称" prop="dname">
                    <el-input v-model="depa.dname" style="width:90%;" maxlength="8"
                        show-word-limit></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false;">取消</el-button>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {addDepa,updateDepa} from "@/api/system/depa.js"

export default {
    name:"addOrEditDepa",
    data(){
        return{
            dialogFormVisible:false,
            depa:{}
        }
    },
    computed:{
        rule:function(){
            return{
                dname:[{ required: true, message: '请输入部门名称', trigger: 'blur' }]
            }
        }
    },
    methods:{
        handleSubmit(){
            this.$refs.from.validate((vali)=>{
                if(vali){
                    //添加或者修改
                    if(this.depa.did){
                        updateDepa(this.depa).then(res=>{
                            if(res.data.code == 10000){
                                if(res.data.code == 10000){
                                    this.$message({message:res.data.message,type:"success"});
                                    this.$parent.getDepa();
                                }else{
                                    this.$message({message:res.data.message,type:"error"});
                                }
                                this.dialogFormVisible = false;
                            }
                        })
                    }else{
                        addDepa(this.depa).then(res=>{
                            if(res.data.code == 10000){
                                if(res.data.code == 10000){
                                    this.$message({message:res.data.message,type:"success"});
                                    this.$parent.getDepa();
                                }else{
                                    this.$message({message:res.data.message,type:"error"});
                                }
                                this.dialogFormVisible = false;
                            }
                        })
                    }
                }
            })
        }
    },
    watch:{
        dialogFormVisible:function(vali){
            if(!vali){
                //清空表单校验内容
                this.$refs.from.clearValidate();
            }
        }
    }
}
</script>
<style scoped>

</style>