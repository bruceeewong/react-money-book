import { categories, items } from '../testData';
export default {
  get: jest.fn((url) => {
    if (url.includes('categories')) {
      return Promise.resolve({ data: categories });
    } else if (url.startsWith('/items/')) {
      return Promise.resolve({ data: { ...items[0], id: 'testID' } });
    } else if (url.startsWith('/items')) {
      return Promise.resolve({ data: items });
    } 
  })
};
