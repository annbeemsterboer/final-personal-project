import request from 'superagent'
import { baseUrl } from '../constants.js'

export const GET_ALL_EVENTS = 'GET_ALL_EVENTS'

export const getAllEvents = () => dispatch => {
  request
    .get(`${baseUrl}/events`)
    .then(response =>
      dispatch({
        type: GET_ALL_EVENTS,
        payload: response.body
      })
    )
    .catch(err => alert(err))
}
