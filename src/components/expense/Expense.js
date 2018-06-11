import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchExpenses, deleteExpense } from '../../actions/expenseActions';
import ExpenseList from '../expense/ExpenseList';

class Expense extends Component {

  componentDidMount() {
    this.props.fetchExpenses(this.props.auth.user.username);
  }

  handleDelete = (id, owner) => {
    this.props.deleteExpense(id, owner);
  };

  handleUpdate = (id, owner) => {
    // this.props.updateExpense(id, owner);
  };

  render() {

    const { user } = this.props.auth;

    let dashboardContent;
    if (this.props.expenses.length > 0) {
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome <Link to='profile'>{user.email}</Link>{' '}({user.username})</p>
          <ExpenseList
            handleDelete={this.handleDelete}
            handleUpdate={this.handleUpdate}
          />
          <div style={{ margin: '60px' }} />
          <Link to="/add-expense" className="btn btn-lg btn-info">
            Add Expense
          </Link>
        </div>
      );
    } else {
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have no expenses, click this to add expense</p>
          <Link to="/add-expense" className="btn btn-lg btn-info">
            Add Expense
          </Link>
        </div>
      )
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Expenses</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Expense.propTypes = {
  fetchExpenses: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  expenses: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  expenses: state.expenses,
  auth: state.auth
})

export default connect(mapStateToProps, { fetchExpenses, deleteExpense })(Expense);
