import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { userId } from '../../jwt'
import { createEvent } from '../../actions/events'
import { Redirect } from 'react-router-dom'

class EventForm extends PureComponent {
  state = {
    userId: this.props.userId
  }

  onSubmit = event => {
    this.props.createEvent(event)
    this.props.history.push('/events')
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({
      eventName: '',
      description: '',
      imgUrl: '',
      startDate: '',
      endDate: ''
    })
    this.onSubmit(this.state)
  }

  handleChange = event => {
    const { name, value } = event.target

    this.setState({
      [name]: value
    })
  }

  render() {
    if (this.props.authenticated === false) {
      return <Redirect to="/login" />
    }
    const initialValues = this.props.initialValues || {}
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
          <label htmlFor="description">Event description</label>
          <input
            name="description"
            id="description"
            value={
              this.state.description !== undefined
                ? this.state.description
                : initialValues.description
            }
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="imgUrl">Add picture URL</label>
          <input
            name="imgUrl"
            id="imgUrl"
            value={
              this.state.imgUrl !== undefined
                ? this.state.imgUrl
                : initialValues.imgUrl
            }
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="startDate">Event start-date</label>
          <input
            name="startDate"
            id="startDate"
            input
            type="date"
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
            input
            type="date"
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
