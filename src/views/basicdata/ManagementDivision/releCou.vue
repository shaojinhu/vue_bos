<template>
    <div>
        <el-dialog title="关联快递员" :visible.sync="dialogFormVisible" @close="()=>{this.isok = true;
        this.isoktwo = false}" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <div class="transfer">
                <template>
                    <el-transfer :titles="titleList" v-model="value" :data="data"></el-transfer>
                </template>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel()">取消</el-button>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getCourierID } from "@/api/basic/courier.js"
import { releCourierAndSubArea } from "@/api/basic/subarea.js"

export default {
    name:"releCou",
    data(){
        return{
            dialogFormVisible:false,
            titleList:['未关联','已关联'],
            //已关联快递员id
            value:[],
            //全部快递员数组
            data:[],
            courierList:[],
            subArea:{}
        }
    },
    methods:{
        //退出
        cancel(){
            this.dialogFormVisible = false;
        },
        //提交
        handleSubmit(){
            //处理数据
            console.log(this.value);
            this.subArea.courierIds = this.value.join(",");
            releCourierAndSubArea(this.subArea).then(res=>{
                if(res.data.code == 10000){
                    this.$message({message:res.data.message,type:"success"});
                    this.$parent.getSubAreaList();
                }else{
                    this.$message({message:res.data.message,type:"error"});
                }
                this.cancel();
            })
        }
    },
    created(){
        //获取全部快递员id
        getCourierID().then(res=>{this.courierList = res.data.data})
    },
    watch:{
        courierList:function(val){
            if(val != null){
                //处理数据
                this.courierList.forEach(item=>{
                    this.data.push({
                        key: item.id,
                        label:item.name,
                    })
                })
            }
        },
        subArea:function(val){
            if(val != null){
                this.subArea.couriers.forEach(item=>{
                    this.value.push(item.id);
                })
            }
        }
    }
}
</script>

<style scope>
.transfer{
    width:600px;
    margin:0 auto;
}
</style>