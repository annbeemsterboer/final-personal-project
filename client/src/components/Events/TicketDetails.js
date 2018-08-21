import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getTicketDetails } from '../../actions/events'
import { getPosterById } from '../../actions/users'
import TicketList from './TicketList'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

class TicketDetails extends PureComponent {
  componentDidMount() {
    this.props.getTicketDetails(
      this.props.match.params.eventId,
      this.props.match.params.ticketId
    )
    // this.props.getUserById(this.props.currentTicket.userId)
    // const posterId = Number(this.props.currentTicket.userId)
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.currentTicket !== prevProps.currentTicket) {
      this.props.getPosterById(this.props.currentTicket.userId)
    }
  }

  render() {
    const { currentEvent, events, tickets, currentTicket, poster } = this.props
    if (!currentTicket) return 'loading ..'
    return (
      <div>
        <Grid>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h1">
              Ticket from: {poster.firstName}
              <Typography>Price: {currentTicket.price}</Typography>
              <Typography>Description: {currentTicket.description}</Typography>
              <Typography>Bla</Typography>
            </Typography>

            <Typography>
              <Comments />
            </Typography>
          </CardContent>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentEvent: state.currentEvent,
    events: state.events,
    tickets: state.tickets,
    currentTicket: state.currentTicket,
    poster: state.poster
  }
}

export default connect(
  mapStateToProps,
  { getTicketDetails, getPosterById }
)(TicketDetails)
