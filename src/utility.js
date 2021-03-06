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
export const parseToYearAndMonth = (val) => {
  let date = null;
  if (typeof val === 'string') {
    date = new Date(val);
  } else if (val instanceof Date) {
    date = val;
  } else {
    date = new Date();
  }
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
};

export const getYearMonthStr = (val) => {
  let yearMonth = null;
  if (typeof val === 'string') {
    yearMonth = parseToYearAndMonth(val);
  } else if (typeof val === 'object' && val.year && val.month) {
    yearMonth = val;
  } else {
    throw new TypeError('param should be date like type');
  }
  return `${yearMonth.year}-${yearMonth.month}`;
}

/**
 * 将数组中元素按id展成map
 * @param {array} arr 
 */
export const flattenArr = (arr) => {
  return arr.reduce((map, item) => {
    map[item.id] = item;
    return map;
  }, {});
}

/**
 * 生成ID
 */
export const createID = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * 生成timestamp
 * @param {string} date 
 */
export const createTimestamp = (date) => {
  return new Date(date).getTime();
}

export const isArrayEmpty = (arr) => {
  if (!Array.isArray) {
    throw new TypeError('param should be array type');
  }
  return arr.length === 0;
}

export const Palette = {
  blue: '#347eff',
  deepBlue: '#61dafb',
  green: '#28a745',
  red: '#dc3545',
  gray: '#555',
  lightGray: '#efefef',
  white: '#fff',
}

/**
 * 饼图数据转换算法
 * @param {array} items 
 * @param {string} type 
 */
export const generateChartDataByCategory = (items, type = TYPE_INCOME) => {
  let categoryMap = {};
  items
    .filter(item => item.category.type === type)
    .forEach(item => {
      if (!categoryMap[item.cid]) {
        categoryMap[item.cid] = {
          name: item.category.name,
          value: item.price * 1,
          items: [item.id],
        }
      } else {
        categoryMap[item.cid].value += (item.price * 1);
        categoryMap[item.cid].items.push(item.id);
      }
    });
  return Object.values(categoryMap);
}