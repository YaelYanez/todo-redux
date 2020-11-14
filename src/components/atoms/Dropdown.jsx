// @flow
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import type { Category } from '../../constants/types';
import { Arrow } from '../../icons';

type Props = {
  options: Array<Category>,
  defaultValue: Object,
  onChangeOption: (selectedOption: Category) => void,
};

type State = {
  selectedOption: Object,
  optionsVisibilty: boolean,
};

class Dropdown extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      selectedOption: {},
      optionsVisibilty: false,
    };
  }

  componentDidMount() {
    const { defaultValue } = this.props;
    this.setState({ selectedOption: defaultValue });
  }

  onSelectOption = ({ currentTarget }: SyntheticEvent<HTMLButtonElement>) => {
    const { id } = currentTarget;
    const { options, onChangeOption } = this.props;
    const { selectedOption } = this.state;
    const newSelectedOption =
      options.find(({ title }) => title === id) || selectedOption;

    this.setState({
      selectedOption: newSelectedOption,
      optionsVisibilty: false,
    });

    onChangeOption(newSelectedOption);
  };

  handleOptionVisibility = () => {
    const { optionsVisibilty } = this.state;

    this.setState({ optionsVisibilty: !optionsVisibilty });
  };

  render() {
    const { options } = this.props;
    const { selectedOption, optionsVisibilty } = this.state;

    return (
      <div className="dropdown">
        <div
          className={classNames('dropdown-selected-option', {
            'is-expanded': optionsVisibilty,
          })}
          onClick={this.handleOptionVisibility}
          role="presentation"
        >
          <p className="dropdown-option">
            <span style={{ borderColor: selectedOption.color }} />
            {selectedOption.title}
          </p>
          <Arrow />
        </div>

        <div
          className={classNames('dropdown-options', {
            'is-expanded': optionsVisibilty,
          })}
        >
          {options.map(({ title, color }) => (
            <div
              key={uuidv4()}
              id={title}
              onClick={this.onSelectOption}
              role="presentation"
            >
              <p className="dropdown-option">
                <span style={{ borderColor: color }} />
                {title}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Dropdown;
