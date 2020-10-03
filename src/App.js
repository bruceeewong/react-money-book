import React from 'react';
import logo from './logo.svg';
import './App.css';
import ViewTab from './components/ViewTab';
// import PriceList from './components/PriceList';

// const items = [
//   {
//     "id": 1,
//     "title": "工资",
//     "price": 12000,
//     "date": "2018-09-10",
//     "category": {
//       "id": 1,
//       "name": "工资",
//       "type": "income",
//       "iconName": "ios-plane",
//     }
//   },
//   {
//     "id": 2,
//     "title": "去云南旅游",
//     "price": 200,
//     "date": "2018-09-10",
//     "category": {
//       "id": 2,
//       "name": "旅行",
//       "type": "outcome",
//       "iconName": "ios-plane",
//     }
//   },
// ]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <ViewTab 
        activeTab="list"
        onTabChange={(view) => alert(view)}  
      ></ViewTab>

      {/* <PriceList
        items={items}
        onModifyItem={(item) => alert(item.id)}
        onDeleteItem={(item) => alert(item.id)}
      /> */}

    </div>
  );
}

export default App;
