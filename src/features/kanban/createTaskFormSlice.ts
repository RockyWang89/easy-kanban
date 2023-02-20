import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const createTaskFormSlice = createSlice({
    name: "createTaskForm",
    initialState: {
        title: "",
        content: "",
        owner: "",
        assignee: "",
        createDate: "",
        dueDate: "",
        status: ""
    },
    reducers: {}
});

export const selectCreatingTaskTitle = (state: RootState) => state.createTaskForm.title;
export const selectCreatingTaskContent = (state: RootState) => state.createTaskForm.content;
export const selectCreatingTaskAssignee = (state: RootState) => state.createTaskForm.assignee;
export const selectCreatingTaskCreateDate = (state: RootState) => state.createTaskForm.createDate;
export const selectCreatingTaskDueDate = (state: RootState) => state.createTaskForm.dueDate;
export const selectCreatingTaskStatus = (state: RootState) => state.createTaskForm.status;

export default createTaskFormSlice.reducer;