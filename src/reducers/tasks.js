// @flow
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
    { title: 'Work', color: 'blue' },
    { title: 'Personal', color: 'green' },
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

  console.log(taskId, newTitle);
};

const completeTask = (state: Object, action: Object) => {
  const { taskId }: { taskId: string } = action.payload;

  console.log(taskId);
};

const undoCompleteTask = (state: Object, action: Object) => {
  const { taskId }: { taskId: string } = action.payload;

  console.log(taskId);
};

const discartTask = (state: Object, action: Object) => {
  const { taskId }: { taskId: string } = action.payload;

  console.log(taskId);
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
