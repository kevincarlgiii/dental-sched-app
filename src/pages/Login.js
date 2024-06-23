import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertSlice';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async(values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/user/login', values);
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem('token', response.data.data);
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
        <div className='authentication'>
            <div className='authentication-form card p-3'>
                <h1 className='card-title'>Login</h1>
                <Form layout='vertical' onFinish={onFinish}>                    
                    <Form.Item label="Email" name="email">
                        <Input placeholder="Email" type="email"/>
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input placeholder="Password" type="password"/>
                    </Form.Item>
                    <Button className='primary-button my-3' htmlType='submit'>Login</Button>

                    <Link to="/register" className="anchor mt-2">CLICK HERE TO REGISTER</Link>
                </Form>
            </div>
        </div>
    )
}

export default Login;