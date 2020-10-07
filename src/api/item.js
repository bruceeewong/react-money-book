import axios from 'axios';

export const getItems = (year, month) => {
  return axios.get('/items', {
    params: {
      monthCategory: `${year}-${month}`,
      _sort: 'timestamp',
      _order: 'desc',
    },
  });
};

export const deleteItem = (id) => {
  return axios.delete(`/items/${id}`);
}
