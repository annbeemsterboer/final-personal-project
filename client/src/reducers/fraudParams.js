import { GET_FRAUD_PARAMS } from '../actions/events'

export default function(state = {}, action) {
  switch (action.type) {
    case GET_FRAUD_PARAMS:
      return action.payload
    default:
      return state
  }
}
