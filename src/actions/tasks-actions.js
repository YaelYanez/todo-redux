// @flow
import { TASKS_TYPES, ACTION } from '../constants';
import type { Task } from '../constants/types';

const {
  ADD_NEW_TASK,
  EDIT_TASK,
  COMPLETE_TASK,
  UNDO_COMPLETE_TASK,
  DISCARD_TASK,
} = TASKS_TYPES;

type ThunkAction = ACTION.ThunkAction<string, Object>;
type Dispatch = ACTION.Dispatch<string, Object>;

export const onAddNewTask = (task: Task): ThunkAction => {
  return (dispatch: Dispatch) =>
    dispatch({ type: ADD_NEW_TASK, payload: { task } });
};

export const onEditNewTask = (taskId: string, newTitle: string) => {
  return (dispatch: Dispatch) =>
    dispatch({ type: EDIT_TASK, payload: { taskId, newTitle } });
};

export const onCompleteTask = (taskId: string) => {
  return (dispatch: Dispatch) =>
    dispatch({ type: COMPLETE_TASK, payload: { taskId } });
};

export const onUndoCompleteTask = (taskId: string) => {
  return (dispatch: Dispatch) =>
    dispatch({ type: UNDO_COMPLETE_TASK, payload: { taskId } });
};

export const onDiscardTask = (taskId: string) => {
  return (dispatch: Dispatch) =>
    dispatch({ type: DISCARD_TASK, payload: { taskId } });
};
