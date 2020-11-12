// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { onAddNewTask } from '../../actions/tasks-actions';
import type { Category, Task } from '../../constants/types';
import { getTasksCategories } from '../../selectors/tasks-selectors';
import Dropdown from '../atoms/Dropdown';

type Props = {
  categories: Array<Category>,
  addNewTask: (task: Task) => void,
};

type State = {
  taskValue: string,
  taskCategory: Category,
};

class TaskBar extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      taskValue: '',
      taskCategory: { title: 'None', color: 'grey' },
    };
  }

  onChangeTaskValue = ({ target }: SyntheticInputEvent<EventTarget>) => {
    const { value } = target;
    this.setState({ taskValue: value });
  };

  onChangeTaskCategory = (task: Category) => {
    this.setState({ taskCategory: task });
  };

  onSubmitNewTask = ({ key }) => {
    if (key === 'Enter') {
      const { taskValue, taskCategory } = this.state;
      const { addNewTask } = this.props;

      const task: Task = {
        id: uuidv4(),
        title: taskValue,
        category: taskCategory,
        creationDate: Date.now().toString(),
        endedDate: '',
        isCompleted: false,
        isCanceled: false,
      };

      addNewTask(task);
    }
  };

  render() {
    const { taskValue, taskCategory } = this.state;
    const { categories } = this.props;

    return (
      <div id="taskbar">
        <input
          type="text"
          value={taskValue}
          onChange={this.onChangeTaskValue}
          placeholder="Add a new task"
          onKeyDown={this.onSubmitNewTask}
        />

        <Dropdown
          options={categories}
          defaultValue={taskCategory}
          onChangeOption={this.onChangeTaskCategory}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ tasks }) => ({
  categories: getTasksCategories(tasks),
});

export default connect(mapStateToProps, { addNewTask: onAddNewTask })(TaskBar);
