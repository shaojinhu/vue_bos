<template>
    <div style="text-align:left;line-height:normal;">
        <el-row :gutter="20">
            <el-col :span="12">
                <!-- 公共栏 -->
                <el-card class="box-card">
                    <div slot="header">
                        <span><i class="el-icon-edit"></i>公共栏</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>
                    <div>
                        内容
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <!-- 预警信息 -->
                <el-card class="box-card">
                    <div slot="header">
                        <span><i class="el-icon-edit"></i>预警信息</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>
                    <div>
                        内容
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <!-- 待办事宜 -->
                <el-card class="box-card" style="margin-top:10px;">
                    <div slot="header">
                        <span><i class="el-icon-edit"></i>待办事宜</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>
                    <div>
                        内容
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <!-- 系统bug反馈 -->
                <el-card class="box-card" style="margin-top:10px;">
                    <div slot="header">
                        <span><i class="el-icon-edit"></i>系统bug反馈</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>
                    <div>
                        内容
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:"home"
}
</script>
<style scoped>
    .box-card{
        height:200px;
    }
</style>