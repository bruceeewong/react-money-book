import React from 'react';
import Header from '../components/Header';
import {Tabs, Tab} from '../components/Tabs';
import CategorySelect from '../components/CategorySelect';
import PriceForm from '../components/PriceForm';
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility';
import withContext from '../WithContext';

const typeList = [TYPE_OUTCOME, TYPE_INCOME];
const getTypeIndex = (type) => typeList.findIndex(t => t === type);

class Create extends React.Component {
  constructor(props) {
    super(props);
    
    let selectedCategory = null;
    let activeTabIndex = 0;

    const { id } = this.props.match.params;
    if (id) {
      selectedCategory = this.getCategoryByItemId(id);
      if (selectedCategory) {
        activeTabIndex = getTypeIndex(selectedCategory.type);
      }
    }
      
    this.state = {
      activeTabIndex,
      selectedCategory,
      validatePass: true,
      alertMsg: '',
    }
  }

  getItemById = (id) => {
    const { data: contextData } = this.props;
    if (!id || !contextData.items[id]) {
      return null;
    }
    return contextData.items[id];
  }

  getCategoryByItemId = (id) => {
    const { data: contextData } = this.props;
    let item = this.getItemById(id);
    if (!item || item.cid === undefined) {
      return null;
    }
    return contextData.categories[item.cid];
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
    if (!this.state.selectedCategory) {
      this.setState({
        validatePass: false,
        alertMsg: '请选择记账分类',
      });
      return;
    }

    if (!isEditMode) {
      // create
      this.props.actions.createItem(data, this.state.selectedCategory.id);
    } else {
      // update
      this.props.actions.updateItem(data, this.state.selectedCategory.id);
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
    
    const { 
      activeTabIndex,
      selectedCategory,
      validatePass,
      alertMsg,
    } = this.state;

    const { id } = this.props.match.params;

    const editItem = (id && contextData.items[id]) ? contextData.items[id] : {};

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
            selectedCategory={selectedCategory}
            onSelectCategory={this.selectCategory}
          />

          <PriceForm
            form={editItem}
            onFormSubmit={this.submitForm}
            onFormCancel={this.cancelSubmit}
          ></PriceForm>

        {
          !validatePass &&
          <div className="alert alert-danger mt-3">{alertMsg}</div>
        }
        </main>
      </React.Fragment>
    );
  }
}

export default withContext(Create);
