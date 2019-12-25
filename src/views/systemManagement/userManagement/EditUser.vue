<template>
    <div>
        <el-dialog title="编辑用户" :visible.sync="dialogFormVisible" @close="()=>{}" 
            :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <el-form ref="user" :rules="rules" :model="user" label-width="100px" >

                <el-form-item label="用户姓名" prop="nikename">
                    <el-input v-model="user.nikename" placeholder="请输入用户名称" style="width:90%;"></el-input>
                </el-form-item>

                <el-form-item label="用户账号" prop="username">
                    <el-input v-model="user.username" placeholder="请输入用户账号" style="width:90%;"></el-input>
                </el-form-item>

                <el-form-item label="用户密码" prop="password">
                    <el-input v-model="user.password" placeholder="请输入用户密码" style="width:90%;" show-password></el-input>
                </el-form-item>

                <el-form-item label="用户邮箱" prop="mail">
                    <el-input v-model="user.mail" placeholder="请输入用户邮箱" style="width:90%;"></el-input>
                </el-form-item>

                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="user.phone" placeholder="请输入手机号码" style="width:90%;" show-password></el-input>
                </el-form-item>
            
                <el-form-item label="用户部门" prop="roleArr">
                    <el-select v-model="user.depaId" @change="selectChange" placeholder="请选择用户部门">
                        <el-option
                            v-for="item in depa"
                            :key="item.did"
                            :label="item.dname"
                            :value="item.did"
                            @click.native="toDname(item.dname)">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <el-form ref="targetArr" :rules="target" :model="targetArr" label-width="100px">
                <el-form-item label="用户角色" prop="roleArr">
                    <el-select v-model="targetArr.roleArr" multiple placeholder="请选择用户角色">
                        <el-option
                            v-for="item in role"
                            :key="item.rid"
                            :label="item.rname"
                            :value="item.rid">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel()">取消</el-button>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getDepa } from "@/api/system/depa.js"
import { getRole } from "@/api/system/role.js"
import { updateUser } from "@/api/system/user.js"
export default {
    name:"AddOrEditUser",
    data(){
        var validateRole = (rule, value, callback) => {
            if (value.length == 0 || value == null) {
                callback(new Error('请选择用户角色'));
            } else {
                callback();
            }
        };
        var validateDepa = (rule, value, callback) => {
            if (value.length == 0 || value == null) {
                callback(new Error('请选择用户部门'));
            } else {
                callback();
            }
        };
        return{
            dialogFormVisible:false,
            //用户
            user:{},
            //部门
            depa:[],//depa集合获取所有的部门
            dname:"",//部门名称
            depaId:"",//部门id
            role:[],//role集合获取所有的角色
            targetArr:{
                roleArr:[]
            },
            rules:{
                nikename:[{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
                username:[{ required: true, message: '请输入用户账号', trigger: 'blur' }],
                password:[{ required: true, message: '请输入用户密码', trigger: 'blur' }],
                depaId:[{validator: validateDepa, trigger: 'change'}],
            },
            target:{
                roleArr:[{validator: validateRole, trigger: 'change'}]
            }
        }
    },
    methods:{
        //选中部门时获得部门id        
        selectChange(data){
            this.depaId = data;
        },
        //选中部门时获得部门name   
        toDname(data){
            this.dname = data;
        },
        //关闭
        cancel(){
            this.$refs.user.clearValidate();
            this.$refs.targetArr.resetFields();
            this.dialogFormVisible = false;
        },
        //提交
        handleSubmit(){
            //校验
            this.$refs.user.validate(userVali=>{
                if(userVali){
                    this.$refs.targetArr.validate(targetVali=>{
                        if(targetVali){
                            //准备数据
                            this.user.roleIds = this.targetArr.roleArr.join(",");
                            updateUser(this.user).then(res=>{
                                if(res.data.code == 10000){
                                    this.$message({message:res.data.message,type:"success"});
                                    this.$parent.getUser({dname:this.dname,did:this.depaId});
                                }else{
                                    this.$message({message:res.data.message,type:"error"});
                                }
                                this.dialogFormVisible = false;
                            })
                        }else{
                            this.$message({message:"检验表单未通过，请认真填写表单",type:"warning"})
                        }
                    });
                }else{
                    this.$message({message:"检验表单未通过，请认真填写表单",type:"warning"})
                }
            });
        }
    },
    watch:{
        dialogFormVisible:function(val){
            if(val){
                if(this.user.userid!=null){
                    console.log("部门id",this.user.depaId);
                    this.targetArr.roleArr.length = 0;
                    //处理回显用户的部门
                    // let depaAr = [];
                    // this.user.depaList.forEach(item=>{
                    //     depaAr.push(item.did);
                    // });
                    // this.targetArr.depaArr = depaAr;
                    //处理回显用户的角色
                    let roleAr = [];
                    this.user.roles.forEach(item=>{
                        roleAr.push(item.rid)
                    })
                    this.targetArr.roleArr = roleAr;
                }
            }
        }
    },
    created(){
        getDepa().then(res=>{this.depa = res.data.data;});
        getRole().then(res=>{this.role = res.data.data;});
    }
}
</script>
<style scoped>

</style>