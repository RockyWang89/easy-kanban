import { createSlice, createEntityAdapter, createSelector, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { formatDateString, TODO, DONE } from "../../modules/modules";
import { TaskI, ChangeTaskStatusPayloadI } from "../../modules/modules";


const tasksAdapter = createEntityAdapter();

const initialState = tasksAdapter.getInitialState();

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTaskAction: {
            reducer: (state, action: PayloadAction<TaskI>) => tasksAdapter.addOne(state, action.payload),
            prepare: (title: string, content: string, owner: string, assignee: string, dueDate: string) => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        owner,
                        assignee,
                        createDate: formatDateString(new Date()),
                        dueDate,
                        completedDate: "",
                        status: TODO
                    }
                }
            }
        },
        changeStatusAction: (state, action: PayloadAction<ChangeTaskStatusPayloadI>) => {
            (state.entities[action.payload.taskId] as TaskI).status = action.payload.status;
            if(action.payload.status === DONE) {
                (state.entities[action.payload.taskId] as TaskI).completedDate = formatDateString(new Date());
            }
        },
        deleteTaskAction: (state, action) => {
            tasksAdapter.removeOne(state, action.payload);
        }
    }
});

export const { addTaskAction, changeStatusAction, deleteTaskAction } = tasksSlice.actions

export const {
    selectAll: selectAllTasks,
    selectById: selectTaskById,
    selectIds: selectTaskIds
} = tasksAdapter.getSelectors((state: RootState) => state.tasks)

export const selectTasksByStatus = createSelector([selectAllTasks, (state: RootState, status: string)=>status], (tasks: any, status)=>{
    return tasks.filter((task: TaskI) => task.status === status)
});

export default tasksSlice.reducer;