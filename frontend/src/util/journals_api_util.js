import axios from 'axios';

export const getGoalsJournals = () => {
    return axios.get('')
}

export const getJournal = journalId => {
    return axios.get('')
}

export const createJournal = data => {
    return axios.post('', data)
}

export const deleteJournal = journalId => {
    return axios.delete('', journalId)
}