import React from 'react';
import axios from 'axios';
import moment from 'moment';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertSlice';
import DoctorForm from '../components/DoctorForm';

function ApplyDoctor() {
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async(values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/user/apply-doctor-account', {
                ...values, 
                userId: user._id,
                schedule: [
                    moment(values.schedule[0]).format('HH A'),
                    moment(values.schedule[1]).format('HH A'),
                ]
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Something went wrong.");
        }
    }

    return (
        <Layout>
            <h1 className='page-title'>Apply Doctor</h1>
            <hr />
        <DoctorForm onFinish={onFinish} />
        </Layout>
    )
}

export default ApplyDoctor;