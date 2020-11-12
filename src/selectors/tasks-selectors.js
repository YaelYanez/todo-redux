// @flow
import { isEmpty } from 'lodash';
import type { Task, Category } from '../constants/types';

export const getIsTaskListEmpty = ({
  tasks,
}: {
  tasks: Array<Task>,
}): Array<Task> => {
  return isEmpty(tasks);
};

export const getCompletedTasks = ({
  tasks,
}: {
  tasks: Array<Task>,
}): Array<Task> => {
  return tasks;
};

export const getUncompletedTasks = ({
  tasks,
}: {
  tasks: Array<Task>,
}): Array<Task> => {
  return tasks;
};

export const getTasksCategories = ({
  categories,
}: {
  categories: Array<Category>,
}): Array<Category> => {
  return categories;
};
