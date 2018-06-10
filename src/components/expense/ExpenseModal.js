import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import { updateExpenseHandler } from '../../actions/expenseActions';

class ExpenseModal extends Component {

  state = {
    name: this.props.expense.name,
    price: this.props.expense.price,
    errors: {}
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  setFileRef = (element) => {
    this.fileRef = element;
  }

  onSubmit = (e) => {
    e.preventDefault();

    const expense = {
      name: this.state.name,
      price: this.state.price,
      /*image: this.fileRef.files[0] || null,*/
      // user: this.props.auth.user.username
    }

    this.props.updateExpenseHandler(this.props.expense.id, this.props.expense.owner, expense, this.props.history);
  }

  render() {

    return (
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h4 className="modal-title">Update Expense</h4>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
          </div>

          <div className="modal-body">
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
              <input type="file" accept="image/*" ref={this.setFileRef}/>
            </form>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
            <button className="btn btn-success" onClick={this.onSubmit} data-dismiss="modal">
              update
            </button>
          </div>

        </div>
      </div>
    )
  }
}

ExpenseModal.propTypes = {
  expense: PropTypes.object.isRequired
}

export default connect(null, { updateExpenseHandler })(ExpenseModal);
