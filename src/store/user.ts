import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type UserType from '@/types/user';

export const useUserStore = defineStore('user', () => {
    // 存储用户信息
    const user = ref<UserType | null>(JSON.parse(localStorage.getItem('user') || 'null'));

    // 计算属性：判断用户信息是否存在
    const hasUser = computed(() => !!user.value);

    // 设置用户信息
    const setUser = (newUser: UserType) => {
        user.value = newUser;
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    // 清除用户信息
    const clearUser = () => {
        user.value = null;
        localStorage.removeItem('user');
    };

    return {
        user,
        hasUser,
        setUser,
        clearUser,
    };
});