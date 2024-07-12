import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import Oauth from "../component/Oauth";
const Signup = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    // console.log(e);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      setLoading(false);
       if(data.success === false){
        setError(true);
        return;
       }

 navigate('/sign-in');
       
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error.message);
    }
  };
  return (
    <div className="w-full bg-black h-screen text-white">
      <div>
        <div className="flex justify-center flex-col max-w-[650px] mx-auto px-10">
          <div>
            <h3 className="text-3xl text-center font-bold py-8">Sign Up</h3>
          </div>
          <form onSubmit={handleSubmit} className="w-full ">
            <input
              type="text"
              className="bg-transparent border rounded-md my-3 w-full text-white p-2"
              onChange={handleChange}
              name="username"
              id="username"
              placeholder="username"
            />
            <input
              type="email"
              onChange={handleChange}
              name="email"
              id="email"
              className="bg-transparent border rounded-md my-3 w-full text-white p-2"
              placeholder="Email"
            />
            <input
              type="password"
              onChange={handleChange}
              name="password"
              id="password"
              className="bg-transparent border rounded-md my-3 w-full text-white p-2"
              placeholder="Password"
            />
            <button disabled={loading} className="bg-blue-700 disabled:opacity-80 hover:opacity-95 duration-300 p-2 w-full rounded-md my-2 text-white">
              {loading ?"Loading...":"Sign Up"}
            </button>
          </form>
          <div>
            <Oauth/>
            <p className="my-3 font-bold">
              Have an account{" "}
              <Link to="/sign-in" className="text-sky-500">
                Sign In ?
              </Link>{" "}
            </p>
          </div>
          <div>
            <p className="text-red-500">{error && "Something Went Wrong"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
