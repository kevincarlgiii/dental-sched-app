import React from 'react';
import moment from 'moment';
import { Form, Row, Col, Input, TimePicker, Button } from 'antd';

function DoctorForm({onFinish, initialValues, onChange}) {
    return (
        <Form layout='vertical' onFinish={onFinish} initialValues={{
            ...initialValues,
            ...(initialValues && {                
                schedule : [
                    moment(initialValues.schedule[0], 'HH A'),
                    moment(initialValues.schedule[1], 'HH A'),
                ],
            }),
        }}>
        <h1 className='card-title mt-3'>Personal Information</h1>
        <Row gutter={20}>
            <Col span={8} xs={24} sm={24} lg={8}>
                <Form.Item required label="First Name" name="firstName" rules={[{required: true}]}>
                    <Input placeholder="First Name"/>
                </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
                <Form.Item required label="Last Name" name="lastName" rules={[{required: true}]}>
                    <Input placeholder="Last Name"/>
                </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
                <Form.Item required label="Phone Number" name="phoneNumber" rules={[{required: true}]}>
                    <Input placeholder="Phone Number"/>
                </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
                <Form.Item required label="Website" name="website" rules={[{required: true}]}>
                    <Input placeholder="Website"/>
                </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
                <Form.Item required label="Address" name="address" rules={[{required: true}]}>
                    <Input placeholder="Address"/>
                </Form.Item>
            </Col>
        </Row>
        <hr />
        <h1 className='card-title mt-3'>Professional Information</h1>
        <Row gutter={20}>
            <Col span={8} xs={24} sm={24} lg={8}>
                <Form.Item required label="Specialization" name="specialization" rules={[{required: true}]}>
                    <Input placeholder="Specialization"/>
                </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
                <Form.Item required label="Experience" name="experience" rules={[{required: true}]}>
                    <Input placeholder="Experience"/>
                </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
                <Form.Item required label="Fee Per Consultation" name="feePerConsultation" rules={[{required: true}]}>
                    <Input placeholder="Fee Per Consultation" type='number'/>
                </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
                <Form.Item required label="Schedule" name="schedule" rules={[{required: true}]}>
                    <TimePicker.RangePicker format='HH A' needConfirm={false} /> 
                    {/* there is a bug here wherein timepicker end time does not refresh after changing the time, still needs to determine how to fix */}
                </Form.Item>
            </Col>
        </Row>

        <div className='d-flex justify-content-end'>
            <Button className='primary-button' htmlType='submit'>SUBMIT</Button>
        </div>
    </Form>
    )
}

export default DoctorForm;