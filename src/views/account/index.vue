<template>
  <el-card>
     <bread-crumb slot='header'>
        <template slot='title'>账户信息</template>
     </bread-crumb>
     <!-- 上传组件 -->

     <el-upload class="head-upload" action="" :show-file-list="false">
       <img src="../../assets/lmx2.png" alt="">
     </el-upload>
     <!-- 放置组件 -->
     <el-form style="maring-left:100px" label-width="100px">
        <el-form-item label="用户名">
          <el-input style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input disabled style="width:30%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存信息</el-button>
        </el-form-item>

     </el-form>
  </el-card>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
    .head-upload {
      position: absolute;
      right: 300px;
      img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
      }
    }
</style>
