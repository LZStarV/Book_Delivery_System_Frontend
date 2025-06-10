import type LoginHandlerOptions from '@/types/login';
import instance from '@/utils/http.js'

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
        await formRef.value?.validate(async (errors: any) => {
            if (!errors) {
                loading.value = true;
                try {
                    const res = await instance.post('/login/', {
                        studentid: form.studentid,
                        password: form.password
                    });
                    // 登录成功后的逻辑
                    console.log(res);
                    
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
}
