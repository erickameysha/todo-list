
import {action} from "@storybook/addon-actions";
import Task from "./Task";

export default {
    title: 'Task component',
    component: Task,
}

const changeTaskStatusCallback=action('changeTaskStatus changed')
const removeTaskCallback=action('removeTask changed')
const changeTaskSpanCallback=action('changeTaskSpan changed')
export const TaskBaseExample = () => {
    return<>

        <Task
        task={{id: '1', title: 'rere', isDone: false}}
        removeTask={removeTaskCallback}
        changeTaskStatus={changeTaskStatusCallback}
        changeTaskSpan={changeTaskSpanCallback}
        todolistID={'todolistID1'}
        />
        <Task
        task={{id: '2', title: 'js', isDone: true}}
        removeTask={removeTaskCallback}
        changeTaskStatus={changeTaskStatusCallback}
        changeTaskSpan={changeTaskSpanCallback}
        todolistID={'todolistID1'}
        />
   </>
}
