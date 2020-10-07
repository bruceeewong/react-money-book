import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AppContext } from './WithContext';
import Home from './containers/Home';
import Create from './containers/Create';
import {categories, items} from './testData';
import { 
  flattenArr, 
  createID, 
  parseToYearAndMonth, 
  createTimestamp,
} from './utility';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: flattenArr(items),
      categories: flattenArr(categories),
    };

    this.actions = {
      deleteItem: (item) => {
        delete this.state.items[item.id];
        this.setState({
          items: this.state.items,
        });
      },
      createItem: (item, categoryId) => {
        const newID = createID();
        const parseDate = parseToYearAndMonth(item.date);
        const newItem = {
          ...item,
          cid: categoryId,
          id: newID,
          monthCategory: `${parseDate.year}-${parseDate.month}`,
          timestamp: createTimestamp(item.date),
        };
        this.setState({
          items: {
            ...this.state.items,
            [newID]: newItem,
          }
        });
      },
      updateItem: (item, updatedCategoryId) => {
        const modifiedItem = {
          ...item,
          cid: updatedCategoryId,
          timestamp: createTimestamp(item.date),
        };

        this.setState({
          items: {
            ...this.state.items,
            [modifiedItem.id]: modifiedItem,
          }
        })
      }
    }
  }

  render() {
    return (
      <AppContext.Provider
         value={{
           state: this.state,
           actions: this.actions,
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
