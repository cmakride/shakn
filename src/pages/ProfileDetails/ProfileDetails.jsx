
import React from 'react';
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';


const ProfileDetails = ({ user }) => {
  const location = useLocation()
  const profile = location.state
  console.log(user.profile)
  console.log(profile._id)
  return (
    <>
      <div>
        <div>
          <img className="object-scale-down h-48 w-96, w-40 p-2 m-1 bg-white rounded-xl md:flex md:flex-wrap shadow-lg float-left" src={profile.photo} alt="avatar" />
          <h1 className="mt-8 text-center text-3xl font-bold" >{profile.name}</h1>
        </div>
        <h2 className="mt-8 text-center text-3xl font-bold">bar: {profile.bar}</h2>
        <h2 className="mt-8 text-center text-3xl font-bold">city: {profile.city}</h2>
        <h2 className="mt-8 text-center text-3xl font-bold">bio: {profile.bio}</h2>

        {

          ((user.profile === profile._id)) ?
            <>

              <Link className="text-white bg-yellow-500 p-2 rounded-md"
                to='/editprofile'
                state={{ profile }}
              >
                Edit
              </Link>
            </>
            :
            <>

              {user.profile.name}

            </>

        }
      </div>
    </>
  )
}

export default ProfileDetails;