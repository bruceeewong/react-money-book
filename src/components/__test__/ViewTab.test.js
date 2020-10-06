import React from 'react';
import {shallow} from 'enzyme';
import ViewTab from '../ViewTab';
import {LIST_VIEW, CHART_VIEW} from '../../utility';

const props = {
  activeTab: LIST_VIEW,
  onTabChange: jest.fn(),
}

let wrapper = null;
describe('test ViewTab component', () => {
  beforeEach(() => {
    wrapper = shallow(<ViewTab {...props} />);
  })

  it('should render component match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should highlight correct mode when pass in the mode', () => {
    const anchor1 = wrapper.findWhere((n) => n.text().includes('列表模式')).last().parent();
    expect(anchor1.hasClass('active')).toBeTruthy();

    const wrapperInitWithChart = shallow(<ViewTab activeTab={CHART_VIEW} onTabChange={()=>{}} />);
    const anchor2 = wrapperInitWithChart.findWhere((n) => n.text().includes('图表模式')).last().parent();
    expect(anchor2.hasClass('active')).toBeTruthy();
  });

  it('should trigger callback with the selected mode as payload', () => {
    const chartAnchor = wrapper.findWhere((n) => n.text().includes('图表模式')).last().parent();
    chartAnchor.simulate('click');
    expect(props.onTabChange).toHaveBeenCalledWith(CHART_VIEW);
  });
});