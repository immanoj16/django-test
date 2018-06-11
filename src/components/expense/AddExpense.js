import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import { addExpenseHandler } from '../../actions/expenseActions';
import {convertToObject} from "../../utils/convertToObject";

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

  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({image: e.target.result});
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      errors: nextProps.errors
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const expense = {
      name: this.state.name,
      price: this.state.price,
      image: this.state.image,
      // user: this.props.auth.user.username
    };

    this.props.addExpenseHandler(expense, this.props.history);
  };

  render() {

    const errors = convertToObject(this.state.errors);

    const { name, price, image, non_field_errors } = errors;

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
                  error={name}
                />
                <TextFieldGroup
                  placeholder="Price"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                  error={price}
                />
                <div className="form-group">
                  <label className="form-check-label" style={{marginBottom: '5px'}}>Image</label><br/>
                  <input type="file" accept="image/*" onChange={this.onImageChange} />
                  {image && <span style={{width: '100%', color: '#dc3545', marginTop: '.25rem', fontSize: '80%'}}>{image}</span>}
                </div>
                <br/>
                {non_field_errors && <div style={{width: '100%', color: '#dc3545', marginTop: '.25rem', fontSize: '80%'}}>{non_field_errors}</div>}
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
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { addExpenseHandler })(AddExpense);
