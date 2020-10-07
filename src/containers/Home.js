import React from 'react';
import { withRouter } from 'react-router-dom';

import Header from '../components/Header';
import PriceList from '../components/PriceList';
import Ionicon from 'react-ionicons';
import {Tabs, Tab} from '../components/Tabs';
import TotalPrice from '../components/TotalPrice';
import MonthPicker from '../components/MonthPicker';
import CreateBtn from '../components/CreateBtn';
import {categories, items} from '../testData';
import {AppContext} from '../App';

import {
  LIST_VIEW,
  CHART_VIEW,
  TYPE_OUTCOME,
  parseToYearAndMonth,
  padMonth,
} from '../utility';

const tabText = [LIST_VIEW, CHART_VIEW];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items,
      currentDate: parseToYearAndMonth('2020/09/01'),
      activeTabIndex: 0,
    };
  }

  changeView = (index) => {
    console.log(index)
    this.setState({
      activeTabIndex: index,
    });
  }
  
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
    const {
      items, 
      currentDate,
      activeTabIndex,
    } = this.state;
    const tabView = tabText[activeTabIndex];

    const itemsWithCategory = items.map(item => {
      const cpItem = {...item};
      cpItem.category = categories.find(c => c.id === cpItem.cid);
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
      <AppContext.Consumer>
        {
          ({state}) => {
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
                  <Tabs 
                    activeIndex={activeTabIndex} 
                    onTabChange={this.changeView}
                  >
                    <Tab>
                      <Ionicon
                        className="rounded-circle mr-2"
                        fontSize="25px"
                        color="#007bff"
                        icon="ios-paper"
                      />
                      列表模式
                    </Tab>
                    <Tab>
                      <Ionicon
                        className="rounded-circle mr-2"
                        fontSize="25px"
                        color="#007bff"
                        icon="ios-pie"
                      />
                      图表模式
                    </Tab>
                  </Tabs>

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
            )
          }
        }
      </AppContext.Consumer>
    );
  };
}

export default withRouter(Home);
