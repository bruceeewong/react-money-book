import React from 'react';
import '../App.css';
import logo from '../logo.svg';

import PriceList from '../components/PriceList';
import ViewTab from '../components/ViewTab';
import TotalPrice from '../components/TotalPrice';
import MonthPicker from '../components/MonthPicker';
import {LIST_VIEW, CHART_VIEW} from '../utility';


const items = [
  {
    "id": 1,
    "title": "工资",
    "price": 12000,
    "date": "2018-09-10",
    "category": {
      "id": 1,
      "name": "工资",
      "type": "income",
      "iconName": "ios-plane",
    }
  },
  {
    "id": 2,
    "title": "去云南旅游",
    "price": 200,
    "date": "2018-09-10",
    "category": {
      "id": 2,
      "name": "旅行",
      "type": "outcome",
      "iconName": "ios-plane",
    }
  },
];

class Home extends React.Component {
  render() {
    return (
    <React.Fragment>
      <header className="App-header">
        <div className="row mb-5">
          <img src={logo} className="App-logo" alt="logo"></img>
        </div>
        <div className="row">
          <div className="col">
            <MonthPicker
              year={2020}
              month={1}
              onChange={(year, month) => {console.log(year, month)}}
            />
          </div>
          <div className="col">
            <TotalPrice
              income={17000}
              outcome={10000}
            />
          </div>
        </div>
      </header>

        <ViewTab 
          activeTab={LIST_VIEW}
          onTabChange={(view) => alert(view)}  
        />
        
        <PriceList
          items={items}
          onModifyItem={(item) => alert(item.id)}
          onDeleteItem={(item) => alert(item.id)}
        />

      </React.Fragment>
    );
  };
}

export default Home;
