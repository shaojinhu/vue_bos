<template>
    <div>
        <el-dialog :title="Area.id ? '编辑区域' : '添加区域'" :visible.sync="dialogFormVisible" @close="()=>{this.isok = true;
        this.isoktwo = false}" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <el-form label-width="100px" >
                <el-form-item label="选择城市">
                    <el-cascader
                        size="large"
                        :options="options"
                        v-model="targetArea"
                        placeholder="请选择城市"
                        @change="handleChange">
                    </el-cascader>
                </el-form-item>
            </el-form>
            <el-form :model="Area" label-width="100px" >
                <el-form-item label="省">
                    <el-input disabled v-model="Area.province" placeholder="请输入省"></el-input>
                </el-form-item>
                <el-form-item label="市">
                    <el-input disabled v-model="Area.city" placeholder="请输入市"></el-input>
                </el-form-item>
                <el-form-item label="区/县">
                    <el-input disabled v-model="Area.district" placeholder="请输入区/县"></el-input>
                </el-form-item>
                <el-form-item label="邮政编码">
                    <el-input v-model="Area.postCode" placeholder="请输入邮政编码"></el-input>
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
//引入省市区三级联动组件
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'

import { addArea,updateArea } from "@/api/basic/area.js"
export default {
    name:"AddOrEditArea",
    data(){
        return{
            options:regionDataPlus,//三级联动
            dialogFormVisible:false,
            Area:{},
            targetArea:[]
        }
    },
    methods:{
        //选择城市时
        handleChange(val){
            console.log("三级联动选择时",val);
            let sheng = val[0];//省编码
            let shi = val[1];//市编码
            let qu = val[2];//区编码
            this.Area.province = CodeToText[sheng];
            this.Area.city = CodeToText[shi];
            this.Area.district = CodeToText[qu];
            console.log(this.targetArea);
            this.Area.cityCode = shi;
        },  
        // getLatLng(address){ //传入地址名称
        //     //根据城市名称获得经纬度
        //     this.$jsonp(`http://api.map.baidu.com/geocoding/v3/`,
        //     {address:address,output:'json',ak:'YinGhOQG3Q4VvFxOpO7jWIQhkWUqaUtG'}).then(res=>{
        //         let lat = res.result.location.lat;
        //         let lng = res.result.location.lng;
        //         //console.log(lng,lat)
        //         //根据城市名称的经纬度获得城市编码
        //         //console.log("11",lat,lng);
        //         this.$jsonp(`http://api.map.baidu.com/reverse_geocoding/v3/?ak=YinGhOQG3Q4VvFxOpO7jWIQhkWUqaUtG&output=json&coordtype=wgs84ll&location=${lat},${lng}`,
        //         ).then(res=>{
        //             console.log("城市简码",res);
        //         })
        //     });
        // },
        //this.getLatLng("北京朝阳区");

        //提交
        handleSubmit(){
            if(this.targetArea == null || this.targetArea.length == 0){
                this.$message({message:"请选择城市",type:"warning"});
                return false;
            }
            if(this.Area.postCode == null || this.Area.postCode == ""){
                this.$message({message:"请输入邮政编码",type:"warning"});
                return false;
            }
            console.log(this.Area);
            if(this.Area.id){//修改
                console.log('修改');
                updateArea(this.Area).then(res=>{
                    if(res.data.code == 10000){
                        this.$message({message:res.data.message,type:"success"});
                        this.$parent.getAreaList();
                    }else{
                        this.$message({message:res.data.message,type:"error"});
                    }
                    this.cancel();
                })
            }else{//添加
                console.log('添加');
                addArea(this.Area).then(res=>{
                    if(res.data.code == 10000){
                        this.$message({message:res.data.message,type:"success"});
                        this.$parent.getAreaList();
                    }else{
                        this.$message({message:res.data.message,type:"error"});
                    }
                    this.cancel();
                })
            }

        },
        cancel(){
            this.Area = {};
            this.dialogFormVisible = false;
        }
    },
    computed:{

    },
    watch:{
        //回显三级联动下拉框
        'Area.id':function(val){
            if(val != null){
                let arr = [];
                let sheng = TextToCode[this.Area.province];
                let shi = TextToCode[this.Area.province][this.Area.city];
                let qu = TextToCode[this.Area.province][this.Area.city][this.Area.district];
                arr.push(sheng.code);
                arr.push(shi.code);
                arr.push(qu.code);
                this.targetArea = arr;
            }else{
                this.targetArea = [];
            }
        }
    }
}
</script>
<style scoped>

</style>