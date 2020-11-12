// @flow
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Task } from '../../constants/types';
import TaskCard from '../atoms/Task';

type Props = {
  tasks: Array<Task>,
};

const TaskList = ({ tasks }: Props) => {
  return (
    <div id="tasks-lists">
      {tasks.map((task) => (
        <TaskCard key={uuidv4()} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
