<template>
  <div>

    <el-form label-position="left" class="userInfo" label-width="5em" :model="form">
      <div>
        <el-button style="float: right;color: white;margin-left: 1em;" v-show="!disableInput" @click="submitInfo()"
                   type="primary">保存
        </el-button>
        <el-button style="float: right;margin-left: 1em;color: white" type="primary" v-show="disableInput"
                   @click="disableInput=!disableInput">编辑
        </el-button>

        <el-button style="float: right;color: white;" type="primary" v-show="!disableInput"
                   @click="disableInput=!disableInput">取消
        </el-button>

      </div>
      <div style="clear: both;">
        <el-upload
            v-show="!disableInput"
            class="avatar-uploader"
            :headers="header"
            name="avatar"
            action="/api/user/setAvatar"
            :show-file-list="false"
            :disabled="disableInput"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
          <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div class="avatar-uploader" style="color: #0093E9;padding-bottom: 1em">设置头像</div>
        </el-upload>


        <el-avatar v-show="disableInput" style="margin-bottom: 3em" :size="150" :src="avatar"></el-avatar>
      </div>
      <el-form-item label="用户名">
        <el-input v-model="username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" :disabled="disableInput"></el-input>
      </el-form-item>

      <el-form-item label="年龄">
        <el-input v-model="form.age" :disabled="disableInput"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="form.gender" :disabled="disableInput" label="0">女</el-radio>
        <el-radio v-model="form.gender" :disabled="disableInput" label="1">男</el-radio>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" :disabled="disableInput"></el-input>
      </el-form-item>
      <el-form-item label="注册时间">

        <el-date-picker
            v-model="form.registerTime"
            style="width: 100%"
            :disabled="true"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="上次登录">
        <el-date-picker
            v-model="form.lastLoginTime"
            style="width: 100%"
            :disabled="true"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00">
        </el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import router from "../../router";

export default {
  name: "SelfInfo",
  data() {
    return {
      disableInput: true,
      form: {},
      header:{Authorization: window.sessionStorage.getItem("token")},
      avatarUrl:""
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    getInfo() {
      this.getRequest("/api/user/users").then(response => {
        if (!response) {
          console.log("获取用户信息失败")
          console.log(response.data)
          this.$router.push("/");
        } else {
          // console.log(response.data)
          this.form = response.data;
          this.form.age = parseInt(this.form.age)
          this.form.gender ? this.form.gender = "1" : this.form.gender = "0"
        }
      }, error => {
      })
    },
    submitInfo() {
      if (typeof this.form.age == 'string') {
        this.form.age = parseInt(this.form.age)
      }
      if (typeof this.form.gender == 'string') {
        this.form.gender = parseInt(this.form.gender)
      }
      this.putRequest("/api/user/users", this.form).then(resp => {
        if (!resp) {
          console.log("更新用户信息失败")
          this.disableInput = true;
        } else {

          this.disableInput = true;
        }
        this.form.gender = this.form.gender.toString()
      }, error => {

      })
    }
  },
  computed: {
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
        return payload.avatar ? '/api/user/getAvatar/' + JSON.parse(this.$store.state.payload).uuid : defaultUrl;
      } else {
        return defaultUrl;
      }
    },
    //是否需要上传头像 true：无需  false：需要
    isUploadAvatar() {
      const defaultUrl = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      if (!this.avatar || this.avatar == null || this.avatar == '' || this.avatar==defaultUrl) {
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    this.getInfo();
  },
  created() {


  }
}
</script>
<style scoped>
.userInfo {
  width: 50%;
  margin: 0 auto;
  /*background-color: #7d7d7d;*/
  padding: 4em;
}

.el-icon-plus.avatar-uploader-icon{
  border: 2px dashed #0093E9 !important;
  margin-bottom: 0.5em;

}
.el-upload .el-upload--text{

}
.avatar{
  height: 200px!important;
  width: 200px!important;;
}
</style>