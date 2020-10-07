import axios from 'axios';

export const getItems = (year, month) => {
  return axios.get('/items', {
    params: {
      monthCategory: `${year}-${month}`,
      _sort: 'date',
      _order: 'desc',
    },
  });
};

export const getItemById = (id) => {
  return axios.get(`/items/${id}`);
};

export const addItem = (data) => {
  return axios.post(`/items`, data);
}

export const updateItem = (id, data) => {
  return axios.put(`/items/${id}`, data);
}

export const deleteItem = (id) => {
  return axios.delete(`/items/${id}`);
}
