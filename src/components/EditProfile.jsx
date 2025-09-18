import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { USERS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [image, setImage] = useState(user.image);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [university, setUniversity] = useState(user.university);
    const [about, setAbout] = useState(`My name is ${firstName}. I am graduated from ${university}.`);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);

    const dispatch = useDispatch();
    const userData = useSelector((store) => store.user);

    const saveProfile = async () => {
        setError("");
        try
        {
            const res = await axios.put(USERS + "/" + userData.id, {
                firstName,
                lastName,
                image,
                age,
                gender,
                university
            });
            dispatch(addUser(res.data));
            setShowToast(true);

            const i = setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }
        catch (err)
        {
            setError(err.message);
            setShowToast(false);
        }
    }

    return (
        <>
            <div className='flex justify-center my-10'>
                <div className='flex justify-center mx-10'>
                    <div className="card bg-base-200 w-96 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile</h2>
                            <div>
                                <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">First Name:</span>
                                </div>
                                <input type="text" value={firstName} name="firstName" className="input w-full max-w-xs" onChange={(e)=>setFirstName(e.target.value)} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Last Name:</span>
                                </div>
                                <input type="text" value={lastName} name="lastName" className="input w-full max-w-xs" onChange={(e)=>setLastName(e.target.value)} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Photo URL:</span>
                                </div>
                                <input type="text" value={image} name="image" className="input w-full max-w-xs" onChange={(e)=>setImage(e.target.value)} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Age:</span>
                                </div>
                                <input type="text" value={age} name="age" className="input w-full max-w-xs" onChange={(e)=>setAge(e.target.value)} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Gender:</span>
                                </div>
                                <input type="text" value={gender} name="gender" className="input w-full max-w-xs" onChange={(e)=>setGender(e.target.value)} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">About:</span>
                                </div>
                                <input type="text" value={about} name="about" className="input w-full max-w-xs" onChange={(e)=>setAbout(e.target.value)} />
                                </label>
                            </div>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, image, age, gender, university }} />
            </div>
            {showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile updated successfully.</span>
                </div>
            </div>}
        </>
  )
}

export default EditProfile
