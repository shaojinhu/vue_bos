<template>
    <div>
        <el-card style="margin:0 auto;">
        
        <el-row style="height:40px;line-height:40px;margin-bottom:5px;">
            <el-col :span="24">
                <span>分区名称:&nbsp;&nbsp;&nbsp;</span>
                <el-input size="small" style="width:200px;margin-right:10px;" placeholder="请输入内容" v-model="param.keyWord" clearable > </el-input>
                <span>选择区域:&nbsp;&nbsp;&nbsp;</span>
                <el-select size="small" style="width:200px;margin-right:10px;" @change="selectChange" placeholder="请选择区域" v-model="param.areaId" clearable >
                        <el-option :key="area.id" v-for="area in AreaList" :label="area.province + area.city + area.district" :value="area.id"></el-option>
                </el-select>
                <span>选择区域:&nbsp;&nbsp;&nbsp;</span>
                <el-select size="small" style="width:200px;margin-right:10px;" :disabled="isDis" v-model="param.fixedAreaId" placeholder="请选择分区">
                    <el-option :key="fixedarea.id" v-for="fixedarea in FixedAreaList" :label="fixedarea.fixedAreaName" :value="fixedarea.id"></el-option>
                </el-select>
                <el-button
                    size="small"
                    type="primary"
                    :disabled="isDis"
                    icon="el-icon-search"
                    @click="handleSearch">搜索</el-button>
                    <el-button
                    size="small"
                    type="info"
                    icon="el-icon-refresh"
                    @click="resetSubArea">重置</el-button>
                    <el-button
                    size="small"
                    type="success"
                    icon="el-icon-circle-plus-outline"
                    @click="handleAdd">添加</el-button>
                    <el-popover
                        placement="bottom"
                        width="200"
                        style="margin-left:10px;"
                        trigger="click"
                        v-model="visible"
                        @after-leave="()=>{this.checkList = [];this.radio = '2';}">
                        <div>是否需要添加标题<br/>
                            <template>
                                <el-radio v-model="radio" label="1">是</el-radio>
                                <el-radio v-model="radio" label="2">否</el-radio>
                            </template>
                        </div>
                        <el-input :disabled="isDisTitle" size="mini" v-model="title" placeholder="请输入标题"></el-input>
                        <p style="padding:0px;margin:0px;color:#E6A23C;font-size:16px;">选择要导出的列</p>
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="分区关键字"></el-checkbox>
                            <el-checkbox label="分区辅助关键字"></el-checkbox>
                            <el-checkbox label="单双号码"></el-checkbox>
                            <el-checkbox label="起始号码"></el-checkbox>
                            <el-checkbox label="终止号码"></el-checkbox>
                            <el-checkbox label="分区负责人"></el-checkbox>
                            <el-checkbox label="分区负责人部门"></el-checkbox>
                            <el-checkbox label="电话号码"></el-checkbox>
                        </el-checkbox-group>
                        <div style="text-align:right; margin: 0">
                            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                            <el-button type="primary" size="mini" @click="exportSubArea">确定</el-button>
                        </div>
                        <el-button type="success" size="small" slot="reference" icon="el-icon-download">导出</el-button>
                    </el-popover>
            </el-col>
        </el-row>
        
        <el-table
            :data="tableData"
            style="width: 100%"
            max-height="500"
            border
            :indent="20"> 
            <!-- 编号 -->
            <el-table-column type="index" width="50"></el-table-column>
            <!-- 详情 -->
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-tag
                        style="margin:5px;"
                        v-for="item in props.row.couriers"
                        :key="item.id"
                        effect="dark">
                        {{ item.name }}
                    </el-tag>
                </template>
            </el-table-column>
            <!-- 分区关键字 -->
            <el-table-column 
                prop="keyWord"
                label="分区关键字" 
                width="160">
            </el-table-column>
            <!-- 分区辅助关键字-->
            <el-table-column
                prop="assistKeyWord"
                label="分区辅助关键字"
                width="160">
            </el-table-column>
            <!-- 单双号码-->
            <el-table-column
                prop="single"
                label="单双号码"
                width="160">
            </el-table-column>
            <!-- 起始号码-->
            <el-table-column
                prop="startNum"
                label="起始号码"
                width="160">
            </el-table-column>
            <!-- 终止号码-->
            <el-table-column
                prop="endNum"
                label="终止号码"
                width="160">
            </el-table-column>
            <!-- 分区负责人-->
            <el-table-column
                prop="subAreaLeader"
                label="分区负责人"
                width="160">
            </el-table-column>
            <!-- 分区负责人部门-->
            <el-table-column
                prop="company"
                label="分区负责人部门"
                width="160">
            </el-table-column>
            <!-- 分区负责人电话-->
            <el-table-column
                prop="telephone"
                label="电话">
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作" width="300">
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
                    <el-button
                        size="mini"
                        type="success"
                        icon="el-icon-edit"
                        @click="releCourier(scope.row)">关联快递员</el-button>
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

        <add-or-edit-sub-area ref="AddOrEditSubArea"></add-or-edit-sub-area>
        <rele-cou ref="releCou"></rele-cou>
    </div>
</template>
<script>
import { getSubAreaList,deleteSubArea,exportSubArea } from "@/api/basic/subarea.js" 
import releCou from "@/views/basicdata/ManagementDivision/releCou.vue"
import { getArea } from "@/api/basic/area.js"
import { getFixedAreaByAreaId } from "@/api/basic/fixedarea.js"

export default {
    name:"ManagementDivision",
    data(){
        return{
            tableData:[],
            param:{page:1,size:5,total:0},
            value:false,
            AreaList:[],
            FixedAreaList:[],
            isDis:false,
            checkList:[],
            visible:false,
            radio:"2",
            isDisTitle:true,
            title:"",
        }
    },
    methods:{
        //搜索方法
        handleSearch(){
            getSubAreaList(this.param).then(res=>{
                if(res.data.code == 10000){
                    if(res.data.data.total == 0){
                        this.$message({message:"没有找到符合条件的",type:"warning"});
                    }else{
                        this.$message({message:"查询成功",type:"success"});
                    }
                    this.tableData = res.data.data.rows;
                    this.param.total = res.data.data.total;
                }else{
                    this.$message({message:res.data.message,type:"error"});
                }
            })
        },
        //重置
        resetSubArea(){
            this.isDis = false;
            this.param = {page:1,size:5,total:0};
            getSubAreaList(this.param).then(res=>{
                if(res.data.code == 10000){
                    if(res.data.code == 10000){
                        this.$message({message:"重置成功",type:"success"});
                    }
                    this.tableData = res.data.data.rows;
                    this.param.total = res.data.data.total;
                }else{
                    this.$message({message:res.data.message,type:"error"});
                }
            })           
        },
        //当区域下拉框选中时
        selectChange(data){
            getFixedAreaByAreaId(data).then(res=>{
                if(res.data.data == null || res.data.data.length == 0){
                    this.$message({message:"该区域下无定区",type:"warning"});
                    this.isDis = true;
                    this.FixedAreaList = [];
                    this.param.fixedAreaId = ""
                }else{
                    this.FixedAreaList = res.data.data;
                    this.isDis = false;
                }
            })
        },
        //添加分区
        handleAdd(){
            this.$refs.AddOrEditSubArea.isDis = true;
            this.$refs.AddOrEditSubArea.drawerValue = true;
        },
        //获取分区列表
        getSubAreaList(){
            getSubAreaList(this.param).then(res=>{
                this.tableData = res.data.data.rows;
                this.param.total = res.data.data.total;
            })
        },
        //页码发生改变时
        currentChange(page){
            this.param.page = page;
            this.getSubAreaList();
        },
        //修改分区
        handleUpdate(data){
            this.$refs.AddOrEditSubArea.SubArea = data;
            this.$refs.AddOrEditSubArea.isDis = false;
            this.$refs.AddOrEditSubArea.drawerValue = true;
        },
        //删除分区
        handleDelete(data){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteSubArea(data).then(res=>{
                    if(res.data.code == 10000){
                        this.$message({message:res.data.message,type:"success"})
                        this.getSubAreaList();
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
        //关联快递员
        releCourier(data){
            this.$refs.releCou.subArea = data;
            this.$refs.releCou.dialogFormVisible = true;
        },
        //导出分区
        exportSubArea(){
            //判断是否由大标题
            if(!this.isDisTitle && this.title==null){
                this.$message({message:"请添加标题",type:"warning"});
                return false;
            }
            if(this.checkList.length == 0 || this.checkList == null){
                 this.$message({message:"请选择要导出的列",type:"warning"});
                return false;
            }
            console.log(this.checkList);
            exportSubArea({list:this.checkList,title:this.title}).then(res=>{
                // let blob = new Blob([res.data], {type: "application/vnd.ms-excel"});
                // let url = window.URL.createObjectURL(blob);
                // window.location.href = url;
                const blob = new Blob([res.data],{type: "application/vnd.ms-excel"});
                const fileName = "分区表.xlsx";
                const elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href);
                document.body.removeChild(elink);
                
                this.$message.success("导出成功！");
                this.visible=false;


            }).catch(e => {
                this.$message.error("导出失败");
                console.log(e);
                return false;
            })
        },
        toPush(data){
            console.log(data);
        }
    },
    watch:{
        tableData:function(){
            if((this.param.total / this.param.size) <= 1){
                    this.value = true;
            }
        },
        radio:function(val){
            if(val == "1"){
                this.isDisTitle = false;
            }else{
                this.title = "";
                this.isDisTitle = true;
            }
        }
    },
    created(){
        //获得分区列表
        this.getSubAreaList();
        //获得所有区域
        //区域列表
        getArea().then(res=>{
            this.AreaList = res.data.data
        })
        
    },
    components:{
        AddOrEditSubArea:()=>import("@/views/basicdata/ManagementDivision/AddOrEditSubArea.vue"),
        releCou
    }
}
</script>
<style scoped>

</style>