import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/requestSlice';
import axios from 'axios';
import { USERS } from '../utils/constants';

const Requests = () => {

    const requests = useSelector((store) => store.request);

    const dispatch = useDispatch();

    const fetchRequests = async () => {
        try
        {
            const res = await axios.get(USERS + "/filter?key=hair.color&value=Red");
            dispatch(addRequests(res.data.users));
        }
        catch (err)
        {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests)
        return;

    if (requests.length === 0)
        return <h1>No Profiles Found</h1>
    
    return (
        <div className='text-center my-10'>
        <h1 className='text-bold text-3xl'>Requests</h1>

        {requests.map((request) => {
            const { id, firstName, lastName, image, age, gender, university } = request;

            return (
            <div key={id} className='flex justify-between my-4 p-4 bg-base-300 max-w-1/2 m-auto'>
                <div>
                <img
                    alt='photo'
                    className='w-20 h-20 rounded-full'
                    src={image}
                />
                </div>
                <div className='text-left mx-4'>
                    <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
                    <p>{age + "," + gender}</p>
                    <h2>{`My name is ${firstName}. I am graduated from ${university}.`}</h2>
                </div>
                <div className='flex'>
                    <button className='btn btn-primary mx-2'>Reject</button>
                    <button className='btn btn-secondary mx-2'>Accept</button>
                </div>
            </div>
            )
        })}
        </div>
    )
}

export default Requests
