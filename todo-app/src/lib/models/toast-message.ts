export interface ToastMessage {
    type: 'error' | 'info' | 'success' | 'warning';
    title: string;
    message: string;
}
