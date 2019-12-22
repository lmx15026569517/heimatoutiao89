<template>
  <!-- 放置一个最外层的容器 -->
  <el-container>
    <!-- 先左右布局 -->
   <el-aside style="background-color:#353b4e;min-height:100vh;width: 230px;">
     <!-- 放置一个左侧组件 -->
    <layout-aside></layout-aside>
   </el-aside>
   <!-- 再放el-container> -->
     <el-container>
       <!-- 上下布局 -->
       <el-header>
         <!-- 头部组件 -->
         <layout-header></layout-header>
         </el-header>
         <!-- 主要区域 -->
         <el-main style="padding:0">
           <!-- 主要区域  桌面没有显示图片 因为没有加容器 <router-view></router-view> -->
           <router-view></router-view>
         </el-main>
     </el-container>
  </el-container>
</template>

<script>
import layoutAside from '../../components/layout-aside' // 引入
import layoutHeader from '../../components/layout-header'// 引入
export default {
  components: {
    'layout-aside': layoutAside,
    'layout-header': layoutHeader
  }
}
</script>

<style>

</style>
