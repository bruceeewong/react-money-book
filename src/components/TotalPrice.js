// 价格综合组件，根据传入的收入/支出价格，显示价格

import React from 'react';
import PropTypes from 'prop-types';

const TotalPrice = ({income, outcome}) => (
  <section className="row">
    <div className="col">
      <h5 className="income">收入：<span>{income}</span></h5>
    </div>
    <div className="col">
      <h5 className="outcome">支出：<span>{outcome}</span></h5>
    </div>
  </section>
);

TotalPrice.propTypes = {
  income: PropTypes.number.isRequired,
  outcome: PropTypes.number.isRequired,
};

TotalPrice.defaultProps = {
  income: 0,
  outcome: 0,
}
export default TotalPrice;