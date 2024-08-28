export interface TaskItem {
    id: string;
    title: string;
    priority: Priority;
    completed: boolean;
    dueDate?: Date;
    labels?: string[];
}

type Priority = 'important' | 'default' | 'low';
