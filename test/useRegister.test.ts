import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRegisterRules, useRegisterHandler } from '../src/hooks/useRegister';

describe('useRegisterRules', () => {
    it('should return correct rules for username, studentid, password, confirmPassword', () => {
        const form = { password: 'abc123' };
        const rules = useRegisterRules(form);
        expect(rules).toHaveProperty('username');
        expect(rules).toHaveProperty('studentid');
        expect(rules).toHaveProperty('password');
        expect(rules).toHaveProperty('confirmPassword');
    });
});

describe('useRegisterHandler', () => {
    let formRef: any;
    let form: any;
    let loading: any;
    let mockInstance: any;
    let handler: any;

    beforeEach(() => {
        formRef = { value: { validate: vi.fn().mockResolvedValue(undefined) } };
        form = { username: 'user', studentid: '12345678901', password: 'abc123', confirmPassword: 'abc123' };
        loading = { value: false };
        mockInstance = {
            post: vi.fn().mockResolvedValue({ data: { id: 1 } })
        };
        vi.mock('../src/utils/http.js', () => ({ default: mockInstance }));
        vi.mock('element-plus', () => ({ ElMessage: { success: vi.fn(), error: vi.fn() } }));
        handler = require('../src/hooks/useRegister').useRegisterHandler({ formRef, form, loading });
    });

    it('should validate and register successfully', async () => {
        const res = await handler();
        expect(res.data.id).toBe(1);
        expect(loading.value).toBe(false);
    });

    it('should handle validation errors', async () => {
        formRef.value.validate = vi.fn().mockRejectedValue([[{ message: 'error' }]]);
        const res = await handler();
        expect(res).toBeDefined();
    });

    it('should handle register error', async () => {
        mockInstance.post.mockRejectedValueOnce(new Error('register failed'));
        formRef.value.validate = vi.fn().mockResolvedValue(undefined);
        const res = await handler();
        expect(res).toBeInstanceOf(Error);
    });
});
