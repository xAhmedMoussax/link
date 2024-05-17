import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/authContext";
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Login = () => {

  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    login();
  };

  return (
    <>
      <div className="flex h-[100vh] justify-center items-center mx-auto">
        <div className="flex bg-white rounded-ss-2xl rounded-ee-2xl w-[50%]">
          <div className="flex-[1] flex flex-col gap-[30px] p-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-ss-2xl">
            <h1 className=" text-6xl text-white " id="logo">
              LinkUp.
            </h1>
            <p className="text-white">
              Join our vibrant community today and unlock a world of connection!
              Sign up now to start sharing your story with like-minded
              individuals.
            </p>
            <span className=" text-sm text-white">
              Don't you have an account?
            </span>
            <Link to="/register">
            <Button className=" w-[60%]">Register</Button>
            </Link>
          </div>
          <div className="flex-[1] flex flex-col gap-[50px] bg-white rounded-ee-2xl p-10 justify-center shadow-custom">
            <h1 className="text-3xl">Login</h1>
            <form>
              <Input
                type="text"
                placeholder="Username"
                required
                className=" mb-5"
              />
              <Input
                type="password"
                placeholder="Password"
                required
                className="mb-14"
              />
              <div>
                <Button className="bg-gradient-to-tl from-violet-600 to-indigo-600 w-[150px]" onClick={handleLogin}>
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
