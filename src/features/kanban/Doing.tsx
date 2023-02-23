import { useSelector } from "react-redux";
import { selectTasksByStatus } from "./tasksSlice";
import TaskCard from "../../components/TaskCard";
import Empty from "../../components/Empty";
import { DOING, sortTasksByDueDate, TaskI } from "../../modules/modules";
import { RootState } from "../../store/store";

function Doing() {
    const tasksList = useSelector((state: RootState)=>selectTasksByStatus(state, DOING));
    sortTasksByDueDate(tasksList);

    return (
        <div>
            {
                tasksList.length > 0 ? tasksList.map((task: TaskI) => {
                    return <TaskCard task={task} class={DOING} key={task.id}/>
                }) : <Empty />
            }
        </div>
    )
}

export default Doing;