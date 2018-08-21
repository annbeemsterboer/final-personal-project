import { ADD_USER, UPDATE_USER, UPDATE_USERS } from '../actions/users'
import { USER_LOGOUT, GET_POSTER } from '../actions/users'

/*
The state will contain the users in an object with the game ID as key
*/

export default (state = [], action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return null

    // case ADD_USER:
    //   return {
    //     ...state,
    //     [payload.id]: payload
    //   }

    // case UPDATE_USER:
    //   return {
    //     ...state,
    //     [payload.id]: payload
    //   }

    // case UPDATE_USERS:
    //   return payload.reduce((users, user) => {
    //     users[user.id] = user
    //     return users
    //   }, {})

    case GET_POSTER:
      return action.payload

    default:
      return state
  }
}
