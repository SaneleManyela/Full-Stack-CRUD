import React, { Component } from 'react'
import EmployeeService from '../Services/EmployeeService';

export default class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {            
            id: window.location.href.split('/')[4],
            firstName: '',
            lastName: '',
            email: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this); 
        this.cancel = this.cancel.bind(this);
    }
    componentDidMount() {
        if(this.state.id === -1){
            return
        } else {
            EmployeeService.getEmployeeById(this.state.id).then((res) => {
                let employee = res.data;
                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    email: employee.email
                });
            })
        }
    }

    changeFirstNameHandler = (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler = (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }
    
    saveEmployee = (event) => {
        event.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email};
        console.log('employee => ' + JSON.stringify(employee));
        if(this.state.id === -1){
            EmployeeService.createEmployee(employee).then(res => {
                window.location.href = "/employees";
            })
        } else {
            EmployeeService.updateEmployee(employee, this.state.id).then(res => {
                window.location.href = "/employees";
            })
        }  
    }

    getTitle() {
        if(this.state.id === -1) {
            return <h3 className='text-center'>Add Employee</h3>
        } else {
            return <h3 className='text-center'>Update Employee</h3>
        }
    }

    cancel() {
        window.location.href = "/employees";
     }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            {this.getTitle()}
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>First Name:</label>
                                        <input 
                                            placeholder='First Name'
                                            name='firstName' 
                                            className='form-control'
                                            value={this.state.firstName}
                                            onChange={this.changeFirstNameHandler}
                                        />
                                        <label>Last Name:</label>
                                        <input 
                                            placeholder='Last Name'
                                            name='lastName' 
                                            className='form-control'
                                            value={this.state.lastName}
                                            onChange={this.changeLastNameHandler}
                                        />
                                        <label>Email:</label>
                                        <input 
                                            placeholder='Email'
                                            name='email' 
                                            className='form-control'
                                            value={this.state.email}
                                            onChange={this.changeEmailHandler}
                                        />
                                        <button className='btn btn-success' type='submit' onClick={this.saveEmployee}>Save</button>
                                        <button className='btn btn-danger' type='reset' onClick={this.cancel} style={{margin: "10px"}}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
