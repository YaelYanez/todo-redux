// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Options, Trash, Check } from '../../icons';
import {
  onDiscardTask,
  onCompleteTask,
  onUndoCompleteTask,
  onEditNewTask,
} from '../../actions/tasks-actions';
import type { Task } from '../../constants/types';

type Props = {
  task: Task,
  discardTask: (taskId: string) => void,
  editTask: (taskId: string, newTitle: string) => void,
  checkTask: (taskId: string) => void,
  uncheckTask: (taskId: string) => void,
};

type State = {
  areOptionsOpen: boolean,
};

class TaskCard extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      areOptionsOpen: false,
    };
  }

  handleOptionsVisibility = () => {
    const { areOptionsOpen } = this.state;
    this.setState({ areOptionsOpen: !areOptionsOpen });
  };

  onEditTask = ({ target, key }: any) => {
    const { textContent } = target;
    const { task, editTask } = this.props;

    if (key === 'Enter' || key === undefined) editTask(task.id, textContent);
  };

  onDiscardTask = () => {
    const { discardTask, task } = this.props;
    discardTask(task.id);
  };

  onCheckTask = () => {
    const { checkTask, uncheckTask, task } = this.props;

    if (task.isCompleted === true) uncheckTask(task.id);
    else checkTask(task.id);
  };

  render() {
    const { areOptionsOpen } = this.state;
    const {
      task: { title, category, isCompleted },
    } = this.props;

    return (
      <div className="task-card">
        <span
          className="category-indicator"
          style={{ backgroundColor: category.color }}
        />
        <div
          className={classNames('task-card-content', {
            'is-checked': isCompleted,
          })}
        >
          <span
            className="checkbox"
            onClick={this.onCheckTask}
            role="presentation"
          >
            <Check />
          </span>
          <span className="strike-line" />
          <p
            className="task-title"
            contentEditable
            onKeyDown={this.onEditTask}
            onBlur={this.onEditTask}
            role="presentation"
          >
            {title}
          </p>
        </div>

        <div className="task-card-actions">
          <div
            className="task-icon-button"
            onClick={this.handleOptionsVisibility}
            role="presentation"
          >
            <Options />
          </div>

          <div
            className={classNames('task-options-list', {
              'is-expanded': areOptionsOpen,
            })}
          >
            <p onClick={this.onDiscardTask} role="presentation">
              <Trash /> Delete
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {
  discardTask: onDiscardTask,
  editTask: onEditNewTask,
  checkTask: onCompleteTask,
  uncheckTask: onUndoCompleteTask,
})(TaskCard);
