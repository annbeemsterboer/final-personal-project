import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { userId } from '../../jwt'
import { createEvent } from '../../actions/events'
import { Redirect } from 'react-router-dom'

class EventForm extends PureComponent {
  componentDidMount() {
    if (this.props.authenticated === false) {
      return <Redirect to="/login" />
    }
  }

  state = {}

  onSubmit = event => {
    this.props.createEvent(this.state)
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({
      eventName: '',
      eventDescription: '',
      pictureUrl: '',
      startDate: '',
      endDate: '',
      userId: this.props.currentUser.userId
    })
    this.onSubmit(this.state)
  }

  handleChange = event => {
    const { name, value } = event.target

    this.setState({
      [name]: value
    })
    console.log(this.state)
  }

  render() {
    if (this.props.authenticated === false) {
      return <Redirect to="/login" />
    }
    const initialValues = this.props.initialValues || {}
    console.log(this.props)
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="eventName">Event Name</label>
          <input
            name="eventName"
            id="eventName"
            value={
              this.state.eventName !== undefined
                ? this.state.eventName
                : initialValues.title
            }
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="eventDescription">Event description</label>
          <input
            name="eventDescription"
            id="eventDescription"
            value={
              this.state.eventDescription !== undefined
                ? this.state.eventDescription
                : initialValues.eventDescription
            }
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="pictureUrl">Add picture URL</label>
          <input
            name="pictureUrl"
            id="pictureUrl"
            value={
              this.state.pictureUrl !== undefined
                ? this.state.pictureUrl
                : initialValues.pictureUrl
            }
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="startDate">Event start-date</label>
          <input
            name="startDate"
            id="startDate"
            value={
              this.state.startDate !== undefined
                ? this.state.startDate
                : initialValues.startDate
            }
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="endDate">Event end-date (optional)</label>
          <input
            name="endDate"
            id="endDate"
            value={
              this.state.endDate !== undefined
                ? this.state.endDate
                : initialValues.endDate
            }
            onChange={this.handleChange}
          />
        </div>

        <Button variant="contained" color="primary" type="submit">
          Create event
        </Button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.currentUser !== null,
    currentUser: state.currentUser,
    userId: state.currentUser && userId(state.currentUser.jwt)
  }
}

export default connect(
  mapStateToProps,
  { createEvent }
)(EventForm)
