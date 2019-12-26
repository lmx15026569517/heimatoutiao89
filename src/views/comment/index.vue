<template>
<!-- 卡片组件 -->
 <el-card v-loading="true">
   <!-- 面包屑给了卡片的具名插槽 -->
   <bread-crumb slot="header">
      <!-- 插槽内容 -->
      <template slot="title">评论列表</template>
   </bread-crumb>
      <!-- body内容 -->
      <el-table :data="list">
         <!-- 列组件 label表头-->
        <el-table-column prop="title" width="600" label="标题"></el-table-column>
          <!-- 格式化属性 -->
        <el-table-column :formatterBool="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论"></el-table-column>
        <el-table-column label="操作">
          <!-- 放组件   作用域插槽row column $index-->

          <template slot-scope="obj">
            <el-button type='tsxt' size="snall">评论</el-button>
            <!-- 注册事件 -->
            <el-button type='tsxt' size="snall" @click="openOrClose(obj.row)">{{ obj.row.comment_status}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type='flex' justify="center" align="middle" style="height:80px">

        <el-pagination background layout="prev,pager,next"
          :current-page="10"
          :page-size="page.pageSize"
          :total="page.total"
          @current-change="changePage">
        </el-pagination>
      </el-row>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false, //  加载状态 默认关闭
      list: [],
      page: {
        // 专门放置分页数据
        total: 0, //  数据总条数
        pageSize: 10, // 默认每页10条
        currentPage: 1
      }
    }
  },
  methods: {
    //  页码改变事件
    changePage (newPage) {
      //  修改当前页码
      this.page.currentPage = newPage
      this.getComment()
    },
    // 请求评论列表
    getComment () {
      this.loaging = true //  打开
      //  axios 默认是get类型
      //  query  参数 /路由参数 地质参数 grt参数 axio params
      //  body 参数给data
      //  身份信息 headers
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results // 获取评论列表数据给本身
        this.page.total = result.data.total_count // 获取文章总条数
        // setTimeout(() => { this.loading = false }, 300)
        this.loading = false
      })
    },
    //  定义一个布尔值转化方法
    formatterBool (row, column, cellValue, index) {
      //  row  当前行数据
      // column 当前列属性
      //  当前单元格值
      //  index 当前下标
      return cellValue ? '正常' : '关闭'
    },
    // 打开或者关闭
    openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      //  $confirm 确认时进入then  取消时进入catch
      this.$confirm(`您确定要${mess}评论吗`).then(() => {
        //  用户确定要调用接口?
        this.$axios({
          //  用户确定要调用接口
          //  地址参数query参数url参数/路有参数=>  可以再params中写  也可以直接拼接到url地址上
          method: 'put',
          url: '/comments/status',
          params: {
            article_id: row.id
          },
          data: {
            allow_comment: !row.comment_status //  上面没有取反这里取反
          }
        }).then(result => {
          this.getComment()//  重新请求一次
        })
      })
    }
  },
  created () {
    //  调用请求数据方法
    this.getComment()
  }

}
</script>

<style>

</style>
