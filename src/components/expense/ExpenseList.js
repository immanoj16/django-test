import React from 'react';
import ExpenseModal from "./ExpenseModal";

class ExpenseList extends React.Component {

  state = {
    expenses: this.props.expenses
  };

  sortByName = () => {
    const expenses = this.props.expenses;

    const sortedExpenses = expenses.sort((a, b) => {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    });

    this.setState({expenses: sortedExpenses});
  };

  sortByDate = () => {
    const expenses = this.props.expenses.sort((a, b) => {
      return a.price < b.price
    });

    this.setState({expenses});
  };

  sortByPrice = () => {
    const expenses = this.props.expenses;

    const sortedExpenses = expenses.sort((a, b) => {
      if (a.price < b.price) return -1;
      if (a.price > b.price) return 1;
      return 0;
    });

    this.setState({expenses: sortedExpenses});
  };

  sortByDefault = () => {
    console.log(this.props.expenses);
    this.setState({expenses: this.props.expenses});
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.expenses.length !== this.props.expenses.length) {
      this.setState({expenses: nextProps.expenses})
    }
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
            <React.Fragment>
              <tr key={expense.id}>
                <th scope="row">{id + 1}</th>
                <td>{expense.name}</td>
                <td>{expense.price}</td>
                <td>{expense.date_created}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(expense.id, expense.owner)} style={{marginRight: '10px'}}>
                    delete
                  </button>
                  <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal">
                    update
                  </button>
                </td>
              </tr>
              <div className="modal fade" id="myModal">
                <ExpenseModal
                  expense={expense}
                />
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

export default ExpenseList;
