<template>
  <el-card>
    <bread-crumd slot="head">
        <template slot="title">发表文章</template>
    </bread-crumd>
    <!-- 表单 label-width-->
    <el-form :model="formData" :rules="publishRules" style="margin-left:50px">
        <el-form-item ref="publishForm" prop="title" label="标题">
          <el-input v-model="formData.title" style="width:60%"></el-input>
          </el-form-item>
        <el-form-item prop="content" label="内容">
          <el-input v-model="formData.content" type='textarea' :rows="4"></el-input>
        </el-form-item>
        <!-- 绑定字段  字段定义的是prop -->
        <el-form-item prop="type" label="封面"></el-form-item>
        <!-- 单选组 v-model="封面类型"  -->
          <el-radio-group v-model="formData.cover.type">
            <el-radio :lagel="1">单图</el-radio>
            <el-radio :lagel="3">三图</el-radio>
            <el-radio :lagel="0">无图</el-radio>
            <el-radio :lagel="-1">自动</el-radio>
          </el-radio-group>
        <el-form-item prop="channel_id" label="频道">
          <el-select v-model="formData.channel_id">
            <el-option v-for="item in channels" :key="item.id" :value="item.value" :label="item.name">

            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
           <el-button @click="publishArticle()" type='primary'>发布</el-button>
           <el-button @click="publishArticle(true)">存入草稿</el-button>
        </el-form-item>

    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], //  定义一个channels接收频道
      formData: {
        title: '', //  文章 标题
        content: '', // 文章内容
        cover: {
          type: 0, //  封面类型 -1:自动  0无图. 1-1张  3-3张
          images: []//  存储的图片地址
        },
        channel_id: null // 频道id
      },
      publishRules: {
        // 校验规则对象 min max  (校验方法)
        title: [{ required: true, message: '标题不能为空' }, {
          min: 5, max: 30, message: '标题长度需要在5-30字符之间'
        }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道分类不能为空' }]
      }
    }
  },
  watch: {
    $route: function (to, from) {
      //  this 指向组件实例
      if (Object.keys(to.params).length) {
        //  有参数 修改
      } else {
        this.formData = {
          title: '', //  文章 标题
          content: '', // 文章内容
          cover: {
            type: 0, //  封面类型 -1:自动  0无图. 1-1张  3-3张
            images: []//  存储的图片地址
          }
        }
      }
    }
  },
  methods: {
    //  获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels //  获取频道数据
      })
    },
    publishArticle (draft) {
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          // 可以进行发布接口
          this.$axios({
            url: '/articles',
            method: 'post',
            params: { draft }, // query参数
            data: this.formData
          }).then(function () {
            //  新增成功 应该去内容列表
            this.$router.pusg('/home/articles') //  回到内容列表
          })
        }
      })
    },
    created () {
      this.getChannels() // 获取频道数据
    }
  }
}

</script>

<style>

</style>
