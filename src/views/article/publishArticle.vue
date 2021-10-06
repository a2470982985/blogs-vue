<template>
  <div>
    <el-form :model="form" label-position="left" ref="form" label-width="auto">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <mavon-editor :codeStyle="codeStyle" :ishljs="true" @change="change" ref="md" :toolbars="toolbars"
                      v-model="form.data"/>

      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="checkForm">立即创建</el-button>
        <!--        <el-button @click="resetForm('ruleForm')">重置</el-button>-->
      </el-form-item>
    </el-form>
    <el-dialog
        title="提示"
        :visible.sync="isAlertWindows"
        width="30%"
        center>
      <!--      <span>需要注意的是内容是默认不居中的</span>-->
      <span>
        <el-form :model="form" label-position="left" ref="ruleForm" label-width="auto">
          <el-form-item label="文章类别" prop="category">
            <el-select v-model="form.category" placeholder="请选择文章分类">
                <el-option label="编程知识" value="0"></el-option>
                <el-option label="API分享" value="1"></el-option>
                <el-option label="其他" value="9"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="是否外链" prop="isExternalLink">
<!--            <el-switch v-model="form.isExternalLink"></el-switch>-->
              <el-radio-group v-model="form.isExternalLink">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item v-show="form.isExternalLink==1" label="外链链接" prop="externalLink">
            <el-input size="small" v-model="form.externalLink"></el-input>
          </el-form-item>
          <el-form-item label="图片链接" prop="imageType">
            <el-radio-group v-model="form.imageType">
                <el-radio label="0">随机图片</el-radio>
                <el-radio label="1">手动输入</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="链接" prop="articleImage">
            <el-input :disabled="form.imageType==0" type="textarea" v-model="form.articleImage"></el-input>
          </el-form-item>
        </el-form>
      </span>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isAlertWindows = false">取 消</el-button>
        <el-button type="primary" @click="submitForm(form)">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import 'mavon-editor/dist/css/index.css'
import axios from "axios";
import {Message} from "element-ui";

export default {
  name: "publishArticle",
  data() {
    return {
      toolbars: {
        bold: true,
        italic: true,
        header: true,
        underline: true,
        strikethrough: true,
        mark: true,
        superscript: true,
        subscript: true,
        quote: true,
        ol: true,
        ul: true,
        link: true,
        imagelink: true,
        code: true,
        table: true,
        fullscreen: true,
        readmodel: true,
        htmlcode: true,
        help: true,
        undo: true,
        redo: true,
        trash: true,
        save: true,
        navigation: true,
        alignleft: true,
        aligncenter: true,
        alignright: true,
        subfield: true,
        preview: true,
      },
      form: {
        uuid: JSON.parse(sessionStorage.getItem("payload")).uuid,
        isExternalLink: "0",
        imageType: "0"
      },
      isAlertWindows: false,
      codeStyle: 'monokai-sublime',//主题
    }
  },
  methods: {
    change(value, render) {
      // render 为 markdown 解析后的结果
      console.log(render)
      this.form.content = render;
    },
    submitForm(form) {
      let _this = this;
      let arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
      if (!arr.includes(this.form.category + '')) {
        Message.error("请选择文章是什么分类的啦 uq(≧▽≦q)")
        return;
      } else if (this.form.imageType == 1 && (this.form.articleImage == null || this.form.articleImage == '')) {
        Message.error("记得输入图片的链接哦~ uq(≧▽≦q)")
        return;
      } else if (this.form.isExternalLink == 1 && (this.form.externalLink == null || this.form.externalLink == '')) {
        Message.error("啊  外联链接的地址还没输入呢~")
        return;
      }

      if (this.form.imageType == 0) {
        let arr=["http://api.btstu.cn/sjbz/?lx=dongman",
                        "https://api.yimian.xyz/img?type=moe&size=1920x1080",
                        "http://www.dmoe.cc/random.php",
                        "http://api.mtyqx.cn/api/random.php",
                        "https://api.ixiaowai.cn/api/api.php",
        ]

        this.form.articleImage =arr[Math.floor((Math.random()*arr.length))]+"?v="+Date.now();
      }
      this.postRequest("/api//article/articles", this.form).then(resp => {
        console.log(resp)

        if (resp.code == 4000) {
          _this.$router.push({name: 'articles', query: {articleId: resp.data}});
        } else {
          Message.error("好像有点不对劲儿啊，是哪里出了问题呢？")
          return;
        }

      }, error => {
        Message.error("未知错误,文章发表失败")
      })
      this.form = {}
    },
    checkForm() {
      if (this.form.title == '' || this.form.title == null || this.form.content == '' || this.form.content == null) {
        Message.error("请输入文章标题或内容！")
        return;
      }
      if (this.form.title.length < 5) {
        Message.error("文章标题太短啦 u＞︿＜")
        return;
      } else if (this.form.content.length < 5) {
        Message.error("文章内容太短啦 u＞︿＜")
        return;
      }
      this.isAlertWindows = true;
    }
  }
}
</script>

<style scoped>
.v-note-wrapper {
  height: 600px;
}

@media screen and (min-width: 700px) {
  .el-form {
    width: 70%;
    position: relative;
    margin: 0 auto;
  }

}

@media screen and (max-width: 700px) {

}
</style>