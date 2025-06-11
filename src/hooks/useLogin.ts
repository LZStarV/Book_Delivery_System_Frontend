import type LoginHandlerOptions from '@/types/login';
import instance from '@/utils/http.ts'
import { useUserStore } from '../store/user.ts';
import { useAuthStore } from '../store/auth.ts';
import { ElMessage } from 'element-plus';

const { setUser } = useUserStore();
const { setToken } = useAuthStore();


export const useLoginRules = () => {
    return {
        studentid: [
            { required: true, message: '请输入学号', trigger: ['blur', 'input'] },
            { pattern: /^[0-9]{11}$/, message: '学号格式不正确', trigger: ['blur', 'input'] }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: ['blur', 'input'] },
            { min: 6, message: '密码至少6位', trigger: ['blur', 'input'] },
            {
                level: 'warning' as const,
                validator(rule: any, value: string) {
                    if (value !== '' && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value)) {
                        return new Error('密码需包含数字和字母');
                    }
                    return true;
                },
                trigger: ['blur', 'input']
            }
        ]
    };
}

export const useLoginHandler = ({ formRef, form, loading }: LoginHandlerOptions) => {
    return async () => {
        // 校验
        try {
            await formRef.value?.validate();
        } catch (errors) {
            if (Array.isArray(errors)) {
                // 扁平化二维数组
                const flatErrors = errors.flat();
                flatErrors.forEach((err) => {
                    if (err && err.message) {
                        ElMessage.error(err.message);
                    }
                });
            } else {
                ElMessage.error('表单填写有误');
            }
            return errors;
        }
        // 登录
        loading.value = true;
        try {
            const res = await instance.post('/login/', {
                studentid: form.studentid,
                password: form.password
            });
            setToken(res.data.token);
            setUser(res.data.username);
            ElMessage.success('登录成功');
            return res;
        } catch (err) {
            return err;
        } finally {
            loading.value = false;
        }
    };
}
