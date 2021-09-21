<template>
  <div>
    <el-row type="flex">
      <el-col :xl="1" :lg="1" :md="1" :sm="1" :xs="0">
        <div class="grid-content"></div>
      </el-col>
      <el-col :xl="3" :lg="2" :md="2" :sm="2" :xs="0"><a href="/"><img width="100%" height="90%"
                                                                       class="grid-content logo"
                                                                       src="../assets/logo.svg"/></a></el-col>
      <el-col :xl="4" :lg="5" :md="3" :sm="4" :xs="0">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :xl="8" :lg="13" :md="14" :sm="13" :xs="18">
        <el-row type="flex">
          <div>
            <!--            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">-->
            <!--            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">-->
            <el-menu :default-active="'/'" router class="el-menu-demo" mode="horizontal">
              <el-col :md="6" :sm="6" :xs="7">
                <el-menu-item index="/">首 页<i class="el-icon-s-home"></i></el-menu-item>
              </el-col>
              <el-col :md="6" :sm="6" :xs="8">
                <el-menu-item index="/message">消息中心<i class="el-icon-message-solid"></i></el-menu-item>
              </el-col>
              <el-col :md="6" :sm="6" :xs="9">
                <el-menu-item index="/message">个人中心<i class="el-icon-message-solid"></i></el-menu-item>
              </el-col>
              <el-col :md="6" :sm="6" :xs="0">
                <el-menu-item index="4"><a style="text-decoration: none" href="https://www.ele.me"
                                           target="_blank">订单管理 <i class="el-icon-s-order"></i></a></el-menu-item>
              </el-col>
              <el-col :md="0" :sm="0" :xs="0">
                <el-menu-item index="5">
                  留言板<i class="el-icon-s-order"></i>
                </el-menu-item>
              </el-col>
            </el-menu>
          </div>
        </el-row>
      </el-col>
      <el-col :xl="5" :lg="1" :md="1" :sm="1" :xs="0">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :xl="3" :lg="3" :md="3" :sm="3" :xs="6">
        <div>
          <router-link :to="{path:'/login'}">
            <span>登录</span>
          </router-link>
          <el-avatar style="float: right;vertical-align: center" :size="60"
                     src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: "headers"
}
</script>

<style scoped>
.el-menu-demo {
  height: 100%;
}

/deep/ .el-icon-arrow-down:before {
  content: "";
}

.el-row {
  height: 70px;
}


</style>