import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

  const { user } = useSelector((state) => state.User);
  
  return (
    <div className=' flex flex-col justify-center items-center gap-4 m-8'>
      <h1>{user?.Firstname} {user?.Lastname}</h1>
      <h2>{user?.email}</h2>  
      <h2>{user?.gender}</h2>
      <h2>{user?.number}</h2>
      <p>
        {user?.addresses[0].House},
        {user?.addresses[0].Street},
        {user?.addresses[0].City},
        {user?.addresses[0].State},
        {user?.addresses[0].Country},
        {user?.addresses[0].Zip},
        {user?.addresses[0].Type},
        {user?.addresses[0].Default}
        {user?.addresses[0].Landmark},
      </p>
      <h2>{user?.joinedOn}</h2>
    </div>
  )
}

export default Profile