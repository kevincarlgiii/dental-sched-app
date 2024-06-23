import React from 'react';
import { useNavigate } from 'react-router-dom';

function Doctor({doctor}) {
    const navigate = useNavigate();
    return (
        <div className='card p-2 cursor-pointer' onClick={() => navigate(`/book-appointment/${doctor._id}`)}>
            <h1 className='card-title'>{doctor.firstName} {doctor.lastName}</h1>
            <hr />
            <p><b>Phone Number: </b>{doctor.phoneNumber}</p>
            <p><b>Address: </b>{doctor.address}</p>
            <p><b>Consulation Fee: </b>{doctor.feePerConsultation}</p>
            <p><b>Consultation Hours: </b>{doctor.schedule[0]} - {doctor.schedule[1]}</p>
        </div>
    )
}

export default Doctor;