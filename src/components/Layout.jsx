// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';
import {
  getIsTaskListEmpty,
  getCompletedTasks,
  getUncompletedTasks,
  getAllTasks,
} from '../selectors/tasks-selectors';
import type { Task } from '../constants/types';
import TaskBar from './common/TaskBar';
import TaskList from './common/TaskList';
import TaskViewBar from './common/TaskViewBar';

type ViewType = 'all' | 'completed' | 'pending';

type State = {
  viewType: ViewType,
};

type Props = {
  isTaskListEmpty: boolean,
  allTasks: Array<Task>,
  completedTasks: Array<Task>,
  uncompletedTasks: Array<Task>,
};

class Layout extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      viewType: 'all',
    };
  }

  renderTaskList = () => {
    const {
      isTaskListEmpty,
      completedTasks,
      uncompletedTasks,
      allTasks,
    } = this.props;
    const { viewType } = this.state;

    if (isTaskListEmpty)
      return (
        <>
          <h1>No pending tasks for today.</h1>
          <p>Take a moment for yourself</p>
        </>
      );
    if (viewType === 'all') return <TaskList type="all" tasks={allTasks} />;
    if (viewType === 'completed')
      return <TaskList type="completed" tasks={completedTasks} />;
    return <TaskList type="pending" tasks={uncompletedTasks} />;
  };

  setTypeView = (viewType: ViewType) => {
    this.setState({ viewType });
  };

  render() {
    const { isTaskListEmpty } = this.props;

    return (
      <section id="layout">
        <p className="current-date">{moment().format('MMMM Do YYYY')}</p>
        <div className="task-manager">
          <TaskBar />
        </div>
        <div
          className={classNames('task-list', { 'no-tasks': isTaskListEmpty })}
        >
          {!isTaskListEmpty ? (
            <TaskViewBar setTypeView={this.setTypeView} />
          ) : null}
          {this.renderTaskList()}
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ tasks }: Object) => ({
  isTaskListEmpty: getIsTaskListEmpty(tasks),
  allTasks: getAllTasks(tasks),
  completedTasks: getCompletedTasks(tasks),
  uncompletedTasks: getUncompletedTasks(tasks),
});

export default connect(mapStateToProps)(Layout);
