<template>
    <div>
        <el-dialog title="批量修改" :visible.sync="dialogFormVisible" @close="()=>{}" 
            :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <el-form ref="courier" :model="map" label-width="100px" >

                <el-form-item label="收派标准">
                    <el-select size="small" v-model="map.standardId" placeholder="请选择收派标准">
                        <el-option :key="standard.id" v-for="standard in StandardList" :label="standard.name" :value="standard.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收派时间">
                    <el-select size="small" v-model="map.takeTimeId" placeholder="请选择收派时间">
                        <el-option :key="take.id" v-for="take in takeTimeList" :label="take.name" :value="take.id"></el-option>
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
import { getStandard } from "@/api/basic/standard.js"
import { getStatusIsOk } from "@/api/basic/taketime.js"
import { batchCourier } from "@/api/basic/courier.js"
export default {
    name:"BatchEditCourier",
    data(){
        return{
            dialogFormVisible:false,
            map:{},
            StandardList:[],
            takeTimeList:[],
            Couriers:[],//快递员集合
        }
    },
    methods:{
        //提交
        handleSubmit(){
            if(this.map.standardId == null && this.map.takeTimeId==null){
                this.$message({message:"请选择要修改的信息",type:"warning"})
                return false;
            }
            //执行批量修改
            batchCourier({couriers:this.Couriers,map:this.map}).then(res=>{
                if(res.data.code == 10000){
                    this.$message({message:res.data.message,type:"success"});
                    this.$parent.getCourierList();
                }else{
                    this.$message({message:res.data.message,type:"error"});
                }
                this.cancel();
            })
        },
        //退出
        cancel(){
            this.Couriers = {};
            this.dialogFormVisible = false;
        }
    },
    watch:{
        dialogFormVisible:function(val){
            if(val){
                //获取收派标准
                getStandard().then(res=>{this.StandardList = res.data.data});
                //获得收派时间
                getStatusIsOk().then(res=>{console.log(res);this.takeTimeList = res.data.data});
            }
        }
    }
}
</script>