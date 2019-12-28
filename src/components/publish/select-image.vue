<template>
    <el-tabs>
        <el-tab-pane label="素材库" name="material">
           <div class='select-img-list'>
             <!-- 循环生成选择列表 -->
             <el-card class='img-card' v-for="item in list" :key="item.id">
                <img :src="item.url" alt="">
             </el-card>
           </div>
           <!-- 放置一个分页组件 -->
           <el-row type="flex" justify="center">
             <el-pagination background layout="prev, pager, next"
                :total="page.total"
                :current-page="page.currenPage"
                :page-size="page.pageSize"
                @current-change="changePage"
                ></el-pagination>
           </el-row>
        </el-tab-pane>
         <el-tab-pane label="上传图片" name="puload">上传图片</el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeNnme: 'material', //  默认选择素材库
      list: [], // 接收素材库数据
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }

    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    // 获取所有素材
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false, //  获取全部数据
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 赋值总数
      })
    }
  },
  created () {
    this.getAllImg() //  获取所有素材
  }
}
</script>

<style lang='less' scoped> // 换行的意思
  .select-img-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; //  居中
    .img-card {
      width: 120px;
      height: 120px;
      margin: 10px 20px;
      img {
        width: 100%;
      }
    }
  }

</style>
