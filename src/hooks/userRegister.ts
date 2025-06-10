import type RegisterHandlerOptions from '@/types/register';
import instance from '@/utils/http.js';

export const useRegisterRules = () => {
    return {
        username: [
            { required: true, message: '请输入用户名', trigger: ['blur', 'input'] },
            { min: 1, message: '用户名不能为空', trigger: ['blur', 'input'] }
        ],
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
        ],
        confirmPassword: [
            { required: true, message: '请确认密码', trigger: ['blur', 'input'] },
            {
                validator(rule: any, value: string, callback: any, source: any) {
                    if (value !== '' && value !== source.password) {
                        return new Error('两次输入的密码不一致');
                    }
                    return true;
                },
                trigger: ['blur', 'input']
            }
        ]
    };
};

export const useRegisterHandler = ({ formRef, form, loading }: RegisterHandlerOptions) => {
    return async () => {
        await formRef.value?.validate(async (errors: any) => {
            if (!errors) {
                loading.value = true;
                try {
                    const res = await instance.post('/register/', {
                        username: form.username,
                        studentid: form.studentid,
                        password: form.password
                    });
                    // 注册成功后的逻辑
                    return res;
                } catch (err: any) {
                    // 错误消息已由 http.js 统一处理
                } finally {
                    loading.value = false;
                }
            } else {
                throw new Error(errors);
            }
        });
    };
};
