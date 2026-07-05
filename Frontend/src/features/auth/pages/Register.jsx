import React from 'react'
import { useNavigate, Link } from 'react-router'

const Register = () => {

const nevigate = useNavigate()

 const handleSubmit = (e) => {
    e.preventDefault()
      }

  return (
    <div>
      <main>
        <div className='form-container'>
         <h1>Register</h1>

         <form onSubmit={handleSubmit}>
          <div class="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name='username' placeholder='Enter username' />
          </div>

          <div class="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name='email' placeholder='Enter email address' />
          </div>

          <div class="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name='password' placeholder='Enter your password' />
          </div>

          <button className='button primary-button'>Register</button>
          
         </form>

         <p>Already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
      </main>
    </div>
  )
}

export default Register
