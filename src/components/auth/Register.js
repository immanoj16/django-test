import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import {convertToObject} from "../../utils/convertToObject";

class Register extends Component {

  state = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_2: '',
    errors: {}
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, first_name, last_name, email, password, password_2 } = this.state;

    const newUser = {
      username,
      first_name,
      last_name,
      email,
      password,
      password_2
    }

    this.props.registerUser(newUser, this.props.history);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      errors: nextProps.errors
    }
  }

  render() {

    const errors = convertToObject(this.state.errors);

    const { username, first_name, last_name, email, password, password_2, non_field_errors } = errors;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                  error={username}
                />
                <TextFieldGroup
                  placeholder="First Name"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.onChange}
                  error={first_name}
                />
                <TextFieldGroup
                  placeholder="Last Name"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.onChange}
                  error={last_name}
                />
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={email}
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={password}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password_2"
                  type="password"
                  value={this.state.password_2}
                  onChange={this.onChange}
                  error={password_2}
                />
                {non_field_errors && <span style={{width: '100%', color: '#dc3545', marginTop: '.25rem', fontSize: '80%'}}>{non_field_errors}</span>}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    errors: state.errors
  }
}

export default connect(mapStateToProps, { registerUser })(Register);
