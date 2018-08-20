import React, { PureComponent } from 'react'
import './SignupForm.css'
import { connect } from 'react-redux'
import { signup } from '../../actions/users'

class SignupForm extends PureComponent {
  state = {}

  handleSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state)
    console.log(this.state)
    // this.props.signup(this.state.email, this.state.password)
  }

  handleChange = event => {
    const { name, value } = event.target

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="signup-form">
        <form onSubmit={this.handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={this.state.email || ''}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={this.state.password || ''}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Confirm password
            <input
              type="password"
              name="confirmPassword"
              value={this.state.confirmPassword || ''}
              onChange={this.handleChange}
            />
          </label>

          {this.state.password &&
            this.state.confirmPassword &&
            this.state.password !== this.state.confirmPassword && (
              <p style={{ color: 'red' }}>The passwords do not match!</p>
            )}

          <button type="submit">Sign up</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = () => {}

export default connect(
  mapStateToProps,
  { signup }
)(SignupForm)
