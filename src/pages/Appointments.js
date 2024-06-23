import axios from 'axios';
import moment from 'moment';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import React, { useEffect, useState } from 'react';
import { showLoading, hideLoading } from '../redux/alertSlice';

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();
    const getAppointmentsData = async() => {
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/user/get-appointments-by-user-id', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                setAppointments(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    useEffect(() => {
        getAppointmentsData();
    }, []);

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id'
        },
        {
            title: 'Doctor',
            dataIndex: 'name',
            render: (text, record) => (
            <span>
                {record.doctorInfo.firstName} {record.doctorInfo.lastName}
            </span>
            ),
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            render: (text, record) => (
            <span>
                {record.doctorInfo.phoneNumber}
            </span>
            ),
        },
        {
            title: 'Schedule Date and Time',
            dataIndex: 'createdAt',
            render: (text, record) => (
            <span>
                {moment(record.date).format('MM-DD-YYYY')} {moment(record.time).format('HH A')}
            </span>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
    ];

    return (
        <Layout>
            <h1 className='page-title'>Appointments</h1>
            <hr />
            <Table columns={columns} dataSource={appointments}/>
        </Layout>
    )
}

export default Appointments;