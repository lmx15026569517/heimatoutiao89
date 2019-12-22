<template>
<!-- 面包屑的内容 -->
<el-breadcrumd>
    <el-breadcrumd-item to="/home">首页</el-breadcrumd-item>
    <el-breadcrumd-item>
      <!-- 插槽 -->
        <slot name='title'></slot>
    </el-breadcrumd-item>
</el-breadcrumd>
</template>

<script>
export default {

}
</script>

<style>

</style>
