import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';
import { fetchEmployees } from '../redux/actions/employeeactions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'
import '../css/styles.css'

export default function Employees() {
    var [isAddMode, setisAddMode] = useState(true)
    useEffect(() => {
        dispatch(fetchEmployees())
    }, [])
    const dispatch = useDispatch()
    const employeeData = useSelector(state => state.employees.employees)
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    const onFormSubmit = (FormData) => {
        return isAddMode
            ? onAdd(FormData)
            : onEdit(FormData.id, FormData);
    }
    const onAdd = (FormData) => {
        axios.post("http://localhost:8000/employees", FormData)
        dispatch(fetchEmployees())
        reset();
    }
    const onEdit = (id, FormData) => {
        setisAddMode(true)
        return axios.put(`http://localhost:8000/employees/${id}`, FormData)
            .then((response) => {
                alert("Updated successfully")
                dispatch(fetchEmployees())
            })
            .catch((error) => { console.log(error) })
    }
    function onUpdate(id) {
        setisAddMode(false)
        axios.get(`http://localhost:8000/employees/${id}`).then(user => {
            const fields = ['id', 'name', 'salary', 'designation'];
            fields.forEach(field => setValue(field, user.data[field]));
        });
    }

    function onDelete(id) {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete(`http://localhost:8000/employees/${id}`).then(response => {
                            alert("Deleted")
                            dispatch(fetchEmployees())
                        });
                    },
                },
                {
                    label: 'No',
                    // onClick: () => alert('Click No'),
                },
            ],
        });

    }
    function reset() {
        const fields = ['id', 'name', 'salary', 'designation'];
        fields.forEach(field => setValue(field, ""));
        setisAddMode(true)
    }

    return (
        <Container>
            <Row>
                <Col md="5">
                    <div>
                        <h2>{isAddMode ? 'Add Employee' : 'Edit Employee'}</h2>
                        <div className='row'>
                            <form onSubmit={handleSubmit(onFormSubmit)}>
                                {/* <div style={{ margin: 10 }}>
                                    Id: <input style={{ marginLeft: 72 }} {...register("id", { required: true, pattern: /^[0-9]$/ })} />
                                    {errors?.id?.type === "required" && <p style={{ color: 'red' }}>* Id is required</p>}
                                    {errors?.id?.type === "pattern" && <p style={{ color: 'red' }}>* Id should be valid</p>}
                                </div> */}

                                <div style={{ margin: 10 }}>
                                    Name: <input style={{ marginLeft: 45 }} {...register("name", { required: true })} />
                                    {errors?.id?.type === "required" && <p style={{ color: 'red' }}>* Name is required</p>}
                                </div>

                                <div style={{ margin: 10 }}>
                                    Salary: <input style={{ marginLeft: 43 }} {...register("salary", { required: true })} />
                                    {errors?.id?.type === "required" && <p style={{ color: 'red' }}>* Salary is required</p>}
                                </div>

                                <div style={{ margin: 10 }}>
                                    Designation: <input style={{ marginLeft: 2 }} {...register("designation", { required: true })} />
                                    {errors?.id?.type === "required" && <p style={{ color: 'red' }}>* Designation is required</p>}
                                </div>

                                <div style={{ margin: 10 }}>
                                    <input type="submit" className='btn btn-success' value={isAddMode ? 'Save' : 'Update'} />
                                    <input type='button' className='btn btn-warning' onClick={() => reset()} value="Reset" />
                                </div>
                            </form>
                        </div>
                    </div>

                </Col>
                <Col md="7">
                    <h2>Employee details</h2>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Employee Name</th>
                                <th>Employee Salary</th>
                                <th>Employee Designation</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employeeData && employeeData.map((data) => (
                                    <tr key={data.id}>
                                        <th>{data.id}</th>
                                        <th>{data.name}</th>
                                        <th>{data.salary}</th>
                                        <th>{data.designation}</th>
                                        <th><button class="btn btn-primary" onClick={() => onUpdate(data.id)}>Edit</button>
                                            <button class="btn btn-warning" onClick={() => onDelete(data.id)}>Delete</button></th>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </Col>
            </Row>
        </Container>
    )
}
