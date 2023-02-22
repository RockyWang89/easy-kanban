export const TODO = "To do";
export const DOING = "Doing";
export const DONE = "Done";
export const ARCHIVED = "Archived";

export interface TaskI {
    id: string;
    title: string;
    content: string;
    owner: string;
    assignee: string;
    createDate: string;
    dueDate: string;
    completedDate: string;
    status: string;
}

export interface UserI {
    id: string;
    name: string;
    password: string
}

export interface TaskCardPropsI {
    task: {
        id: string,
        title: string,
        content: string,
        owner: string,
        assignee: string,
        createDate: string,
        dueDate: string,
        completedDate: string,
        status: string
    },
    class: string
}

export interface ChangeTaskStatusPayloadI {
    id: string;
    status: string;
}

export interface UpdateTaskPayloadI {
    id: string;
    changes: {
        title: string;
        content: string;
        assignee: string;
        dueDate: string;
    }
}

export interface LinkTabPropsI {
    label?: string;
    href?: string;
}

export function formatDateString(date: Date): string {
    return date.toISOString().split('T')[0];
}

export function sortTasksByDueDate(taskList: TaskI[]): void {
    taskList.sort((taskA, taskB)=>taskA.dueDate.localeCompare(taskB.dueDate));
}