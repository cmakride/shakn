import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as authService from '../../services/authService'

const LoginForm = props => {
  const [formData, setFormData] = useState({
    email: '',
    pw: '',
  })
  const navigate = useNavigate()

  const handleChange = e => {
    props.updateMessage('')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      await authService.login(formData)
      props.handleSignupOrLogin()
      navigate('/')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  return (
    <form
      className='text-left pt-3 flex flex-col items-center gap-3'
      autoComplete="off"
      onSubmit={handleSubmit}
    >
        <input
          type="text"
          className='p-1 rounded-lg bg-gray-100 shadow-md border-cyan-500'
          placeholder='Email'
          autoComplete="off"
          id="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          className='p-1 rounded-lg bg-gray-100 shadow-md border-cyan-500'
          placeholder='Password'
          autoComplete="off"
          id="password"
          value={formData.pw}
          name="pw"
          onChange={handleChange}
        />
      
      <div className='mt-2 flex gap-3'>
        <button className="bg-cyan-200 p-2 pr-4 pl-4 text-gray-800 font-semibold rounded-xl">Log In</button>
        <Link to="/">
          <button className="bg-red-200 p-2 pr-4 pl-4 text-gray-800 font-semibold rounded-xl">Cancel</button>
        </Link>
      </div>
    </form>
  )
}

export default LoginForm
