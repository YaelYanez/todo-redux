// @flow
import React, { useState } from 'react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  setTypeView: (viewType: any) => void,
};

const TaskViewBar = ({ setTypeView }: Props) => {
  const [selectedView, setSelectedView] = useState('all');
  const buttons = ['all', 'pending', 'completed'];

  function onSetTypeView(event: SyntheticInputEvent<HTMLElement>) {
    const {
      currentTarget: { id },
    } = event;

    setSelectedView(id);
    setTypeView(id);
  }

  return (
    <div className="task-view-bar">
      <p>Tasks</p>
      <div className="task-view-options">
        {buttons.map((text) => (
          <button
            onClick={onSetTypeView}
            className={classNames({ 'is-selected': selectedView === text })}
            type="button"
            id={text}
            key={uuidv4()}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskViewBar;
