import axios from 'axios'
import React, { useEffect } from 'react'
import { USERS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed)
      return;
    try
    {
      const res = await axios.get(USERS);
      // console.log(res?.data?.users);
      dispatch(addFeed(res?.data?.users));
    }
    catch (err)
    {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (<div className='flex justify-center my-10'>
      <UserCard user={feed[0]} />
    </div>)
  )
}

export default Feed
