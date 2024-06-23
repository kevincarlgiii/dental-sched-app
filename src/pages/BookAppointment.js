import axios from 'axios';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertSlice';
import { Button, Col, DatePicker, Row, TimePicker } from 'antd';

function BookAppointment() {
    const [isAvailable, setIsAvailable] = useState(false);
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [doctor, setDoctor] = useState(null);
    const { user } = useSelector(state => state.user);
    const params = useParams();
    const dispatch = useDispatch();

    const getDoctorData = async() => {
        try {
            dispatch(showLoading());
            const response = await axios.post(
                '/api/doctor/get-doctor-info-by-id', 
                {
                    doctorId: params.doctorId,
                    doctorName: params.doctorName
                },
                { headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                setDoctor(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    const bookNow = async() => {
        setIsAvailable(false);
        try {
            dispatch(showLoading());
            const response = await axios.post(
                '/api/user/book-appointment', 
                {
                    doctorId: params.doctorId,
                    userId: user._id,
                    doctorInfo: doctor,
                    userInfo: user,
                    date: date,
                    time: time,
                },
                { headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Error booking appointmenttttt");
        }
    };

    const checkAvailability = async() => {
        try {
            dispatch(showLoading());
            const response = await axios.post(
                '/api/user/check-booking-availability', 
                {
                    doctorId: params.doctorId,
                    date: date,
                    time: time,
                },
                { headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                setIsAvailable(true);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Error booking appointment");
        }
    };

    useEffect(() => {
        getDoctorData();
    }, []);

    return (
        <Layout>
            {doctor && (
                <div>
                    <h1 className='page-title'>{doctor.firstName} {doctor.lastName}</h1>
                    <hr />
                    <Row gutter={20} className='mt-5' align='middle'>
                        <Col span={8} sm={24} xs={24} lg={8}>
                            <img src='/book-logo-1.jpg' alt='' width='100%' height='350px'/>
                        </Col>
                        <Col span={8} sm={24} xs={24} lg={8}>
                        <h1 className='normal-text'>
                            <p><b>Schedules: </b> {doctor.schedule[0]} - {doctor.schedule[1]} </p>
                            <p><b>Phone Number: </b>{doctor.phoneNumber}</p>
                            <p><b>Address: </b>{doctor.address}</p>
                            <p><b>Consulation Fee: </b>{doctor.feePerConsultation}</p>
                        </h1>
                        <div className='d-flex flex-column pt-2'>
                            <DatePicker 
                                format='MM-DD-YYYY'
                                onChange={(value) => {
                                    setIsAvailable(false);
                                    setDate((value).format('MM-DD-YYYY'))
                                }
                            }/>
                            <TimePicker 
                                format='HH A'
                                className='mt-3'
                                needConfirm={false} 
                                onChange={(value) => {
                                    setIsAvailable(false);
                                    setTime((value).format('HH A'));
                                }
                            }/>
                            {!isAvailable && <Button 
                                className='primary-button mt-3' onClick={checkAvailability}>Check Availability</Button>}                            

                            {isAvailable && (<Button 
                                className='primary-button mt-3' onClick={bookNow}>Book Now</Button>
                            )}
                        </div>
                        </Col>
                    </Row>
                </div>
            )}
        </Layout>
    )
}

export default BookAppointment;