import { createSlice, createEntityAdapter, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const tasksAdapter = createEntityAdapter();

const initialState = tasksAdapter.getInitialState();

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: tasksAdapter.addOne
    }
});

export const {
    selectAll: selectAllTasks,
    selectById: selectTaskById,
    selectIds: selectTaskIds
} = tasksAdapter.getSelectors((state: RootState) => state.tasks)

export default tasksSlice.reducer;