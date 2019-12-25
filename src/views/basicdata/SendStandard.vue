<template>
    <div>
        <el-card>
            <el-row style="height:40px;line-height:40px;margin-bottom:5px;">
                <el-button
                    size="small"
                    type="success"
                    icon="el-icon-circle-plus-outline"
                    @click="EditOrAdd()">添加</el-button>
            </el-row>
            <!-- 收派标准 -->
            <columnTable :columns="TableColumns" :tableData="TableData" 
                        :loading="loading"  :isHide="true"  
                        :handleEdit="EditOrAdd"
                        :handleDelete="deleteStandard"
                        :param="param"
                        :listFunc="getList"></columnTable>
        </el-card>

        <add-or-edit-standard ref="AddOrEditStandard"></add-or-edit-standard>
    </div>
</template>
<script>
import { getStandardList,deleteStandard } from "@/api/basic/standard.js"
export default {
    name:"SendStandard",
    data(){
        return{
            TableColumns:[
                {type:'index',label:'序号',align:'center',width:'100'},
                {prop:'name',label:'标准名称',align:'center'},
                {prop:'minWeight',label:'最小重量(kg)',align:'center'},
                {prop:'maxWeight',label:'最大重量(kg)',align:'center'},
                {prop:'minLength',label:'最小长度(cm)',align:'center'},
                {prop:'maxLength',label:'最大长度(cm)',align:'center'},
                {prop:'operatingCompany',label:'操作单位',align:'center'},
                {prop:'operatingTime',label:'操作时间',align:'center'},
                {prop:'operator',label:'操作人',align:'center'}
            ],
            TableData:[],
            loading:false,
            param:{page:1,size:5,total:0}
        }
    },
    methods:{
        EditOrAdd(data){
            if(data){//修改
                this.$refs.AddOrEditStandard.Standard = data;
                this.$refs.AddOrEditStandard.drawerValue = true;
            }else{//添加
                this.$refs.AddOrEditStandard.Standard = {};
                this.$refs.AddOrEditStandard.drawerValue = true;
            }
        },
        deleteStandard(data){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type: 'warning'
            }).then(() => {
                deleteStandard(data).then(res=>{
                    if(res.data.code == 10000){
                        this.$message({message:res.data.message,type:"success"})
                        this.getList(this.param);
                    }else{
                        this.$message({message:res.data.message,type:"error"})
                    }
                });
            }).catch(() => {
                this.$message({type: 'info',message: '已取消删除'});          
            });
        },
        getList(data){
            getStandardList(data).then(res=>{
                if(res.data.code == 10000){
                    this.TableData = res.data.data.rows;
                    this.param.total = res.data.data.total;
                }
            })
        }
    },
    components:{
        AddOrEditStandard:()=>import("@/views/basicdata/SendStandard/AddOrEditStandard")
    }
}
</script>
<style scoped>
.el-card__body{
        padding:15px;
    }
</style>