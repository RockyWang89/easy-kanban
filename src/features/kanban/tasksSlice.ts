import { createSlice, createEntityAdapter, createSelector, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { formatDateString, TODO, DONE } from "../../modules/modules";
import { TaskI, ChangeTaskStatusPayloadI } from "../../modules/modules";
import { UpdateTaskPayloadI } from "../../modules/modules";

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
            (state.entities[action.payload.id] as TaskI).status = action.payload.status;
            //Put a completed date when the task is moved to completed class
            if(action.payload.status === DONE) {
                (state.entities[action.payload.id] as TaskI).completedDate = formatDateString(new Date());
            }
        },
        deleteTaskAction: (state, action) => {
            tasksAdapter.removeOne(state, action.payload);
        },
        updateTaskAction: (state, action: PayloadAction<UpdateTaskPayloadI>) => {
            tasksAdapter.updateOne(state, action.payload);
        }
    }
});

export const { addTaskAction, changeStatusAction, deleteTaskAction, updateTaskAction } = tasksSlice.actions

export const {
    selectAll: selectAllTasks,
    selectById: selectTaskById,
    selectIds: selectTaskIds
} = tasksAdapter.getSelectors((state: RootState) => state.tasks)

export const selectTasksByStatus = createSelector([selectAllTasks, (state: RootState, status: string)=>status], (tasks: any, status)=>{
    return tasks.filter((task: TaskI) => task.status === status)
});

export default tasksSlice.reducer;