<template>
    <el-tabs>
        <el-tab-pane label="素材库" name="material">
           <div class='select-img-list'>
             <!-- 循环生成选择列表 -->
             <el-card class='img-card' v-for="item in list" :key="item.id">
               <!-- 点击图片封装调用方法  调用方法 将图片地址传出去 -->
                <img @click="clickLImg(item.url)" :src="item.url" alt="">
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

        <el-tab-pane label="上传图片" name="upload">
           <!-- 放置上传组件 el-upload  bug 因为没有加属性action -->
           <el-upload  class='upload' :http-request="uploadImg" action="" :show-file-list="false">
             <i class="el-icon-plus"></i>
           </el-upload>
        </el-tab-pane>

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
    //  上传
    uploadImg (params) {
      let data = new FormData() //  实例化对象
      data.append('image', params.file) //  添加文件参数
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(result => {
        // result.data.url  上传把图片传上去
        this.$emit('selectOneImg', result.data.url) // 自定义事件名在这里不需要强制小写
      })
    },
    //   点击图片触发
    clickLImg (url) {
      // alert(url)
      //  需要将url传出去  $emit 自定义事件 携带参数
      this.$emit('selectOneImg', url) //  自定义事件这里不需要强制小写
    },
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
        console.log(result)
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
  .upload {
    display: flex;
    justify-content: center;
    i {
      font-size: 50px;
      display: block;
      margin: 20px;
      padding: 60px;
      border: 1px dashed #ccc;
      border-radius: 4px;

    }
  }

</style>
