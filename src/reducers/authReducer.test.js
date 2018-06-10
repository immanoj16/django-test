import reducer from './authReducer'
import * as types from '../actions/types'​

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        isAuthenticated: false,
        user: {}
      }
    ])
  });

  it('should handle SET_CURRENT_USER', () => {
    expect(
      reducer([], {
        type: types.SET_CURRENT_USER,
        payload: {
          username: 'manoj',
          id: 1234
        }
      })
    ).toEqual([
      {
        isAuthenticated: true,
        user: {
          username: 'manoj',
          id: 1234
        }
      }
    ]);
  })
});