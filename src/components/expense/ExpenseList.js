import React from 'react';
import { connect } from 'react-redux';
import sort from 'immutable-sort';
import axios from 'axios';

import ExpenseModal from "./ExpenseModal";
import PropTypes from "prop-types";

class ExpenseList extends React.Component {

  state = {
    expenses: []
  };

  sortByName = () => {
    const sortedExpenses = sort(this.state.expenses, (a, b) => {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    });

    this.setState({expenses: sortedExpenses});
  };

  sortByDate = () => {
    const sortedExpenses = sort(this.state.expenses, (a, b) => {
      let aTime = new Date(a.created).getTime();
      let bTime = new Date(b.created).getTime();
      if (aTime > bTime) return -1;
      if (aTime < bTime) return 1;
      return 0;
    });

    this.setState({expenses: sortedExpenses});
  };

  sortByPrice = () => {
    const sortedExpenses = sort(this.state.expenses, (a, b) => {
      if (a.price < b.price) return -1;
      if (a.price > b.price) return 1;
      return 0;
    });

    this.setState({expenses: sortedExpenses});
  };

  sortByDefault = () => {
    this.setState({expenses: this.props.expenses});
  };

  /*static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.expenses !== nextProps.expenses) {
      return {
        expenses: nextProps.expenses
      }
    }

    return null;
  }*/

  componentWillReceiveProps(nextProps) {
    if (nextProps.expenses.length !== this.state.expenses.length) {
      this.setState({expenses: nextProps.expenses})
    }
  }

  componentDidMount() {
    this.setState({expenses: this.props.expenses});

    axios.get('/api/users/user-profile/')
      .then(res => console.log(res))
      .catch(err => console.log(err.response))
  }

  render() {

    const { handleDelete } = this.props;

    const { expenses } = this.state;

    const total = expenses.reduce((total, expense) => {
      return total + expense.price;
    }, 0);

    return (
      <React.Fragment>
        <div className="dropdown">
          <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Sort
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <span style={{cursor: 'pointer'}} className="dropdown-item" onClick={this.sortByDefault}>By Default</span>
            <span style={{cursor: 'pointer'}} className="dropdown-item" onClick={this.sortByName}>By Name</span>
            <span style={{cursor: 'pointer'}} className="dropdown-item" onClick={this.sortByPrice}>By Price</span>
            <span style={{cursor: 'pointer'}} className="dropdown-item" onClick={this.sortByDate}>By Date</span>
          </div>
        </div>
        <table className="table">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Created</th>
            <th scope="col">Action</th>
          </tr>
          </thead>
          <tbody>
          {expenses.map((expense, id) => (
            <React.Fragment key={expense.id}>
              <tr>
                <th scope="row">{id + 1}</th>
                <td>{expense.name}</td>
                <td>{expense.price}</td>
                <td>{expense.created}</td>
                <td>
                  <button className="btn btn-danger btn-sm" data-toggle="modal" data-target="#myModalDelete" style={{marginRight: '10px'}}>
                    delete
                  </button>
                  <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalUpdate">
                    update
                  </button>
                </td>
              </tr>
              <div className="modal fade" id="myModalUpdate">
                <ExpenseModal
                  expense={expense}
                />
              </div>
              <div className="modal fade" id="myModalDelete">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-body">
                      Are you sure??
                    </div>

                    <div className="modal-footer">
                      <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                      <button className="btn btn-success" onClick={() => handleDelete(expense.id, expense.owner)}  data-dismiss="modal">
                        Delete
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
          <tr style={{backgroundColor: 'black', color: 'white'}}>
            <th scope="row">#</th>
            <td>Total</td>
            <td>{total}</td>
            <td />
            <td />
          </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

ExpenseList.propTypes = {
  expenses: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  expenses: state.expenses
})

export default connect(mapStateToProps)(ExpenseList);
