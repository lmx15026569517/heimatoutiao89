<template>
<!-- 面包屑的内容 -->
<el-breadcrumb separator=">">
    <el-breadcrumd-item to="/home">首页</el-breadcrumd-item>
    <el-breadcrumd-item>
      <!-- 具名插槽 -->
        <slot name='title'></slot>
    </el-breadcrumd-item>
</el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
