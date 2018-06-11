import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser, } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import {convertToObject} from "../../utils/convertToObject";

class Login extends Component {

  state = {
    username: '',
    password: '',
    errors: {}
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    }

    this.props.loginUser(user);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth.hasOwnProperty('isAuthenticated') && nextProps.auth.isAuthenticated) {
      nextProps.history.push('/dashboard');
    }

    return {
      errors: nextProps.errors
    }
  }

  /*componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if(nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }*/

  render() {

    const errors = convertToObject(this.state.errors);

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to see the expenses</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                  error={errors.username}
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                {errors.non_field_errors && <span style={{width: '100%', color: '#dc3545', marginTop: '.25rem', fontSize: '80%'}}>{errors.non_field_errors}</span>}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);
