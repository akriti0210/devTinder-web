import axios from "axios";
import { useState } from "react"
import Profile from "./Profile";

const Login = () => {

  const [email, setEmail] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");

  // const [cookie, setCookie] = useCookies(['accessToken', 'refreshToken'])

  const payload = {
    username: email,
    password: password
  }

  const handleLogin = async() => {
    try
    {
      const res = await axios.post("https://dummyjson.com/auth/login",
        payload).then((response) => {
          console.log(response)
          if (response.status === 200)
          {
            <Profile />
          }
          // let expires = new Date()
          // setCookie('accessToken', res.data.accessToken, { path: '/',  expires})
          // setCookie('refreshToken', res.data.refreshToken, {path: '/', expires})
      })
    }
    catch (err)
    {
      console.error(err.response.data.message);
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input type="text" value={email} name="email" className="input w-full max-w-xs" onChange={(e)=>setEmail(e.target.value)} />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input type="text" value={password} name="password" className="input w-full max-w-xs" onChange={(e)=>setPassword(e.target.value)} />
            </label>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
