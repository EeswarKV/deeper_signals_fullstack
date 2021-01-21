import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './table.css';
import { CSVLink } from "react-csv";
import {Button} from 'react-bootstrap'
import { userService } from '../../../_services/index.js';


const URL = 'https://jsonplaceholder.typicode.com/users'

const Table = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        // const response = await axios.get(URL);
        userService.getAllUsers().then(response => {setEmployees(response);});
    }

    const removeData = (id) => {
        axios.delete(`${URL}/${id}`).then(res => {
            const del = employees.filter(employee => id !== employee.id);
            setEmployees(del);
        });
    }

    const renderHeader = () => {
        let headerElement = ['id', 'first name', 'last name', 'email','role', 'operation'];
        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return employees && employees.map(({ id, first_name, last_name, email, role }) => {
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{first_name}</td>
                    <td>{last_name}</td>
                    <td>{email}</td>
                    <td>{role}</td>
                    <td className='opration'>
                        <button className='button' onClick={() => removeData(id)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    const csvReport = {
        data: employees,
        headers: ['id', 'name', 'email', 'phone', 'operation'],
        filename: 'Deep_signals_users.csv'
      };

    return (
        <>
            <h1 id='title'>Users Table</h1>
            <table id='employee'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
            <Button variant="secondary"><CSVLink {...csvReport}>Export to CSV</CSVLink></Button>
        </>
    )
}


export default Table