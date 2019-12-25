<template>
    <div>
        <el-drawer
            :title="SubArchive.subId ? '修改子档案' :'添加子档案'"
            :visible.sync="drawerValue"
            >
            <el-form ref="form" style="padding:10px" :model="SubArchive" :rules="rules" label-width="80px" size="mini">
                <el-form-item label="档案名称" prop="subArchiveName">
                    <el-input v-model="SubArchive.subArchiveName" placeholder="请输入档案名称"></el-input>
                </el-form-item>
                <el-form-item label="助记码" prop="mnemonicCode">
                    <el-input v-model="SubArchive.mnemonicCode" placeholder="请输入档案编号"></el-input>
                </el-form-item>
                <el-form-item label="封存标志">
                    <el-switch
                        style="display: block"
                        v-model="value"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="启用"
                        inactive-text="禁用">
                    </el-switch>
                </el-form-item>
                <el-form-item label="档案描述" prop="subArchiveInfo">
                    <el-input v-model="SubArchive.subArchiveInfo" placeholder="请输入描述信息"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="SubArchive.remark" placeholder="请输入描述信息"></el-input>
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
import { addSubArchive,updateSubArchive } from "@/api/basic/archive.js";
export default {
    name:"SubArchiveAddOrEdit",
    data(){
        return{
            drawerValue:false,
            SubArchive:{},
            //档案的启禁状态
            value:true,
            //临时父档案
            targetParent:null,
        }
    },
    methods:{
        save(data){
            console.log("执行")
            //准备数据
            if(this.value == true){
                this.SubArchive.seal = 0;
            }else{
                this.SubArchive.seal = 1;
            }
            //设置父id
            this.SubArchive.parentid = this.targetParent.id;
            this.$refs[data].validate(vali=>{
                if(vali){
                    if(!this.SubArchive.subId){
                        addSubArchive(this.SubArchive).then(res=>{
                            if(res.data.code == 10000){
                                this.$message({message:res.data.message,type:"success"});
                                this.$parent.getSubArchive();
                            }else{
                                this.$message({message:res.data.message,type:"error"});
                            }
                            this.drawerValue = false;
                        })
                    }else{
                        updateSubArchive(this.SubArchive).then(res=>{
                            if(res.data.code == 10000){
                                this.$message({message:res.data.message,type:"success"});
                                this.$parent.getSubArchive();
                            }else{
                                this.$message({message:res.data.message,type:"error"});
                            }
                            this.drawerValue = false;
                        })
                    }
                }
            })
        },
        //关闭
        cancel(){
            this.drawerValue = false;
            //清空表单校验结果
            this.$refs.form.clearValidate();
        }
    },
    computed:{
        rules:function(){
            return{
                subArchiveName:[{ required: true, message: '请输入档案名称', trigger: 'blur'}],
                mnemonicCode:[{ required: true, message: '请输入助记码', trigger: 'blur'}],
                subArchiveInfo:[{ required: true, message: '请输入子档案信息', trigger: 'blur'}],
            }
        }
    },
    watch:{
        SubArchive:function(val){
            if(val.subId != null){
                //回显封存状态
                if(this.SubArchive.seal == 0){
                    this.value = true;
                }else{
                    this.value = false;
                }
            }
        },
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