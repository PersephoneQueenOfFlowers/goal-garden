import axios from 'axios';

export const getGoalsJournals = (goalId) => {
    return axios.get(`/api/journals/goal/${goalId}`)
}

export const getJournal = journalId => {
    return axios.get(`/api/journals/${journalId}`)
}

export const createJournal = data => {
    return axios.post(`/api/journals/${data.goal.id}`, data)
}

export const deleteJournal = journalId => {
    return axios.delete(`/api/journals/${journalId}`)
}