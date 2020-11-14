// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { onAddNewTask } from '../../actions/tasks-actions';
import { getTasksCategories } from '../../selectors/tasks-selectors';
import type { Category, Task } from '../../constants/types';
import Dropdown from '../atoms/Dropdown';

type Props = {
  categories: Array<Category>,
  addNewTask: (task: Task) => void,
};

type State = {
  taskValue: string,
  taskCategory: Category,
  isInputFocus: boolean,
};

class TaskBar extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      taskValue: '',
      taskCategory: { title: 'No List', color: '#8e8e93' },
      isInputFocus: false,
    };
  }

  onChangeTaskValue = ({ target }: SyntheticInputEvent<EventTarget>) => {
    const { value } = target;
    this.setState({ taskValue: value, isInputFocus: !!value });
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
        creationDate: moment().format('MMMM Do YYYY'),
        endedDate: '',
        isCompleted: false,
        isCancelled: false,
      };

      addNewTask(task);
      this.setState({ taskValue: '', isInputFocus: false });
    }
  };

  render() {
    const { taskValue, taskCategory, isInputFocus } = this.state;
    const { categories } = this.props;

    return (
      <div className="taskbar">
        <div className="taskbar-input">
          <span
            className="placeholded-task"
            style={{
              backgroundColor: isInputFocus ? taskCategory.color : '#f5f6f8',
            }}
          />
          <input
            type="text"
            value={taskValue}
            onChange={this.onChangeTaskValue}
            placeholder="Add a new task"
            onKeyDown={this.onSubmitNewTask}
          />
        </div>

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
