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

import * as itemAPI from './api/item';
import * as categoryAPI from './api/category';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      items: flattenArr(items),
      categories: flattenArr(categories),
      currentDate: parseToYearAndMonth(),
    };

    this.actions = {
      getInitData: async () => {
        this.setState({
          isLoading: true,
        });

        const promiseArr = [
          categoryAPI.getCategories(), 
          itemAPI.getItems(this.state.currentDate.year, this.state.currentDate.month)
        ];
        const [categoryRes, itemRes] = await Promise.all(promiseArr);
        this.setState({
          categories: flattenArr(categoryRes.data),
          items: flattenArr(itemRes.data),
          isLoading: false,
        });
      },

      selectNewMonth: async (year, month) => {
        this.setState({
          isLoading: true,
          currentDate: { year, month },
        });

        const res = await itemAPI.getItems(year, month);
        this.setState({
          isLoading: false,
          items: flattenArr(res.data),
        });
      },

      deleteItem: async (item) => {
        await itemAPI.deleteItem(item.id);
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
