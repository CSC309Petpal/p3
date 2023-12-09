import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from 'react-router-dom';
import StartHeader from '../StartHeader/startHeader';
import { BACKENDHOST } from '../../config';


const Check = () => {
    const [isChecked, setIsChecked] = useState(false);
    const seekerId = localStorage.getItem('seeker_id');
    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchInitialState = async () => {
            try {
                const response = await fetch(`${BACKENDHOST}accounts/seeker/${seekerId}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setIsChecked(data.checking);
            } catch (error) {
                console.error('Error fetching initial state:', error);
            }
        };

        fetchInitialState();
    }, []);

    const handleOnChange = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        updateCheckingField(newValue ? true : false);
    };

    const updateCheckingField = async (value) => {
        try {
            const response = await fetch(`${BACKENDHOST}accounts/seeker/${seekerId}/`, { // Replace with your actual update endpoint
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ checking: value })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('Field updated:', responseData);
        } catch (error) {
            console.error('Error updating field:', error);
        }
    };

    
    return (
        <label className="switch">
            <input type="checkbox" checked={isChecked} onChange={handleOnChange} />
            <span className="slider round"></span>
        </label>

    );

};

export default Check;
