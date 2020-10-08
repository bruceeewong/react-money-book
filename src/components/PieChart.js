import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { Palette } from '../utility';

const Colors = Object.values(Palette);

const CustomPieChart = ({ title, categoryData }) => {
  if (categoryData.length === 0) {
    return <p className="text-center text-secondary mt-3">{title} 暂无数据</p>
  }
  return (
    <div className="pie-chart-component">
      <h3 className="text-center mt-3">{title}</h3>
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart width={400} height={400}>
          <Pie 
            dataKey="value"
            data={categoryData}
            isAnimationActive={false}
            cx="50%" 
            cy="50%"
            outerRadius={100} 
            fill={Colors.blue} 
            label 
          >
            {
              categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={Colors[index % Colors.length]}
                />
              ))
            }
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

CustomPieChart.propTypes = {
  title: PropTypes.string,
  categoryData: PropTypes.array,
}

CustomPieChart.defaultProps = {
  title: '默认标题',
  categoryData: [],
};

export default CustomPieChart;
