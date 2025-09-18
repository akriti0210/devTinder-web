import axios from "axios";
import { useState } from "react"
import Profile from "./Profile";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useCookies } from "react-cookie";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [cookie, setCookie] = useCookies(['accessToken', 'refreshToken'])

  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);

  const payload = {
    username: email,
    password: password
  }

  const handleLogin = async () => {
    try
    {
      const res = await axios.post(BASE_URL+"/login",
        payload)
      dispatch(addUser(res.data));
      setCookie('accessToken', res.data.accessToken);
      setCookie('refreshToken', res.data.refreshToken);
      navigate("/");
    }
    catch (err)
    {
      setError(err?.response?.data?.message);
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
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
