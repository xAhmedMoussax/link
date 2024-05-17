import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [err, setErr] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
    } catch (err) {
      setErr(true);
    }
  };

  console.log(inputs)
  
  return (
    <>
    <div className="flex h-[100vh] justify-center items-center mx-auto">
      <div className="flex bg-white  w-[50%]">
        <div className="flex-[1] flex flex-col gap-[30px] bg-white rounded-ss-2xl p-10 justify-center shadow-custom">
          <h1 className="text-3xl">Register</h1>
          <form>
            <Input
              type="text"
              placeholder="Username"
              required
              className=" mb-5"
              name="username"
              onChange={handleChange}
            />
            <Input
              type="email"
              placeholder="Email"
              required
              className=" mb-5"
              name="email"
              onChange={handleChange}
            />
            <Input
              type="password"
              placeholder="Password"
              required
              className="mb-5"
              name="password"
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Name"
              required
              className="mb-10"
              name="name"
              onChange={handleChange}
            />
            <div>
              <Button className="bg-gradient-to-tl from-violet-600 to-indigo-600 w-[150px]">
              Register
              </Button>
            </div>
          </form>
        </div>
        

        <div className="flex-[1] flex flex-col gap-[30px] p-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-ee-2xl">
          <h1 className=" text-6xl text-white " id="logo">
            LinkUp.
          </h1>
          <p className="text-white">
            Join our vibrant community today and unlock a world of connection!
            Sign up now to start sharing your story with like-minded
            individuals.
          </p>
          <span className=" text-sm text-white">
            Having an account?
          </span>
          <Link to="/login">
          <Button className=" w-[60%]" onClick={handleClick}>Login</Button>
          </Link>
        </div>


      </div>
    </div>
  </>
  )
}

export default Register