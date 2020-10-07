export const LIST_VIEW = 'list';
export const CHART_VIEW = 'chart';
export const TYPE_OUTCOME = 'outcome';
export const TYPE_INCOME = 'income';

/**
 * 月份补全
 * @param {string|number} n 
 */
export const padMonth = (n) => {
  if (typeof n !== 'string' && typeof n !== 'number') return n
  let nStr = n.toString();
  return nStr.padStart(2, '0');
};

/**
 * 按步长和范围生成连续数字的数组
 * @param {number} size 
 * @param {number} start 
 * @param {number} step 
 */
export const range = (size=0, start=0, step=1) => {
  let result = [];
  for (let i = start; i < start + size; i += step) {
    result.push(i);
  }
  return result;
}

/**
 * 生成当前年分左右附近年份的数组
 * @param {number|string} year 
 * @param {number} offset 
 */
export const yearNearby = (year, offset=4) => {
  return range((2 * offset) + 1, -offset)
          .map(n => year + n);
}

/**
 * 根据输入和期望值，返回高亮class名/默认class名
 * @param {any} input 
 * @param {any} expect 
 * @param {string} activeCls 
 * @param {string} defaultCls 
 */
export const toggleClass = (input, expect, activeCls, defaultCls) => {
  return input === expect ? activeCls : defaultCls;
};

/**
 * 将日期字符解析为年月字段, 不传则获取当前年月
 * @param {string} str 
 */
export const parseToYearAndMonth = (str) => {
  const date = typeof str === 'string' ? new Date(str) : new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
};

/**
 * 将数组中元素按id展成map
 * @param {array} arr 
 */
export const flattenArr = (arr) => {
  return arr.reduce((map, item) => {
    map[item.id] = item;
    return map;
  }, {});
};