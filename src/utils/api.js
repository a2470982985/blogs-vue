import axios from "axios";
import {Message} from "element-ui";
import router from "../router";

axios.interceptors.request.use(config => {
    if (window.sessionStorage.getItem("token")) {
        config.headers['Authorization'] = window.sessionStorage.getItem("token");
    }
    return config;
}, error => {
    console.log(error)
})


//配置响应拦截器
axios.interceptors.response.use(success => {
    if (success.status && success.status == 200) {
        if (success.data.code == 500 ||
            success.data.code == 401 ||
            success.data.code == 403 ||
            success.data.code == 404 ||
            success.data.code == 400) {
            Message.error(success.data.msg);
            return;
        } else if (success.data.code == 499) {
            Message.error(success.data.msg);
            window.sessionStorage.removeItem("token")
            // window.sessionStorage.clear();
            return;
        }
        if (success.data.code) {
            if (success.data.code.toString().length == 4 && parseInt((success.data.code + "").substr(0, 2)) % 2 == 0) {
                Message.success(success.data.msg);
            } else if (success.data.code.toString().length == 4 && parseInt((success.data.code + "").substr(0, 2)) % 2 == 1){
                Message.error(success.data.msg);
            }
        }
    }
    return success.data;
}, error => {
    if (error.response.code == 504 || error.response.code == 404) {
        Message.error("服务器被吃掉了o((>ω< ))o");
    } else if (error.response.code == 403) {
        Message.error("权限不足，请联系管理员");
    } else if (error.response.code == 401) {
        Message.error("尚未登录,请登录~");
        router.replace("/login");
    } else {
        if (error.response.data.msg) {
            Message.error(error.response.data.msg);
        } else {
            Message.error("未知错误！");
        }
    }
    return;
})

let base = ''
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}

export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}
