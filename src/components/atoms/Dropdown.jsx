// @flow
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Category } from '../../constants/types';

type Props = {
  options: Array<Category>,
  defaultValue: Object,
  onChangeOption: (selectedOption: Category) => void,
};

type State = {
  selectedOption: Object,
};

class Dropdown extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      selectedOption: {},
    };
  }

  componentDidMount() {
    const { defaultValue } = this.props;
    this.setState({ selectedOption: defaultValue });
  }

  onSelectCategory = ({ currentTarget }: SyntheticEvent<HTMLButtonElement>) => {
    const { id } = currentTarget;
    const { options, onChangeOption } = this.props;
    const { selectedOption } = this.state;
    const newSelectedOption =
      options.find(({ title }) => title === id) || selectedOption;

    this.setState({ selectedOption: newSelectedOption });

    onChangeOption(selectedOption);
  };

  render() {
    const { options } = this.props;
    const { selectedOption } = this.state;

    return (
      <div id="dropdown">
        <p>{selectedOption.title}</p>
        <p>{selectedOption.color}</p>

        <div className="dropdown-options">
          {options.map(({ title, color }) => (
            <div
              key={uuidv4()}
              id={title}
              onClick={this.onSelectCategory}
              role="presentation"
            >
              <p>{title}</p>
              <p>{color}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Dropdown;
