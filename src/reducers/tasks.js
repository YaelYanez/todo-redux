// @flow
import moment from 'moment';
import { TASKS_TYPES, ACTION } from '../constants';
import type { Task, Category } from '../constants/types';

const {
  ADD_NEW_TASK,
  EDIT_TASK,
  COMPLETE_TASK,
  UNDO_COMPLETE_TASK,
  DISCARD_TASK,
} = TASKS_TYPES;

type State = {
  tasks: ?Array<Task>,
  categories: Array<Category>,
};

const STATE: State = {
  tasks: [],
  categories: [
    { title: 'Work', color: '#007bff' },
    { title: 'Personal', color: '#ff2d54' },
    { title: 'Friends', color: '#34c759' },
    { title: 'Shop List', color: '#ff9500' },
    { title: 'No List', color: '#8e8e93' },
  ],
};

const onAddNewTask = (state: Object, action: Object) => {
  const { task }: { task: Task } = action.payload;
  const { tasks } = state;

  return { ...state, tasks: [...tasks, task] };
};

const editTask = (state: Object, action: Object) => {
  const {
    taskId,
    newTitle,
  }: { taskId: string, newTitle: string } = action.payload;
  const { tasks } = state;

  const newTasks = tasks.map((task) => {
    if (task.id === taskId) return { ...task, title: newTitle };
    return task;
  });

  return { ...state, tasks: newTasks };
};

const completeTask = (state: Object, action: Object) => {
  const { taskId }: { taskId: string } = action.payload;
  const { tasks } = state;

  const newTasks = tasks.map((task) => {
    if (task.id === taskId)
      return {
        ...task,
        isCompleted: true,
        endedDate: moment().format('MMMM Do YYYY'),
      };
    return task;
  });

  return { ...state, tasks: newTasks };
};

const undoCompleteTask = (state: Object, action: Object) => {
  const { taskId }: { taskId: string } = action.payload;
  const { tasks } = state;

  const newTasks = tasks.map((task) => {
    if (task.id === taskId) return { ...task, isCompleted: false };
    return task;
  });

  return { ...state, tasks: newTasks };
};

const discartTask = (state: Object, action: Object) => {
  const { taskId }: { taskId: string } = action.payload;
  const { tasks } = state;

  const newTasks = tasks.map((task) => {
    if (task.id === taskId) return { ...task, isCancelled: true };
    return task;
  });

  return { ...state, tasks: newTasks };
};

const actionMap = {
  [ADD_NEW_TASK]: onAddNewTask,
  [EDIT_TASK]: editTask,
  [COMPLETE_TASK]: completeTask,
  [UNDO_COMPLETE_TASK]: undoCompleteTask,
  [DISCARD_TASK]: discartTask,
};

// eslint-disable-next-line func-names
export default function (
  state: State = STATE,
  action: ACTION.ApiAction<any, any>
): Object {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
