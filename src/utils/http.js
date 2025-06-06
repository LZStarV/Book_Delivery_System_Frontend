import axios from "axios"

// 定义Axios实例
const instance = axios.create({
    baseURL: "http://localhost:80/",
    timeout: 3000
})

// 请求拦截器
instance.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        const token = localStorage.getItem("token")
        if (token) {
            // 如果存在token，则将其添加到请求头中
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        // 对请求错误做些什么
        ElMessage.error("请求错误，请稍后重试")
        return Promise.reject(error)
    }
)

// 响应拦截器
instance.interceptors.response.use(
    response => {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return response
    },
    error => {
        // 任何超出 2xx 的 HTTP 状态码都会触发此函数
        // 对响应错误做点什么
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    // 处理 400 错误，例如请求参数错误
                    // console.error('请求参数错误')
                    break
                case 401:
                    // 处理 401 错误，例如未授权
                    // ElMessage.error('未授权，请登录')
                    break
                case 403:
                    // 处理 403 错误，例如禁止访问
                    // ElMessage.error('禁止访问')
                    break
                case 404:
                    // 处理 404 错误，例如资源不存在
                    // ElMessage.error('资源不存在')
                    break
                case 500:
                    // 处理 500 错误，例如服务器内部错误
                    // ElMessage.error('服务器内部错误')
                    break
                default:
                // ElMessage.error('请求失败')
            }
        } else {
            // 处理其他错误，例如网络错误
            ElMessage.error('网络错误，请联系服务器管理人员')
        }
        return Promise.reject(error)
    }
)

export default instance