export const LIST_VIEW = 'list';
export const CHART_VIEW = 'chart';

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