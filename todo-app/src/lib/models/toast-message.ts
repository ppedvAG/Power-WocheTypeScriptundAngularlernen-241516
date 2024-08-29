export interface ToastMessage {
    type: MessageType;
    title: string;
    message: string;
}

export type MessageType = 'error' | 'info' | 'success' | 'warning';
