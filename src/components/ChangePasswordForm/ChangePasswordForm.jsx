import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as authService from '../../services/authService'

const ChangePasswordForm = props => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    pw: '',
    newPw: '',
    newPwConf: '',
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
      await authService.changePassword(formData)
      props.handleSignupOrLogin()
      navigate('/')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  const { pw, newPw, newPwConf } = formData

  const isFormInvalid = () => {
    return !(pw && newPw && newPw === newPwConf)
  }

  return (
    <form
      className='text-left pt-3 flex flex-col items-center gap-5'
      autoComplete="off"
      onSubmit={handleSubmit}
      
    >
        <input
          type="password"
          className='p-1 rounded-lg bg-gray-100 shadow-md border-cyan-500'
          placeholder='Current Password'
          autoComplete="off"
          id="password"
          value={pw}
          name="pw"
          onChange={handleChange}
        />
        <input
          type="password"
          className='p-1 rounded-lg bg-gray-100 shadow-md border-cyan-500'
          placeholder='New Password'
          autoComplete="off"
          id="newPassword"
          value={newPw}
          name="newPw"
          onChange={handleChange}
        />
        <input
          type="password"
          className='p-1 rounded-lg bg-gray-100 shadow-md border-cyan-500'
          placeholder='Confirm New Password'
          autoComplete="off"
          id="newPasswordConf"
          value={newPwConf}
          name="newPwConf"
          onChange={handleChange}
        />
      <div className='mt-2 flex gap-3'>
        <button className="bg-blue-200 p-2 pr-4 pl-4 text-gray-800 font-semibold rounded-xl" disabled={isFormInvalid()}>
          Change Password
        </button>
        <Link to="/">
          <button className="bg-red-200 p-2 pr-4 pl-4 text-gray-800 font-semibold rounded-xl">Cancel</button>
        </Link>
      </div>
    </form>
  )
}

export default ChangePasswordForm
