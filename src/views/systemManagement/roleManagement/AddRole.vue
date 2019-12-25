<template>
    <div>
        <el-dialog title="添加角色" :visible.sync="dialogFormVisible" @close="()=>{}" 
            :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <el-form ref="role" :rules="rules" :model="role" label-width="100px" >

                <el-form-item label="角色名称" prop="rname">
                    <el-input v-model="role.rname" placeholder="请输入权限名称" style="width:90%;"></el-input>
                </el-form-item>

                <el-form-item label="角色描述" prop="rdesc">
                    <el-input v-model="role.rdesc" placeholder="请输入权限描述" style="width:90%;"></el-input>
                </el-form-item>


                <el-form-item label="分配权限">
                    <div style="max-height:300px;overflow:auto;" class="from">
                    <el-tree  
                        ref="tree"
                        :data="permissionTree" 
                        show-checkbox
                        node-key="pid"
                        icon-class="el-icon-watermelon" 
                        :props="defaultProps" 
                        @node-click="handleNodeClick"
                        @check-change="checkChange"></el-tree>
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
import { getPermissionList } from "@/api/system/permission.js"
import { addRole } from "@/api/system/role.js"

export default {
    name:"AddRole",
    data(){
        return{
            dialogFormVisible:false,
            //权限对象
            role:{},
            //权限树
            permissionTree:[],
            defaultProps:{
                label:"pname",
                children:"childPerList"
            },
            permissionList:[]
        }
    },
    methods:{
        //当树节点被点击是
        handleNodeClick(data,node,target){
            console.log("点击节点");
            this.permissionList = this.$refs.tree.getCheckedKeys();
            this.permissionList.push(this.$refs.tree.getHalfCheckedKeys());
        },
        //树节点被选中时
        checkChange(data,node,target){
            console.log("节点被选中")
            this.permissionList = this.$refs.tree.getCheckedKeys();
            this.permissionList.push(this.$refs.tree.getHalfCheckedKeys());
        },
        //提交表单
        handleSubmit(){
            this.$refs.role.validate((vali)=>{
                if(vali){
                    //用户没有选择树节点，则为顶级菜单
                    this.role.permissionIds = this.permissionList.join(",");
                    if(this.permissionList.length == 0 || this.role.permissionIds == "") {
                        this.$message({message:"添加角色请分配权限",type:"error"});
                        return false;
                    }
                    console.log(this.role);
                    //提交
                    addRole(this.role).then(res=>{
                        if(res.data.code == 10000){
                            this.$message({message:res.data.message,type:"success"});
                            this.$parent.getRole();
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
                rname: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
                rdesc: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
            }
        }
    },
    created(){
        
    },
    watch:{
        //移除表单校验结果
        dialogFormVisible:function(val){
            if(val == false){
                this.$refs['role'].clearValidate();
                this.permissionTree = [];
                this.permissionList = [];
            }else{
                getPermissionList().then(res=>{this.permissionTree = res.data.data;})
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