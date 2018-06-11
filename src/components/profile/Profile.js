import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Profile = ({ auth }) => {

  const { user } = auth;

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">User Profile</h1>
            <p className="lead text-muted">Welcome {user.email}{' '}({user.username})</p>
            <div style={{marginTop: '60px'}}>Username: {user.username}</div>
            <div>Email: {user.email}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Profile);
