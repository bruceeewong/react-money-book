import React from 'react';
import { withRouter } from 'react-router-dom';
import withContext from '../WithContext';
import Header from '../components/Header';
import {Tabs, Tab} from '../components/Tabs';
import CategorySelect from '../components/CategorySelect';
import PriceForm from '../components/PriceForm';
import Loader from '../components/Loader';
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility';

const typeList = [TYPE_OUTCOME, TYPE_INCOME];
const getTypeIndex = (type) => typeList.findIndex(t => t === type);

export class Create extends React.Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    this.state = {
      ...this.getInitData(id),
      validatePass: true,
      alertMsg: '',
    }
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    await this.props.actions.getEditData(id);

    this.setState({
      ...this.getInitData(id),
    })
  }

  getInitData(id) {
    let selectedCategory = null;
    let activeTabIndex = 0;
    if (id) {
      selectedCategory = this.getCategoryByItemId(id);
      if (selectedCategory) {
        activeTabIndex = getTypeIndex(selectedCategory.type);
      }
    }
    return {
      activeTabIndex,
      selectedCategory,
    };
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

  filterCategoryByType = (type) => {
    const { data: contextData } = this.props;
    return Object.values(contextData.categories)
      .filter(c => c.type === type);
  }

  selectType = (index) => {
    this.setState({
      activeTabIndex: index,
    });
  }

  cancelSubmit = () => {
    this.props.history.push('/');
  }

  submitForm = async (data, isEditMode) => {
    if (!this.state.selectedCategory) {
      this.setState({
        validatePass: false,
        alertMsg: '请选择记账分类',
      });
      return;
    }

    if (!isEditMode) {
      // create
      await this.props.actions.createItem(data, this.state.selectedCategory.id);
    } else {
      // update
      await this.props.actions.updateItem(data, this.state.selectedCategory.id);
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

    const tryEditItem = this.getItemById(this.props.match.params.id);
    const editItem = tryEditItem ? tryEditItem : {};
    const filteredCategories = this.filterCategoryByType(typeList[activeTabIndex]);

    return (
      <React.Fragment>
        <Header></Header>
        { 
          contextData.isLoading &&
          <Loader />
        }
        {
          !contextData.isLoading &&
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
        }
      </React.Fragment>
    );
  }
}

export default withRouter(withContext(Create));
