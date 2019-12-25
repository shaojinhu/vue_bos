<template>
    <div>
        <el-card style="margin:0 auto;">
        <el-row style="height:40px;line-height:40px;margin-bottom:5px;">
            <el-col :span="24">
                <el-button
                size="small"
                type="success"
                icon="el-icon-circle-plus-outline"
                @click="handleAdd">添加</el-button>
                <el-popover
                    placement="bottom"
                    style="margin-left:10px;"
                    v-model="visible"
                    @after-leave="()=>{this.uoloadList = []}">
                    <p style="color:#929A27;padding:0px;margin:0px;">请选择要上传的文件</p>
                    
                    <el-upload
                        ref="upload"
                        class="upload-demo"
                        name="file"
                        drag
                        action="http://localhost:9001/area/upload"
                        :headers="{'Authorization':'Bearer '+getAuthToken()}"
                        :multiple="false"
                        :limit="1"
                        accept=".xls,.xlsx"
                        :file-list="uploadList"
                        :auto-upload="false"
                        :on-exceed="uploadExceed"
                        :on-change="uploadChange"
                        :on-error="uploadError"
                        :on-success="uploadSuccess">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传excel文件，且不超过50MB</div>
                    </el-upload>


                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="uploadFile">确定</el-button>
                    </div>
                    <el-button type="success" size="small" icon="el-icon-upload2" slot="reference">导入</el-button>
                </el-popover>
            </el-col>
        </el-row>
        
        
        <el-table
            :data="tableData"
            style="width: 100%" 
            max-height="640"
            border> 
            <!-- 编号 -->
            <el-table-column type="index" width="50"></el-table-column>
            <!-- 省 -->
            <el-table-column 
                prop="province"
                label="省" 
                width="180">
            </el-table-column>
            <!-- 市 -->
            <el-table-column 
                prop="city"
                label="市" 
                width="180">
            </el-table-column>
            <!-- 城市编码 -->
            <el-table-column 
                prop="cityCode"
                label="城市编码" 
                width="180">
            </el-table-column>
            <!-- 区/县 -->
            <el-table-column 
                prop="district"
                label="区/县" 
                width="180">
            </el-table-column>
            <!-- 邮政编码 -->
            <el-table-column 
                prop="postCode"
                label="邮政编码" 
                width="180">
            </el-table-column>
            <!-- 简码 -->
            <el-table-column 
                prop="brevityCode"
                label="简码" 
                width="180">
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="success"
                        icon="el-icon-edit"
                        @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)"
                        icon="el-icon-delete-solid">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin: 10px;text-align: center;">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="param.total"
                :hide-on-single-page="value"
                :page-size="param.size"
                @current-change="currentChange">
            </el-pagination>
        </div>
        </el-card>
        
        <add-or-edit-area ref="AddOrEditArea"></add-or-edit-area>
    </div>
</template>
<script>

import { getAreaList,deleteArea } from "@/api/basic/area.js"
import { getToken } from '@/utils/cookies.js';
//引入服务loading
import { Loading } from 'element-ui';
export default {
    name:"pageRange",
    data(){
        return{
            //列表数据
            tableData:[],
            param:{page:1,size:5,total:1},
            value:false,
            visible:false,
            loading:{},//全局loading
            uploadList:[]
        }
    },
    methods:{
        //添加文件时的钩子
        uploadChange(file,fileList){
            if(file.raw.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
                //移除文件
                this.$refs.upload.uploadFiles = [];
                //只可以上传为excel的文件
                this.$message({message:"只可以上传*.xls、*.xlsx的文件",type:"warning"});
                return false;
            }
            if(file.size / 1024 / 1024 > 50){
                this.$refs.upload.uploadFiles = [];
                this.$message.error("上传的文件不能超过50MB");
                return false;
            }
        },
        //超出文件数量
        uploadExceed(files,fileList){
            this.$message({message:"超出允许上传的文件数量",type:"warning"});
            return false;
        },
        //获取token
        getAuthToken(){
            return getToken();
        },
        //文件上传成功的钩子
        uploadSuccess(response,file,fileList){
            this.loading.close();//关闭全局loading
            this.$message({message:"上传成功",type:"success"});
            this.visible = false;
            this.$refs.upload.uploadFiles = [];
            console.log(response);
            if(response.code == 10027){
                this.$notify({title: '提示',message:response.message,duration: 0});
            }else if(response.code == 10001){
                this.$notify({title: '提示',message: response.message,duration: 0});
            }else{
                this.$notify({title: '提示',message: response.message,duration: 0});
            }
        },
        //文件上传失败的钩子
        uploadError(err,file,fileList){
            this.loading.close();
            this.$message({message:"导入失败",type:"error"});
        },
        //上传文件
        uploadFile(){
            this.$confirm('文件一旦提交，无法修改！！ 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(this.$refs.upload.uploadFiles == null){
                    this.$message({message:"请选择文件",type:"warning"});
                    return false;
                }
                this.$refs.upload.submit();//进行提交
                this.loading = Loading.service({//添加全局loading
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: '已取消'
                });          
            });
        },
        //修改 
        handleUpdate(data){
            this.$refs.AddOrEditArea.Area = data;
            this.$refs.AddOrEditArea.dialogFormVisible = true;
        },
        //删除
        handleDelete(data){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteArea(data).then(res=>{
                     if(res.data.code == 10000){
                        this.$message({message:res.data.message,type:"success"})
                        this.getAreaList();
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
        //添加
        handleAdd(){
            this.$refs.AddOrEditArea.Area = {};
            this.$refs.AddOrEditArea.dialogFormVisible = true;
        },
        //获得列表
        getAreaList(){
            getAreaList(this.param).then(res=>{
               this.tableData = res.data.data.rows;
               this.param.total = res.data.data.total;
            })
        },
        //页码发生改变时
        currentChange(page){
            this.param.page = page;
            this.getAreaList();
        },
    },
    created(){
        this.getAreaList();
    },
    watch:{
        tableData:function(val){
            if((this.param.total / this.param.size) <= 1){
                    this.value = true;
            }
        }
    },
    components:{
        AddOrEditArea:()=>import("@/views/basicdata/pageRange/AddOrEditArea.vue")
    }
}
</script>
<style scope>
</style>