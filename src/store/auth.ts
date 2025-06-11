import { defineStore } from 'pinia'
import { ref, computed, type Ref } from 'vue'
import { jwtDecode } from 'jwt-decode'

/**
 * @description 认证状态管理
 * @property {Ref<string | null>} token - JWT 令牌
 * @property {ComputedRef<boolean>} isAuthenticated - 是否已认证
 * @method setToken - 设置令牌
 * @method clearToken - 清除令牌
 */
export const useAuthStore = defineStore('auth', () => {
    /** JWT 令牌 */
    const token: Ref<string | null> = ref(localStorage.getItem('token') || null)

    /**
     * @description 是否已认证（令牌存在且未过期）
     */
    const isAuthenticated = computed<boolean>(() => {
        if (!token.value) return false
        try {
            const decoded: { exp: number } = jwtDecode(token.value)
            const currentTime = Math.floor(Date.now() / 1000)
            return decoded.exp > currentTime
        } catch (error) {
            console.error('令牌出错：', error)
            return false
        }
    })

    /**
     * @description 设置 JWT 令牌
     * @param {string} newToken - 新的令牌
     */
    function setToken(newToken: string) {
        token.value = newToken
        localStorage.setItem('token', newToken)
    }

    /**
     * @description 清除 JWT 令牌
     */
    function clearToken() {
        token.value = null
        localStorage.removeItem('token')
    }

    return {
        token,
        isAuthenticated,
        setToken,
        clearToken,
    }
})
