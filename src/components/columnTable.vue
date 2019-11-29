<template>
<!-- 公共的组件table -->
    <div>
        <el-table
                :data="tableData"
                :border="true"
                :highlight-current-row="true"
                style="width: 100%"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                @row-dblclick="rowClick">
                <!-- 平常的字段 -->
                <template v-for="(col,index) in columns" >
                    <!-- 不使用插槽域 -->
                    <el-table-column 
                        v-if="!col.slot"
                        :key="index"
                        :type="col.type || null" 
                        :label="col.label || null"
                        :prop="col.prop || null"
                        :width="col.width"
                        :align="col.align || 'left'"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    <!-- 使用插槽域 -->
                    <el-table-column 
                        v-if="col.slot == true"
                        :key="index"
                        :type="col.type || null" 
                        :label="col.label || null"
                        :prop="col.prop || null"
                        :width="col.width"
                        :align="col.align || 'left'"
                        :show-overflow-tooltip="true">
                        <template v-if="col.slot" slot-scope="scope">
                            <el-tag
                                effect="dark"
                                :type="scope.row[col.prop] === 0 ? 'success' : 'danger'"
                                disable-transitions
                                size="medium">
                                    {{ scope.row[col.prop] === 0 ? '是' : '否' }}
                                </el-tag>
                        </template>
                    </el-table-column>
                </template>
                <!-- 按钮部分 -->
                <template v-if="isHide">
                    <el-table-column
                        align="center">
                        <template slot="header">
                            <span>操作</span>
                        </template>
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="warning"
                            icon="el-icon-edit"
                            @click="Edit(scope.$index, scope.row)">修改</el-button>
                            <el-button
                            size="mini"
                            type="success"
                            icon="el-icon-delete"
                            @click="Delete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </template>
        </el-table>
        <el-pagination
        style="margin-top:5px;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="param.page"
            :page-size="param.size"
            :page-sizes="[5, 8, 12, 15]"
            layout="total,sizes,prev, pager, next, jumper"
            :total="param.total">
        </el-pagination>
    </div>
</template>

<script>

export default {
    name:"columnTable",
    props:{
        //表头数据
        columns:{
            type:Array,
            default:[]
        },
        //列表数据
        tableData:{
            type:Array,
            default:[]
        },
        //是否显示加载loading
        loading:{
            type:Boolean,
            default:true,
        },
        //是否使用修改和删除按钮 使用则需要传入 handleEdit 和  handleDelete事件
        isHide:{
            type:Boolean,
            default:false
        },
        //修改事件
        handleEdit:{
            type:Function,
            default:function(){return false}
        },
        //删除事件
        handleDelete:{
            type:Function,
            default:function(){return false}
        },
        //点击当前行
        handlerowClick:{
            type:Function,
            default:function(){return false}
        },
        //分页组件的各个属性
        param:{
            type:Object,
            default:{total:0,size:10,page:1}
        },
        listFunc:{
            type:Function //获得列表数据
        }
    },
    data(){
        return {

        }
    },
    methods:{
        //编辑
        Edit(rowi,row){
            console.log(row);
            this.handleEdit(row);
        },
        //删除
        Delete(rowi,row){
            this.handleDelete(rowi,row);
        },
        //当点击当前行
        rowClick(row,column,event){
            this.handlerowClick(row,column,event)
        },
        //当页容量变化的时候,返回参数为每页的页容量
        handleSizeChange(pageSize){
            console.log("切换页容量");
            this.param.size = pageSize;
            if(this.param.page == 1){
                this.listFunc(this.param);
            }
        },
        //当前页发生变化时
        handleCurrentChange(page){
            this.param.page = page;
            this.listFunc(this.param);
        }
    },
    created(){
        this.listFunc(this.param);
    }
    
}
</script>

<style scoped>

</style>