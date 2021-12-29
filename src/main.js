import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import mavenEditor from 'mavon-editor'  //引入mavon-editor 就是上面所安装的
import {postRequest, postRequestJson} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {getRequest} from "./utils/api";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios)
Vue.use(mavenEditor)



Vue.prototype.postRequest=postRequest;
Vue.prototype.postRequestJson=postRequestJson;
Vue.prototype.putRequest=putRequest;
Vue.prototype.deleteRequest=deleteRequest;
Vue.prototype.getRequest=getRequest;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


