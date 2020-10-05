import React from 'react';
import '../App.css';
import logo from '../logo.svg';

import PriceList from '../components/PriceList';
import ViewTab from '../components/ViewTab';
import TotalPrice from '../components/TotalPrice';
import MonthPicker from '../components/MonthPicker';
import CreateBtn from '../components/CreateBtn';
import {LIST_VIEW, CHART_VIEW, TYPE_OUTCOME, parseToYearAndMonth} from '../utility';

const categories = {
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

const items = [
  {
    "id": 1,
    "title": "工资",
    "price": 12000,
    "date": "2018-09-10",
    "cid": 1,
  },
  {
    "id": 2,
    "title": "去云南旅游",
    "price": 200,
    "date": "2018-09-10",
    "cid": 2,
  },
];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items,
      currentDate: parseToYearAndMonth(),
      tabView: LIST_VIEW,
    };
  }

  render() {
    const {items, currentDate, tabView} = this.state;
    const itemsWithCategory = items.map(item => {
      const cpItem = {...item};
      cpItem.category = categories[cpItem.cid];
      return cpItem;
    });
    let totalIncome = 0, totalOutcome = 0;
    itemsWithCategory.forEach(item => {
      if (item.category.type === TYPE_OUTCOME) {
        totalOutcome += item.price;
      } else {
        totalIncome += item.price;
      }
    })

    return (
    <React.Fragment>
      <header className="App-header">
        <div className="row mb-5">
          <img src={logo} className="App-logo" alt="logo"></img>
        </div>
        <div className="row w-100">
          <div className="col">
            <MonthPicker
              year={currentDate.year}
              month={currentDate.month}
              onChange={(year, month) => {console.log(year, month)}}
            />
          </div>
          <div className="col">
            <TotalPrice
              income={totalIncome}
              outcome={totalOutcome}
            />
          </div>
        </div>
      </header>

      <div className="container-area py-3 px-3">
        <ViewTab 
          activeTab={tabView}
          onTabChange={(view) => {}}  
        />
        <CreateBtn onClick={() => {}} />
        <PriceList
          items={itemsWithCategory}
          onModifyItem={(item) => alert(item.id)}
          onDeleteItem={(item) => alert(item.id)}
        />
      </div>
      </React.Fragment>
    );
  };
}

export default Home;
