import axios from 'axios';
import moment from 'moment';
import { Table } from 'antd';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import { showLoading, hideLoading } from '../../redux/alertSlice';

function DoctorAppointments() {
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();
    const getAppointmentsData = async() => {
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/doctor/get-appointments-by-doctor-id', {
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

    const changeAppointmentStatus = async(record, status) => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/doctor/change-appointment-status', { 
                appointmentId: record._id, 
                status: status
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                getAppointmentsData();
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Something went wrong with changing Doctor status.");
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
            title: 'Patient',
            dataIndex: 'name',
            render: (text, record) => (
            <span>
                {record.userInfo.name}
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
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
            <div className='d-flex'>
                {record.status === "Pending" && (
                    <div className='d-flex'>
                        <h1 className='anchor px-2' onClick={() => changeAppointmentStatus(record, "Approved")}>
                            Approve
                        </h1>
                        <h1 className='anchor px-2' onClick={() => changeAppointmentStatus(record, "Rejected")}>
                            Reject
                        </h1>
                    </div>
                )}             
            </div>
            ),
        },
    ];

    return (
        <Layout>
            <h1 className='page-ti'>Appointments</h1>
            <Table columns={columns} dataSource={appointments}/>
        </Layout>
    )
}

export default DoctorAppointments;