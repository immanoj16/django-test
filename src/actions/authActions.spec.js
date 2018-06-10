import {setCurrentUser} from './authActions';
import { SET_CURRENT_USER } from './types';

describe('actions', () => {
  it('should create an action to set current user', () => {
    const decoded = {};
    const expectedAction = {
      type: SET_CURRENT_USER,
      payload: decoded
    };
    expect(setCurrentUser(decoded)).toEqual(expectedAction)
  });
});