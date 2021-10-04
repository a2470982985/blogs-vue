<template>
  <div>
    <el-form :model="form" label-position="top" ref="ruleForm" label-width="100px">
      <el-form-item label="文章标题" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <mavon-editor :codeStyle="codeStyle" :ishljs="true" :toolbars="toolbars"  v-model="data"/>
      <el-form-item label="文章类别" prop="region">
        <el-select v-model="form.region" placeholder="请选择文章分类">
          <el-option label="编程知识" value="0"></el-option>
          <el-option label="API分享" value="1"></el-option>
          <el-option label="其他" value="9"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否外链" prop="delivery">
        <el-switch v-model="form.isExternalLink"></el-switch>
      </el-form-item>
      <el-form-item label="图片链接" prop="resource">
        <el-radio-group v-model="form.imageType">
          <el-radio label="1">随机图片</el-radio>
          <el-radio label="2">手动输入</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="链接" prop="desc">
        <el-input type="textarea" v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import 'mavon-editor/dist/css/index.css'

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
      form:{},
      data:'',
      codeStyle:'monokai-sublime',//主题
    }
  }
}
</script>

<style scoped>
.v-note-wrapper{
  height: 600px;
}
</style>