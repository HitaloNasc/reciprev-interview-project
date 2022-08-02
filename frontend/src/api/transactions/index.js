import axios from 'axios';

const base_url = `http://localhost:7000/transactions`;

export async function list() {
  return axios.get(base_url);
}

export async function update(data) {
  return axios.put(`${base_url}/${data.id}`, data);
}

export async function create(data) {
  return axios.post(`${base_url}`, data);
}

export async function remove(id) {
  return axios.delete(`${base_url}/${id}`);
}
