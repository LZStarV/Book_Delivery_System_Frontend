export interface LoginHandlerOptions {
    formRef: any;
    form: {
        phone: string;
        password: string;
    };
    loading: { value: boolean };
    nmessage: any;
}
