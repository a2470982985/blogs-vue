import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    //全局的对象，保存公共数据
    state: {
        // routers: [],
        token:window.sessionStorage.getItem("token"),
        // username:window.sessionStorage.getItem("username"),
        payload:window.sessionStorage.getItem("payload")
    },
    //改变state 内值的方法 同步执行
    mutations: {
        // initRouters(state, data) {
        //     state.routers = data;
        // },
        setToken(state,data){
            state.token=data;
            window.sessionStorage.setItem("token",data);
        },
        // setUsername(state,data){
        //     state.username=data;
        //     window.sessionStorage.setItem("username",data);
        // },
        setPayload(state,data){
            state.payload=data;
            window.sessionStorage.setItem("payload",data);
        }


    },
    //改变state 内值的方法  异步执行
    actions: {},
    modules: {}
})
