import React from 'react';
import { withRouter } from 'react-router-dom';
import withContext from '../WithContext';

import Header from '../components/Header';
import PriceList from '../components/PriceList';
import Ionicon from 'react-ionicons';
import {Tabs, Tab} from '../components/Tabs';
import TotalPrice from '../components/TotalPrice';
import MonthPicker from '../components/MonthPicker';
import CreateBtn from '../components/CreateBtn';
import Loader from '../components/Loader';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { chartData } from '../testData';

import {
  LIST_VIEW,
  CHART_VIEW,
  TYPE_OUTCOME,
  Palette,
} from '../utility';

const tabText = [LIST_VIEW, CHART_VIEW];
const Colors = Object.values(Palette);

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0,
    };
  }

  componentDidMount() {
    this.props.actions.getInitData();
  }

  changeView = (index) => {
    this.setState({
      activeTabIndex: index,
    });
  }
  
  changeDate = (year, month) => {
    this.props.actions.selectNewMonth(year, month);
  }
  
  createItem = () => {
    this.props.history.push('/create');
  }
  
  modifyItem = (item) => {
    this.props.history.push(`/edit/${item.id}`);
  }

  deleteItem = (item) => {
    this.props.actions.deleteItem(item);
  }

  getItemsWithCategory = (item) => {
    const { data: contextData } = this.props;
    return Object.values(contextData.items)
      .map(item => {
        const cpItem = {...item};
        cpItem.category = contextData.categories[cpItem.cid];
        return cpItem;
      });
  }

  render() {
    const {
      activeTabIndex,
    } = this.state;
    const tabView = tabText[activeTabIndex];

    const {
      currentDate,
      isLoading,
    } = this.props.data;

    const itemsWithCategory = this.getItemsWithCategory();

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
          <div className="row w-100 pb-3">
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

        <main className="container-area p-4">
          {
            isLoading && 
            <Loader />
          }
          {
            !isLoading &&
            <>
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
              { 
                tabView === LIST_VIEW &&
                <PriceList
                  items={itemsWithCategory}
                  onModifyItem={this.modifyItem}
                  onDeleteItem={this.deleteItem}
                /> 
              }
              { 
                tabView === CHART_VIEW &&
                <PieChart width={400} height={400}>
                  <Pie 
                    dataKey="value"
                    data={chartData}
                    cx={200} 
                    cy={200} 
                    outerRadius={80} 
                    fill="#8884d8" 
                    label 
                  >
                    {
                      chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={Colors[index % Colors.length]}
                        ></Cell>
                      ))
                    }
                  </Pie>
                  <Tooltip />
                </PieChart>
              }
            </>
          }
        </main>
      </React.Fragment>
    );
  };
}

export default withRouter(withContext(Home));
