export const TODO = "to do";
export const DOING = "doing";
export const DONE = "done";
export const ARCHIVED = "archived";

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

export function formatDateString(date: Date): string {
    return date.toISOString().split('T')[0];
}

export function sortTasksByDueDate(taskList: TaskI[]): void {
    taskList.sort((taskA, taskB)=>taskA.dueDate.localeCompare(taskB.dueDate));
}