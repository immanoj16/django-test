import { ADD_EXPENSE, ADD_EXPENSES } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case ADD_EXPENSE:
      return [
        ...state,
        action.expense
      ];
    case ADD_EXPENSES:
      return action.expenses;
    default:
      return state;
  }
}
