import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AppContext } from './WithContext';
import Home from './containers/Home';
import Create from './containers/Create';
import { 
  flattenArr, 
  createID, 
  parseToYearAndMonth, 
  createTimestamp,
  getYearMonthStr,
} from './utility';

import * as itemAPI from './api/item';
import * as categoryAPI from './api/category';

class App extends React.Component {
  constructor(props) {
    super(props);

    const withLoading = (cb) => {
      return (...args) => {
        this.setState({
          isLoading: true,
        });
        return cb(...args);
      };
    };

    this.state = {
      isLoading: false,
      items: {},
      categories: {},
      currentDate: parseToYearAndMonth(),
    };

    this.actions = {
      getInitData: withLoading(async () => {
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
      }),

      getEditData: withLoading(async (id) => {
        const { items, categories } = this.state;
        // categories 请求优化
        if (Object.keys(categories).length === 0) {
          const categoryRes = await categoryAPI.getCategories();
          const fetchedCategories = flattenArr(categoryRes.data);
          this.setState({
            categories: fetchedCategories,
          });
        }
        // edit item 数据请求优化
        if (id) {
          const isItemAlreadyFetched = Object.keys(items).includes(id);
          if (!isItemAlreadyFetched) {
            const { data: editItem } = await itemAPI.getItemById(id);
            this.setState({
              items: {
                ...this.state.items,
                [editItem.id]: editItem,
              }
            });
          }
        }
        this.setState({
          isLoading: false,
        });
      }),

      selectNewMonth: withLoading(async (year, month) => {
        this.setState({
          currentDate: { year, month },
        });

        const res = await itemAPI.getItems(year, month);
        this.setState({
          isLoading: false,
          items: flattenArr(res.data),
        });
      }),

      deleteItem: async (item) => {
        await itemAPI.deleteItem(item.id);
        delete this.state.items[item.id];
        this.setState({
          items: this.state.items,
        });
      },

      createItem: withLoading(async (item, categoryId) => {
        const newID = createID();
        const parseDate = parseToYearAndMonth(item.date);
        const newItem = {
          ...item,
          cid: categoryId,
          id: newID,
          monthCategory: getYearMonthStr(parseDate),
          timestamp: createTimestamp(item.date),
        };

        const res = await itemAPI.addItem(newItem);
    
        this.setState({
          items: {
            ...this.state.items,
            [newID]: res.data,
          },
          isLoading: false,
        });
      }),

      updateItem: withLoading(async (item, updatedCategoryId) => {
        const modifiedItem = {
          ...item,
          cid: updatedCategoryId,
          monthCategory: getYearMonthStr(item.date),
          timestamp: createTimestamp(item.date),
        };

        const res = await itemAPI.updateItem(modifiedItem.id, modifiedItem);

        this.setState({
          items: {
            ...this.state.items,
            [modifiedItem.id]: res.data,
          },
          isLoading: false,
        });
      }),
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
