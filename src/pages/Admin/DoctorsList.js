import axios from 'axios';
import moment from 'moment';
import { Table } from 'antd';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import { showLoading, hideLoading } from '../../redux/alertSlice';

function DoctorsList() {
    const [doctors, setDoctors] = useState([]);
    const dispatch = useDispatch();
    const getDoctorsData = async() => {
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/admin/get-all-doctors', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                setDoctors(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    const changeDoctorStatus = async(record, status) => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/admin/change-doctor-account-status', { 
                doctorId: record._id, 
                userId: record.userId, 
                status: status
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                getDoctorsData();
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Something went wrong with changing Doctor status.");
        }
    };

    useEffect(() => {
        getDoctorsData();
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
            <span>
                {record.firstName} {record.lastName}
            </span>
            ),
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber'
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (record, text) => moment(record.createdAt).format('MM-DD-YYYY')
        },
        {
            title: 'Status',
            dataIndex: 'status'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
            <div className='d-flex'>
                {record.status === 'Pending' && <h1 className='anchor' onClick={() => changeDoctorStatus(record, 'Approved')}>Approve</h1>}
                {record.status === 'Approved' && <h1 className='anchor' onClick={() => changeDoctorStatus(record, 'Blocked')}>Block</h1>}
            </div>
            ),
        },
    ];

    return (
        <Layout>
            <h1 className='page-title'>Doctors List</h1>
            <hr />
            <Table columns={columns} dataSource={doctors}/>
        </Layout>
    )
}

export default DoctorsList;