import * as APIUtil from "../util/journals_api_util.js";
export const RECEIVE_GOALS_JOURNALS = "RECEIVE_JOURNALS";
export const RECEIVE_JOURNAL = "RECEIVE_JOURNAL";
export const REMOVE_JOURNAL = "REMOVE_JOURNAL";
export const RECEIVE_JOURNAL_ERRROS = "RECEIVE_JOURNAL_ERRORS";

export const receiveGoalsJournals = journals => {
    return{
        type: RECEIVE_GOALS_JOURNALS,
        journals
    };
};

export const receiveJournal = journal => {
    return{
        type: RECEIVE_JOURNAL,
        journal
    };
};

export const removeJournal = journalId => {
    return{
        type: REMOVE_JOURNAL,
        journalId
    };
};

export const receiveJournalErrors = errors => {
    return{
        type: RECEIVE_JOURNAL_ERRROS,
        errors
    };
};


export const fetchJournals = (goalId) => dispatch => (
    APIUtil.getGoalsJournals(goalId)
        .then(journals =>dispatch(receiveGoalsJournals(journals)))
        .catch(err => console.log(err))
);

export const fetchJournal = (journalId) => dispatch => (
    APIUtil.getJournal(journalId)
        .then(journal => dispatch(receiveJournal(journal)))
        .catch(err => console.log(err))
);

export const createJournal = (journal) => dispatch => (
    APIUtil.createJournal(journal)
        .then(journal => dispatch(receiveJournal(journal)))
        .catch(err => dispatch(receiveJournalErrors(err.response.data)))

);

export const deleteJournal = (journalId) => dispatch => (
    APIUtil.deleteJournal(journalId)
        .then(() => dispatch(removeJournal(journalId)))
        .catch(err => console.log(err))
)

export const updateJournal = (journal) => dispatch => {
    APIUtil.updateJournal(journal)
    .then((journal) => dispatch(receiveJournal(journal)))
    .catch(err => console.log(err.response.data))
}