import React from 'react';

export const AppContext = React.createContext();

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
