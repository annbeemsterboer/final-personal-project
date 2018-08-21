// import React, {PureComponent} from 'react'
// import Button from '@material-ui/core/Button';

// export class AddForm extends PureComponent {
// 	state = {}

// 	handleSubmit = (e) => {
// 		e.preventDefault()
// 		this.props.onSubmit(this.state)
// 		this.setState({
// 			eventName: "",
// 			description: "",
//             pictureUrl: "",
//             eventDate: "",
// 			userId: this.props.currentUser.user.id,

// 		})
// 	}

// 	handleChange = (event) => {
//     const {name, value} = event.target

//     this.setState({
//       [name]: value
//     })
//   }

// 	render() {
// 		// const initialValues = this.props.initialValues || {}
// 		return (
// 			<form onSubmit={this.handleSubmit}>
// 				<div>
// 					<label htmlFor="eventName">Event Name</label>
// 					<input name="eventName" id="eventName" value={
// 						this.state.eventName !== undefined ? this.state.eventName : initialValues.title
// 					} onChange={ this.handleChange } />
// 				</div>

// 				<div>
// 					<label htmlFor="price">Add price</label>
// 					<input name="price" id="price" value={
// 						this.state.price !== undefined ? this.state.price : initialValues.price
// 					} onChange={ this.handleChange } />
// 				</div>

// 				<div>
// 					<label htmlFor="addInfo">Product description</label>
// 					<input name="addInfo" id="addInfo" value={
// 						this.state.addInfo !== undefined ? this.state.addInfo : initialValues.addInfo
// 					} onChange={ this.handleChange } />
// 				</div>

//                 <div>
// 					<label htmlFor="pictureUrl">Add picture URL</label>
// 					<input name="pictureUrl" id="pictureUrl" value={
// 						this.state.pictureUrl !== undefined ? this.state.pictureUrl : initialValues.pictureUrl
// 					} onChange={ this.handleChange } />
// 				</div>

//                   <div>
// 					<label htmlFor="email">Add your email</label>
// 					<input name="email" id="email" value={
// 						this.state.email !== undefined ? this.state.email : initialValues.email
// 					} onChange={ this.handleChange } />
// 				</div>

//                   <div>
// 					<label htmlFor="telephoneNumber">Add your phone number</label>
// 					<input name="telephoneNumber" id="telephoneNumber" value={
// 						this.state.telephoneNumber !== undefined ? this.state.telephoneNumber : initialValues.telephoneNumber
// 					} onChange={ this.handleChange } />
// 				</div>

// 				<Button variant="contained" color="primary" type="submit">Create add!</Button>
// 			</form>
// 		)
// 	}
// }
