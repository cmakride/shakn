import { useState } from 'react'
import ChangePasswordForm from '../../components/ChangePasswordForm/ChangePasswordForm'

const ChangePassword = props => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <div className='flex justify-center'>
      <div className="p-10 shadow-lg rounded-xl text-center bg-white">
        <h1 className="text-3xl mb-3 font-bold text-black-500">Change Password</h1>
        <h3 className="text-1xl font-semibold text-gray-500">{message}</h3>
        <ChangePasswordForm {...props} updateMessage={updateMessage} />
      </div>
    </div>
  )
}

export default ChangePassword
