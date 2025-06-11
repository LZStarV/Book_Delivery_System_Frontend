import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLoginRules, useLoginHandler } from '../src/hooks/useLogin';

describe('useLoginRules', () => {
    it('should return correct rules for studentid and password', () => {
        const rules = useLoginRules();
        expect(rules).toHaveProperty('studentid');
        expect(rules).toHaveProperty('password');
        expect(Array.isArray(rules.studentid)).toBe(true);
        expect(Array.isArray(rules.password)).toBe(true);
    });
});

describe('useLoginHandler', () => {
    let formRef: any;
    let form: any;
    let loading: any;
    let mockInstance: any;
    let handler: any;

    beforeEach(() => {
        formRef = { value: { validate: vi.fn().mockResolvedValue(undefined) } };
        form = { studentid: '12345678901', password: 'abc123' };
        loading = { value: false };
        // mock instance.post
        mockInstance = {
            post: vi.fn().mockResolvedValue({ data: { token: 'token', username: 'user' } })
        };
        // mock全局依赖
        vi.mock('../src/utils/http.ts', () => ({ default: mockInstance }));
        vi.mock('../src/store/user.ts', () => ({ useUserStore: () => ({ setUser: vi.fn() }) }));
        vi.mock('../src/store/auth.ts', () => ({ useAuthStore: () => ({ setToken: vi.fn() }) }));
        vi.mock('element-plus', () => ({ ElMessage: { success: vi.fn(), error: vi.fn() } }));
        // 重新引入 useLoginHandler
        handler = require('../src/hooks/useLogin').useLoginHandler({ formRef, form, loading });
    });

    it('should validate and login successfully', async () => {
        const res = await handler();
        expect(res.data.token).toBe('token');
        expect(loading.value).toBe(false);
    });

    it('should handle validation errors', async () => {
        formRef.value.validate = vi.fn().mockRejectedValue([[{ message: 'error' }]]);
        const res = await handler();
        expect(res).toBeDefined();
    });

    it('should handle login error', async () => {
        mockInstance.post.mockRejectedValueOnce(new Error('login failed'));
        formRef.value.validate = vi.fn().mockResolvedValue(undefined);
        const res = await handler();
        expect(res).toBeInstanceOf(Error);
    });
});
