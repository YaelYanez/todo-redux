// @flow
import React, { Component } from 'react';
import type { Task } from '../../constants/types';

type Props = {
  task: Task,
};

type State = {};

class TaskCard extends Component<Props, State> {
  editTask = () => {};

  discardTask = () => {};

  checkTask = () => {};

  unCheckTask = () => {};

  render() {
    const {
      task: { title },
    } = this.props;

    return <div className="task-card">{title}</div>;
  }
}

export default TaskCard;
