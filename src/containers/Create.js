import React from 'react';
import Header from '../components/Header';
import {Tabs, Tab} from '../components/Tabs';
import CategorySelect from '../components/CategorySelect';
import PriceForm from '../components/PriceForm';
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility';
import withContext from '../WithContext';

const typeList = [TYPE_OUTCOME, TYPE_INCOME];

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0,
      selectedCategory: null,
    }
  }

  selectType = (index) => {
    this.setState({
      activeTabIndex: index,
    });
  }

  cancelSubmit = () => {
    this.props.history.push('/');
  }

  submitForm = (data, isEditMode) => {
    if (!isEditMode) {
      // create
      this.props.actions.createItem(data, this.state.selectedCategory.id);
    } else {
      // update
    }
    this.props.history.push('/');
  }

  selectCategory = (category) => {
    this.setState({
      selectedCategory: category,
    });
  }

  render() {
    const { data: contextData } = this.props;
    const {activeTabIndex} = this.state;
    const filteredCategories = Object.values(contextData.categories)
      .filter(c => c.type === typeList[activeTabIndex]);

    return (
      <React.Fragment>
        <Header>Create Page {this.props.match.params.id}</Header>
        <main className="px-4">
          <Tabs 
            activeIndex={activeTabIndex}
            onTabChange={this.selectType}  
          >
            <Tab>支出</Tab>
            <Tab>收入</Tab>
          </Tabs>

          <CategorySelect
            categories={filteredCategories}
            selectedCategory={this.selectedCategory}
            onSelectCategory={this.selectCategory}
          />

          <PriceForm
            onFormSubmit={this.submitForm}
            onFormCancel={this.cancelSubmit}
          ></PriceForm>
        </main>
      </React.Fragment>
    );
  }
}

export default withContext(Create);
