<template>
  <div id="login">
    <el-collapse-transition>
      <div id="centerBox" v-show="init">
        <!--        <el-collapse-transition>-->
        <!--            <div v-show="!init">-->

        <el-collapse-transition>
          <div v-show="successNotice">
            <div class="transition-box">
              <el-result :icon="resultNotice.iconStr" :title="resultNotice.titleStr">

                <template slot="extra">
                  <div style="margin: 5px;color: #7d7d7d;font-size: 5px" v-text="resultNotice.subTitle"></div>
                  <el-button type="primary" @click="successNotice=!successNotice;loading=!loading;" size="medium">返回
                  </el-button>
                </template>
              </el-result>
            </div>
          </div>
        </el-collapse-transition>


        <el-collapse-transition>
          <div v-show="!successNotice" v-loading="loading">

            <h1 style="text-align: center;padding-bottom: 30px"></h1>
            <el-form label-position="left" ref="parameter" :model="parameter" :rules="rules"
                     label-width="90px">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="parameter.username" clearable></el-input>
              </el-form-item>
              <el-form-item label="密 码" prop="password">
                <el-input v-model="parameter.password" show-password></el-input>
              </el-form-item>
              <!--              <el-form-item label="邮 箱" prop="email">-->
              <!--                <el-input v-model="parameter.email"></el-input>-->
              <!--              </el-form-item>-->
              <!--              <el-form-item label="所在地" prop="address">-->
              <!--                <el-input v-model="parameter.address"></el-input>-->
              <!--              </el-form-item>-->
              <!--              </br>-->
              <el-link href="/schoolHelp" style="float: left" type="primary">

              </el-link>

              <el-popover ref="popover" placement="right" title width="200" trigger="hover">
                <el-image
                    style="width: 100%; height: 100%"
                    src="https://files.catbox.moe/4c2y2a.jpg"
                    fit="fill"></el-image>
              </el-popover>
              <el-link style="float: right" v-popover:popover type="primary"></el-link>

            </el-form>
            <el-button type="primary" @click="submitData('parameter')" round>提 交</el-button>
          </div>
        </el-collapse-transition>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script scoped>

export default {
  data() {
    // let checkEmail = (rule, value, callback) => {
    //   const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    //   if (!value) {
    //     return callback(new Error('邮箱不能为空'))
    //   }
    //   setTimeout(() => {
    //     if (mailReg.test(value)) {
    //       callback()
    //     } else {
    //       callback(new Error('请输入正确的邮箱格式'))
    //     }
    //   }, 100)
    // };
    return {
      successNotice: false,
      loading: false,
      init: false,
      resultNotice: {
        iconStr: "error",
        titleStr: "提交失败",
        subTitle: "请根据提示进行操作",

      },
      parameter: {
        username: '',
        password: '',
        // email: '',
        address: ''
      },
      rules: {
        // email: [{
        //   required: true, // required就是这个框必须填写
        //   validator: checkEmail,
        //   trigger: 'blur'
        // }],
        address: [
          {required: true, min: 5, message: '长度必须大于5个字符', trigger: 'change'}
        ],
        password: [
          {required: true, min: 3, message: '长度必须大于3个字符', trigger: 'change'}
        ],
        username: [{
          required: true, min: 3, message: '长度必须大于3个字符', trigger: 'change'
        }]
      }
    }
  },
  methods: {
    submitData: function (parameter) {
      let that = this
      this.$refs[parameter].validate((valid) => {
        if (!valid) {
          this.$notify.error({
            title: '错误',
            message: '请填写完整的信息,以便可以正常的提交签到请求'
          });
          this.resultNotice.iconStr = "error";
          this.resultNotice.titleStr = "错误";
          this.resultNotice.subTitle = "请填写完整的信息,以便可以正常的提交签到请求";
          return;
        } else {
          that.loading = true
          this.postRequest("/api/user/login", this.parameter).then(function (response) {
            if (!response) {
              that.successNotice = !that.successNotice;
              that.resultNotice.iconStr = "error";
              that.resultNotice.titleStr = "登录失败";
              that.resultNotice.subTitle = "发生未知错误！请联系管理员";

            } else {
              const tokenStr = response.data.tokenHead + response.data.token;
              const parseList=response.data.token.split(".")
              //负载
              const payload=window.atob(parseList[1])

              //向vuex内存入token 并写入到sessionStorage
              that.$store.commit("setToken", tokenStr)
              // that.$store.commit("setUsername", payload.username)
              that.$store.commit("setPayload",payload)

              that.successNotice = !that.successNotice;
              that.resultNotice.iconStr = "success";
              that.resultNotice.titleStr = "登录成功";
              that.resultNotice.subTitle = "登录成功啦,3s后自动跳转~";

              that.$router.replace("/")
            }
          }).catch(function (error) {
            that.successNotice = true;
            that.$notify.info({
              title: "错误",
              message: error
            });
            that.resultNotice.iconStr = "error";
            that.resultNotice.titleStr = "错误";
            that.resultNotice.subTitle = error;
          });
        }
      })
    }
  },
  mounted() {
    let that = this
    this.$nextTick(() => {
      // console.log(that.init)
      // that.init = false
      setTimeout(function () {
        that.init = true
      }, Math.round(Math.random() * 500 + 100))
      document.getElementsByClassName("el-link")[0].text = "使用帮助"
      document.getElementsByClassName("el-link")[1].text = "联系作者"
      document.getElementsByTagName("h1")[0].innerText = "系统登录"
      document.getElementById('centerBox').className = "centerBox"
    });

  }
}
</script>
<style scoped>
#login {
  /*background: #7F7FD5; !* fallback for old browsers *!*/
  /*background: -webkit-linear-gradient(to bottom, #91EAE4, #86A8E7, #7F7FD5); !* Chrome 10-25, Safari 5.1-6 *!*/
  /*background: linear-gradient(to bottom, #91EAE4, #86A8E7, #7F7FD5); !* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ *!*/
  background-color: #0093E9;
  background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);

  width: 100%;
  height: 1000px;
  margin: 0;
  padding: 0
}

.centerBox {
  border-radius: 25px;
  padding: 40px;
  background-color: white;
  width: 40%;
  /*height: auto;*/
  margin: 0 auto; /*水平居中*/
  position: relative;
  top: 50%; /*偏移*/
  transform: translateY(-50%);
}

.el-form {
  margin-right: 5%;
  margin-left: 5%;
}

.el-button {
  background-color: #0093E9;
  background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
  width: 100%;
  margin-top: 20px;
}

</style>