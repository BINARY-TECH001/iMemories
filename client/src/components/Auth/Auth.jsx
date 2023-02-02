import React, { useEffect, useState } from 'react'
import './auth.scss'
import { signup, signin } from '../../actions/auth'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FaUserLock } from 'react-icons/fa'
import { AiFillEyeInvisible } from 'react-icons/ai'
import { AiFillEye } from 'react-icons/ai'
import { GoogleLogin } from 'react-google-login'
import Icon from './Icon'
import { gapi } from 'gapi-script'
import { Button } from '@material-ui/core'

const initialState = {firstName: '', lastName: '', email: '', password : '', confirmPassword: ''}
const Auth = () => {
  const dispatch = useDispatch()
  const clientId = "502000031721-4olr2nr4bl7tpivf7lmhr11nit052tnc.apps.googleusercontent.com"
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const history = useHistory()
  const [formData, setFormData] = useState(initialState)


  useEffect(() =>{
   const initClient = () =>{
    gapi.client.init({
      clientId : clientId,
      scope: ''
    })
   }
   gapi.load('client: auth2', initClient)
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
    if (isSignUp){
      dispatch(signup(formData, history))
    } else {
      dispatch(signin(formData, history))
    }
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
  }

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword)

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp)
    handleShowPassword(false)
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj
    const token = res?.tokenId

    try{
      dispatch({ type: 'AUTH', data: { result, token } })
      history.push('/')
    } catch (err){
      console.log(err);
    }
  }

  const googleFailure = (err) => {
    console.log(err)
    console.log('Google Sign In was Unsuccessful. Try again Later')
  }

  return (
    <div className="auth">
      <div className="container">
        <div className="icon">
          <FaUserLock className="lock" />
        </div>
        <h5> {isSignUp ? 'Sign Up' : 'Sign In'} </h5>

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <input
                type="text"
                onChange={handleChange}
                placeholder="First Name"
                autoFocus="on"
                name="firstName"
                required
              />

              <input
                type="text"
                onChange={handleChange}
                placeholder="Last Name"
                autoFocus="on"
                required
                name="lastName"
              />
            </>
          )}

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
          />

          <div className="passwordCon">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              onChange={handleChange}
            />
            <span onClick={handleShowPassword}>
             {showPassword ? <AiFillEye className="eye" /> : <AiFillEyeInvisible className="eye" />} 
            </span>
          </div>

          {isSignUp && (
            <div className="passwordCon">
              <input
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                required
                onChange={handleChange}
              />
              <span onClick={handleShowPassword}>
              {showPassword ? <AiFillEye className="eye" /> : <AiFillEyeInvisible className="eye" />} 
              </span>
            </div>
          )}

          <button type="submit" className="submit">
            {' '}
            {isSignUp ? 'Sign Up' : 'Sign In'}{' '}
          </button>

          {/* <div className="google"> */}
            <GoogleLogin
              clientId={clientId}
              render={(renderProps) => (
                <>
                  <Button
                  color='secondary'
                  variant='contained'
                  startIcon={<Icon />}
                    className="google__button"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    {' '}
                    Google Sign In
                  </Button>
                </>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
          {/* </div> */}

          <div className="toggleSign">
            <button onClick={switchMode}>
              {' '}
              {isSignUp
                ? 'Already have an account? Sign In'
                : `Don't have an account? Sign Up`}{' '}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Auth
