import axios from 'axios';
import React from 'react'
import { USERS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
    const { id, firstName, lastName, image, age, gender, university } = user;
    const about = `My name is ${firstName}. I am graduated from ${university}.`
    
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try
        {
            const res = await axios.delete(USERS + "/" + userId);
            dispatch(removeUserFromFeed(userId));
        }
        catch (err)
        {
            console.log(err.message);
        }
    }

    return (
        <div className="card bg-base-200 w-96 shadow-sm">
            <figure>
                <img
                src={image}
                alt="photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName+" "+lastName}</h2>
                <p>{age + ", " + gender}</p>
                <p>{about}</p>
                <div className="card-actions justify-center my-4">
                    <button className="btn btn-primary" onClick={()=>handleSendRequest("ignore",id)}>Ignore</button>
                    <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested",id)}>Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
