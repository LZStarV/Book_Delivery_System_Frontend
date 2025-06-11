import type RegisterHandlerOptions from '@/types/register';
import instance from '@/utils/http.js';
import { ElMessage } from 'element-plus';

export const useRegisterRules = (form: any) => {
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
                validator(rule: any, value: string) {
                    if (value !== '' && value !== form.password) {
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
        // 校验
        try {
            await formRef.value?.validate();
        } catch (errors) {
            // 校验未通过，分别弹出所有 message
            if (Array.isArray(errors)) {
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
        // 注册
        loading.value = true;
        try {
            const res = await instance.post('/signup/', {
                username: form.username,
                studentid: form.studentid,
                password: form.password
            });
            ElMessage.success('注册成功');
            return res; // 返回接口响应
        } catch (err: any) {
            // 错误消息已由 http.js 统一处理
            return err; // 返回错误对象
        } finally {
            loading.value = false;
        }
    };
};
