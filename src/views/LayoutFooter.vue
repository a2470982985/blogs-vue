<template xmlns="http://www.w3.org/1999/html">
  <div id="hello">
    <el-divider></el-divider>
    <el-row type="flex">
      <el-col :xs="12" :md="6" :lg="6" :xl="6">
        <span>
          <img width="100%" height="auto" src="../assets/logo.png">
          <br/>
          <br/>
          <br/>
          <span class="span1">本站为非盈利性个人网站，本站所有软件来自互联网，版权属原著所有，如有需要请购买正版。如有侵权，敬请来信联系我们，我们立即删除。</span>
        </span>
        <!--        <br/>-->
      </el-col>
      <el-col :xs="0" :md="6" :lg="6" :xl="6">
        <span>
          <h3>Blog,记录美好时光</h3>

          <ul>
            <a class="bottomUrl" href="/"><li>关于网站</li></a>
            <a class="bottomUrl" href="/"><li>下载帮助</li></a>
            <a class="bottomUrl" href="/"><li>版权说明</li></a>
            <a class="bottomUrl" href="/"><li>会员说明</li></a>
            <a class="bottomUrl" href="/"><li>分享规则</li></a>
          </ul>
        </span>
      </el-col>
      <el-col :xs="0" :md="6" :lg="6" :xl="6">
        <span>
          <h3>隐私协议 & 问题反馈</h3>
          <ul>
            <li>隐私协议</li>
            <li>联系我们</li>
            <li>反馈问题</li>
          </ul>

        </span>

      </el-col>
      <el-col :xs="12" :md="6" :lg="6" :xl="6">
        <span>
          <h3>联 系 客 服</h3>
          <br/>
          <img width="30%" style="padding-right: 5%;" src="https://z3.ax1x.com/2021/07/22/W0ziH1.png">
          <img width="30%" style="padding-left: 5%" src="https://z3.ax1x.com/2021/07/22/W0ziH1.png">
        </span>
      </el-col>
    </el-row>
    <el-row>
      <el-link href="https://beian.miit.gov.cn/">
        <span>
          豫ICP备2021012196号-1
        </span>
      </el-link>

    </el-row>
  </div>
</template>

<script>
export default {
  name: "LayoutFooter",
  data: {},
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
ul {
  padding-left: 0px;
}

li {
  list-style: none;
  padding: 3px;
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

.span1 {
  font-family: "JetBrains Mono";
  font-size: 10px;
}


</style>