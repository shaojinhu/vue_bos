<template>
    <div>
        <el-drawer
            :title="Standard.id ? '修改取派标准' : '添加取派标准'"
            :visible.sync="drawerValue"
            :close-on-press-escape="false"
            :destroy-on-close="true"
            :show-close="false"
            :wrapperClosable="false"
            >
            <el-form ref="form" style="padding:10px" :model="Standard" :rules="rules" label-width="110px" size="mini">
                <el-form-item label="标准名称" prop="name">
                    <el-input v-model="Standard.name" placeholder="请输入标准名称"></el-input>
                </el-form-item>
                <el-form-item label="最小重量(kg)" prop="minWeight">
                    <el-input v-model="Standard.minWeight" placeholder="请输入最小重量"></el-input>
                </el-form-item>
                <el-form-item label="最大重量(kg)" prop="maxWeight">
                    <el-input v-model="Standard.maxWeight" placeholder="请输入最大重量"></el-input>
                </el-form-item>
                <el-form-item label="最小长度(cm)" prop="minLength">
                    <el-input v-model="Standard.minLength" placeholder="请输入最小长度"></el-input>
                </el-form-item>
                <el-form-item label="最大长度(cm)" prop="maxLength">
                    <el-input v-model="Standard.maxLength" placeholder="请输入最大长度"></el-input>
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
import {addStandard,updateStandard} from   "@/api/basic/standard.js"

export default {
    name:"AddOrEditStandard",
    data(){
        return{
            drawerValue:false,
            Standard:{},
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
                    if(this.Standard.id){   //修改
                        updateStandard(this.Standard).then(res=>{
                            if(res.data.code == 10000){
                                this.$message({message:res.data.message,type:"success"});
                                this.$parent.getList(this.$parent.param);
                            }else{
                                this.$message({message:res.data.message,type:"error"});
                            }
                            this.drawerValue = false;
                        })
                    }else{  //添加
                        addStandard(this.Standard).then(res=>{
                            if(res.data.code == 10000){
                                this.$message({message:res.data.message,type:"success"});
                                this.$parent.getList(this.$parent.param);
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
                name:[{ required: true, message: '请输入标准名称', trigger: 'blur'}],
                minWeight:[{ required: true, message: '请输入最小重量', trigger: 'blur'}],
                maxWeight:[{ required: true, message: '请输入最大重量', trigger: 'blur'}],
                minLength:[{ required: true, message: '请输入最小长度', trigger: 'blur'}],
                maxLength:[{ required: true, message: '请输入最大长度', trigger: 'blur'}],
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