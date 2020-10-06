import React from 'react';
import Ionicon from 'react-ionicons';
import PropTypes from 'prop-types';

class CategorySelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategoryId: props.selectedCategory && props.selectedCategory.id,
    };
  }

  selectCategory = (e, category) => {
    e.preventDefault();
    this.setState({
      selectedCategoryId: category.id,
    })
    this.props.onSelectCategory(category);
  }

  render() {
    const {categories} = this.props;
    const {selectedCategoryId} = this.state;

    return (
      <div className="category-select-component">
        <div className="row">
          {
            categories.map((category, index) => {
              const activeClassName = (selectedCategoryId === category.id) ? 
                'category-item col-3 active' : 'category-item col-3';

              return (
                <div 
                  key={category.id}
                  className={activeClassName}
                  onClick={(e) => { this.selectCategory(e, category) }}
                >
                  <Ionicon
                    className="rounded-circle"
                    icon={category.iconName}
                    fontSize="50px"
                    color="#555"
                  />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

CategorySelect.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.object.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategorySelect;
