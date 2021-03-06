import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom';
import Search from './Search';

import '../../App.css';

const Header = () => {
  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <img height={50} width={60} alt="BS Logo" src="/images/bs_logo.jpeg" />
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Routes>
            <Route render={({ history }) => <Search history={history} />} />
          </Routes>
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <button className="btn" id="login_btn">Login</button>

          <span id="cart" className="ml-3">Cart</span>
          <span className="ml-1" id="cart_count">0</span>
        </div>
      </nav>
    </Fragment>
  )
}

export default Header
