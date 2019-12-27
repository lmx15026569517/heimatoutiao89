<template>
  <el-card class='articles'>
    <bread-crumb slot='header'>
      <template slot='title'>文章列表</template>
    </bread-crumb>
    <!-- el-row 代表行 -->
    <el-row class='searchTool'>
        <el-col :span="2">
            <span>文章状态</span>
        </el-col>
        <el-col :span="18">
          <!-- 0-草稿 1待审核  2审核通过 3审核失败 4已删除 ,不传为全部 -->
           <!-- 单选框组 -->
            <el-radio-group v-model="formData.status">
              <!-- 全部5是默认的 ,在传参的时候判断一下是不是5 是5传null -->
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
          </el-col>
    </el-row>

    <el-row class='searchTool'>
        <el-col :span="2">
            <span>频道列表</span>
        </el-col>
        <el-col :sapn="18">
            <el-select v-model="formData.channel_id">
              <!-- 循环生成多个 el-option
                label 指的是el-option显示值
                value指的是 el-option的存储值
              -->
                <el-option v-for="item in channels" :key="item.id"
                 :label="item.name"
                 :value="item.id"></el-option>
            </el-select>
        </el-col>
    </el-row>
    <el-row class='searchTool'>
        <el-col :span="2">
            <span>时间选择</span>
        </el-col>
        <el-col :sapn="18">
            <el-date-picker
                v-model="formData.datRange"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </el-col>
    </el-row>
    <!-- 主体 -->
    <el-row class='total'>
        <span>共找到1000条符合条件的内容</span>
    </el-row>
        <!-- 循环的模板 -->
    <el-row v-for="item in 100" :key="item" class='article-item' type='flex' justify="space-between">

    <!-- <el-row>左侧 -->
        <el-col :span="14">
            <el-row type="flex">
                <img src="../../assets/img/404.png" alt="">
                <div class="info">
                  <span>年少有为不自卑</span>
                  <el-tag class='tag'>标签一</el-tag>
                  <span class='date'>2019-12-27 0:43:12:44</span>
                </div>
            </el-row>

        </el-col>
        <!-- 右侧 -->
        <el-col :span="6">
             <el-row class='right' type='flex' justify="end">
               <span><i class="el-icon-edit"></i>修改</span>
               <span><i class="el-icon-delete"></i>删除</span>
             </el-row>
        </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5, //  状态
        channels_id: null, //  默认选择
        datRange: []
      },
      channels: [] //  定义一个channels接收频道s
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
    }

  },
  created () {
    this.getChannels() // 调用频道 数据
  }
}
</script>

<style lang='less' scoped>
.articles {
  .searchTool {
    height: 30px;
    padding-left: 50px;
  }
  .total {
    margin:60px 0;
    border-bottom: 1px dashed #ccc;
    height: 60px;
  }
  .article-item {
    margin: 20px 0;
    padding: 10px 0;
    border-bottom:  1px solid #f2f3f5;
    img {
      width: 180px;
      height: 100px;
      margin-right: 10px;
      border-radius: 4px;
    }
    .info {
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between; //  竖直方向距离
      .tag {
        max-width:80px;
      }
      .date {
        color: #999;
        font-size: 12px;
      }
    }
    .right {
        span {
          margin-left:8px;
          font-size: 14px;
          cursor: pointer;
        }
    }
  }
}
</style>
