import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import { addExpenseHandler } from '../../actions/expenseActions';

class AddExpense extends Component {

  state = {
    name: '',
    price: '',
    image: '',
    errors: {}
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  setFileRef = (element) => {
    this.fileRef = element;
    console.log(this.fileRef, element)
  };

  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({image: e.target.result});
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    console.log(this.state);

    const expense = {
      name: this.state.name,
      price: this.state.price,
      image: this.state.image,
      // user: this.props.auth.user.username
    };

    this.props.addExpenseHandler(expense, this.props.history);
  };

  render() {

    return (
      <div className="expense">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Expense</h1>
              <p className="lead text-center">Add expenses for the current user</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Price"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                />
                <label className="form-check-label" style={{marginBottom: '5px'}}>Image</label><br/>
                <input type="file" accept="image/*" onChange={this.onImageChange} ref={this.setFileRef} />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddExpense.propTypes = {
  addExpenseHandler: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { addExpenseHandler })(AddExpense);
