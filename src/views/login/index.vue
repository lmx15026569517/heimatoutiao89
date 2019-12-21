<template>
  <div class='login'>
    <!-- 卡片组件 -->
    <el-card class='login-card'>
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 登录表单容器 el-form  需要绑定model属性 rules属性绑定验证对象-->
      <el-form ref="myForm" style="margin-top:30px" :model="loginForm" :rules="loginRules">
        <!-- 表单域 el-form-item  一行 ,校验 通过proof 需要验证的字段名字-->
        <el-form-item prop="mobile">
        <!-- 放置具体的组件 登录手机号 v-model双向绑定数据对象 -->
        <el-input v-model="loginForm.mobile" placeHolder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- 表单域 -->
          <el-input v-model="loginForm.code" style="width:65%" placeHolder="请输入验证码"> </el-input>
          <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check">我已阅读同意条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <!-- 注册一个点击事件  有问题-->
          <el-button @click="submitLogin" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
// 在data定义表单数据对象
  data () {
    return {
    // 定义一个表单数据对象
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false // 是否勾选
      },
      loginRules: {
        // 验证规则 验证登录表单的 key(字段名):value(数组)
        // required true 必填  也可以换邮箱格式
        mobile: [{ required: true, message: '请输入您的手机号' }, {
          pattern: /^1[3456789]\d{9}$/, message: '手机号格式不对'
        }],
        code: [{ required: true, message: '请输入您的验证码' }, {
          pattern: /^\d{6}$/,
          message: '验证格式不正确'
        }],
        // 自定义函数
        check: [{ validator: function (rule, value, callback) {
          // rule当前的规则 没有什么用
          // value 值得就是我们需要校验的字段值
          if (value) {
            // 认为验证通过直接过去
            callback()// 直接执行callback 认为通过
          } else {
            // 验证不通过 提示信息
            callback(new Error('您必须无条件同意被我们坑'))// 验证不通过提示信息
          }
        } }]
      }
    }
  },
  methods: {
    //  提交登录表单
    submitLogin () {
      //  el-form实例
      this.$refs.myForm.validate((isOK) => {
        if (isOK) {
          // 认为前端校验登录表单成功
          // console.log('前端校验成功,发送用户名和密码到后校验成功')
          this.$axios({
            url: '/authorizations', // 请求地址
            method: 'post',
            data: this.loginForm
          }).then(result => {
            window.localStorage.setItem('user-token', result.data.data.token) // 前端缓存令牌
            this.$router.push('/home')
            // 成功后才会进入到then
          }).catch(() => {
            // 这个是一个elementUI的方法,和VUE没有关系
            this.$message({
              message: '您的手机号或者验证码不正确',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  background-image: url('../../assets/img/login_bg.jpg');
  // 100vh相当于当前可视区域100%高度
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-card {
    width: 440px;
    height: 350px;
  .title{
    text-align: center;
    img {
      height: 45px;
       }
     }
    }
  }
</style>
