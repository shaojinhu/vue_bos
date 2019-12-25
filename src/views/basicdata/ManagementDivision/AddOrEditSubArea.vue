<template>
    <div>
        <el-drawer
            :title="SubArea.id ? '修改分区信息' : '添加分区信息'"
            :visible.sync="drawerValue"
            :close-on-press-escape="false"
            :destroy-on-close="true"
            :show-close="false"
            :wrapperClosable="false"
            >
            <el-form ref="form" style="padding:10px" :model="SubArea" :rules="rules" label-width="95px" size="mini">
                
                <el-form-item label="选择区域" prop="areaId">
                    <el-select size="small" @change="selectChange" v-model="SubArea.areaId" placeholder="请选择区域">
                        <el-option :key="area.id" v-for="area in AreaList" :label="area.province + area.city + area.district" :value="area.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="选择定区" prop="fixedAreaId">
                    <el-select size="small" :disabled="isDis" v-model="SubArea.fixedAreaId" placeholder="请选择定区">
                        <el-option :key="fixedarea.id" v-for="fixedarea in FixedAreaList" :label="fixedarea.fixedAreaName" :value="fixedarea.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="分区关键字" prop="keyWord">
                    <el-input v-model="SubArea.keyWord" placeholder="请输入分区关键字"></el-input>
                </el-form-item>

                <el-form-item label="辅助关键字" prop="assistKeyWord">
                    <el-input v-model="SubArea.assistKeyWord" placeholder="请输入分区辅助关键字"></el-input>
                </el-form-item>

                <el-form-item label="单双号" prop="single">
                    <el-input v-model="SubArea.single" placeholder="请输入单双号码"></el-input>
                </el-form-item>

                <el-form-item label="起始号码" prop="startNum">
                    <el-input v-model="SubArea.startNum" placeholder="请输入起始号码"></el-input>
                </el-form-item>

                <el-form-item label="终止号码" prop="endNum">
                    <el-input v-model="SubArea.endNum" placeholder="请输入终止号码"></el-input>
                </el-form-item>

                <el-form-item label="负责人名称" prop="subAreaLeader">
                    <el-input v-model="SubArea.subAreaLeader" placeholder="请输入负责人名称"></el-input>
                </el-form-item>

                <el-form-item label="负责人部门" prop="company">
                    <el-input v-model="SubArea.company" placeholder="请输入负责人部门"></el-input>
                </el-form-item>

                <el-form-item label="负责人电话" prop="telephone">
                    <el-input v-model="SubArea.telephone" placeholder="请输入负责人电话"></el-input>
                </el-form-item>

            </el-form>

            <div class="demo-drawer_footer">
                <el-button @click="cancel()">取 消</el-button>
                <el-button type="primary" :disabled="isDis" @click="save()">提交</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { getArea } from "@/api/basic/area.js"
import { getFixedAreaByAreaId } from "@/api/basic/fixedarea.js"
import { addSubArea,updateSubArea } from "@/api/basic/subarea.js"

export default {
    name:"AddOrEditSubArea",
    data(){
        return{
            SubArea:{},
            drawerValue:false,
            AreaList:[],
            FixedAreaList:[],
            isDis:true,
        }
    },
    methods:{
        //区域下拉框选中时
        selectChange(data){
            getFixedAreaByAreaId(data).then(res=>{
                console.log(res);
                if(res.data.data == null || res.data.data.length == 0){
                    this.$message({message:"该区域下无定区，请先添加定区",type:"warning"});
                    this.isDis = true;
                    this.FixedAreaList = [];
                    this.SubArea.fixedAreaId = ""
                }else{
                    this.FixedAreaList = res.data.data;
                    this.isDis = false;
                }
            })
        },
        //提交
        save(){
            this.$refs.form.validate(vali=>{
                if(vali){
                    if(this.SubArea.id){//修改
                    console.log(this.SubArea);
                        updateSubArea(this.SubArea).then(res=>{
                            if(res.data.code == 10000){
                                this.$message({message:res.data.message,type:"success"});
                                this.$parent.getSubAreaList();
                            }else{
                                this.$message({message:res.data.message,type:"error"});
                            }
                            this.cancel();
                        })
                    }else{//添加
                        addSubArea(this.SubArea).then(res=>{
                            if(res.data.code == 10000){
                                this.$message({message:res.data.message,type:"success"});
                                this.$parent.getSubAreaList();
                            }else{
                                this.$message({message:res.data.message,type:"error"});
                            }
                            this.cancel();
                        })
                    }
                }
            })
        },
        //关闭
        cancel(){
            this.SubArea = {};
            this.drawerValue = false;
            this.$refs.form.clearValidate();
            this.$parent.getSubAreaList();
        }
    },
    created(){
        //区域列表
        getArea().then(res=>{
            this.AreaList = res.data.data
        })
    },
    computed:{
        rules:function(){
            return{
                keyWord:[{ required: true, message: '请输入分区关键字', trigger: 'blur' }],
                assistKeyWord:[{ required: true, message: '请输入分区辅助关键字', trigger: 'blur' }],
                single:[{ required: true, message: '请输入单双号码', trigger: 'blur' }],
                startNum:[{ required: true, message: '请输入起始号码', trigger: 'blur' }],
                endNum:[{ required: true, message: '请输入终止号码', trigger: 'blur' }],
                areaId:[{ required: true, message: '请选择区域', trigger: 'change' }],
                fixedAreaId:[{ required: true, message: '请选择定区', trigger: 'change' }],
                subAreaLeader:[{ required: true, message: '请输入分区负责人', trigger: 'blur' }],
                telephone:[{ required: true, message: '请输入负责人电话', trigger: 'blur' }],
                company:[{ required: true, message: '请输入负责人所属部门', trigger: 'blur' }],
            }
        }
    },
    watch:{
        drawerValue:function(val){
            if(!val){
                this.$refs.form.clearValidate();
            }else{
                if(this.SubArea.id){
                     this.selectChange(this.SubArea.areaId)
                }
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