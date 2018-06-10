import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="landing-inner">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Expense Calculator
              </h1>
              <p className="lead">Click expenses on the nav bar to see the expenses list.</p>
              <Link to="/expenses" className="btn btn-lg btn-light">Go to Expenses</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Dashboard;
