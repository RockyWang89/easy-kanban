
interface TaskListProps {
    status: 'to do' | 'doing' | 'done' | 'archived'
}

function TaskList(props: TaskListProps) {
    return (
        <div>
            tasklist component
        </div>
    )
}

export default TaskList;