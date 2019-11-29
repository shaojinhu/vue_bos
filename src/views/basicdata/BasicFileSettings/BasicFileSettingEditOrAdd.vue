<template>
    <div>
        <el-drawer
            title="基础档案——父档案"
            :visible.sync="drawerValue"
            >
            <el-form ref="form" style="padding:10px" :model="parentArchive" :rules="rules" label-width="80px" size="mini">
                <el-form-item label="档案名称" prop="archiveName">
                    <el-input v-model="parentArchive.archiveName" placeholder="请输入档案名称"></el-input>
                </el-form-item>
                <el-form-item label="档案编号" prop="archiveNum">
                    <el-input v-model="parentArchive.archiveNum" placeholder="请输入档案编号"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="remark">
                    <el-input v-model="parentArchive.remark" placeholder="请输入描述信息"></el-input>
                </el-form-item>
            </el-form>

            <div class="demo-drawer_footer">
                <el-button @click="()=>{this.drawerValue = false;}">取 消</el-button>
                <el-button type="primary" @click="save('form')">提交</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { addParentArchive,updateParentArchive } from "@/api/basic/archive.js";
export default {
    name:"BasicFileSettingEditOrAdd",
    data(){
        return{
            //是否展开抽屉
            drawerValue:false,
            parentArchive:{}
        }
    },
    methods:{
        save(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.parentArchive.id){//修改
                        updateParentArchive(this.parentArchive).then(res=>{
                            if(res.data.code == 10000){
                                this.$message({message:res.data.message,type: 'success'});
                                this.$parent.getParentList(this.$parent.parentParam);
                                this.drawerValue = false;
                            }else{
                                this.$message({message:res.data.message,type: 'error'});
                            }
                        })
                    }else{//添加
                        addParentArchive(this.parentArchive).then(res=>{
                            if(res.data.code == 10000){
                                this.$message({message:res.data.message,type: 'success'});
                                this.$parent.getParentList(this.$parent.parentParam);
                                this.drawerValue = false;
                            }else{
                                this.$message({message:res.data.message,type: 'error'});
                            }
                        })
                    }
                }else{
                    this.$message({message:"校验错误",type: 'error'});
                    return false;
                }
            });
        }
    },
    computed:{
        rules:function(){
            return {
                archiveName:[{ required: true, message: '请输入档案名称', trigger: 'blur'}],
                archiveNum:[{ required: true, message: '请输入档案编号', trigger: 'blur'}]
            }
        }
    },
    watch:{
        //监听并移除校验结果
        drawerValue:function(val){
            if(val == false){
                this.$refs.form.clearValidate();
            }
        }
    },
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