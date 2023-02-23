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

//the format is fixed with {id: string, changes: any} when using the updateOne api of entity adapter
export interface UpdateTaskPayloadI {
    id: string;
    changes: {
        title: string;
        content: string;
        assignee: string;
        dueDate: string;
    }
}

//used in Navbar component
export interface LinkTabPropsI {
    label?: string;
    href?: string;
}

export interface TaskFormPropsI {
    taskInfo: {
        title: string;
        content: string;
        assignee: string;
        dueDate: string;
    }
    setTitle: (value: string) => void;
    setContent: (value: string) => void;
    setAssignee: (value: string) => void;
    setDueDate: (value: string) => void;
    handleSubmit: () => void;
}

//convert a Date object into the format of yyyy-mm-dd, in order to be used easily by the date-type input
export function formatDateString(date: Date): string {
    return date.toISOString().split('T')[0];
}

//sort the task list with due date, task with closest due date will be put at the top 
export function sortTasksByDueDate(taskList: TaskI[]): void {
    taskList.sort((taskA, taskB)=>taskA.dueDate.localeCompare(taskB.dueDate));
}

//most recent completed task will be put at the top
export function sortTasksByCompletedDate(taskList: TaskI[]): void {
    taskList.sort((taskA, taskB)=>taskB.completedDate.localeCompare(taskA.completedDate));
}

//most recent created task will be put at the top
export function sortTasksByCreateDate(taskList: TaskI[]): void {
    taskList.sort((taskA, taskB)=>taskB.createDate.localeCompare(taskA.createDate));
}