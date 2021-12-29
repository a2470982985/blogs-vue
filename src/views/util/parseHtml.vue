<template>
  <div>
    <el-input
        style="height: auto"
        type="textarea"
        placeholder="请输入需要解析的文本(填入content)"
        v-model="parseString">
    </el-input>
    <el-button type="primary" @click="submitForm">解析content</el-button>

    <h1 style="margin-top: 50px">
      👇结果👇
    </h1>
<!--    <el-button v-show="showCopyButton" type="primary" @click="copyResult">一键复制</el-button>-->
    <div id="result" style="white-space: pre-line;text-align: left	">
      {{this.result}}
    </div>
  </div>
</template>

<script>
import {Message} from "element-ui";

export default {
  name: "parseHtml",
  data() {
    return {
      parseString: "",
      result:"",
      showCopyButton:false
    }
  },
  methods: {
    submitForm(){
      this.result=""
      this.showCopyButton=false
      let that=this
      var params=that.parseString

      that.postRequestJson("/api/util/parse", params).then(function (response){

        if (response.code != 200 || response.data=="" || !response.data) {
          Message.error("解析失败！"+response.msg)
        }else{
          that.result=response.data
          that.showCopyButton=true
        }


      }).catch(function (error) {
        that.$notify.info({
          title: "错误",
          message: error
        });
      });


    }

  }
}
</script>

<style scoped>

</style>