import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as authService from '../../services/authService'

const SignupForm = props => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  })

  const handleChange = e => {
    props.updateMessage('')
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await authService.signup(formData)
      props.handleSignupOrLogin()
      navigate('/')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  const { name, email, password, passwordConf } = formData

  const isFormInvalid = () => {
    return !(name && email && password && password === passwordConf)
  }

  return (
    <div className='flex justify-center'>
      <div className="p-10 shadow-lg rounded-xl text-center bg-white">
      <h1 className="text-3xl font-bold mb-2 text-black-500">Sign Up</h1>
        <form
          className='text-left pt-3 flex flex-col items-center gap-5'
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className='p-1 rounded-lg bg-gray-100 shadow-md border-cyan-500'
            placeholder='Name'
            autoComplete="off"
            id="name"
            value={name}
            name="name"
            onChange={handleChange}
          />
          <input
            type="text"
            className='p-1 rounded-lg bg-gray-100 shadow-md border-cyan-500'
            placeholder='Email'
            autoComplete="off"
            id="email"
            value={email}
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            className='p-1 rounded-lg bg-gray-100 shadow-md border-cyan-500'
            placeholder='Password'
            autoComplete="off"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
          <input
            type="password"
            className='p-1 rounded-lg bg-gray-100 shadow-md border-cyan-500'
            placeholder='Confirm Password'
            autoComplete="off"
            id="confirm"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
          />

          <div className='mt-2 flex gap-3'>
            <button className="bg-green-200 p-2 pr-4 pl-4 text-gray-800 font-semibold rounded-xl" disabled={isFormInvalid()}>
              Sign Up
            </button>
            <Link to="/">
              <button className="bg-red-200 p-2 pr-4 pl-4 text-gray-800 font-semibold rounded-xl">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupForm
