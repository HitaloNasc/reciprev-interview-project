import axios from 'axios';

const base_url = `http://localhost:7000/investment-fund`;

export async function list() {
  return await axios.get(base_url);
}

export async function update(data) {
  return await axios.put(`${base_url}/${data.id}`, data);
}

export async function create(data) {
  return await axios.post(`${base_url}`, data);
}

export async function remove(id) {
  return await axios.delete(`${base_url}/${id}`);
}
