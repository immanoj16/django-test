import axios from 'axios';

import {GET_ERRORS, ADD_EXPENSE, ADD_EXPENSES} from './types';

export const addExpenseHandler = (expense, history) => dispatch => {
  axios.post('/api/expenses/', expense)
    .then(res => {
      addExpense(expense);
      history.push('/expenses');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};

export const fetchExpenses = (username) => dispatch => {
  axios.get('/api/expenses/')
    .then(res => {
      const expenses = res.data.filter(expense => expense.owner === username);
      dispatch(addExpenses(expenses));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};

const addExpenses = expenses => {
  return {
    type: ADD_EXPENSES,
    expenses
  }
};

const addExpense = expense => {
  return {
    type: ADD_EXPENSE,
    expense
  }
};

export const deleteExpense = (id, owner) => dispatch => {
  axios.delete(`/api/expenses/${id}/`)
    .then(res => dispatch(fetchExpenses(owner)))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })

  /*fetch(`/api/expense`, {
    credentials: 'include',
    method: 'DELETE',
    mode: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken
    },
    body: {}
   })
  };*/
};

export const updateExpenseHandler = (id, owner, expense, history) => dispatch => {
  axios.patch(`/api/expenses/${id}/`, expense)
    .then(res => {
      dispatch(fetchExpenses(owner));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};

/*const updateExpense = (id, expense) => {
  return {
    type: UPDATE_EXPENSE,
    id,
    expense
  }
};*/

/*const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};*/
