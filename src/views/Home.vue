<template>
  <div class="home">
    <!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <!-- 走马灯 开始 -->

    <div class="carousel">
      <!-- 下面的 :height="bannerHeight + 'px'" 是绑定数据 -->
      <el-carousel :interval="5000" arrow="always" :height="img_height  + 'px'">
        <el-carousel-item v-for="(item,index) in dataList" :key="item">
          <img style="width: 100%" :src="item" @load="img_load" ref='img_ref'/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 走马灯 结束 -->
    <el-divider></el-divider>
    <br/>
    <br/>
    <el-row style="width: 100%;" v-for="(item,rowIndex) in setRowLength()" :key="rowIndex" type="flex">
      <el-col :xs="12" v-for="(o, index) in item" :key="index" :offset="(index+1) %4==1 ? 0 : 1">
        <el-link type="primary" style="width: 100%" :underline="false" :href="o.article">
          <el-card :body-style="{ padding: '0px',width:'100%' }" shadow="always">

            <img :src="o.imageUrl"
                 class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom" v-if="introFlag">
                <time class="time">{{ o.intro }}</time>
                <!--                <el-button type="text" class="button">操作按钮</el-button>-->
              </div>
            </div>

          </el-card>
        </el-link>
      </el-col>
    </el-row>
    <br/>
    <br/>

  </div>
</template>

<script scoped>
import _ from 'lodash';

export default {
  name: 'Home',
  methods: {
    setRowLength() {
      //分割服务器返回的cardList列表 并设置每行显示数量
      let clientWidth = document.body.clientWidth
      console.log(clientWidth)

      if (clientWidth < 768) {
        this.introFlag = false;
        return this.splitCardList(this.cardList, 2);
      } else if (clientWidth >= 768 && clientWidth < 992) {
        this.introFlag = false;
        return this.splitCardList(this.cardList, 2);
      } else if (clientWidth >= 992 && clientWidth < 1400) {
        this.introFlag = true;
        return this.splitCardList(this.cardList, 3);
      } else {
        this.introFlag = true;
        return this.splitCardList(this.cardList, 3);
      }

    },
    img_load() {
      this.img_height = this.$refs.img_ref[0].height;
    },
    getBannerUrl() {
      this.getRequest("/api/home/getCarousel").then((resp) => {
        this.dataList = resp.data
        console.log(this.dataList)
      }).catch((error) => {
        console.log(error)
      })
    },
    splitCardList(cardList, lineLength) {
      let result = [];
      for (var i = 0; i < cardList.length; i += lineLength) {
        result.push(cardList.slice(i, i + lineLength));
      }
      // this.cardList = result;
      return result
    }
  },
  data() {
    return {
      currentDate: new Date(),
      introFlag: false,
      dataList: ["https://unsplash.it/1600/900?random?" + new Date().getTime() + "1",
        "https://unsplash.it/1600/900?random?" + new Date().getTime() + "2",
        "https://unsplash.it/1600/900?random?" + new Date().getTime() + "3",

      ],
      img_height: '',
      cardList: [
        {
          "imageUrl": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/33a948888eed8c402ac4c7e052a52c50.jpg?w=2452&h=920",
          "intro": "这是一段简介1",
          "article": "/about"
        },
        {
          "imageUrl": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/67c7222fbcf98db942718eaf29f32297.jpg?thumb=1&w=1226&h=460&f=webp&q=90",
          "intro": "这是一段简介2",
          "article": "/about"
        },
        {
          "imageUrl": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a532e33470d046b3f044d5ea49fc5e9e.png?thumb=1&w=1226&h=460&f=webp&q=90",
          "intro": "这是一段简介3",
          "article": "/about"
        },
        {
          "imageUrl": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/918820682e4a490221cfd92b24c14b86.jpg?thumb=1&w=1226&h=460&f=webp&q=90",
          "intro": "这是一段简介4",
          "article": "/about"
        },
        {
          "imageUrl": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/918820682e4a490221cfd92b24c14b86.jpg?thumb=1&w=1226&h=460&f=webp&q=90",
          "intro": "这是一段简介3",
          "article": "/about"
        },
        {
          "imageUrl": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/918820682e4a490221cfd92b24c14b86.jpg?thumb=1&w=1226&h=460&f=webp&q=90",
          "intro": "这是一段简介4",
          "article": "/about"
        }
      ]
    }
  },
  mounted() {
    let that = this
    //  监听窗口大小改变事件  设置banner走马灯的height
    window.addEventListener('resize', _.debounce(function () {
      that.img_load();
      that.setRowLength()
    }, 500))
  },
  destroyed() {
    //注销window.onresize事件
    window.removeEventListener("resize", _.debounce(function () {
      that.img_load();
      that.setRowLength()
    }, 500))
  },

  created() {
    this.getBannerUrl();
    this.setRowLength()
  }
}
</script>
<style scoped>
.bottom {
  margin-top: 3% !important;
}

.el-card__body > div {
  padding: 3% !important;
}

a {
  text-decoration: none;
}

/deep/ .el-link--inner {
  width: 100%;
  height: 100%;
}

.time {
  font-size: 13px;
  color: #999;
}

.el-card {
  width: 100%;
  height: 100%;
}

/deep/ .el-card__body {
  height: 100%;
  width: 100%;
}

.el-col {
  width: 100%;
}

.el-row {
  padding-bottom: 40px;
  height: 100%
}

.logo {
  width: 100%;
  height: 100%;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 70%;
  display: block;
}


.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>