import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getEvent } from '../../actions/events'
import TicketList from './TicketList'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'

class EventDetails extends PureComponent {
  componentWillMount() {
    this.props.getEvent(this.props.match.params.id)
  }

  render() {
    const { currentEvent } = this.props
    // const { tickets } = this.props
    if (!currentEvent) return 'loading ..'
    return (
      <div>
        <Button size="small" color="primary">
          <Link to={`/events`}> Back to all events</Link>
        </Button>
        <Grid>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h1">
              All tickets for: {currentEvent.event.eventName}
              <Typography>
                Details: {currentEvent.event.description}
                <Typography>
                  Start-date: {currentEvent.event.startDate}
                </Typography>
                {currentEvent.event.endDate !== null && (
                  <Typography>
                    End-date: {currentEvent.event.endDate}
                  </Typography>
                )}
              </Typography>
            </Typography>
            <Typography>
              <TicketList eventId={this.props.match.params.id} />
            </Typography>
          </CardContent>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentEvent: state.currentEvent
  }
}

export default connect(
  mapStateToProps,
  { getEvent }
)(EventDetails)
