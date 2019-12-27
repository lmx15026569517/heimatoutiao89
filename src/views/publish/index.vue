<template>
  <el-card>
    <bread-crumd slot="head">
        <template slot="title">发表文章</template>
    </bread-crumd>
    <!-- 表单 label-width-->
    <el-form style="margin-left:50px">
        <el-form-item label="标题">
          <el-input style="width:60%"></el-input>
          </el-form-item>
        <el-form-item label="内容">
          <el-input type='textarea' :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="封面"></el-form-item>
        <el-form-item label="频道"></el-form-item>
        <el-form-item>
           <el-button type='primary'>发布</el-button>
           <el-button>存入草稿</el-button>
        </el-form-item>

    </el-form>
  </el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
