import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect
} from "react-router-dom";
import Dashboard from './components/dashboard/dashboard.js';
import Login from './components/login/login.js';
import Admin from './components/admin/admin.js';
import { PrivateRoute } from './_privateRoute/index.js';
import { authenticationService } from './_services/index.js';
import { history, Role } from './_helpers/index.js';
import ShowReport from './components/showreport/showreport.js';


export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Update the document title using the browser API
    authenticationService.currentUser.subscribe(x => {
      setCurrentUser(x);
      setIsAdmin(x && x.role === Role.Admin)
    }); 
  });

  function logout() {
    authenticationService.logout();
    history.push('/login');
  }

  return (
    <Router history={history}>
        <div>
            {currentUser &&
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="navbar-nav">
                        <Link to="/" className="nav-item nav-link">Home</Link>
                        {isAdmin && <Link to="/admin" className="nav-item nav-link">Admin</Link>}
                        <a onClick={logout} className="nav-item nav-link">Logout</a>
                    </div>
                </nav>
            }
            <div className="jumbotron">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <PrivateRoute exact path="/" component={Dashboard} />
                            <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
                            <Route path="/login" component={Login} />
                            <Route path="/showreport" component={ShowReport} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Router>
  );
};
