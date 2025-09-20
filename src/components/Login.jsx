import axios from "axios";
import { useState } from "react"
import Profile from "./Profile";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL, USERS } from "../utils/constants";
import { useCookies } from "react-cookie";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const CONST_AGE = "28";
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
      setError(err?.response?.data?.message || "Something went wrong");
    }
  }

  const handleSignUp = async () => {
    try
    {
      const res = await axios.post(USERS + "/add",
        {
          firstName, lastName, CONST_AGE
        }
      );
      dispatch(addUser(res.data));
      navigate("/profile");
    }
    catch (err)
    {
      console.log(err?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          {
            !isLoginForm &&
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input type="text" value={firstName} name="firstName" className="input w-full max-w-xs" onChange={(e) => setFirstName(e.target.value)} />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input type="text" value={lastName} name="lastName" className="input w-full max-w-xs" onChange={(e) => setLastName(e.target.value)} />
              </label>
            </div>
          }
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
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p className="m-auto cursor-pointer" onClick={() => setIsLoginForm((value) => !value)}>
            {isLoginForm ?
            "New User? Sign UP here!"
            : "Existing User? Login Here!"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
