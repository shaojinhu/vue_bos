<template>
    <div>
        <el-drawer
            :title="FixedArea.id ? '修改定区信息' : '添加定区信息'"
            :visible.sync="drawerValue"
            :close-on-press-escape="false"
            :destroy-on-close="true"
            :show-close="false"
            :wrapperClosable="false"
            >
            <el-form ref="form" style="padding:10px" :model="FixedArea" :rules="rules" label-width="95px" size="mini">
                <el-form-item label="定区名称" prop="fixedAreaName">
                    <el-input v-model="FixedArea.fixedAreaName" placeholder="请输入输入定区名称"></el-input>
                </el-form-item>
                <el-form-item label="选择区域" prop="areaID">
                    <el-select size="small" v-model="FixedArea.areaID" placeholder="请选择区域">
                        <el-option :key="area.id" v-for="area in AreaList" :label="area.province + area.city + area.district" :value="area.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <div class="demo-drawer_footer">
                <el-button @click="cancel()">取 消</el-button>
                <el-button type="primary" @click="save()">提交</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { getArea } from "@/api/basic/area.js"
import { addFixedArea,updateFixedArea } from "@/api/basic/fixedarea.js"
export default {
    name:"AddOrEditFixedArea",
    data(){
        return{
            drawerValue:false,
            FixedArea:{},
            AreaList:[],
        }
    },
    methods:{
        //关闭方法
        cancel(){
            this.$refs.form.clearValidate();
            this.$refs.form.clearValidate();
            this.drawerValue = false;
        },
        //提交
        save(){
            this.$refs.form.validate(vali=>{
                if(vali){
                    if(this.FixedArea.id){//修改
                        updateFixedArea(this.FixedArea).then(res=>{
                            if(res.data.code == 10000){
                                this.$message({message:res.data.message,type:"success"});
                                this.$parent.getFixedAreaList();
                            }else{
                                this.$message({message:res.data.message,type:"error"});
                            }
                            this.cancel();
                        })
                    }else{//添加
                        addFixedArea(this.FixedArea).then(res=>{
                            if(res.data.code == 10000){
                                this.$message({message:res.data.message,type:"success"});
                                this.$parent.getFixedAreaList();
                            }else{
                                this.$message({message:res.data.message,type:"error"});
                            }
                            this.cancel();
                        })
                    }
                }
            })
        }
    },
    computed:{
        rules:function(){
            return {
                fixedAreaName:[{ required: true, message: '请输入定区名称', trigger: 'blur' }],
                areaID:[{ required: true, message: '请选择区域', trigger: 'change' }],
            }
        }
    },
    created(){
        getArea().then(res=>{
            this.AreaList = res.data.data
        })
    },
    watch:{
        drawerValue:function(val){
            if(!val){
               // this.FixedArea = {};
                this.$refs.form.clearValidate();
            }
        }
    }
}
</script>

<style scope>
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