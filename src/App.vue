<template>
  <div id="app">
    <el-container>
      <el-header>
        <Headers></Headers>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>
        <LayoutFooter></LayoutFooter>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Headers from "./views/Headers";
import LayoutFooter from "./views/LayoutFooter";

export default {
  name: 'app',
  components: {
    Headers,
    LayoutFooter,

  }, data() {
    return {
      ImageSrc: "/assets/logo.png",
    }
  }, mounted() {
      // document.getElementById("main").style.height="600px";
      // console.log(document.getElementById("main").style.height)
  }
}
</script>

<style>
.el-header{
  height: 100%!important;
}
.el-footer{
  height: 100%!important;
}

/*.el-submenu__title {*/
/*  height: 100%;*/
/*}*/

/*.el-main {*/
/*  height: 100%;*/
/*  padding-top: 0px!important;*/
/*  padding-bottom: 0px!important;*/
/*}*/

/*.el-footer {*/
/*  height: 100% !important;*/
/*}*/

/*.el-row {*/
/*  height: 100%;*/
/*}*/

/*.el-col > * {*/
/*  height: 100%;*/

/*}*/

#app {
  font-family: 'Hiragino Sans GB', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*overflow-x: hidden;*/
  margin: 0;
}


.grid-content {
  height: 100%;
  border-radius: 4px;
  min-height: 36px;
}

.el-menu-demo.el-menu--horizontal.el-menu {
  border-bottom: none;
}

</style>
