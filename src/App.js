import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './containers/Home';
import Create from './containers/Create';
import {categories, items} from './testData';
import { flattenArr } from './utility';

export const AppContext = React.createContext();
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: flattenArr(items),
      categories: flattenArr(categories),
    }
  }

  render() {
    return (
      <AppContext.Provider
         value={{
           state: this.state,
         }}
      >
        <Router>
          <div className="App">
            <Route path="/" exact component={Home} />
            <Route path="/create" component={Create} />
            <Route path="/edit/:id" component={Create} />
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
