<template>
    <div>
        <el-dialog title="添加或编辑权限" :visible.sync="dialogFormVisible" @close="()=>{}" 
            :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <el-form ref="permission" :rules="rules" :model="permission" label-width="100px" >

                <el-form-item label="权限名称" prop="pname">
                    <el-input v-model="permission.pname" placeholder="请输入权限名称" style="width:90%;"></el-input>
                </el-form-item>

                <el-form-item label="权限编码" prop="ppermiss">
                    <el-input v-model="permission.ppermiss" placeholder="请输入权限编码" style="width:90%;"></el-input>
                </el-form-item>

                <el-form-item label="权限描述" >
                    <el-input v-model="permission.pdesc" placeholder="请输入权限描述" style="width:90%;"></el-input>
                </el-form-item>

                <el-form-item label="是否可见">
                    <el-switch
                        v-model="isOk"
                        active-text="可见"
                        inactive-text="不可见"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>


                <el-form-item label="选择菜单">
                    <div style="max-height:240px;overflow:auto;" class="from">
                    <el-tree  
                        :default-expanded-keys="tree.expandedKeys" 
                        :current-node-key="tree.defaultNodeid"
                        :data="permissionTree" 
                        node-key="pid" 
                        check-on-click-node
                        render-after-expand
                        icon-class="el-icon-watermelon" 
                        :props="defaultProps" 
                        @node-click="handleNodeClick" 
                        :highlight-current="true"></el-tree>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false;">取消</el-button>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getPermissionList,updatePermission } from "@/api/system/permission.js"

export default {
    name:"EditPermission",
    data(){
        return{
            dialogFormVisible:false,
            targetPermission:{},
            //权限对象
            permission:{},
            //权限树
            permissionTree:[],
            defaultProps:{
                label:"pname",
                children:"childPerList"
            },
            tree:{
                //数据会先选中的树节点
                defaultNodeid:"",
                //默认展开的tree节点数组
                expandedKeys:[],
            },
            isOk:true
        }
    },
    methods:{
        //当树节点被点击是
        handleNodeClick(data,node,target){
            //设置parentid
            this.permission.parentid = data.pid;
            //设置权限类型
            if(data.pid == 0) {this.permission.ptype = 1;}
            else {this.permission.ptype = (parseInt(data.ptype)+1).toString();}
        },
        //提交表单
        handleSubmit(){
            this.$refs.permission.validate((vali)=>{
                if(vali){
                    //用户没有选择树节点，则为顶级菜单
                    if(this.permission.parentid == null) {
                        this.permission.parentid = 0;
                        this.permission.ptype = 1;
                    }
                    
                    if(this.isOk){
                        this.permission.isShow = 0
                    }else{
                        this.permission.isShow = 1
                    }

                    if(this.permission.ptype == 5){
                         this.$message({message:"只可以添加到API级别的权限，不能向下添加"});
                         return false;
                    }
                    //提交
                    updatePermission(this.permission).then(res=>{
                        if(res.data.code == 10000){
                            this.$message({message:res.data.message,type:"success"});
                            this.$parent.getPermission();
                        }else{
                            this.$message({message:res.data.message,type:"error"});
                        }
                        this.dialogFormVisible = false;
                    })
                }else{
                    this.$message({message:"表单验证失败,请从新填写表单",type:"warning"});
                    return false;
                }
            })
        }
    },
    computed:{
        rules:function(){
            return {
                pname: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
                ppermiss: [{ required: true, message: '请输入权限编码', trigger: 'blur' }]
            }
        }
    },
    mounted(){
    },
    watch:{
        //移除表单校验结果
        dialogFormVisible:function(val){
            if(val == false){
                this.$refs['permission'].clearValidate();
                this.tree.expandedKeys=[];//清空展开的数组
                this.tree.defaultNodeid = "";//清空选中的节点
                this.permissionTree = [];//清空权限树
                console.log("关闭时选中的节点id为：",this.defaultNodeid );
            }else{
                console.log("开始时选中的的节点id为",this.defaultNodeid)
                getPermissionList().then(res=>{this.permissionTree = res.data.data;})
            }
        },
        //修改则回显数据
        'permission.pid':function(val){
            if(val!=null){
                //回显是否可见按钮
                if(this.permission.isShow == 0){
                    this.isOk = true;
                }else{
                    this.isOk = false;
                }
                //回显tree
                this.tree.expandedKeys.push(val);
                this.tree.defaultNodeid =  val;
                console.log("选中的节点id为：", this.tree.defaultNodeid,this.tree.expandedKeys);
            }
        }
    }
}
</script>

<style scoped>
/* 滚动条样式 */
    .from::-webkit-scrollbar {/*滚动条整体样式*/
        width:5px;     /*高宽分别对应横竖滚动条的尺寸*/
        height:100%;
    }
    .from::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #535353;
    }
    .from::-webkit-scrollbar-track {/*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: #EDEDED;
    }
</style>