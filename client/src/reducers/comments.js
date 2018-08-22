import { GET_COMMENTS, UPDATE_COMMENTS } from '../actions/events'

export default function(state = [], action) {
  switch (action.type) {
    case GET_COMMENTS:
      return action.payload
    // case ADD_COMMENT:
    //   return action.payload

    default:
      return state
  }
}
