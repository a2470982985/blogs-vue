<template>
  <div class="home">
    <!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <!-- 走马灯 开始 -->

    <div class="carousel">
      <el-carousel :interval="4000" type="card" :height="img_height  + 'px'">
        <el-carousel-item v-for="(item,index) in dataList" :key="index">
          <div class="pic_item">
            <img style="width: 100%;height: 100%" :src="item.articleImage" @click="bannerClick(item)"
                 ref='img_ref'/>
            <p>{{ item.title }}</p>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 走马灯 结束 -->
    <el-divider></el-divider>
    <br/>
    <br/>
    <el-row
        style="width: 100%;padding-bottom: 40px;height: 100%;"
        v-for="(item,rowIndex) in setRowLength()"
        :key="rowIndex"
        type="flex">
      <el-col :xs="12" v-for="(card, index) in item" :key="index" :offset="(index+1) %4==1 ? 0 : 1">
        <el-link style="width: 100%;height: 100%" :underline="false">
          <el-card :body-style="{ padding: '0px',width:'100%' }" shadow="always" @click.native="cardClick(card)">
            <el-image
                :src="card.articleImage"
                style="height: 70%"
            />
            <div style="padding: 14px;height: 30%">
              <span class="card-title">{{ card.title }}</span>
              <div class="bottom" v-if="introFlag">
                <time style="color: #999;font-size: 13px;">{{ card.intro }}</time>
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
    cardClick(card) {
      if (card.externalLink) {
        window.location.href = card.externalLink;
      } else {
        this.$router.push({name: 'articles', query: {articleId: card.articleId}});
      }
    },
    bannerClick(item) {
      if (item.externalLink) {
        window.location.href = item.externalLink;
      } else {
        this.$router.push({name: 'articles', query: {articleId: item.articleId}});
      }
    },
    setRowLength() {
      //分割服务器返回的cardList列表 并设置每行显示数量
      let clientWidth = document.body.clientWidth

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
        // console.log(resp.data)
        if (resp) {
          this.dataList = resp.data;
          this.img_load()
        }

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
    },
    getCards() {
      this.getRequest("/api/home/getCards").then((resp) => {
        if (resp) {
          this.cardList = resp.data
          // console.log(this.cardList)
          // this.setRowLength();
        }

      }).catch((error) => {
        console.log(error)
      })
    }
  },
  data() {
    return {
      currentDate: new Date(),
      introFlag: false,
      dataList: [{"id":1,"uuid":"6cf93d10d9a34560bf3a3ce85ff81c44","title":"Markdown 基本语法。","intro":"Markdown 基本语法。","readCounts":55,"category":0,"articleImage":"https://www.qijishow.com/images/20210101.jpg","articleId":"0e26c7b318944fae9451583eb931a615","releaseTime":"2021-10-12T12:56:09","externalLink":null},{"id":3,"uuid":"6cf93d10d9a34560bf3a3ce85ff81c44","title":"Spring Cloud 微服务架构学习笔记与示例","intro":"Spring Cloud 微服务架构学习笔记与示例","readCounts":43,"category":0,"articleImage":"http://www.qijishow.com/images/banner12.jpg","articleId":"d95c7c5d8a184599a98325f6354d39ba","releaseTime":"2021-10-12T13:40:17","externalLink":null},{"id":4,"uuid":"6cf93d10d9a34560bf3a3ce85ff81c44","title":"精华学习平台Api接口分享","intro":"精华学习平台Api接口分享","readCounts":43,"category":0,"articleImage":"http://www.qijishow.com/images/Christmasbanner13.jpg","articleId":"ca502f98abb244faa6cc24d6038c078f","releaseTime":"2021-10-12T13:43:41","externalLink":null}],
      img_height: '',
      cardList: []
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
    window.removeEventListener("resize", null)
  },
  created() {
    this.getBannerUrl();
    this.getCards();
  }
}
</script>
<style scoped>
@media screen and (min-width: 700px) {
  /* 走马灯 圆角*/
  .el-carousel__item {
    border-radius: 15px;
  }

  .el-link--inner{
    height: 100%!important;
  }
  /*卡片 圆角*/
  .el-card {
    border-radius: 20px;
  }

  /*卡片title与intro的距离*/
  .bottom {
    margin-top: 3% !important;
  }

  /*intro的字体及颜色*/
  .card-title{
    font-size: 13px;
  }



  /*走马灯 内部 文字 文字定位*/
  .pic_item p {
    font-size: 1em;
    color: white;
    position: absolute;
    top: 90%;
    left: 5%;
    transform: translate(0%, -50%);
  }
}
@media screen and (max-width: 700px) {
  /* 走马灯 圆角*/
  .el-carousel__item {
    border-radius: 10px;
  }

  /*卡片 圆角*/
  .el-card {
    border-radius: 10px;
  }

  /*卡片title与intro的距离*/
  .bottom {
    margin-top: 3% !important;
  }

  .card-title{
    font-size: 10px;
  }

  /*走马灯 内部 文字 文字定位*/
  .pic_item p {
    font-size: 1px;
    color: white;
    position: absolute;
    top: 85%;
    left: 5%;
    transform: translate(0%, -50%);
  }
}

</style>