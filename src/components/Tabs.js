/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';

export class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex,
    };
  }

  tabChange = (e, index) => {
    e.preventDefault();
    this.setState({
      activeIndex: index,
    })
    if (this.props.onTabChange) {
      this.props.onTabChange(index);
    }
  }

  render() {
    const { children } = this.props;
    const { activeIndex } = this.state;

    return (
      <ul className="nav nav-tabs nav-fill my-4">
        {
          React.Children.map(children, (child, index) => {
            const activeClass = activeIndex === index ? 'nav-link active' : 'nav-link';
            return (
              <li className="nav-item">
                <a 
                  href="#" 
                  className={activeClass}
                  onClick={(e) => { this.tabChange(e, index) }}
                >
                  {child}
                </a>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

Tabs.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  onTabChange: PropTypes.func,
};

Tabs.defaultProps = {
  activeIndex: 0,
};

export const Tab = ({children}) => {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};
