// @flow
import { isEmpty, sortBy } from 'lodash';
import type { Task, Category } from '../constants/types';

export const getIsTaskListEmpty = ({
  tasks,
}: {
  tasks: Array<Task>,
}): boolean => {
  const validTasks = tasks.filter((task) => !task.isCancelled);
  return isEmpty(validTasks);
};

export const getAllTasks = ({ tasks }: { tasks: Array<Task> }): Array<Task> => {
  const validTasks = tasks.filter((task) => !task.isCancelled);
  return sortBy(validTasks, (task) => task.isCompleted);
};

export const getCompletedTasks = ({
  tasks,
}: {
  tasks: Array<Task>,
}): Array<Task> => {
  const validTasks = tasks.filter((task) => !task.isCancelled);
  const completedTasks = validTasks.filter((task) => task.isCompleted);

  return completedTasks;
};

export const getUncompletedTasks = ({
  tasks,
}: {
  tasks: Array<Task>,
}): Array<Task> => {
  const validTasks = tasks.filter((task) => !task.isCancelled);
  const uncompletedTasks = validTasks.filter((task) => !task.isCompleted);

  return uncompletedTasks;
};

export const getTasksCategories = ({
  categories,
}: {
  categories: Array<Category>,
}): Array<Category> => {
  return categories;
};
