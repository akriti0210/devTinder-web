import React, { useEffect } from 'react'
import { USERS } from '../utils/constants'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {

  const dispatch = useDispatch();
  const connectionData = useSelector((store) => store.connection);
  const fetchConnection = async () => {
    try
    {
      const res = await axios.get(USERS + "/filter?key=hair.color&value=White");
      dispatch(addConnections(res.data.users));
    }
    catch (err)
    {
      console.log(err.message)
    }
  }

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connectionData)
    return;
  if (connectionData.length === 0)
    return <h1>No Connections Found</h1>
  
  return (
    <div className='text-center my-10'>
      <h1 className='text-bold text-3xl'>Connections</h1>

      {connectionData.map((connection) => {
        const { id, firstName, lastName, image, age, gender, university } = connection;

        return (
          <div key={id} className='flex my-4 p-4 bg-base-300 max-w-1/2 m-auto'>
            <div>
              <img
                alt='photo'
                className='w-20 h-20 rounded-full'
                src={image}
              />
            </div>
            <div className='text-left mx-4'>
              <h2 className='font-bold text-xl'>{firstName+" "+lastName}</h2>
              <h2>{`My name is ${firstName}. I am graduated from ${university}.`}</h2>
              <p>{age + "," + gender}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Connections
