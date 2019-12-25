<template>
    <div style="text-align:left;">
        <el-card>
            <el-row style="height:40px;line-height:40px;margin-bottom:5px;">
                <el-button
                    size="small"
                    type="success"
                    icon="el-icon-circle-plus-outline"
                    @click="ParentEditOrAdd()">添加</el-button>
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
        <el-card :class="{isShow:isShow}" style="margin-top:5px">
            <el-row style="height:40px;line-height:40px;margin-bottom:5px;">
                <el-button
                    size="small"
                    type="success"
                    icon="el-icon-circle-plus-outline"
                    @click="SubEditOrAdd()">添加</el-button>
            </el-row>
            <!-- 子档案 -->
            <columnTable :columns="childrenTableColumns" 
                        :tableData="childrenData" 
                        :loading="loading"  
                        :isHide="true"
                        :param="childrenParam"
                        :handleEdit="SubEditOrAdd"
                        :handleDelete="SubDelete"
                        :listFunc="()=>{}"
                        ></columnTable>
        </el-card>

        <basic-file-setting-edit-or-add ref="BasicFileSettingEditOrAdd"></basic-file-setting-edit-or-add>
        <sub-archive-add-or-edit ref="SubArchiveAddOrEdit"></sub-archive-add-or-edit>
    </div>
</template>
<script>
import { getParentList,deletePerentArchive,getSubArchiveByParentId,deleteSubArchive } from "@/api/basic/archive.js"
export default {
    name:"BasicFileSettings",
    data(){
        return{
            //子档案的列
            childrenTableColumns:[
                {type:'index',label:'序号',align:'center',width:'100'},
                {prop:'subArchiveName',label:'子档案名称',align:'center'},
                {prop:'mnemonicCode',label:'助记码',align:'center'},
                {prop:'seal',label:'封存标志(是否封存)',align:'center',slot:true},
                {prop:'remark',label:'描述',align:'center'},
                {prop:'operatingCompany',label:'操作单位',align:'center'},
                {prop:'operatingTime',label:'操作时间',align:'center'},
                {prop:'operator',label:'操作人',align:'center'}
            ],
            //子档案分页的参数
            childrenParam:{total:0,size:5,page:1},
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
            parentParam:{total:0,size:5,page:1},
            //父档案数据
            parentTableData:[],
            loading:false,
            //临时存储父档案
            targetParent:null,
            //决定是否展示子档案
            isShow:true
        }
    },
    methods:{
        //父答案的添加和编辑
        ParentEditOrAdd(data){
            if(data == null){
                this.$refs.BasicFileSettingEditOrAdd.drawerValue = true;
                this.$refs.BasicFileSettingEditOrAdd.parentArchive = {};
            }else{
                this.$refs.BasicFileSettingEditOrAdd.drawerValue = true;
                this.$refs.BasicFileSettingEditOrAdd.parentArchive = data;
            }
        },
        //父档案的删除
        ParentDelete(row){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               deletePerentArchive(row).then(res=>{
                if(res.data.code == 10000){
                    this.$message({message:res.data.message,type:"success"})
                    this.getParentList(this.parentParam);
                }else{
                    this.$message({message:res.data.message,type:"error"})
                }
            })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //双击父档案的行进行显示子档案
        ParentToChildren(row,column,event){
            this.targetParent = row;
            this.parentParam.parentid = row.id;
            getSubArchiveByParentId(this.parentParam).then(res=>{
                console.log(res);
                if(res.data.code == 10000){
                    this.childrenData = res.data.data.rows;
                    this.childrenParam.total = res.data.data.total;
                }
            })
        },
        getSubArchive(){
            getSubArchiveByParentId(this.parentParam).then(res=>{
                console.log(res);
                if(res.data.code == 10000){
                    this.childrenData = res.data.data.rows;
                    this.childrenParam.total = res.data.data.total;
                }
            })
        },
        //父档案列表数据
        getParentList(data){
            getParentList(data).then(res=>{
                if(res.data.code == 10000){
                    this.parentTableData = res.data.data.rows;
                    this.parentParam.total = res.data.data.total;
                }else{
                    this.$message({message:res.data.message,type: 'error'});
                }
            })
        },
        //子档案的编辑和添加
        SubEditOrAdd(data){
            console.log(data);
            //首先检查是否选中了父级
            if(this.targetParent != null){
                if(data){//修改
                    this.$refs.SubArchiveAddOrEdit.SubArchive = data;
                    this.$refs.SubArchiveAddOrEdit.drawerValue = true;
                    this.$refs.SubArchiveAddOrEdit.targetParent = this.targetParent;
                }else{//添加
                    this.$refs.SubArchiveAddOrEdit.SubArchive = {};
                    this.$refs.SubArchiveAddOrEdit.drawerValue = true;
                    this.$refs.SubArchiveAddOrEdit.targetParent = this.targetParent;
                }
            }else{
                this.$message({message:"请先双击选择父档案",type:"warning"});
            }
        },
        //子档案的删除
        SubDelete(row){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               deleteSubArchive(row).then(res=>{
                if(res.data.code == 10000){
                    this.$message({message:res.data.message,type:"success"})
                    this.getSubArchive();
                }else{
                    this.$message({message:res.data.message,type:"error"})
                }
            })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    },
    watch:{
        //用于监听表格的loading是否打开
        tableData:function(val){
            if(val != null){
                this.loading = false;
            }
        },
        //监听子档案是否展示
        targetParent:function(val){
            if(val != null){
                this.isShow = false;
            }else{
                this.isShow = true;
            }
        }
    },
    mounted(){
        
    },
    components:{
        BasicFileSettingEditOrAdd:()=>import("@/views/basicdata/BasicFileSettings/BasicFileSettingEditOrAdd.vue"),
        SubArchiveAddOrEdit:()=>import("@/views/basicdata/BasicFileSettings/SubArchiveAddOrEdit.vue")
    }
}
</script>
<style scoped>
    .isShow{
        display: none;
    }
</style>
<style>
    .el-card__body{
        padding:15px;
    }
</style>