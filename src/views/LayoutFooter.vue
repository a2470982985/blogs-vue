<template xmlns="http://www.w3.org/1999/html">
  <div id="hello">
    <el-divider></el-divider>
    <el-row type="flex" style="height: 76px">
      <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">

        <!--        <br/>-->
      </el-col>
      <el-col :xs="6" :sm="6" :md="6" :lg="3" :xl="3">
        <span>
          <img style="width: 80%;height: 80%" src="../assets/logo.png">
        </span>
      </el-col>
      <el-col class="hidden-md-and-down" :lg="9" :xl="9">
        <div class="footer-link">

          <span style="padding-right: 2%"><el-link href="/">首页</el-link></span>
          <span style="padding-right: 2%"><el-link href="/about">关于</el-link></span>
          <span style="padding-right: 2%"><el-link href="/">联系</el-link></span>
          <span style="padding-right: 2%"><el-link href="/">隐私</el-link></span>
          <span style="padding-right: 2%"><el-link href="/">更新日志</el-link></span>

        </div>
      </el-col>
      <el-col :xs="0" :sm="6" :md="6" :lg="4" :xl="4">
        <div class="footer-copy-right">
          <el-link href="https://beian.miit.gov.cn/">
          <span>
            豫ICP备2021012196号
          </span>
          </el-link>
        </div>
      </el-col>
      <el-col :xs="14" :sm="8" :md="8" :lg="4" :xl="4">
        <div class="footer-copy-right">
          <span>&nbsp; &nbsp; 52coco.com © 2021. Flik. All rights reserved. </span>
        </div>
      </el-col>
      <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
        <span>

        </span>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css';

export default {

  name: "LayoutFooter",
  data() {
    return {}
  },
  methods: {
    // setClientWidth(){
    //   this.clientWidth=document.body.clientWidth
    // }
  },
  mounted() {
    // let that= this;
    // window.onresize=()=>{
    //   return (()=>{
    //     that.setClientWidth()
    //   })
    // }
  }
}
</script>

<style scoped>
.footer-copy-right {
  font-size: small;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.footer-link {
  font-size: small;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}


a {
  text-decoration: none;
}

a:hover {
  color: #2c3e50;
}

a:after {
  color: #475669;

}

a:before {
  color: #475669;
}


</style>