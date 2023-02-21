import { useSelector } from "react-redux";
import { selectTasksByStatus } from "./tasksSlice";
import TaskCard from "../../components/TaskCard";
import { TODO, sortTasksByDueDate, TaskI } from "../../modules/modules";
import { RootState } from "../../store/store";

function ToDo() {
    const tasksList = useSelector((state: RootState)=>selectTasksByStatus(state, TODO));
    sortTasksByDueDate(tasksList);

    return (
        <div>
            {tasksList.map((task: TaskI) => {
                return <TaskCard task={task} class={TODO} key={task.id}/>
            })}
        </div>
    )
}

export default ToDo;