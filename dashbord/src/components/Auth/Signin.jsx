import {React, useState} from "react";
import { Link, useNavigate} from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../redux-toolkit/Slice/AuthSlice.js"

import { FaEye, FaEyeSlash } from "react-icons/fa";

import Avatar from "../../assets/avatar with man in green shirt and orange hat.png"
import Design from "../../assets/Rectangle 1.svg"
import Boy from "../../assets/Rectangle.png";
import Lamp from "../../assets/chandelier with green round lampshade.png";

const Signin = () => {
  const [visability, setVisability] = useState(false);
  const [erroremail, setErrorEmail] = useState('');
  const [errorpass, setErrorPass] = useState('');
  // const [length, setLength] = useState(6);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading } = useSelector((state) => state.Auth);

  const PasswordShowHide = () => {
    setVisability(!visability);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const char = new RegExp("(?=.*[!@#$%^&*~])");

    if (!email) { setErrorEmail("Enter username"); };

    if (!password) {
      setErrorPass("Enter password");
    } else if (!lower.test(password)) {
      setErrorPass("at least one lower cast latter");
    } else if (!upper.test(password)) {
      setErrorPass("at least one upper case latter");
    } else if (!number.test(password)) {
      setErrorPass("at least one number include");
    } else if (!char.test(password)) {
      setErrorPass("at least one char include");
    } else {
      let userData = { email, password }
      dispatch(signin(userData), navigate("/"));
    }
    
  };

    if (error) return <p style={{ color: "red" }}>error: {error}</p>;

  return (
    <>
      <div className="w-full h-full relative overflow-hidden px-8 text-white bg-[#001f54] font-titles">
        <div className="w-1/2"><img src={Avatar} alt="avatar" className="mx-auto mt-2" /></div>
        <div className="w-1/2"><h2 className=" text-center text-[4.5rem] font-heading"> Welcome </h2></div>
        <form className="w-1/2" onSubmit={handelSubmit}>
          <div>
            <label className="font-bold">Username</label>
            <input className="w-full p-2 mt-2 border-0 border-b-2 border-b-[#0af] bg-transparent text-white focus:outline-none" type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter username" required/>
          <p className=" text-red-500 text-lg">{erroremail}</p>
          </div>

            <label className="font-bold">Password</label>
            <div className="relative">
              <input className="w-full p-2 mt-2 border-0 border-b-2 border-b-[#0af] bg-transparent text-white focus:outline-none" onChange={(e)=>{setPassword(e.target.value)}} type={visability ? "text" : "password"} placeholder="Enter password" required />
              <span className=" absolute right-12 top-5 text-bt cursor-pointer">
                {visability ? ( <FaEyeSlash onClick={PasswordShowHide} /> ) : ( <FaEye onClick={PasswordShowHide} /> )}
            </span>
            <p className=" text-red-500 text-xl">{errorpass}</p>
            </div>

            <div className=" text-right mt-2 font-bold">
              <Link className="text-white text-sm text-decoration-none">Forgot Password?</Link>
            </div>

          <button type="submit" className=" w-full p-3 mt-4 text-[1.2rem] bg-[#0af] border-0 text-white font-bold rounded-lg cursor-pointer">
            {loading ? "Login......" :"Login" }</button>
            <p className="text-right mt-4"> Click here <Link to="/signup" className="text-white font-bold text-decoration-none"> Signup </Link> </p>
          </form>
          {/* <div className="w-1/2 h-full p-8"></div> */}
        <img src={Lamp} alt="Lamp" className="w-[120px] h-[180px] absolute top-0 left-[45rem]"/>
        <img src={Boy} alt="Boy Illustration" className="w-[380px] h-[400px] absolute top-32 left-[48rem] z-10"/>
        <img src={Design} alt="bg illustration" className="w-[600px] h-[980px] absolute -top-32 left-[42rem]" />
        {/* <div className="w-1/2 h-full relative overflow-hidden border-2 border-orange-500"></div> */}
      </div>

    </>
  );
}

export default Signin