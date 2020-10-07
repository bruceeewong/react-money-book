import React from 'react';
import { AppContext } from './App';

/**
 * HOC: Context上下文提供
 * @param {React.Component} Component 
 */
const withContext = (Component) => {
  return (props) => (
    <AppContext.Consumer>
      {
        ({state, actions}) => (
          <Component 
            {...props} 
            data={state}
            actions={actions}
          ></Component>
        )
      }
    </AppContext.Consumer>
  )
};

export default withContext;
