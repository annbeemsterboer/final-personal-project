import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  getTicketDetails,
  updateComments,
  getFraudParams
} from '../../actions/events'
import { getPosterById } from '../../actions/users'
import Card from '@material-ui/core/Card'
import Comments from './Comments'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

class TicketDetails extends PureComponent {
  componentDidMount() {
    this.props.getTicketDetails(
      this.props.match.params.eventId,
      this.props.match.params.ticketId
    )
    this.props.getFraudParams(
      this.props.match.params.eventId,
      this.props.match.params.ticketId
    )

    // this.props.getPosterById(this.props.currentTicket.userId)
    // const posterId = Number(this.props.currentTicket.userId)
  }

  componentDidUpdate(prevProps) {
    // if (this.props.currentTicket !== prevProps.currentTicket) {
    //   this.props.getPosterById(this.props.currentTicket.userId)
    // }
    // if (this.props.comments.length > prevProps.comments.length) {
    //   this.props.updateComments(
    //     this.props.match.params.eventId,
    //     this.props.match.params.ticketId
    //   )
    // }
  }

  //   handleCommentSubmit = () => {
  //     this.props.addComment()
  //   }

  calculateFraudRisk = () => {
    let fraudFactor = 0.02
    const postTime = new Date(this.props.currentTicket.createdAt)
    const postHours = postTime.getHours()

    if (this.props.fraudParams.numberOfTicketsForTicketPoster === 1) {
      fraudFactor = fraudFactor + 0.04
    }
    if (
      this.props.currentTicket.price <= this.props.fraudParams.avgTicketPrice
    ) {
      const priceDiffLess =
        (this.props.fraudParams.avgTicketPrice -
          this.props.currentTicket.price) /
        this.props.fraudParams.avgTicketPrice
      fraudFactor = fraudFactor + priceDiffLess
    }
    if (
      this.props.currentTicket.price > this.props.fraudParams.avgTicketPrice
    ) {
      const priceDiffMore =
        (this.props.currentTicket.price -
          this.props.fraudParams.avgTicketPrice) /
        this.props.fraudParams.avgTicketPrice
      if (priceDiffMore < 0.15) {
        fraudFactor = fraudFactor - priceDiffMore
      } else {
        fraudFactor = fraudFactor - 0.15
      }
    }
    if (postHours > 9 && postHours < 17) {
      console.log('businessHours')
      fraudFactor = fraudFactor - 0.13
    } else {
      console.log('after-hours')
      fraudFactor = fraudFactor + 0.13
    }
    if (this.props.comments.length > 3) {
      console.log('more than 3c')
      fraudFactor = fraudFactor + 0.06
    }

    if (fraudFactor < 0.02) {
      return (fraudFactor = 0.02)
    } else if (fraudFactor > 0.98) {
      return (fraudFactor = 0.98)
    } else return fraudFactor
  }

  render() {
    const { currentTicket, poster, comments, fraudParams } = this.props
    console.log(this.props.fraudParams)
    if (!currentTicket || !poster | !fraudParams) return 'loading ..'
    if (fraudParams)
      return (
        <div>
          <Grid>
            <CardContent>
              <Typography gutterBottom variant="headline" component="h1">
                Ticket from: {poster.firstName}
                <Typography>Price: {currentTicket.price}</Typography>
                <Typography>
                  Description: {currentTicket.description}
                </Typography>
                <Typography>
                  The calculated fraud-risk is:{' '}
                  {parseInt(this.calculateFraudRisk() * 100)} %
                </Typography>
              </Typography>

              <Grid>
                {comments.map(comment => {
                  return (
                    <Card
                      style={{
                        paddingBottom: '10px',
                        paddingTop: '10px',
                        margin: 12
                      }}
                    >
                      At {comment.createdAt}, {comment.userId} said{' '}
                      {comment.comment}
                    </Card>
                  )
                })}
              </Grid>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  // onclick={}
                >
                  Add comment
                </Button>
              </CardActions>
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
    poster: state.poster,
    comments: state.comments,
    fraudParams: state.fraudParams
  }
}

export default connect(
  mapStateToProps,
  { getTicketDetails, getPosterById, updateComments, getFraudParams }
)(TicketDetails)
