import React from 'react';
import Ionicon from 'react-ionicons';
import PropTypes from 'prop-types';

const getCategoryClass = (selectedId, id) => {
  return selectedId === id 
    ? 'category-item col-3 text-center active' 
    : 'category-item col-3 text-center';
};

const getCategoryIconColor = (selectedId, id) => {
  return selectedId === id 
    ? '#fff' 
    : '#555';
};

const getCategoryBackColor = (selectedId, id) => {
  return selectedId === id 
    ? '#347eff' 
    : '#efefef';
};

class CategorySelect extends React.Component {
  selectCategory = (e, category) => {
    e.preventDefault();
    this.props.onSelectCategory(category);
  }

  render() {
    const {categories, selectedCategory} = this.props;
    const selectedCategoryId = selectedCategory && selectedCategory.id;

    return (
      <div className="category-select-component">
        <div className="row">
          {
            categories.map((category, index) => {
              const categoryClass = getCategoryClass(selectedCategoryId, category.id);
              const iconColor = getCategoryIconColor(selectedCategoryId, category.id);
              const backColor = getCategoryBackColor(selectedCategoryId, category.id);

              return (
                <div 
                  key={category.id}
                  className={categoryClass}
                  onClick={(e) => { this.selectCategory(e, category) }}
                >
                  <Ionicon
                    className="rounded-circle p-2"
                    style={{backgroundColor: backColor }}
                    icon={category.iconName}
                    fontSize="50px"
                    color={iconColor}
                  />
                  <p>{category.name}</p>
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
  selectedCategory: PropTypes.object,
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategorySelect;
