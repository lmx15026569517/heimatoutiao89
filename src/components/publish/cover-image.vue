<template>
  <div class='cover-image'>
    <!-- 根据封面的images长度 进行渲染 一个或者3个或者不渲染 -->
    <div @click="openDialog" v-for="(item,index) in list" :key="index" class='cover-item'>
        <img :src="item ? item : defaultImg" alt="">
    </div>
    <!-- 生成的元素在body上用visible控制显示 -->
    <el-dialog :visible="dialogVisible" @close="closeDialog">
      <!-- 选择素材的组件 -->
      <select-image></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'], // 接收属性
  data () {
    return {
      dialogVisible: false, //  弹层打开和关闭的变量
      defaultImg: require('../../assets/img/pic_bg.png') // 将图片变成变量
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true // 打开弹层
    },
    // 关闭
    closeDialog () {
      this.dialogVisible = false //  关闭弹层
    }
  }
}
</script>

<style lang='less' scoped>
  .cover-image {
    display: flex;
    margin: 20px 0;
    margin-left: 100px;
    .cover-item {
      border: 1px solid #ccc;
      width: 250px;
      height: 200px;
      padding: 10px;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }

</style>
