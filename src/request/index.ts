import _axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Notify } from 'vant'
import { showMessage } from './status'
import store from '@/store'
const axios: AxiosInstance = _axios.create({
    timeout: 3000,
    baseURL: process.env.VUE_APP_BASE_URL + '/api/v1/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

// 响应拦截器
axios.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            return response
        } else {
            showMessage(response.status)
            return response
        }
    },
    (err: IKeyValue) => {
        const { response } = err
        if (response) {
            showMessage(response.status)
            return Promise.reject(response.data)
        } else {
            Notify('网络连接异常,请稍后再试!')
        }
    }
)

// 请求拦截器
axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = store.getters['token']
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`
            }
        }
        return config
    },
    (err: IKeyValue) => {
        return Promise.reject(err.data)
    }
)
