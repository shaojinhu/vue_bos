<template>
    <div style="text-align:left;">
        <el-card>
            <el-row>
                <el-button @click="isOk()" :plain="true" size="medium" type="success">默认按钮</el-button>
                <el-button @click="ParentEditOrAdd()" :plain="true" size="medium" type="info">添加档案</el-button>
            </el-row>
            <!-- 父档案 -->
            <columnTable :columns="parentTableColumns" :tableData="parentTableData" 
                        :loading="loading"  :isHide="true"  
                        :handleEdit="ParentEditOrAdd"
                        :handleDelete="ParentDelete"
                        :handlerowClick="ParentToChildren"
                        :param="parentParam"
                        :listFunc="getParentList"></columnTable>
        </el-card>
        <el-card style="margin-top:5px">
            <el-row>
                <el-button :plain="true" size="medium" type="success">默认按钮</el-button>
                <el-button :plain="true" size="medium" type="info">主要按钮</el-button>
            </el-row>
            <!-- 子档案 -->
            <!-- <columnTable :columns="childrenTableColumns" :tableData="childrenTableData" 
                         :loading="loading"  :isHide="false"></columnTable> -->
        </el-card>

        <basic-file-setting-edit-or-add ref="BasicFileSettingEditOrAdd"></basic-file-setting-edit-or-add>
    </div>
</template>
<script>
import { getParentList } from "@/api/basic/archive.js"
export default {
    name:"BasicFileSettings",
    data(){
        return{
            //子档案的列
            childrenTableColumns:[
                {type:'index',label:'序号',align:'center',width:'100'},
                {prop:'subArchiveName',label:'子档案名称',align:'center'},
                {prop:'mnemonicCode',label:'助记码',align:'center'},
                {prop:'mothballed',label:'封存标志',align:'center'},
                {prop:'remark',label:'描述',align:'center'},
                {prop:'operatingCompany',label:'操作单位',align:'center'},
                {prop:'operatingTime',label:'操作时间',align:'center'},
                {prop:'operator',label:'操作人',align:'center'}
            ],
            //子档案分页的参数
            childrenParam:{total:10,size:5,page:1},
            //子档案数据
            childrenData:[],
            //父档案的列
            parentTableColumns:[
                {type:'index',label:'序号',align:'center',width:'100'},
                {prop:'archiveName',label:'档案名称',align:'center'},
                {prop:'archiveNum',label:'档案编号',align:'center'},
                {prop:'hasChild',label:'是否分级',align:'center',slot:true},
                {prop:'remark',label:'描述',align:'center'},
                {prop:'operatingCompany',label:'操作单位',align:'center'},
                {prop:'operatingTime',label:'操作时间',align:'center'},
                {prop:'operator',label:'操作人',align:'center'},
            ],
            //父档案
            parentParam:{total:10,size:5,page:1},
            //父档案数据
            parentTableData:[],
            loading:false,
        }
    },
    methods:{
        //父答案的添加和编辑
        ParentEditOrAdd(data){
            if(data == null){
                console.log("添加");
                this.$refs.BasicFileSettingEditOrAdd.drawerValue = true;
                this.$refs.BasicFileSettingEditOrAdd.parentArchive = {};
            }else{
                console.log("修改",data);
                this.$refs.BasicFileSettingEditOrAdd.drawerValue = true;
                this.$refs.BasicFileSettingEditOrAdd.parentArchive = data;
            }
        },
        //父档案的删除
        ParentDelete(rowi,row){
            console.log("删除",rowi,row.subArchiveName)
        },
        //单机父档案的行进行显示子档案
        ParentToChildren(row,column,event){
            console.log("单机当前行",row,column,event)
        },
        //父档案列表数据
        getParentList(data){
            getParentList(data).then(res=>{
                if(res.data.code == 10000){
                    console.log(res);
                    this.parentTableData = res.data.data.rows;
                    this.parentParam.total = res.data.data.total;
                }else{
                    this.$message({message:res.data.message,type: 'error'});
                }
            })
        }
    },
    watch:{
        //用于监听表格的loading是否打开
        tableData:function(val){
            if(val != null){
                this.loading = false;
            }
        }
    },
    mounted(){
        
    },
    components:{
        BasicFileSettingEditOrAdd:()=>import("@/views/basicdata/BasicFileSettings/BasicFileSettingEditOrAdd.vue")
    }
}
</script>
<style scoped>

</style>
<style>
    .el-card__body{
        padding:15px;
    }
</style>