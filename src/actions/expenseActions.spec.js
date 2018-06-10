import {addExpenses, addExpense} from './expenseActions';
import { ADD_EXPENSES, ADD_EXPENSE } from './types';

describe('actions', () => {
  it('should create an action to add expenses', () => {
    const expenses = [];
    const expectedAction = {
      type: ADD_EXPENSES,
      expenses
    };
    expect(addExpenses(expenses)).toEqual(expectedAction)
  });

  it('should create an action to add expense', () => {
    const expense = {};
    const expectedAction = {
      type: ADD_EXPENSE,
      expense
    };
    expect(addExpense(expense)).toEqual(expectedAction)
  });
});