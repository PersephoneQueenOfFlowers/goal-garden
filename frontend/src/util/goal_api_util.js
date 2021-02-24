import axios from 'axios';


export const getGoals = () => {
  return axios.get(`/api/goals`)
};

export const writeGoal = data => {
  return axios.post('/api/goals/', data)
}

export const updateGoal = (id,data) => {
  return axios.patch(`/api/goals/${id}`, data)
}

export const getGoal = id => {
  return axios.get(`/api/goals/${id}`)
}

export const deleteGoal = id => {
  return axios.delete(`/api/goals/${id}`)
}




