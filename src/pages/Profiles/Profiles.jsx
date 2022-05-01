import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as profileService from '../../services/profileService'

const Profiles = () => {
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    profileService.getAllProfiles()
      .then(profiles => setProfiles(profiles))
  }, [])

  return (
    <>

        {profiles.length ?
          <>
      <div className="grid gap-4 pt-10 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {profiles.map((profile, idx) => (
      <div className="w-40 p-2 bg-white rounded-xl md:flex md:flex-wrap">
              <Link
                key={idx}
                to='/profile'
                state={ profile }
              >
                <img className="object-scale-down h-26 w-50" src={profile.photo} alt="avatar" /><h4 className="mt-8 text-center text-xl font-bold">{profile.name}</h4>
              </Link>
                </div>
            ))}
            </div>
          </>
          :
          <>
            <h2>No profiles yet</h2>
          </>
        }
    </>
  )
}

export default Profiles