// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getIsTaskListEmpty,
  getCompletedTasks,
  getUncompletedTasks,
} from '../selectors/tasks-selectors';
import { Task } from '../constants';
import TaskBar from './common/TaskBar';
import TaskList from './common/TaskList';

type State = {
  viewType: 0 | 1,
};

type Props = {
  isTaskListEmpty: ?Array<Task>,
  completedTasks: Array<Task>,
  uncompletedTasks: Array<Task>,
};

class Layout extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      viewType: 0,
    };
  }

  renderTaskList = () => {
    const { isTaskListEmpty, completedTasks, uncompletedTasks } = this.props;
    const { viewType } = this.state;

    if (isTaskListEmpty) return <h1>No tasks</h1>;
    if (viewType === 0) return <TaskList tasks={uncompletedTasks} />;
    return <TaskList tasks={completedTasks} />;
  };

  render() {
    return (
      <section id="layout">
        <TaskBar />
        {this.renderTaskList()}
      </section>
    );
  }
}

const mapStateToProps = ({ tasks }: Object) => ({
  isTaskListEmpty: getIsTaskListEmpty(tasks),
  completedTasks: getCompletedTasks(tasks),
  uncompletedTasks: getUncompletedTasks(tasks),
});

export default connect(mapStateToProps)(Layout);
