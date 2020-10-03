import React from 'react';
import logo from './logo.svg';
import './App.css';
import PriceList from './components/PriceList';

const items = [
  {
    "id": 1,
    "title": "工资",
    "price": 12000,
    "date": "2018-09-10",
    "category": {
      "id": 1,
      "name": "工资",
      "type": "income"
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
      "type": "outcome"
    }
  },
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <PriceList 
        items={items}
        onModifyItem={(item) => alert(item.id)}
        onDeleteItem={(item) => alert(item.id)}
      ></PriceList>
    </div>
  );
}

export default App;
