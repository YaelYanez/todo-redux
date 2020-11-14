// @flow
import { isEmpty } from 'lodash';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Task } from '../../constants/types';
import TaskCard from '../atoms/Task';

type Props = {
  tasks: Array<Task>,
  type: string,
};

const TaskList = ({ tasks, type }: Props) => {
  function renderTextBaseOnTyes() {
    const texts = {
      all: "You have no tasks. Why don't you take some coffee?",
      completed: 'You might wanna check your pending tasks.',
      pending: "You have no tasks. Why don't you take some coffee?",
    };

    return texts[type];
  }

  if (isEmpty(tasks))
    return (
      <div className="empty-tasks">
        <p>{renderTextBaseOnTyes()}</p>
      </div>
    );

  return (
    <div className="all-task-list">
      {tasks.map((task) => (
        <TaskCard key={uuidv4()} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
