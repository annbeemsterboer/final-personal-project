import { GET_ALL_EVENTS } from '../actions/events'

export default function(state = [], action) {
  console.log(action)
  switch (action.type) {
    case GET_ALL_EVENTS:
      return action.payload
    default:
      return state
  }
}
