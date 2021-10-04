<template>
  <div>
    <div class="article_class">
      <h1 class="title">
        {{ article.title}}
      </h1>
      <div class="author">
        {{author.nickname}}
        {{author.lastLoginTime}}
        {{author.gender}}
        {{author.email}}
        {{author.age}}
      </div>
      <article class="markdown-body" style="text-align:left" v-html="article.content"></article>
    </div>
  </div>
</template>

<script scoped>
import {Message} from "element-ui";
import 'github-markdown-css/github-markdown.css'

export default {
  name: "Article",
  data() {
    return {
      author:{},
      article: {
      },
      articleInfo:{

      }
    }
  },
  methods: {
    getAuthorInfo(){
      if (!window.sessionStorage.hasOwnProperty("token")){
        this.author={}
        return;
      }
      this.getRequest("/api/user/users").then(resp=>{
        this.author=resp.data;
      },error=>{

      })
    },
    getArticle() {
      // this.article={};
      this.getRequest("/api/article/articles/" + this.$route.query.articleId).then(resp => {
        console.log(resp)
        this.article = resp.data;
      }, error => {

      })
    },
    getArticleInfo(){
      this.getRequest("/api/article/info/" + this.$route.query.articleId).then(resp => {
        console.log(resp)
        this.articleInfo = resp.data;
      }, error => {

      })
    }
  }, mounted() {
    this.getArticle();
    this.getArticleInfo();
    this.getAuthorInfo();
  }
}
</script>

<style scoped>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  /* max-width: 980px; */
  /* padding: 45px; */
  max-width: 98%;
  margin: 0 auto;
  box-shadow: 2px 4px 6px gray;
  padding-left: 20px;
  padding-right: 15px;
  padding-top: 40px;
  padding-bottom: 45px;
  margin-bottom: 100px
}

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}


@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>