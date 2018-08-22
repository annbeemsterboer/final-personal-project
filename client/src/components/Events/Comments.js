// import React, { PureComponent } from 'react'
// import { connect } from 'react-redux'
// import { getPosterById, getComments } from '../../actions/users'
// import CardContent from '@material-ui/core/CardContent'
// // import CardMedia from '@material-ui/core/CardMedia'
// // import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
// import Grid from '@material-ui/core/Grid'

// class TicketDetails extends PureComponent {
//   componentDidMount() {
//     this.props.getComments()
//   }

//   //   componentDidUpdate(prevProps) {
//   //     // Typical usage (don't forget to compare props):
//   //     if (this.props.currentTicket !== prevProps.currentTicket) {
//   //       this.props.getComments()
//   //     }
//   //   }

//   render() {
//     if (!this.props.currentTicket) return 'loading ..'
//     console.log(this.props)
//     return (
//       <div>
//         hi
//         {/* <Grid>
//           <CardContent>
//             <Typography gutterBottom variant="headline" component="h1">
//               Ticket from: {poster.firstName}
//               <Typography>Price: {currentTicket.price}</Typography>
//               <Typography>Description: {currentTicket.description}</Typography>
//               <Typography>Bla</Typography>
//             </Typography>

//             <Typography>
//               <Comments />
//             </Typography>
//           </CardContent>
//         </Grid> */}
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return {
//     currentTicket: state.currentTicket,
//     comments: state.comments
//   }
// }

// export default connect(
//   mapStateToProps,
//   { getComments, getPosterById }
// )(TicketDetails)

// this.props.getComments()
