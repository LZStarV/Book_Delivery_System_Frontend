// 全局弹窗警告未登录配置函数
import { ElMessageBox } from 'element-plus'

/**
 * 
 * @param {*} callback 点击确认按钮后的回调函数
 * @description 显示登录提示弹窗，提示用户未登录，点击确认按钮后执行回调函数
 */
const showLoginAlert = (callback: any) => {
    ElMessageBox.alert(
        '您还未登录，请先登录！',
        '提示',
        {
            type: 'warning',
            showCancel: false,
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            confirmButtonText: '点我去登录',
            callback
        }
    )
}

export default showLoginAlert