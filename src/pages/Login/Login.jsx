import { useState } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'


const LoginPage = props => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <div className='flex justify-center'>
      
        <div className="p-10 shadow-lg rounded-xl text-center bg-white">
          <h1 className="text-3xl font-bold text-black-500">Sign In</h1>
          <h3 className="text-1xl font-semibold text-gray-500">{message}</h3>
          <LoginForm
            handleSignupOrLogin={props.handleSignupOrLogin}
            updateMessage={updateMessage}
          />
        </div>
      
    </div>

  )
}

export default LoginPage
