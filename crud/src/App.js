import React from 'react';
import './App.css'
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/viewEmployeeComponent';

function App() {
  return (
    <div>
      <HeaderComponent />
      <Router>        
          <div className="container">
           <Routes>
              <Route path="/employees" exact={true} element= {<ListEmployeeComponent />} />
              <Route path="/" exact={true} element= {<ListEmployeeComponent />} />
              <Route path="/add-employee/:id" element= {<CreateEmployeeComponent />} />\
              <Route path="/view-employee/:id" element= {<ViewEmployeeComponent />} />
            </Routes>
          </div>
        <FooterComponent />
      </Router>
      
    </div>
  );
}

export default App;
