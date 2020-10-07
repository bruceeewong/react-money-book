import React from 'react';
import { withRouter } from 'react-router-dom';

import Header from '../components/Header';
import PriceList from '../components/PriceList';
import ViewTab from '../components/ViewTab';
import TotalPrice from '../components/TotalPrice';
import MonthPicker from '../components/MonthPicker';
import CreateBtn from '../components/CreateBtn';

import {
  LIST_VIEW,
  CHART_VIEW,
  TYPE_OUTCOME,
  parseToYearAndMonth,
  padMonth,
} from '../utility';

export const categories = {
  "1": {
    "id": 1,
    "name": "工资",
    "type": "income",
    "iconName": "ios-plane",
  },
  "2": {
    "id": 1,
    "name": "旅行",
    "type": "outcome",
    "iconName": "ios-plane",
  },
}


// FIXME: 测试数据
export const items = [
  {
    "id": 1,
    "title": "工资",
    "price": 12000,
    "date": "2020-10-10",
    "cid": 1,
  },
  {
    "id": 2,
    "title": "去云南旅游",
    "price": 200,
    "date": "2020-10-20",
    "cid": 2,
  },
];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items,
      currentDate: parseToYearAndMonth('2020/09/01'),
      tabView: LIST_VIEW,
    };
  }

  changeView = (view) => { this.setState({tabView: view}); }
  
  changeDate = (year, month) => {
    this.setState({
      currentDate: {
        year,
        month,
      },
    });
  }
  
  createItem = () => {
    this.props.history.push('/create');
  }
  
  modifyItem = (modifiedItem) => {
    const modifiedItems = this.state.items.map(item => {
      if (item.id !== modifiedItem.id) return item;
      return {
        ...item,
        title: '更新后的标题',
      };
    });
    this.setState({
      items: modifiedItems,
    });
  }

  deleteItem = (deletedItem) => {
    const filteredItems = this.state.items.filter(item => item.id !== deletedItem.id);
    this.setState({
      items: filteredItems,
    });
  }

  render() {
    const {items, currentDate, tabView} = this.state;
    const itemsWithCategory = items.map(item => {
      const cpItem = {...item};
      cpItem.category = categories[cpItem.cid];
      return cpItem;
    }).filter(item => {
      return item.date.includes(`${currentDate.year}-${padMonth(currentDate.month)}`);
    });
    let totalIncome = 0, totalOutcome = 0;
    itemsWithCategory.forEach(item => {
      if (item.category.type === TYPE_OUTCOME) {
        totalOutcome += item.price;
      } else {
        totalIncome += item.price;
      }
    });

    return (
      <React.Fragment>
        <Header>
          <div className="row w-100">
            <div className="col">
              <MonthPicker
                year={currentDate.year}
                month={currentDate.month}
                onChange={this.changeDate}
              />
            </div>
            <div className="col">
              <TotalPrice
                income={totalIncome}
                outcome={totalOutcome}
              />
            </div>
          </div>
        </Header>

        <div className="container-area py-3 px-3">
          <ViewTab 
            activeTab={tabView}
            onTabChange={this.changeView}  
          />
          <CreateBtn onClick={this.createItem} />
          { tabView === LIST_VIEW &&
            <PriceList
              items={itemsWithCategory}
              onModifyItem={this.modifyItem}
              onDeleteItem={this.deleteItem}
            /> }
          { tabView === CHART_VIEW &&
            <h1 className="chart-title">这里是图表区</h1> }
        </div>
      </React.Fragment>
    );
  };
}

export default withRouter(Home);
