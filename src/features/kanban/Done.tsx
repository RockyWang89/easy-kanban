import { useSelector } from "react-redux";
import { selectTasksByStatus } from "./tasksSlice";
import TaskCard from "../../components/TaskCard";
import Empty from "../../components/Empty";
import { DONE, sortTasksByCompletedDate, TaskI } from "../../modules/modules";
import { RootState } from "../../store/store";

function Done() {
    const tasksList = useSelector((state: RootState)=>selectTasksByStatus(state, DONE));
    sortTasksByCompletedDate(tasksList);

    return (
        <div>
            {
                tasksList.length > 0 ? tasksList.map((task: TaskI) => {
                    return <TaskCard task={task} class={DONE} key={task.id}/>
                }) : <Empty />
            }
        </div>
    )
}

export default Done;