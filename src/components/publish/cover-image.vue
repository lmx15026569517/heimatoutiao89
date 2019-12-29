<template>
  <div class='cover-image'>
    <!-- 根据封面的images长度 进行渲染 一个或者3个或者不渲染 -->
    <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class='cover-item'>
        <img :src="item ? item : defaultImg" alt="">
    </div>
    <!-- 生成的元素在body上用visible控制显示 -->
    <el-dialog :visible="dialogVisible" @close="closeDialog">
      <!-- 选择素材的组件 -->
      <!-- 监听谁的事件就在谁的标签上写监听 -->
      <select-image @selectOneImg="receiveImg"></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'], // 接收属性
  data () {
    return {
      dialogVisible: false, //  弹层打开和关闭的变量
      defaultImg: require('../../assets/img/pic_bg.png'), // 将图片变成变量
      selectIndex: -1 // 默认下标是-1
    }
  },
  methods: {
    //  接收方法
    receiveImg (img) {
      //  props只能读不能改
      //  接收到数据发现list为props数据 要想修改再次传值
      this.$emit('clickOneImg', img, this.selectIndex) //  和上面的img没有关系
      this.closeDialog() //  直接关闭弹窗
    },
    openDialog (index) {
      this.selectIndex = index //  记住点击的下标
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
