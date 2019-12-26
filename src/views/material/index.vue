<template>
  <!-- 基本页面结构 -->
  <el-card v-loading=" loading">
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-row typu='flex' justify="end">
        <el-upload :http-reques="uploadImg">
          <el-button size="small" type="primary">点击上传<el-button>
        </el-upload>
    </el-row>
    <!-- 素材 -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <!-- 全部素材内容  定制内容自己写 -->
        <div class="img-list">
          <!-- v-for -->
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="operate" type="flex" align="middle" justify="space-around">
              <i class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
        <el-row type='flex' justify="center" style="height:80px" align="middle">
          <el-pagination background layout="prev, pager, next"
           :total="page.total"
           :current-page="page.currentPage"
           :page-size="page.pageSize"
           @current-change="changrPage"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <!-- 收藏素材内容  -->
        <div class="img-list">
          <!-- v-for -->
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
        <el-row type='flex' justify="center" style="height:80px" align="middle">
          <el-pagination background layout="prev, pager, next"
           :total="page.total"
           :current-page="page.currentPage"
           :page-size="page.pageSize"
           @current-change="changrPage"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <!-- 收藏素材 -->
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false, //  定义一个变量
      activeName: 'all', //  默认全部选中
      list: [], // 接收全部数据
      page: {
        currentPage: 1, // 当前页码
        pageSize: 8, // 每页条数
        total: 0 // 总条数
      }
    }
  },
  methods: {
    // 上传图片
    uploadImg (params) {
      this.loading = true // 打开进度条
      let form = new FormData()
      form.append('image', params.file) //  添加文件到formData
      this.$$axios({
        method: 'post',
        url: '/user/images',
        data: form // formData 数据
      }).then(result => {
        //  说明已经上传成功了一张图片
        this.loading = false //  关闭进度条
        this.getAllMaterial()
      })
    },

    //  切换分页
    changrPage (newPage) {
      this.page.currentPage = newPage //  得到一个最新页码
      this.getAllMaterial()
    },
    //  切换tab事件
    changeTab () {
      this.page.currentPage = 1 //  应该吧当前页码回到第一页  不会到第一页就会直接去知道不对应的代码
      this.getAllMaterial()
    },
    //  获取所有素材
    getAllMaterial () {
      //  all所有collect收藏都可以共用   this.activeName === "collect"
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 获取总条数
      })
    }
  },
  created () {
    this.getAllMaterial() //  第一进入 activeName 实际常的是全部素材
  }
}
</script>

<style lang='less' scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-card {
    width: 200px;
    height: 240px;
    margin: 20px 50px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      width: 100%;
      font-size: 20px;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: green;
      height: 30px;
    }
  }
}
</style>
