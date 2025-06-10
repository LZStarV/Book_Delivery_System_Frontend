export interface LoginHandlerOptions {
    formRef: any;
    form: {
        studentid: string;
        password: string;
    };
    loading: { value: boolean };
    nmessage: any;
}
