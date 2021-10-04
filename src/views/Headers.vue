<template>
  <div>
    <el-row type="flex" align="middle">
      <el-col class="hidden-sm-and-down"          :md="1" :lg="1" :xl="1">
        <div class="content">
        </div>
      </el-col>
      <el-col class="hidden-xs-only"     :sm="2"  :md="2" :lg="2" :xl="2">
        <div class="content">
          <router-link :to="{path: '/'}">
            <img style="width: 100%;height: 100%"
                 src="../assets/logo.svg"/>
          </router-link>
        </div>
      </el-col>
      <el-col class="hidden-sm-and-down"          :md="3" :lg="3" :xl="5">
        <div class="content"></div>
      </el-col>
      <el-col               :xs="14"     :sm="13" :md="10" :lg="13" :xl="8">

        <div class="content">
          <!--            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">-->
          <!--            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">-->
          <el-menu :default-active="'/'" router class="el-menu-demo" mode="horizontal">
            <el-col :md="6" :sm="6" :xs="7">
              <el-menu-item index="/">首 页<i class="el-icon-s-home"></i></el-menu-item>
            </el-col>
            <el-col :md="6" :sm="6" :xs="8">
              <el-menu-item index="/apis">公共API<i class="el-icon-message-solid"></i></el-menu-item>
            </el-col>
            <el-col :md="6" :sm="6" :xs="9">
              <el-menu-item index="/message">个人中心<i class="el-icon-message-solid"></i></el-menu-item>
            </el-col>
            <el-col :md="6" :sm="6" :xs="0">
              <el-menu-item index="4"><a style="text-decoration: none" href="https://www.ele.me"
                                         target="_blank">订单管理 <i class="el-icon-s-order"></i></a></el-menu-item>
            </el-col>

          </el-menu>
        </div>
      </el-col>
      <el-col class="hidden-xs-only"     :sm="1"  :md="2" :lg="1" :xl="4">
        <div class="content"></div>
      </el-col>
      <el-col                :xs="10"    :sm="8"  :md="6" :lg="4" :xl="4">
        <div style="display: flex;align-items: center;">
          <el-button type="primary" size="small" v-show="loginState" style="height: 50%;margin-left: 1.5em" @click="$router.push('/postArticle')">投稿</el-button>
          <el-dropdown v-show="loginState" style="margin: auto;">
            <el-avatar  :size="60" :src="avatar" :key="avatar"></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <router-link style="text-decoration: none;" :to="{path:'/info'}">
                <el-dropdown-item>
                  个人资料
                </el-dropdown-item>
              </router-link>
              <el-dropdown-item @click.native="userLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <!--        <router-link v-show="!loginState" :to="{path:'/login'}">-->
          <!--        <router-link>-->
          <!--          登录-->
          <!--        </router-link>-->
          <el-button v-show="!loginState" size="small" style="margin: auto;" type="primary"
                     @click="isAlertLoginWindow=true">
            登录<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>

          <el-button v-show="!loginState" size="small" style="margin: auto;" type="primary"
                     @click="isAlertRegister=true">
            注册<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>


        </div>
      </el-col>

      <!--      登录弹窗-->
      <el-dialog
          title="登录"
          :visible.sync="isAlertLoginWindow"
          width="30%"
          center>
        <el-collapse-transition>
          <div v-show="notice">
            <el-result icon="warning" title="警告提示" subTitle="请根据提示进行操作">
              <template slot="extra">
                <el-button type="primary" size="medium" @click="notice=!notice">返回</el-button>
              </template>
            </el-result>
          </div>
        </el-collapse-transition>
        <el-collapse-transition>
          <div v-show="!notice">
            <el-form label-position="left" ref="userData" :model="userData" :rules="rules"
                     label-width="90px">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="userData.username" clearable></el-input>
              </el-form-item>
              <el-form-item label="密 码" prop="password">
                <el-input v-model="userData.password" show-password></el-input>
              </el-form-item>
              <el-link href="/schoolHelp" style="float: left" type="primary">
                帮助
              </el-link>

              <el-popover ref="popover" placement="right" title width="200" trigger="hover">
                <el-image
                    style="width: 100%; height: 100%"
                    src="https://files.catbox.moe/4c2y2a.jpg"
                    fit="fill"></el-image>
              </el-popover>
              <el-link style="float: right" v-popover:popover type="primary">
                联系作者
              </el-link>
            </el-form>
          </div>
        </el-collapse-transition>
        <span v-show="!notice" slot="footer" class="dialog-footer">
          <el-button @click="isAlertLoginWindow = false">取 消</el-button>
          <el-button type="primary" @click="submitData()">确 定</el-button>
        </span>


      </el-dialog>
      <!--      注册弹窗-->
      <el-dialog
          title="注册"
          :visible.sync="isAlertRegister"
          width="30%"
          center>
        <el-collapse-transition>
          <div v-show="notice">
            <el-result icon="warning" title="警告提示" subTitle="请根据提示进行操作">
              <template slot="extra">
                <el-button type="primary" size="medium" @click="notice=!notice">返回</el-button>
              </template>
            </el-result>
          </div>
        </el-collapse-transition>
        <el-collapse-transition>
          <div v-show="!notice">
            <el-form label-position="left" ref="registerData" :model="registerData" :rules="rules"
                     label-width="90px">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="registerData.username" clearable></el-input>
              </el-form-item>
              <el-form-item label="密 码" prop="password">
                <el-input v-model="registerData.password" show-password></el-input>
              </el-form-item>
              <el-form-item label="邮 箱" prop="email">
                <el-input v-model="registerData.email"></el-input>
              </el-form-item>
              <el-link href="/schoolHelp" style="float: left" type="primary">
                帮助
              </el-link>

              <el-popover ref="popover" placement="right" title width="200" trigger="hover">
                <el-image
                    style="width: 100%; height: 100%"
                    src="https://files.catbox.moe/4c2y2a.jpg"
                    fit="fill"></el-image>
              </el-popover>
              <el-link style="float: right" v-popover:popover type="primary">
                联系作者
              </el-link>
            </el-form>
          </div>
        </el-collapse-transition>
        <span v-show="!notice" slot="footer" class="dialog-footer">
          <el-button @click="isAlertRegister = false">取 消</el-button>
          <el-button type="primary" @click="registerUser()">确 定</el-button>
        </span>


      </el-dialog>
    </el-row>

  </div>
</template>

<script>
import getters from "../store";
import {Message} from "element-ui";

export default {
  name: "headers",
  data() {
    let checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    };
    return {
      isAlertLoginWindow: false,
      isAlertRegister: false,
      notice: false,
      userData: {
        username: "",
        password: ""
      },
      registerData: {},
      rules: {
        email: [{
          required: true, // required就是这个框必须填写
          validator: checkEmail,
          trigger: 'blur'
        }],
        password: [
          {required: true, min: 3, message: '长度必须大于3个字符', trigger: 'blur'}
        ],
        username: [{
          required: true, min: 3, message: '长度必须大于3个字符', trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    submitData() {
      let that = this
      this.$delete(this.userData, 'email')//删除了email属性
      this.$refs.userData.validate((valid) => {
        if (!valid) {
          this.$notify.error({
            title: '错误',
            message: '请填写完整的信息,以便可以正常的提交签到请求'
          });
          this.notice = true;
          return;
        } else {
          that.postRequest("/api/user/login", that.userData).then(function (response) {
            if (!response) {
              //不存在返回值
              // that.successNotice = !that.successNotice;
              console.log("登录失败")


            } else {
              const tokenStr = response.data.tokenHead + response.data.token;
              const parseList = response.data.token.split(".")
              //负载
              const payload = window.atob(parseList[1])
              //向vuex内存入token 并写入到sessionStorage
              that.$store.commit("setToken", tokenStr)
              // that.$store.commit("setUsername", payload.username)
              that.$store.commit("setPayload", payload)
              that.isAlertLoginWindow = false;
              // location.reload();
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
    },
    registerUser() {
      let that = this
      this.$refs.registerData.validate((valid) => {
        if (!valid) {
          this.$notify.error({
            title: '错误',
            message: '请填写完整的信息,以便可以正常的提交签到请求'
          });
          this.notice = true;
          return;
        } else {
          that.postRequest("/api/user/register", that.registerData).then(function (response) {
            if (!response) {
              //不存在返回值
              // that.successNotice = !that.successNotice;
              console.log("注册失败")


            } else {
              if (response.code != 200) {
                Message.error("注册失败！")
              } else {
                that.userData.username = that.registerData.username;
                that.userData.password = that.registerData.password;
                console.log(that.userData.password)
                // this.submitData()
                that.isAlertRegister = false;
              }
            }
          }).catch(function (error) {
            that.resultNotice = true;
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
    },
    userLogout() {
      window.sessionStorage.hasOwnProperty("token") ? window.sessionStorage.removeItem("token") : null;
      window.sessionStorage.hasOwnProperty("payload") ? window.sessionStorage.removeItem("payload") : null;
      window.localStorage.hasOwnProperty("token") ? window.localStorage.removeItem("token") : null;
      window.localStorage.hasOwnProperty("payload") ? window.localStorage.removeItem("payload") : null;
      window.location.reload();
    }
  },
  computed: {

    loginState() {
      if (this.$store.state.token) {
        return true;
      } else {
        return false;
      }
    },
    username() {
      if (this.$store.state.payload && window.sessionStorage.hasOwnProperty("payload")) {
        const payload = JSON.parse(this.$store.state.payload);

        return payload.sub;
      }
    },
    avatar() {
      const defaultUrl = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"

      if (this.$store.state.payload) {
        const payload = JSON.parse(this.$store.state.payload);
        // const avatar = JSON.parse(this.$store.state.payload).avatar
        console.log(typeof payload.avatar)

        return payload.avatar ? '/api/user/getAvatar/' + JSON.parse(this.$store.state.payload).uuid : defaultUrl;

      } else {
        return defaultUrl;
      }
    }
  }
}
</script>

<style scoped>
.el-menu.el-menu--horizontal{
  border-bottom:0;
}
/deep/ .el-icon-arrow-down:before {
  content: "";
}
.el-row {
  height: 70px;
}

.el-col ul {
  height: 100%;

}

.content {
  height: 100%;
  width: 100%;
}

</style>