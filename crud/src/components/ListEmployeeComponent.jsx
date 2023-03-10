import React, { Component } from 'react'
import EmployeeService from '../Services/EmployeeService'

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }
    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({employees: res.data})
        });
    }

    addEmployee() {
        window.location.href = "/add-employee/-1";
    }

    editEmployee(id) {
        window.location.href = `/add-employee/${id}`;
    }

    deleteEmployee(id) {
        // rest api call
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        })
    }

    viewEmployee(id) {
        window.location.href = `/view-employee/${id}`;
    }

    render() {
        return (
            <div>
                <h2 className='text-center'>ListEmployeeComponent</h2>
                <div className='row'>
                    <button className='btn btn-primary' style={{ width: '300px', margin: '10px 0px 10px 0px'}} onClick={this.addEmployee }>Add Employee</button>
                </div>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th> Employee First Name</th>
                                <th> Employee Last Name</th>
                                <th> Employee Email</th>
                                <th> Actions </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(employee =>
                                    <tr key = {employee.id}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.email}</td>
                                        <td>
                                            <button onClick={() => this.editEmployee(employee.id)} className={"btn btn-info"}>Update</button>
                                            <button onClick={() => this.deleteEmployee(employee.id)} style={{margin: '0px 10px 0px 10px'}} className={"btn btn-danger"}>Delete</button>
                                            <button onClick={() => this.viewEmployee(employee.id)} className={"btn btn-info"}>View</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListEmployeeComponent;