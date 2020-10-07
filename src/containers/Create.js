import React from 'react';
import Header from '../components/Header';
import {Tabs, Tab} from '../components/Tabs';
import CategorySelect from '../components/CategorySelect';
import PriceForm from '../components/PriceForm';
import {categories} from '../testData';
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility';

const typeList = [TYPE_OUTCOME, TYPE_INCOME];

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    }
  }

  selectType = (index) => {
    this.setState({
      activeIndex: index,
    });
  }

  render() {
    const {activeIndex} = this.state;
    const filteredCategories = categories.filter(c => c.type === typeList[activeIndex]);

    return (
      <React.Fragment>
        <Header>Create Page {this.props.match.params.id}</Header>
        <main className="px-4">
          <Tabs 
            activeIndex={activeIndex}
            onTabChange={this.selectType}  
          >
            <Tab>支出</Tab>
            <Tab>收入</Tab>
          </Tabs>

          <CategorySelect
            categories={filteredCategories}
            selectedCategory={filteredCategories[0]}
            onSelectCategory={() => {}}
          />

          <PriceForm
          ></PriceForm>
        </main>
      </React.Fragment>
    );
  }
}

export default Create;
